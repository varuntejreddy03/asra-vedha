import { ArrowRight, Award, CheckCircle2, ClipboardCheck, FlaskConical, Leaf, PackageCheck, SearchCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types';

interface QualityViewProps {
  setView: (view: ViewState) => void;
}

const processSteps = [
  {
    title: 'Raw Material Selection',
    text: 'Herbs are shortlisted by source, freshness, aroma, and visible purity before entering production.',
    icon: Leaf
  },
  {
    title: 'Quality Inspection',
    text: 'Each batch is checked for physical quality, moisture risk, and supplier documentation.',
    icon: SearchCheck
  },
  {
    title: 'Processing & Packaging',
    text: 'Ingredients are cleaned, dried, milled, blended, and packed with controlled handling practices.',
    icon: PackageCheck
  },
  {
    title: 'Quality Control',
    text: 'Product lots are reviewed against internal standards before stock is approved for sale.',
    icon: ClipboardCheck
  },
  {
    title: 'Premium Delivery',
    text: 'Finished products move through protected storage and order dispatch with traceable records.',
    icon: ShieldCheck
  }
];

const pillars = [
  ['Sourcing', 'Selected herbs from trusted farming and supplier networks.'],
  ['Testing', 'Batch-level purity checks for clean-label wellness confidence.'],
  ['Processing', 'Careful drying, milling, blending, and handling standards.'],
  ['Packaging', 'Product-safe packing designed to protect aroma, color, and freshness.']
];

const testingItems = [
  'Moisture and freshness checks',
  'Heavy metal screening plan',
  'Microbial safety review',
  'No synthetic color or artificial filler policy',
  'Batch code traceability',
  'Supplier and production documentation'
];

const certifications = [
  ['FSSAI', 'Food safety license and compliant labeling before launch.'],
  ['GMP', 'Good manufacturing practice workflow target.'],
  ['ISO', 'Quality management alignment for scale.'],
  ['Organic', 'Organic certification placeholders for eligible products.']
];

export default function QualityView({ setView }: QualityViewProps) {
  return (
    <div className="min-h-screen bg-[#1A0F00] text-[#F5E4B0] pt-24">
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28 border-b border-[#C4A042]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.14),transparent_34%),linear-gradient(135deg,rgba(31,77,54,0.34),transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#C4A042] font-bold">Quality & Certifications</span>
            <h1 className="font-display text-4xl md:text-6xl text-[#f8f5ef] leading-tight mt-5">
              Uncompromising Quality
            </h1>
            <p className="font-sans text-base md:text-lg text-[#d1c5b4] leading-relaxed max-w-2xl mt-5">
              ASRA VEDHA products are built around clean ingredients, disciplined processing, transparent batch records, and practical safety checks before they reach customers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 bg-[#3D2600]/80 border border-[#C4A042]/20 rounded-xl p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4">
              {['Lab Tested', 'Natural', 'Traceable', 'Premium'].map((label) => (
                <div key={label} className="bg-[#1A0F00] border border-[#C4A042]/40 rounded-lg p-5">
                  <Award className="w-6 h-6 text-[#C4A042] mb-4" />
                  <p className="font-sans text-xs uppercase tracking-[0.16em] text-[#d1c5b4]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C4A042] font-bold">Our Process</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">From Herb Selection to Premium Delivery</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative bg-[#2D1A00] border border-[#C4A042]/35 hover:border-[#C4A042]/45 rounded-lg p-6 min-h-[220px]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-[#24523a]/45 text-[#a0d2b3] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-[#C4A042]">0{index + 1}</span>
                </div>
                <h3 className="font-display text-xl text-[#f8f5ef]">{step.title}</h3>
                <p className="font-sans text-sm text-[#9a8f80] leading-relaxed mt-3">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#151515] border-y border-[#C4A042]/25 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C4A042] font-bold">Quality Pillars</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Four controls that keep products consistent.</h2>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(([title, text]) => (
              <div key={title} className="bg-[#3D2600] border border-[#C4A042]/30 rounded-lg p-6">
                <CheckCircle2 className="w-5 h-5 text-[#C4A042] mb-4" />
                <h3 className="font-display text-xl text-[#f8f5ef]">{title}</h3>
                <p className="font-sans text-sm text-[#9a8f80] leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 bg-[#1f4d36] rounded-lg p-8">
          <FlaskConical className="w-8 h-8 text-[#C4A042] mb-6" />
          <h2 className="font-display text-3xl text-[#f8f5ef]">Lab Testing Roadmap</h2>
          <p className="font-sans text-sm text-[#e8f0e9] leading-relaxed mt-4">
            Every batch should move through documented quality checks before sale. This keeps the website, admin records, and product labels aligned.
          </p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testingItems.map((item) => (
            <div key={item} className="flex items-center gap-3 bg-[#2D1A00] border border-[#C4A042]/25 rounded-lg p-4">
              <CheckCircle2 className="w-4 h-4 text-[#a0d2b3] shrink-0" />
              <span className="font-sans text-sm text-[#d1c5b4]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map(([title, text]) => (
            <div key={title} className="bg-[#1A0F00] border border-[#C4A042]/25 rounded-lg p-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full border border-[#C4A042]/40 flex items-center justify-center text-[#C4A042] font-display text-xl">
                {title.slice(0, 2)}
              </div>
              <h3 className="font-sans text-sm text-[#f8f5ef] font-bold mt-5">{title}</h3>
              <p className="font-sans text-xs text-[#9a8f80] leading-relaxed mt-2">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#3D2600] border border-[#C4A042]/25 rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-[#f8f5ef]">Explore products made with a quality-first mindset.</h2>
            <p className="font-sans text-sm text-[#9a8f80] mt-2">Review the current wellness collection and product-level testing badges.</p>
          </div>
          <button
            onClick={() => setView('shop')}
            className="bg-[#C4A042] text-[#1A0F00] hover:bg-[#d4b052] px-6 py-3 rounded text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            View Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

