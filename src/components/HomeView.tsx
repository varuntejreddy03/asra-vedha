import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { Product, ViewState } from '../types';
import { products, getPrice } from '../data';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  onSelectProduct: (productId: string) => void;
  addToCart: (productId: string) => void;
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

  // Secondary highlights from the screens matching list
  const lifestyleImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmkJGY-JEjEX2Z3OLf-18urLVmD_X3g-ahqM1AG7-iw-f6-9xrsJ5IJu-4TmNXmtU45cwlHpZTeNIXmbvV57rbsjsWL-sbVJQNyxd8gGR02JjhDPeZDh7kPChhj8heohZ1M6QroKgDfBfUsYgGLgv7dTLydtWso4-qvaquLalut9tD48JTl7Y9AGfqnzUDgsx_17nctsESUS-I2-eXmbyyLHGXN7rN5s0wwTzuXyT0DAb4hUAsbNK3wdT3p-Fk2Dl4vSzyWdP2Ww';

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      {/* Editorial Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Copy (Left) */}
        <motion.div 
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#C8A45D]" />
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C8A45D] font-semibold">
              PREMIUM AYURVEDIC WELLNESS
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#e5e2e1] leading-[1.1] tracking-tight">
            Premium Herbal Wellness <span className="italic block font-serif text-[#e8c177] mt-1">Inspired by Nature.</span>
          </h1>
          
          <p className="font-sans text-base md:text-lg text-[#d1c5b4] leading-relaxed max-w-xl">
            Empowering healthier lifestyles through premium herbal nutrition, superfoods, and natural wellness products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => setView('shop')}
              className="bg-[#c8a45d] hover:bg-[#ffdea3] text-[#261900] px-8 py-4 rounded text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2 gold-glow"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('contact')}
              className="border border-[#e8c177]/40 hover:border-[#e8c177] text-[#e8c177] px-8 py-4 rounded text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center"
            >
              Become a Distributor
            </button>
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-[#4d4639]/30 pt-8 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#e8c177] font-display text-lg font-bold">100%</span>
              <span className="text-xs text-[#9a8f80]">Natural</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#e8c177] font-display text-lg font-bold">Lab</span>
              <span className="text-xs text-[#9a8f80]">Tested</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#e8c177] font-display text-lg font-bold">Farmer</span>
              <span className="text-xs text-[#9a8f80]">Supported</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Collage (Right) */}
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Main Hero Shot Framed Elegantly */}
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#c8a45d]/30 bg-[#1e1e1e] shadow-2xl relative gold-glow">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkNJkPV88HZ_Lb-4ByRf-TuzlzegoMXXHtSYtL2KRW0k9B_6i45beE3EX8sNSZXd6sg7dl1sSF3sG-NjrGolpptCLuuqp8mTc53Eu5c6kXRus6X-V6fTKAlvImdnRvJb3DsSH3JAIQd0PJZIpnIWWEspRAKzXhoTLE7rvTbH3mvK3CEIxOb0x012YhZ_lugd_bfu7kBHkLCPvn491O8SZzMSsi-JWdcnKeLaSZG4ONAirWheRYk_HiLcPOlFYSeJNfOp0K5i-miqw" 
              alt="Artisanal Moringa Powder on Dark Wood" 
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent"></div>
            
            {/* Visual float badge */}
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-[#111111]/70 border border-[#e8c177]/20 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#e8c177] block mb-0.5">Special Release</span>
                <span className="font-display text-sm font-semibold text-[#e5e2e1]">Moringa Powder</span>
              </div>
              <button 
                onClick={() => onSelectProduct('moringa-powder')}
                className="text-[#e8c177] hover:text-[#ffdea3] text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                View
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="text-xs text-[#e8c177] hover:text-[#ffdea3] font-sans font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Add To Cart
                      </button>
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
