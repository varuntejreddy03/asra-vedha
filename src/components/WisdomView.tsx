/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Droplet, Scale, RefreshCw, Sprout, ArrowRight, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface WisdomViewProps {
  setView: (view: ViewState) => void;
}

export default function WisdomView({ setView }: WisdomViewProps) {
  return (
    <div className="bg-[#1A0F00] text-[#F5E4B0] min-h-screen pt-12">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-12 text-center bg-radial-[circle_at_top_right] from-[#1a2421] via-[#1A0F00] to-[#1A0F00]">
        {/* Background Image Overlay with lowered opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611077544955-8bd5b0eb8151?auto=format&fit=crop&q=80')` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] md:text-xs text-[#C4A042] mb-6 uppercase tracking-[0.25em]"
          >
            The Genesis • Asra Vedha Apothecary
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-medium text-4xl md:text-6xl text-[#F5E4B0] mb-8 leading-[1.15] tracking-tight"
          >
            Rooted in Nature,<br />
            <span className="text-[#C4A042] italic">Crafted for Wisdom.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#d1c5b4] max-w-2xl leading-relaxed mb-12"
          >
            Discover the sanctuary where ancient Ayurvedic traditions meet the absolute precision of modern botanical science. A journey back to the uncontaminated origins of cellular vitality.
          </motion.p>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-4 text-[#C4A042]/50"
          >
            <div className="w-16 h-px bg-[#C4A042]/50"></div>
            <Sprout className="w-5 h-5 text-[#C4A042]" />
            <div className="w-16 h-px bg-[#C4A042]/50"></div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Brand Image left column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-[#C4A042]/10 blur-2xl rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img 
              alt="Artisanal glass flask and golden botanical drops" 
              className="w-full h-auto aspect-[4/5] object-cover rounded-md filter contrast-115 brightness-90 relative z-10 border border-[#C4A042]/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbWDffIlzMfK51LCLqaVUMrvPdLxxU7RRdKo4mZDGppa1dehXsuD4Yh5wimwqV18DVao8rHMJbQfT0iO4LL688D_QPSi2W-bKrpqn-oWxTD4bo0oFLU4TDt-eI25kgXEtsOwyMCTQ3O2CTh-aJWr2WWq431ymFiASP-FkZbsgnC0k3pDJAEK333GHj0Nd-1BfrMJ1zN5PdY6JXVwuMMq3fjIHRuanYmog77QWuDbxZeE__fWVAzyrhNC5v00ljIHLm-9zgonX4_XQ"
            />
          </motion.div>

          {/* Core Story right column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            <span className="text-[#C4A042] text-xs font-mono tracking-widest uppercase mb-4">THE CHRONICLES OF VEDHA</span>
            <h2 className="font-display text-3xl md:text-5xl text-[#F5E4B0] mb-6 leading-tight">
              The Wisdom of <br />
              <span className="text-[#C4A042] font-semibold italic">Asra Vedha</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-[#d1c5b4] leading-relaxed mb-6">
              Born from a lineage of expert healers and modern botanists, Asra Vedha is a testament to the enduring power of nature. We do not merely create commodities; we curate deep sensory rituals that honor the complex bio-energetic balance of the human body and spirit.
            </p>
            <p className="font-sans text-sm text-[#9a8f80] leading-relaxed mb-8">
              Our apothecary merges the meticulous chemical safety of modern cold-press extractions with the soul-nourishing philosophy of classical Ayurveda. Every root, every pristine leaf, and every drop of solarized flower oil has a journey of absolute purity, crafted to optimize health and expand longevity.
            </p>
            <button 
              onClick={() => setView('shop')}
              className="self-start border border-[#C4A042] text-[#C4A042] px-8 py-3.5 rounded text-xs uppercase tracking-widest font-mono font-medium hover:bg-[#C4A042]/10 transition-colors duration-300 cursor-pointer"
            >
              Enter Apothecary
            </button>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Pillars section */}
      <section className="py-20 bg-[#151515] border-y border-[#C4A042]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[#9a8f80] text-xs font-mono tracking-widest uppercase mb-2 block">OUR CONSTITUTION</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#F5E4B0]">Pillars of Practice</h2>
            <p className="font-sans text-xs md:text-sm text-[#9a8f80] max-w-xl mx-auto mt-4 leading-relaxed">
              The unyielding holistic principles that guide every organic formulation, harvest schedule, and extraction protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Purity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#2D1A00] p-8 md:p-10 rounded border border-[#C4A042]/10 hover:border-[#C4A042]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C4A042]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Droplet className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#24523a]/40 text-[#a0d2b3] flex items-center justify-center mb-8">
                <Droplet className="w-5 h-5 text-[#a0d2b3] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C4A042] mb-4">Uncompromised Purity</h3>
              <p className="font-sans text-xs md:text-sm text-[#d1c5b4] leading-relaxed relative z-10">
                Sourced at sunrise from the earth's most untainted mineral soils. We reject heavy metals, synthetics, and binders, ensuring molecular bio-availability remains undisturbed.
              </p>
            </motion.div>

            {/* Value 2: Integrity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#2D1A00] p-8 md:p-10 rounded border border-[#C4A042]/10 hover:border-[#C4A042]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C4A042]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Scale className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#24523a]/40 text-[#a0d2b3] flex items-center justify-center mb-8">
                <Scale className="w-5 h-5 text-[#a0d2b3] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C4A042] mb-4">Scientific Integrity</h3>
              <p className="font-sans text-xs md:text-sm text-[#d1c5b4] leading-relaxed relative z-10">
                Double-blind research meets traditional texts. Every batch is certified for high active-ingredient biomarkers, guaranteeing clinical strength, wellness, and peace of mind.
              </p>
            </motion.div>

            {/* Value 3: Sustainability */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#2D1A00] p-8 md:p-10 rounded border border-[#C4A042]/10 hover:border-[#C4A042]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C4A042]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <RefreshCw className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#24523a]/40 text-[#a0d2b3] flex items-center justify-center mb-8">
                <RefreshCw className="w-5 h-5 text-[#a0d2b3] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C4A042] mb-4">Luna Stewardship</h3>
              <p className="font-sans text-xs md:text-sm text-[#d1c5b4] leading-relaxed relative z-10">
                Responsible sourcing, clean processing, and recyclable packaging choices guide each ASRA VEDHA wellness product.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farmer Support / Sourcing details */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-[#2D1A00] rounded-lg overflow-hidden border border-[#C4A042]/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
              <span className="px-3.5 py-1 bg-[#24523a]/40 text-[#a0d2b3] text-[9px] font-mono uppercase tracking-[0.2em] rounded-full self-start mb-6">
                ETHICAL MOLECULAR SOURCING
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#F5E4B0] mb-6 leading-tight">
                Nurturing the Roots
              </h2>
              <p className="font-sans text-sm text-[#d1c5b4] leading-relaxed mb-6">
                Our profound connection to the soil is facilitated entirely by the artisan hands that harvest it. We partner directly with indigenous Indian farming collectives across Sub-Himalayan and coastal plains, guaranteeing fair wages, safe conditions, and the legacy of ancestral horticulture.
              </p>
              <p className="font-sans text-xs text-[#9a8f80] leading-relaxed">
                By investing in regional sustainable agriculture, we support local farmers and keep ingredients like moringa, amla, turmeric, and ashwagandha traceable for future growth.
              </p>
            </div>
            <div className="relative min-h-[300px] lg:min-h-auto">
              <img 
                alt="Beautiful terraced green farms of India" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx-LgBF56CMlttPAHdyGKQ6DIcP2uVQHDicXhv6XrmLzDac-DEK5jUD9WpXXjpsx-1Z9KgtNytZCJ-MWl1IBt7uTKv9IiD-PgY_-Wt4WF_WE2e_Ujy2BNV6OxbplYdQdlqGW-AxyrrcZfBjkz5hIXZc95zr5tTBqrajHZU7UZc39vqZhP5YfYpljXLwlMaWRDH6f2MBOoy54Zx9mSgufQJnfz3KskLClylwXq1yAgkrhODu9vwiwWRMlXj7W5KhKpLFcAlO7wXnSE"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#2D1A00] via-[#2D1A00]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 text-center bg-gradient-to-b from-[#1A0F00] to-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595180424578-831518f8e70d?auto=format&fit=crop&q=80')` }}></div>
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <Compass className="w-10 h-10 text-[#C4A042] mb-6 animate-pulse" />
          <h2 className="font-display text-3xl md:text-4xl text-[#C4A042] mb-6">Begin Your Organic Journey</h2>
          <p className="font-sans text-sm md:text-base text-[#d1c5b4] mb-10 leading-relaxed">
            Experience the profound, sensory alignment of our premium, small-batch luxury botanicals. Craft a personalized sanctuary ritual.
          </p>
          <button 
            onClick={() => setView('shop')}
            className="bg-[#C4A042] hover:bg-[#d4b052] text-[#1A0F00] px-8 py-4 rounded text-xs font-mono font-bold uppercase tracking-widest transition-all hover:scale-95 duration-300 inline-flex items-center gap-3 cursor-pointer shadow-lg shadow-[#C4A042]/10"
          >
            Explore the Apothecary Selection
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

