import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, CornerDownLeft } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  catalogProducts?: Product[];
}

export default function SearchOverlay({ isOpen, onClose, onSelectProduct, catalogProducts = products }: SearchOverlayProps) {
  const [query, setQuery] = useState<string>('');

  const hotSearches = ['Ashwagandha', 'Moringa', 'Amla', 'Turmeric', 'Spirulina', 'Beetroot'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return catalogProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.subheading?.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }, [query, catalogProducts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col pt-24 px-6 md:px-12 bg-[#EDEDEC]/95 backdrop-blur-md">
      {/* Header element */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between border-b border-[#C9A84C]/30 pb-4">
        <div className="flex items-center gap-3 flex-grow">
          <Search className="w-5 h-5 text-[#C9A84C]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, herbs, benefits..."
            className="bg-transparent text-xl font-display text-[#2B2B2B] focus:outline-none w-full placeholder-[#8C8C8C]/60"
          />
        </div>
        
        <button
          onClick={onClose}
          className="p-2 text-[#8C8C8C] hover:text-[#C9A84C] cursor-pointer transition-colors"
          aria-label="Close search overlay"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main body selection block */}
      <div className="max-w-3xl mx-auto w-full py-10 overflow-y-auto flex-grow flex flex-col gap-8">
        {/* Hot Searched terms */}
        {!query.trim() && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase">Suggested Searches</span>
            <div className="flex flex-wrap gap-2.5">
              {hotSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-[#E5E4E2] hover:bg-[#C9A84C]/10 text-xs text-[#6B6B6B] hover:text-[#C9A84C] px-4 py-2 rounded-full border border-[#C9A84C]/30 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live typing results matches */}
        {query.trim() && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase">Matches ({results.length})</span>
            
            {results.length === 0 ? (
              <p className="font-serif italic text-[#8C8C8C] text-sm">No products match this search. Try another herb or category.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product.id);
                      onClose();
                    }}
                    className="flex justify-between items-center bg-[#FFFFFF] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 p-3 rounded-lg cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-[#111]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2B2B2B] group-hover:text-[#C9A84C] transition-colors">{product.name}</h4>
                        <p className="text-[10px] text-[#8C8C8C] line-clamp-1 mt-0.5">{product.subheading}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] text-[#C9A84C]">
                      <span>View</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}




