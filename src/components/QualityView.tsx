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
    <div className="min-h-screen bg-[#EDEDEC] text-[rgba(0,0,0,0.87)] pt-24">
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28 border-b border-[rgba(0,0,0,0.06)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.14),transparent_34%),linear-gradient(135deg,rgba(31,77,54,0.34),transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#C9A84C] font-bold">Quality & Certifications</span>
            <h1 className="font-display text-4xl md:text-6xl text-[rgba(0,0,0,0.87)] leading-tight mt-5">
              Uncompromising Quality
            </h1>
            <p className="font-sans text-base md:text-lg text-[rgba(0,0,0,0.58)] leading-relaxed max-w-2xl mt-5">
              Asra Vedha products are built around clean ingredients, disciplined processing, transparent batch records, and practical safety checks before they reach customers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 bg-white/80 rounded-xl card-shadow p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4">
              {['Lab Tested', 'Natural', 'Traceable', 'Premium'].map((label) => (
                <div key={label} className="bg-[#EDEDEC] border border-[#C9A84C]/40 rounded-lg p-5">
                  <Award className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <p className="font-sans text-xs uppercase tracking-[0.16em] text-[rgba(0,0,0,0.58)]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C] font-bold">Our Process</span>
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
                className="relative bg-[#f2f0eb] border border-[#C9A84C]/35 hover:border-[#C9A84C]/45 rounded-lg p-6 min-h-[220px]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-[#C9A84C]/45 text-[#C9A84C] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-[#C9A84C]">0{index + 1}</span>
                </div>
                <h3 className="font-display text-xl text-[rgba(0,0,0,0.87)]">{step.title}</h3>
                <p className="font-sans text-sm text-[rgba(0,0,0,0.38)] leading-relaxed mt-3">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f2f0eb] border-y border-[#C9A84C]/25 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C] font-bold">Quality Pillars</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Four controls that keep products consistent.</h2>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(([title, text]) => (
              <div key={title} className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-6">
                <CheckCircle2 className="w-5 h-5 text-[#C9A84C] mb-4" />
                <h3 className="font-display text-xl text-[rgba(0,0,0,0.87)]">{title}</h3>
                <p className="font-sans text-sm text-[rgba(0,0,0,0.38)] leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 bg-white card-shadow rounded-lg p-8">
          <FlaskConical className="w-8 h-8 text-[#C9A84C] mb-6" />
          <h2 className="font-display text-3xl text-[rgba(0,0,0,0.87)]">Lab Testing Roadmap</h2>
          <p className="font-sans text-sm text-[rgba(0,0,0,0.58)] leading-relaxed mt-4">
            Every batch should move through documented quality checks before sale. This keeps the website, admin records, and product labels aligned.
          </p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testingItems.map((item) => (
            <div key={item} className="flex items-center gap-3 bg-[#f2f0eb] border border-[#C9A84C]/25 rounded-lg p-4">
              <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" />
              <span className="font-sans text-sm text-[rgba(0,0,0,0.58)]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map(([title, text]) => (
            <div key={title} className="bg-[#EDEDEC] border border-[#C9A84C]/25 rounded-lg p-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] font-display text-xl">
                {title.slice(0, 2)}
              </div>
              <h3 className="font-sans text-sm text-[rgba(0,0,0,0.87)] font-bold mt-5">{title}</h3>
              <p className="font-sans text-xs text-[rgba(0,0,0,0.38)] leading-relaxed mt-2">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white border border-[#C9A84C]/25 rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-[rgba(0,0,0,0.87)]">Explore products made with a quality-first mindset.</h2>
            <p className="font-sans text-sm text-[rgba(0,0,0,0.38)] mt-2">Review the current wellness collection and product-level testing badges.</p>
          </div>
          <button
            onClick={() => setView('shop')}
            className="bg-[#C9A84C] text-white hover:bg-[#B8963C] px-6 py-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            View Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}












