import { ArrowRight, Boxes, HandHeart, Leaf, PackageCheck, Recycle, Sprout, SunMedium, Trees } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types';

interface SustainabilityViewProps {
  setView: (view: ViewState) => void;
}

const commitments = [
  {
    title: 'Supporting Local Farmers',
    text: 'Build long-term supplier relationships that respect farming effort, regional knowledge, and fair growth.',
    icon: HandHeart
  },
  {
    title: 'Sustainable Sourcing',
    text: 'Prefer traceable herbs and raw materials selected for quality, availability, and responsible supply.',
    icon: Sprout
  },
  {
    title: 'Eco-conscious Packaging',
    text: 'Move toward recyclable, product-safe packaging that protects freshness without unnecessary waste.',
    icon: PackageCheck
  },
  {
    title: 'Natural Wellness',
    text: 'Keep formulations focused on recognizable botanicals, clean labels, and practical daily routines.',
    icon: Leaf
  },
  {
    title: 'Reducing Impact',
    text: 'Improve storage, production planning, and shipping decisions as the business scales.',
    icon: Recycle
  }
];

const futureGoals = [
  ['Phase 1', 'Supplier traceability records for priority herbs.'],
  ['Phase 2', 'Packaging review for recyclable jars, pouches, and labels.'],
  ['Phase 3', 'Farmer partnership stories across product pages.'],
  ['Phase 4', 'Waste reduction reporting for production and dispatch.']
];

export default function SustainabilityView({ setView }: SustainabilityViewProps) {
  return (
    <div className="min-h-screen bg-[#EDEDEC] text-[#2B2B2B] pt-24">
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28 bg-gradient-to-br from-[#1f4d36] via-[#EDEDEC] to-[#EDEDEC]">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,#C9A84C_1px,transparent_1px),linear-gradient(60deg,#e8f0e9_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#C9A84C] font-bold">Sustainability</span>
            <h1 className="font-display text-4xl md:text-6xl text-[#f8f5ef] leading-tight mt-5">
              Rooted in Responsibility
            </h1>
            <p className="font-sans text-base md:text-lg text-[#e8f0e9] leading-relaxed max-w-2xl mt-5">
              ASRA VEDHA is building a wellness brand that respects farms, ingredients, packaging, and the people who choose natural nutrition every day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 bg-[#EDEDEC]/70 border border-[#C9A84C]/25 rounded-xl p-8"
          >
            <Trees className="w-12 h-12 text-[#C9A84C] mb-8" />
            <p className="font-display text-3xl text-[#f8f5ef] leading-tight">Good wellness should leave better systems behind.</p>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mt-4">
              The sustainability roadmap starts with honest sourcing, practical packaging, and visible accountability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C] font-bold">Our Commitment</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">Five promises guiding the brand.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="bg-[#E5E4E2] border border-[#C9A84C]/35 hover:border-[#C9A84C]/45 rounded-lg p-6"
              >
                <div className="w-11 h-11 rounded-full bg-[#C9A84C]/45 text-[#C9A84C] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#f8f5ef]">{item.title}</h3>
                <p className="font-sans text-sm text-[#8C8C8C] leading-relaxed mt-3">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#151515] border-y border-[#C9A84C]/25 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-[#C9A84C]/25 bg-[#FFFFFF]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Green farm landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C] font-bold">Farmer Partnership Story</span>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mt-4">
              Better products begin with better relationships.
            </h2>
            <p className="font-sans text-sm md:text-base text-[#6B6B6B] leading-relaxed mt-6">
              As ASRA VEDHA grows, the sourcing system should make farmer and supplier relationships visible. This means product records, batch traceability, and honest stories about where key ingredients come from.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                ['Traceability', 'Batch and supplier records.'],
                ['Fair Growth', 'Responsible purchase planning.'],
                ['Ingredient Respect', 'Careful handling from farm to pack.']
              ].map(([title, text]) => (
                <div key={title} className="bg-[#FFFFFF] border border-[#C9A84C]/30 rounded-lg p-5">
                  <SunMedium className="w-5 h-5 text-[#C9A84C] mb-4" />
                  <h3 className="font-sans text-xs uppercase tracking-[0.14em] text-[#f8f5ef] font-bold">{title}</h3>
                  <p className="font-sans text-xs text-[#8C8C8C] mt-2 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C] font-bold">Future Goals</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">A practical roadmap for responsible scale.</h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {futureGoals.map(([phase, text]) => (
              <div key={phase} className="bg-[#E5E4E2] border border-[#C9A84C]/30 rounded-lg p-5 flex gap-5 items-start">
                <div className="w-16 shrink-0 text-[#C9A84C] font-mono text-xs uppercase tracking-widest">{phase}</div>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1f4d36] rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <Boxes className="w-7 h-7 text-[#C9A84C] mb-5" />
            <h2 className="font-display text-3xl text-[#f8f5ef]">Partner with a responsible wellness brand.</h2>
            <p className="font-sans text-sm text-[#e8f0e9] mt-2">Distributor and export conversations can start with the ASRA VEDHA team.</p>
          </div>
          <button
            onClick={() => setView('contact')}
            className="bg-[#C9A84C] text-[#2B2B2B] hover:bg-[#B8963C] px-6 py-3 rounded text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}




