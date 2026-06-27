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
    <div className="bg-[#EDEDEC] text-[rgba(0,0,0,0.87)] min-h-screen pt-12">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-12 text-center bg-[#EDEDEC]">
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
            className="font-mono text-[10px] md:text-xs text-[#C9A84C] mb-6 uppercase tracking-[0.25em]"
          >
            The Genesis • Asra Vedha Apothecary
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-medium text-4xl md:text-6xl text-[rgba(0,0,0,0.87)] mb-8 leading-[1.15] tracking-tight"
          >
            Rooted in Nature,<br />
            <span className="text-[#C9A84C] italic">Crafted for Wisdom.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[rgba(0,0,0,0.58)] max-w-2xl leading-relaxed mb-12"
          >
            Discover the sanctuary where ancient Ayurvedic traditions meet the absolute precision of modern botanical science. A journey back to the uncontaminated origins of cellular vitality.
          </motion.p>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-4 text-[#C9A84C]/50"
          >
            <div className="w-16 h-px bg-[#C9A84C]/50"></div>
            <Sprout className="w-5 h-5 text-[#C9A84C]" />
            <div className="w-16 h-px bg-[#C9A84C]/50"></div>
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
            <div className="absolute -inset-4 bg-[#C9A84C]/10 blur-2xl rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img 
              alt="Artisanal glass flask and golden botanical drops" 
              className="w-full h-auto aspect-[4/5] object-cover rounded-md filter contrast-115 brightness-90 relative z-10 border border-[rgba(0,0,0,0.06)]"
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
            <span className="text-[#C9A84C] text-xs font-mono tracking-widest uppercase mb-4">THE CHRONICLES OF VEDHA</span>
            <h2 className="font-display text-3xl md:text-5xl text-[rgba(0,0,0,0.87)] mb-6 leading-tight">
              The Wisdom of <br />
              <span className="text-[#C9A84C] font-semibold italic">Asra Vedha</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-[rgba(0,0,0,0.58)] leading-relaxed mb-6">
              Born from a lineage of expert healers and modern botanists, Asra Vedha is a testament to the enduring power of nature. We do not merely create commodities; we curate deep sensory rituals that honor the complex bio-energetic balance of the human body and spirit.
            </p>
            <p className="font-sans text-sm text-[rgba(0,0,0,0.38)] leading-relaxed mb-8">
              Our apothecary merges the meticulous chemical safety of modern cold-press extractions with the soul-nourishing philosophy of classical Ayurveda. Every root, every pristine leaf, and every drop of solarized flower oil has a journey of absolute purity, crafted to optimize health and expand longevity.
            </p>
            <button 
              onClick={() => setView('shop')}
              className="self-start border border-[#C9A84C] text-[#C9A84C] px-8 py-3.5 rounded-full text-sm font-mono font-medium hover:bg-[#C9A84C]/10 transition-colors duration-300 cursor-pointer"
            >
              Enter Apothecary
            </button>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Pillars section */}
      <section className="py-20 bg-[#f2f0eb] border-y border-[#C9A84C]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[rgba(0,0,0,0.38)] text-xs font-mono tracking-widest uppercase mb-2 block">OUR CONSTITUTION</span>
            <h2 className="font-display text-3xl md:text-4xl text-[rgba(0,0,0,0.87)]">Pillars of Practice</h2>
            <p className="font-sans text-xs md:text-sm text-[rgba(0,0,0,0.38)] max-w-xl mx-auto mt-4 leading-relaxed">
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
              className="bg-[#f2f0eb] p-8 md:p-10 rounded border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C9A84C]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Droplet className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center mb-8">
                <Droplet className="w-5 h-5 text-[#C9A84C] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C9A84C] mb-4">Uncompromised Purity</h3>
              <p className="font-sans text-xs md:text-sm text-[rgba(0,0,0,0.58)] leading-relaxed relative z-10">
                Sourced at sunrise from the earth's most untainted mineral soils. We reject heavy metals, synthetics, and binders, ensuring molecular bio-availability remains undisturbed.
              </p>
            </motion.div>

            {/* Value 2: Integrity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#f2f0eb] p-8 md:p-10 rounded border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C9A84C]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Scale className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center mb-8">
                <Scale className="w-5 h-5 text-[#C9A84C] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C9A84C] mb-4">Scientific Integrity</h3>
              <p className="font-sans text-xs md:text-sm text-[rgba(0,0,0,0.58)] leading-relaxed relative z-10">
                Double-blind research meets traditional texts. Every batch is certified for high active-ingredient biomarkers, guaranteeing clinical strength, wellness, and peace of mind.
              </p>
            </motion.div>

            {/* Value 3: Sustainability */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#f2f0eb] p-8 md:p-10 rounded border border-[#C9A84C]/10 hover:border-[#C9A84C]/40 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -right-6 text-[#C9A84C]/5 opacity-10 group-hover:opacity-20 transition-opacity">
                <RefreshCw className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center mb-8">
                <RefreshCw className="w-5 h-5 text-[#C9A84C] stroke-[1.8]" />
              </div>
              <h3 className="font-display text-xl text-[#C9A84C] mb-4">Luna Stewardship</h3>
              <p className="font-sans text-xs md:text-sm text-[rgba(0,0,0,0.58)] leading-relaxed relative z-10">
                Responsible sourcing, clean processing, and recyclable packaging choices guide each ASRA VEDHA wellness product.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farmer Support / Sourcing details */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-[#f2f0eb] rounded-lg overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
              <span className="px-3.5 py-1 bg-[#C9A84C]/40 text-[#C9A84C] text-[9px] font-mono uppercase tracking-[0.2em] rounded-full self-start mb-6">
                ETHICAL MOLECULAR SOURCING
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[rgba(0,0,0,0.87)] mb-6 leading-tight">
                Nurturing the Roots
              </h2>
              <p className="font-sans text-sm text-[rgba(0,0,0,0.58)] leading-relaxed mb-6">
                Our profound connection to the soil is facilitated entirely by the artisan hands that harvest it. We partner directly with indigenous Indian farming collectives across Sub-Himalayan and coastal plains, guaranteeing fair wages, safe conditions, and the legacy of ancestral horticulture.
              </p>
              <p className="font-sans text-xs text-[rgba(0,0,0,0.38)] leading-relaxed">
                By investing in regional sustainable agriculture, we support local farmers and keep ingredients like moringa, amla, turmeric, and ashwagandha traceable for future growth.
              </p>
            </div>
            <div className="relative min-h-[300px] lg:min-h-auto">
              <img 
                alt="Beautiful terraced green farms of India" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx-LgBF56CMlttPAHdyGKQ6DIcP2uVQHDicXhv6XrmLzDac-DEK5jUD9WpXXjpsx-1Z9KgtNytZCJ-MWl1IBt7uTKv9IiD-PgY_-Wt4WF_WE2e_Ujy2BNV6OxbplYdQdlqGW-AxyrrcZfBjkz5hIXZc95zr5tTBqrajHZU7UZc39vqZhP5YfYpljXLwlMaWRDH6f2MBOoy54Zx9mSgufQJnfz3KskLClylwXq1yAgkrhODu9vwiwWRMlXj7W5KhKpLFcAlO7wXnSE"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#E5E4E2] via-[#E5E4E2]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 text-center bg-[#f2f0eb] relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595180424578-831518f8e70d?auto=format&fit=crop&q=80')` }}></div>
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <Compass className="w-10 h-10 text-[#C9A84C] mb-6 animate-pulse" />
          <h2 className="font-display text-3xl md:text-4xl text-[#C9A84C] mb-6">Begin Your Organic Journey</h2>
          <p className="font-sans text-sm md:text-base text-[rgba(0,0,0,0.58)] mb-10 leading-relaxed">
            Experience the profound, sensory alignment of our premium, small-batch luxury botanicals. Craft a personalized sanctuary ritual.
          </p>
          <button 
            onClick={() => setView('shop')}
            className="bg-[#C9A84C] hover:bg-[#B8963C] text-white px-8 py-4 rounded-full text-sm font-sans font-semibold transition-all hover:scale-95 duration-300 inline-flex items-center gap-3 cursor-pointer shadow-lg shadow-[#C9A84C]/10"
          >
            Explore the Apothecary Selection
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}










