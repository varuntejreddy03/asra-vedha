import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Check, Search, AlertCircle, Plus, Minus } from 'lucide-react';
import { Product, ViewState } from '../types';
import { products, getPrice } from '../data';

interface ShopViewProps {
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  onSelectProduct: (productId: string) => void;
  addToCart: (productId: string, qty?: number) => void;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  catalogProducts?: Product[];
}

export default function ShopView({
  setView,
  currency,
  onSelectProduct,
  addToCart,
  searchTerm = '',
  setSearchTerm,
  catalogProducts = products
}: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [localSearch, setLocalSearch] = useState<string>(searchTerm);
  const [activeQtyPicker, setActiveQtyPicker] = useState<string | null>(null);
  const [pickerQty, setPickerQty] = useState<number>(1);

  // Sync state if changed externally
  const activeSearch = setSearchTerm ? searchTerm : localSearch;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'herbal-powders', label: 'Herbal Powders' },
    { id: 'nutraceuticals', label: 'Nutraceuticals' },
    { id: 'superfoods', label: 'Superfoods' },
    { id: 'immunity', label: 'Immunity' },
    { id: 'fitness', label: 'Fitness' }
  ];

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    if (setSearchTerm) setSearchTerm(val);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...catalogProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (activeSearch.trim() !== '') {
      const q = activeSearch.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.subheading?.toLowerCase().includes(q)
      );
    }

    // Sorting block
    if (sortBy === 'price-low') {
      result.sort((a, b) => getPrice(a, currency).price - getPrice(b, currency).price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => getPrice(b, currency).price - getPrice(a, currency).price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, sortBy, activeSearch, currency, catalogProducts]);

  return (
    <div className="pt-28 min-h-screen px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(0,0,0,0.06)] pb-8 gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs tracking-widest text-[#C9A84C] uppercase font-bold">Our Wellness Collection</span>
          <h1 className="font-display text-4xl text-[rgba(0,0,0,0.87)] tracking-tight">Premium Herbal Products</h1>
        </div>

        {/* Local Search input */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search herbal powders, adaptogens..."
            value={activeSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-[#f2f0eb] border border-[#C9A84C]/50 rounded-lg px-4 py-2.5 pl-10 text-xs font-sans text-[rgba(0,0,0,0.87)] focus:outline-none focus:border-[#C9A84C] transition-all"
          />
          <Search className="w-4 h-4 text-[rgba(0,0,0,0.38)] absolute left-3 top-3" />
        </div>
      </div>

      {/* Categories & Sorting control bar */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center py-6 border-b border-[#C9A84C]/20">
        {/* Categories toggler */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C9A84C] text-white font-bold'
                  : 'bg-[#f2f0eb] text-[rgba(0,0,0,0.58)] border border-[rgba(0,0,0,0.06)] hover:border-[#C9A84C]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort select menu */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span className="text-xs text-[rgba(0,0,0,0.38)] font-sans uppercase tracking-wider">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#f2f0eb] border border-[#C9A84C]/40 text-xs text-[rgba(0,0,0,0.87)] px-3 py-1.5 rounded focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid Area */}
      <div className="py-12 flex-grow">
        {activeSearch && (
          <div className="text-xs text-[rgba(0,0,0,0.38)] mb-6 font-mono">
            Showing {filteredProducts.length} results matching &ldquo;{activeSearch}&rdquo;
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-[#f2f0eb] rounded-xl card-shadow"
            >
              <AlertCircle className="w-8 h-8 text-[#C9A84C]/70" />
              <div>
                <h4 className="font-display text-lg text-[rgba(0,0,0,0.87)] mb-1">No Blends Found</h4>
                <p className="font-sans text-xs text-[rgba(0,0,0,0.38)]">Try clearing your search query or choosing a broader category filter.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  handleSearchChange('');
                }}
                className="bg-white border border-[#C9A84C]/40 text-[#C9A84C] px-4 py-2 text-xs uppercase tracking-wider font-bold rounded hover:bg-[#C9A84C]/10 cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredProducts.map((product) => {
                const priceData = getPrice(product, currency);
                return (
                  <motion.div
                    key={product.id}
                    layoutId={`shop-card-${product.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-[rgba(0,0,0,0.06)] rounded-xl overflow-hidden hover:border-[#C9A84C]/40 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <div className="aspect-[4/3] w-full bg-[#EDEDEC] overflow-hidden relative border-b border-[rgba(0,0,0,0.06)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-[#EDEDEC]/70 backdrop-blur-md border border-[#C9A84C]/20 text-[#C9A84C] text-[9px] uppercase tracking-widest font-mono px-2.5 py-1 rounded">
                        {product.scientificBadge || 'Ritual Pure'}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="font-display text-lg text-[rgba(0,0,0,0.87)] group-hover:text-[#C9A84C] transition-colors leading-tight">
                            {product.name}
                          </h3>
                          <span className="font-mono text-sm font-semibold text-[#C9A84C]">
                            {priceData.formatted}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-[rgba(0,0,0,0.38)] tracking-wider uppercase">
                          {product.category.replace('-', ' ')}
                        </p>

                        <p className="font-sans text-xs text-[rgba(0,0,0,0.58)] leading-relaxed line-clamp-3 mt-1.5">
                          {product.subheading || product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#C9A84C]/20 pt-4 mt-auto">
                        <span className="text-[9px] text-[rgba(0,0,0,0.38)] font-mono tracking-widest uppercase">
                          Lab Tested
                        </span>
                        {activeQtyPicker === product.id ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setPickerQty(Math.max(1, pickerQty - 1))}
                              className="w-7 h-7 flex items-center justify-center border border-[#C9A84C]/40 rounded text-[#C9A84C] hover:bg-[#C9A84C]/10 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[rgba(0,0,0,0.87)] w-5 text-center">{pickerQty}</span>
                            <button
                              onClick={() => setPickerQty(pickerQty + 1)}
                              className="w-7 h-7 flex items-center justify-center border border-[#C9A84C]/40 rounded text-[#C9A84C] hover:bg-[#C9A84C]/10 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                addToCart(product.id, pickerQty);
                                setActiveQtyPicker(null);
                                setPickerQty(1);
                              }}
                              className="text-[10px] bg-[#C9A84C] text-white font-bold uppercase px-3 py-1.5 rounded cursor-pointer hover:bg-[#B8963C] transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveQtyPicker(product.id);
                              setPickerQty(1);
                            }}
                            className="text-xs text-[#C9A84C] hover:text-[#B8963C] font-sans font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Small Decorative Wisdom Quote */}
      <section className="bg-[#f2f0eb] border border-[rgba(0,0,0,0.06)] p-8 rounded-xl my-16 text-center max-w-3xl mx-auto w-full">
        <p className="font-serif italic text-sm text-[rgba(0,0,0,0.58)] leading-relaxed">
          &ldquo;Let food be thy medicine, and let thy medicine be thy soil. The power of the root is the true sanctuary of human physical stability.&rdquo;
        </p>
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C9A84C] block mt-3">
          Ancient Apothecary Axiom IV
        </span>
      </section>
    </div>
  );
}









