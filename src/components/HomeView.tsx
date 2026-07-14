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
  const featuredIds = ['moringa-powder', 'ashwagandha-powder', 'amla-powder'];
  const featuredProducts = catalogProducts.filter(p => featuredIds.includes(p.id)).slice(0, 3);
  const [activeQtyPicker, setActiveQtyPicker] = useState<string | null>(null);
  const [pickerQty, setPickerQty] = useState<number>(1);

  const lifestyleImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmkJGY-JEjEX2Z3OLf-18urLVmD_X3g-ahqM1AG7-iw-f6-9xrsJ5IJu-4TmNXmtU45cwlHpZTeNIXmbvV57rbsjsWL-sbVJQNyxd8gGR02JjhDPeZDh7kPChhj8heohZ1M6QroKgDfBfUsYgGLgv7dTLydtWso4-qvaquLalut9tD48JTl7Y9AGfqnzUDgsx_17nctsESUS-I2-eXmbyyLHGXN7rN5s0wwTzuXyT0DAb4hUAsbNK3wdT3p-Fk2Dl4vSzyWdP2Ww';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero — warm cream canvas with centered content */}
      <section className="relative overflow-hidden bg-[#EDEDEC] bg-glow-pulse">
        <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center gap-5 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C9A84C] font-sans text-xs tracking-[0.15em] uppercase font-semibold">
              Premium Ayurvedic Wellness
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[rgba(0,0,0,0.87)] leading-[1.1] tracking-tight font-semibold">
              Premium Herbal{' '}
              <span className="italic text-[#C9A84C]">Wellness</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[rgba(0,0,0,0.58)] leading-relaxed max-w-md">
              Empowering healthier lifestyles through premium herbal nutrition, superfoods, and natural wellness products.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
              <button
                onClick={() => setView('shop')}
                className="bg-[#C9A84C] hover:bg-[#B8963C] text-white px-8 py-3 rounded-full text-sm font-sans font-semibold transition-all duration-200 flex items-center justify-center gap-2 gold-glow"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('contact')}
                className="border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/5 px-8 py-3 rounded-full text-sm font-sans font-semibold transition-all duration-200 flex items-center justify-center"
              >
                Become a Distributor
              </button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-10 mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border border-[#C9A84C]/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <span className="text-sm font-sans font-medium text-[rgba(0,0,0,0.87)]">100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border border-[#C9A84C]/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <span className="text-sm font-sans font-medium text-[rgba(0,0,0,0.87)]">Lab Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border border-[#C9A84C]/40 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <span className="text-sm font-sans font-medium text-[rgba(0,0,0,0.87)]">Farm Fresh</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products — dark gold band (like Starbucks House Green band) */}
      <section className="bg-[#3D2E0A] py-16 md:py-20 px-6 md:px-10 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-sans text-xs tracking-[0.15em] text-[#C9A84C] uppercase font-semibold">Our Signature Products</span>
              <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mt-1 font-semibold">Featured Collection</h2>
            </div>
            <button
              onClick={() => setView('shop')}
              className="text-white/80 hover:text-white font-sans text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const priceData = getPrice(product, currency);
              return (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden card-shadow flex flex-col h-full group cursor-pointer"
                  onClick={() => onSelectProduct(product.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-[4/3] w-full bg-[#f2f0eb] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-[#C9A84C] text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full">
                      {product.scientificBadge || 'Lab Tested'}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="font-display text-lg text-[rgba(0,0,0,0.87)] group-hover:text-[#C9A84C] transition-colors font-semibold">
                          {product.name}
                        </h3>
                        <span className="font-sans text-sm font-bold text-[rgba(0,0,0,0.87)]">
                          {priceData.formatted}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[rgba(0,0,0,0.58)] mt-2 line-clamp-2 leading-relaxed">
                        {product.subheading || product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)]">
                      <span className="text-[10px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-medium">
                        Lab Tested
                      </span>
                      {activeQtyPicker === product.id ? (
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => setPickerQty(Math.max(1, pickerQty - 1))} className="w-7 h-7 rounded-full border border-[rgba(0,0,0,0.15)] flex items-center justify-center text-[rgba(0,0,0,0.58)] hover:border-[#C9A84C] hover:text-[#C9A84C] cursor-pointer">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center">{pickerQty}</span>
                          <button onClick={() => setPickerQty(pickerQty + 1)} className="w-7 h-7 rounded-full border border-[rgba(0,0,0,0.15)] flex items-center justify-center text-[rgba(0,0,0,0.58)] hover:border-[#C9A84C] hover:text-[#C9A84C] cursor-pointer">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => { addToCart(product.id, pickerQty); setActiveQtyPicker(null); setPickerQty(1); }} className="bg-[#C9A84C] text-white text-[10px] font-semibold uppercase px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#B8963C] transition-colors">
                            Add
                          </button>
                        </div>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); setActiveQtyPicker(product.id); setPickerQty(1); }} className="text-xs text-[#C9A84C] hover:text-[#B8963C] font-sans font-semibold cursor-pointer">
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

      {/* Quality Promise — back to cream canvas */}
      <section className="bg-[#EDEDEC] px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden card-shadow">
            <img 
              src={lifestyleImage} 
              alt="Premium herbal ingredients" 
              className="w-full h-full object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-col gap-5">
            <span className="font-sans text-xs tracking-[0.15em] text-[#C9A84C] uppercase font-semibold">
              Quality Promise
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[rgba(0,0,0,0.87)] tracking-tight leading-tight font-semibold">
              Careful sourcing. Clean processing. Batch-level testing.
            </h2>
            <div className="w-10 h-[2px] bg-[#C9A84C] rounded-full"></div>
            
            <p className="font-sans text-base text-[rgba(0,0,0,0.58)] leading-relaxed">
              Every Asra Vedha product is guided by a simple promise: natural ingredients, thoughtful sourcing, clean processing, and trustworthy wellness for modern Indian families.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full card-shadow text-sm font-medium text-[rgba(0,0,0,0.87)]">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                Heavy Metal Tested
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full card-shadow text-sm font-medium text-[rgba(0,0,0,0.87)]">
                <Leaf className="w-4 h-4 text-[#C9A84C]" />
                Sourcing Certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




