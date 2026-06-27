import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Minus, MessageSquare, Star, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { Product, ViewState, ActiveTab } from '../types';
import { getPrice, products } from '../data';

interface ProductDetailViewProps {
  product: Product;
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  addToCart: (productId: string, quantity?: number) => void;
  onInstantBuy: (productId: string, quantity: number) => void;
  catalogProducts?: Product[];
}

export default function ProductDetailView({
  product,
  setView,
  currency,
  addToCart,
  onInstantBuy,
  catalogProducts = products
}: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<ActiveTab>('benefits');
  
  // WhatsApp Mock Consultation State
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [userMsg, setUserMsg] = useState<string>('');
  const [chatLogs, setChatLogs] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    { 
      sender: 'ai', 
      text: `Greetings from ASRA VEDHA. I am your botanical advisor. Ask me anything about the benefits, ingredients, or suggested use of ${product.name}.`, 
      time: 'Just now' 
    }
  ]);
  const [aiTyping, setAiTyping] = useState<boolean>(false);

  const priceData = getPrice(product, currency);

  const handleQtyChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const submitChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const userText = userMsg;
    setUserMsg('');
    
    // Add user message to log
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLogs(prev => [...prev, { sender: 'user', text: userText, time: nowStr }]);
    setAiTyping(true);

    try {
      // Connect to our secure server-side proxy route `/api/consult`
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productDescription: product.description,
          productIngredients: product.ingredients,
          question: userText
        })
      });

      const data = await res.json();
      const aiResponse = data.response || "Our botanical servers are currently busy harvesting. Please check your brew and try again.";
      
      setChatLogs(prev => [...prev, { sender: 'ai', text: aiResponse, time: nowStr }]);
    } catch {
      setChatLogs(prev => [...prev, { 
        sender: 'ai', 
        text: "My neural connection was interrupted, but physically, we highly suggest mixing 1 tsp of Moringa in lukewarm copper-charged water at sunrise.", 
        time: nowStr 
      }]);
    } finally {
      setAiTyping(false);
    }
  };

  // Recommends
  const companionProducts = catalogProducts.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div className="pt-28 min-h-screen max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col">
      {/* Return link */}
      <button
        onClick={() => setView('shop')}
        className="flex items-center gap-2 text-xs text-[#C9A84C] hover:text-[#B8963C] uppercase tracking-wider font-sans font-bold cursor-pointer mb-12 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      {/* Main product visual split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left column (Image & Quality Certificates) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <motion.div 
            className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#C9A84C]/40 bg-[#FFFFFF] relative gold-glow"
            layoutId={`shop-card-${product.id}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-6 left-6 bg-[#EDEDEC]/80 backdrop-blur-md border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-mono tracking-widest px-3 py-1.5 rounded-full uppercase">
              {product.scientificBadge || 'Raw Purity'}
            </div>
          </motion.div>

          {/* Clinical Credentials Frame */}
          <div className="bg-[#E5E4E2] border border-[#C9A84C]/30 rounded-xl p-6 flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">
              Laboratory Assayed Authenticity
            </span>
            <div className="grid grid-cols-2 gap-4">
              {product.qualityTesting.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-xs text-[#6B6B6B] font-sans font-semibold">{badge}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#8C8C8C] leading-relaxed border-t border-[#C9A84C]/30 pt-3 mt-1">
              {product.qualityTesting.description}
            </p>
          </div>
        </div>

        {/* Right column (Copy & Controls) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              {product.isOrganic && (
                <span className="bg-[#C9A84C]/40 text-[#C9A84C] border border-[#C9A84C]/20 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                  Organic
                </span>
              )}
              <div className="flex items-center gap-1 text-[#C9A84C]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] text-[#8C8C8C] font-mono ml-1">4.9 (248 reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-[#2B2B2B] tracking-tight mt-1">
              {product.name}
            </h1>
            
            <p className="font-sans text-sm italic text-[#C9A84C] tracking-wide">
              {product.subheading}
            </p>
          </div>

          <div className="text-3xl font-display font-medium text-[#C9A84C] border-y border-[#C9A84C]/20 py-4 font-mono">
            {priceData.formatted}
          </div>

          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Quantity Selection */}
          <div className="flex flex-col gap-3 mt-2">
            <span className="text-xs text-[#8C8C8C] font-sans uppercase tracking-widest">Select Quantity</span>
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-[#E5E4E2] border border-[#C9A84C]/60 rounded-lg p-1">
                <button
                  onClick={() => handleQtyChange(-1)}
                  className="p-2 hover:text-[#C9A84C] transition-colors cursor-pointer text-[#6B6B6B]"
                  aria-label="Decrease discount"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm text-[#2B2B2B] font-semibold select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQtyChange(1)}
                  className="p-2 hover:text-[#C9A84C] transition-colors cursor-pointer text-[#6B6B6B]"
                  aria-label="Increase discount"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs font-mono text-[#8C8C8C]">
                Weight: {product.category === 'herbal-powders' || product.category === 'superfoods' ? '100g Standard Pack' : 'Standard Pack'}
              </span>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => {
                addToCart(product.id, quantity);
              }}
              className="border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 px-6 py-4 rounded text-xs uppercase tracking-widest font-sans font-bold transition-all cursor-pointer text-center"
            >
              Add To Cart
            </button>
            <button
              onClick={() => onInstantBuy(product.id, quantity)}
              className="bg-[#C9A84C] hover:bg-[#B8963C] text-[#2B2B2B] px-6 py-4 rounded text-xs uppercase tracking-widest font-sans font-bold transition-colors cursor-pointer text-center gold-glow"
            >
              Buy Now
            </button>
          </div>

          {/* Live Advisor Consultation Trigger */}
          <div className="mt-4">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="w-full bg-[#E5E4E2] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#C9A84C]/40 text-[#C9A84C]">
                  <MessageSquare className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider">Consult Botanical Advisor</h4>
                  <p className="text-[11px] text-[#8C8C8C] mt-0.5">Ask about ingredients, timing, and responsible use.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#C9A84C] group-hover:underline uppercase tracking-wider">
                {chatOpen ? 'Minimize' : 'Ask Now'}
              </span>
            </button>

            {/* Simulated Consultation Terminal */}
            {chatOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 bg-[#E5E4E2] border border-[#C9A84C]/40 rounded-xl p-4 flex flex-col gap-4 overflow-hidden"
              >
                {/* Simulated WhatsApp Header */}
                <div className="flex items-center justify-between border-b border-[#C9A84C]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]/500 animate-pulse"></div>
                    <span className="text-xs font-mono font-bold tracking-wider text-[#C9A84C] uppercase">WhatsApp Clinician Interface</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#8C8C8C]">Encryption: Active SSL</span>
                </div>

                {/* Message Log */}
                <div className="max-h-60 overflow-y-auto flex flex-col gap-3 pr-1 py-1">
                  {chatLogs.map((log, idx) => (
                    <div 
                      key={idx}
                      className={`flex flex-col max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                        log.sender === 'user' 
                          ? 'bg-[#E5E4E2] border border-[#C9A84C]/30 text-[#2B2B2B] self-end' 
                          : 'bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#6B6B6B] self-start'
                      }`}
                    >
                      <p>{log.text}</p>
                      <span className="text-[9px] text-[#8C8C8C] mt-1 self-end font-mono">{log.time}</span>
                    </div>
                  ))}

                  {aiTyping && (
                    <div className="bg-[#C9A84C]/15 border border-[#C9A84C]/40 rounded-xl p-3 text-xs text-[#8C8C8C] self-start animate-pulse italic">
                      Clinician is reading historical texts...
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={submitChat} className="flex gap-2 border-t border-[#C9A84C]/20 pt-3">
                  <input
                    type="text"
                    value={userMsg}
                    onChange={(e) => setUserMsg(e.target.value)}
                    placeholder="Ask about ideal times, dosages, side benefits..."
                    className="flex-grow bg-[#141413] border border-[#C9A84C]/60 text-xs rounded-lg px-3 py-2 text-[#2B2B2B] focus:outline-none focus:border-[#C9A84C]"
                  />
                  <button
                    type="submit"
                    disabled={aiTyping}
                    className="bg-[#C9A84C] text-[#C9A84C] font-sans font-bold text-xs uppercase px-4 py-2 rounded-lg hover:bg-[#B8963C] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Tab Accordion Details */}
          <div className="border border-[#C9A84C]/30 rounded-xl overflow-hidden mt-4">
            <div className="flex border-b border-[#C9A84C]/30 bg-[#E5E4E2]">
              {(['benefits', 'ingredients', 'quality'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'text-[#C9A84C] border--[#C9A84C] bg-[#FFFFFF]'
                      : 'text-[#8C8C8C] border-transparent hover:text-[#C9A84C]'
                  }`}
                >
                  {tab === 'benefits' ? 'The Benefits' : tab === 'ingredients' ? 'Ingredients' : 'Testing Log'}
                </button>
              ))}
            </div>

            <div className="p-6 bg-[#FFFFFF]">
              <AnimatePresence mode="wait">
                {activeTab === 'benefits' && (
                  <motion.div
                    key="benefits"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="p-1.5 rounded bg-[#C9A84C]/10 text-[#C9A84C] mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider">{benefit.title}</h4>
                          <p className="text-xs text-[#8C8C8C] mt-1 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'ingredients' && (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="text-xs font-mono font-bold text-[#C9A84C] uppercase">Active Formula</div>
                    <p className="text-xs font-sans text-[#2B2B2B] font-semibold">{product.ingredients}</p>
                    <div className="w-full h-[1px] bg-[#C9A84C]/20 my-2"></div>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed">{product.ingredientsDetail}</p>
                  </motion.div>
                )}

                {activeTab === 'quality' && (
                  <motion.div
                    key="quality"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#EDEDEC] px-2.5 py-1 text-[9px] font-mono text-[#C9A84C] border border-[#C9A84C]/20 rounded uppercase">Certificate of Analysis: #AV-2026-X</span>
                      <span className="bg-[#EDEDEC] px-2.5 py-1 text-[9px] font-mono text-[#C9A84C] border border-[#C9A84C]/20 rounded uppercase">Standard HPLC HPLC Grade</span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      Assayed completely by independent certified third-party testing centers. Results guarantee absence of heavy metals down to 0.001 parts per billion, with zero synthetic fillers, talcs, or moisture accelerators.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Companion Rituals Recommendations */}
      <section className="mt-24 border-t border-[#C9A84C]/30 pt-16 mb-12">
        <h3 className="font-display text-2xl text-[#2B2B2B] mb-8 tracking-tight text-center">Related Wellness Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {companionProducts.map((companion) => {
            const compPrice = getPrice(companion, currency);
            return (
              <div 
                key={companion.id}
                onClick={() => {
                  setView('shop');
                  setTimeout(() => {
                    setView('product-details');
                    // We'll update the target product globally
                    const clickEvent = new CustomEvent('change-active-product', { detail: companion.id });
                    window.dispatchEvent(clickEvent);
                  }, 100);
                }}
                className="bg-[#E5E4E2] border border-[#C9A84C]/20 rounded-xl p-4 flex gap-4 hover:border-[#C9A84C]/40 transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EDEDEC]">
                  <img src={companion.image} alt={companion.name} className="w-full h-full object-cover group-hover:scale-104 transition-transform" />
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <h4 className="text-sm font-display text-[#2B2B2B] group-hover:text-[#C9A84C] transition-colors font-semibold">{companion.name}</h4>
                  <p className="text-xs text-[#8C8C8C] mt-0.5 line-clamp-1">{companion.subheading}</p>
                  <span className="text-xs font-mono text-[#C9A84C] mt-1">{compPrice.formatted}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}




