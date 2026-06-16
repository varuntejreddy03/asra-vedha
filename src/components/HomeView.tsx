import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf, Plus, Minus } from 'lucide-react';
import { Product, ViewState } from '../types';
import { products, getPrice } from '../data';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  onSelectProduct: (productId: string) => void;
  addToCart: (productId: string, qty?: number) => void;
  catalogProducts?: Product[];
}

export default function HomeView({
  setView,
  currency,
  onSelectProduct,
  addToCart,
  catalogProducts = products
}: HomeViewProps) {
  // Star products for the homepage curation from the current ASRA catalog.
  const featuredIds = ['moringa-powder', 'ashwagandha-powder', 'amla-powder'];
  const featuredProducts = catalogProducts.filter(p => featuredIds.includes(p.id)).slice(0, 3);
  const [activeQtyPicker, setActiveQtyPicker] = useState<string | null>(null);
  const [pickerQty, setPickerQty] = useState<number>(1);

  // Secondary highlights from the screens matching list
  const lifestyleImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmkJGY-JEjEX2Z3OLf-18urLVmD_X3g-ahqM1AG7-iw-f6-9xrsJ5IJu-4TmNXmtU45cwlHpZTeNIXmbvV57rbsjsWL-sbVJQNyxd8gGR02JjhDPeZDh7kPChhj8heohZ1M6QroKgDfBfUsYgGLgv7dTLydtWso4-qvaquLalut9tD48JTl7Y9AGfqnzUDgsx_17nctsESUS-I2-eXmbyyLHGXN7rN5s0wwTzuXyT0DAb4hUAsbNK3wdT3p-Fk2Dl4vSzyWdP2Ww';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkNJkPV88HZ_Lb-4ByRf-TuzlzegoMXXHtSYtL2KRW0k9B_6i45beE3EX8sNSZXd6sg7dl1sSF3sG-NjrGolpptCLuuqp8mTc53Eu5c6kXRus6X-V6fTKAlvImdnRvJb3DsSH3JAIQd0PJZIpnIWWEspRAKzXhoTLE7rvTbH3mvK3CEIxOb0x012YhZ_lugd_bfu7kBHkLCPvn491O8SZzMSsi-JWdcnKeLaSZG4ONAirWheRYk_HiLcPOlFYSeJNfOp0K5i-miqw" 
            alt="" 
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#111111]/80 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]"></div>
        </div>

        <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-[#1e1e1e]/60 border border-[#c8a45d]/30 px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C8A45D] font-semibold">
                Premium Ayurvedic Wellness
              </span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#e5e2e1] leading-[1.05] tracking-tight">
              Premium Herbal
              <br />
              <span className="italic font-serif text-[#e8c177]">Wellness</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[#d1c5b4]/90 leading-relaxed max-w-lg">
              Empowering healthier lifestyles through premium herbal nutrition, superfoods, and natural wellness products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <button
                onClick={() => setView('shop')}
                className="bg-[#c8a45d] hover:bg-[#ffdea3] text-[#261900] px-10 py-4 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#c8a45d]/20"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('contact')}
                className="border border-[#e8c177]/40 hover:border-[#e8c177] hover:bg-[#e8c177]/5 text-[#e8c177] px-10 py-4 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center"
              >
                Become a Distributor
              </button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-[#c8a45d] mb-1" />
              <span className="text-[#e5e2e1] font-display text-sm font-bold">100% Natural</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Heart className="w-5 h-5 text-[#c8a45d] mb-1" />
              <span className="text-[#e5e2e1] font-display text-sm font-bold">Lab Tested</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Leaf className="w-5 h-5 text-[#c8a45d] mb-1" />
              <span className="text-[#e5e2e1] font-display text-sm font-bold">Farm Fresh</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Curations Grid */}
      <section id="curated-rituals" className="bg-[#161514] border-y border-[#4d4639]/20 py-20 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs tracking-widest text-[#c8a45d] uppercase font-bold">Our Signature Products</span>
              <h2 className="font-display text-3xl md:text-4xl text-[#e5e2e1] tracking-tight">Featured Wellness Collection</h2>
            </div>
            
            <button
              onClick={() => setView('shop')}
              className="text-[#e8c177] hover:text-[#ffdea3] font-sans text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer pb-1 border-b border-[#e8c177]/30"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const priceData = getPrice(product, currency);
              return (
                <motion.div
                  key={product.id}
                  className="bg-[#1e1e1e] border border-[#4d4639]/30 rounded-xl overflow-hidden hover:border-[#c8a45d]/40 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                  onClick={() => onSelectProduct(product.id)}
                  whileHover={{ y: -6 }}
                >
                  {/* Photo area */}
                  <div className="aspect-[4/3] w-full bg-[#111111] overflow-hidden relative border-b border-[#4d4639]/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#24523a] text-[#a0d2b3] text-[9px] uppercase tracking-widest font-sans font-extrabold px-2.5 py-1 rounded">
                      {product.scientificBadge || 'Lab Tested'}
                    </div>
                  </div>

                  {/* Copy Area */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-xl text-[#e5e2e1] group-hover:text-[#e8c177] transition-colors">
                          {product.name}
                        </h3>
                        <span className="font-mono text-sm font-semibold text-[#e8c177]">
                          {priceData.formatted}
                        </span>
                      </div>
                      
                      <p className="font-sans text-xs text-[#9a8f80] leading-normal uppercase tracking-wider">
                        {product.subheading}
                      </p>

                      <p className="font-sans text-sm text-[#d1c5b4] line-clamp-3 leading-relaxed mt-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#4d4639]/30 pt-4 mt-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#9a8f80]">
                        Lab Tested
                      </span>
                      {activeQtyPicker === product.id ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setPickerQty(Math.max(1, pickerQty - 1))}
                            className="w-7 h-7 flex items-center justify-center border border-[#4d4639]/40 rounded text-[#e8c177] hover:bg-[#c8a45d]/10 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#e5e2e1] w-5 text-center">{pickerQty}</span>
                          <button
                            onClick={() => setPickerQty(pickerQty + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#4d4639]/40 rounded text-[#e8c177] hover:bg-[#c8a45d]/10 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              addToCart(product.id, pickerQty);
                              setActiveQtyPicker(null);
                              setPickerQty(1);
                            }}
                            className="text-[10px] bg-[#c8a45d] text-[#261900] font-bold uppercase px-3 py-1.5 rounded cursor-pointer hover:bg-[#ffdea3] transition-colors"
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
                          className="text-xs text-[#e8c177] hover:text-[#ffdea3] font-sans font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Elegant Narrative Split Block */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#4d4639]/50 bg-[#1e1e1e] relative">
            <img 
              src={lifestyleImage} 
              alt="Ashwagandha Raw Organic Roots Tied With Twine" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
          <span className="font-sans text-xs tracking-[0.2em] text-[#C8A45D] uppercase font-bold">
            Quality Promise
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#e5e2e1] tracking-tight leading-tight">
            Premium quality starts with careful sourcing, clean processing, and batch-level checks.
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A45D]"></div>
          
          <p className="font-sans text-sm md:text-base text-[#d1c5b4] leading-relaxed">
            Every ASRA VEDHA product is guided by a simple promise: natural ingredients, thoughtful sourcing, clean processing, and trustworthy wellness for modern Indian families.
          </p>

          <p className="font-sans text-sm md:text-base text-[#d1c5b4] leading-relaxed">
            Our product roadmap includes herbal powders, nutraceuticals, superfood blends, immunity products, and fitness nutrition built around practical daily use.
          </p>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#24523a]" />
              <span className="font-sans text-xs text-[#d1c5b4] uppercase tracking-wider">Heavy Metal Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#24523a]" />
              <span className="font-sans text-xs text-[#d1c5b4] uppercase tracking-wider">Sourcing Certified</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
