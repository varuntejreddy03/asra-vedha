import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';

const businessHours = [
  ['Monday-Friday', '9:00 AM - 6:30 PM'],
  ['Saturday', '9:00 AM - 1:00 PM'],
  ['Sunday', 'Holiday']
];

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Enquiry',
    message: ''
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const isDistributor = formData.subject === 'Distributor Enquiry';
      const response = await fetch(isDistributor ? '/api/enquiry/distributor' : '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isDistributor
            ? {
                fullName: formData.name,
                companyName: '',
                country: 'India',
                city: 'Nalgonda',
                phone: formData.phone,
                email: formData.email,
                businessType: 'Distributor',
                message: formData.message
              }
            : formData
        )
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to send message.');
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Product Enquiry',
        message: ''
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#e5e2e1] pt-24">
      <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-20 border-b border-[#4d4639]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,77,54,0.42),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(200,164,93,0.12),transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto">
          <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#c8a45d] font-bold">Contact Us</span>
          <h1 className="font-display text-4xl md:text-6xl text-[#f8f5ef] leading-tight mt-5">We are here to help.</h1>
          <p className="font-sans text-base md:text-lg text-[#d1c5b4] leading-relaxed max-w-2xl mt-5">
            Send product questions, order support requests, distributor interest, or general enquiries to ASRA VEDHA WELLNESS.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-7 bg-[#1e1e1e] border border-[#4d4639]/30 rounded-xl p-6 md:p-8 space-y-6"
        >
          <div>
            <h2 className="font-display text-3xl text-[#f8f5ef]">Send a Message</h2>
            <p className="font-sans text-sm text-[#9a8f80] mt-2">We will respond within 24 hours.</p>
          </div>

          {submitted && (
            <div className="flex items-center gap-3 bg-[#24523a]/35 border border-[#a0d2b3]/30 text-[#a0d2b3] rounded-lg p-4 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Message received. Our team will contact you within 24 hours.</span>
            </div>
          )}

          {submitError && (
            <div className="bg-red-950/30 border border-red-400/30 text-red-200 rounded-lg p-4 text-sm">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#9a8f80] font-bold">Full Name</span>
              <input
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full bg-[#111111] border border-[#4d4639]/55 rounded-lg px-4 py-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#c8a45d]"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#9a8f80] font-bold">Email</span>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full bg-[#111111] border border-[#4d4639]/55 rounded-lg px-4 py-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#c8a45d]"
                placeholder="name@example.com"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#9a8f80] font-bold">Phone</span>
              <input
                required
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full bg-[#111111] border border-[#4d4639]/55 rounded-lg px-4 py-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#c8a45d]"
                placeholder="+91..."
              />
            </label>
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#9a8f80] font-bold">Subject</span>
              <select
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                className="w-full bg-[#111111] border border-[#4d4639]/55 rounded-lg px-4 py-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#c8a45d]"
              >
                <option>Product Enquiry</option>
                <option>Order Support</option>
                <option>Distributor Enquiry</option>
                <option>Export Enquiry</option>
                <option>General Contact</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-[11px] uppercase tracking-widest text-[#9a8f80] font-bold">Message</span>
            <textarea
              required
              rows={7}
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              className="w-full bg-[#111111] border border-[#4d4639]/55 rounded-lg px-4 py-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#c8a45d] resize-none"
              placeholder="Tell us how we can help..."
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#c8a45d] text-[#261900] hover:bg-[#ffdea3] px-6 py-4 rounded text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Message'}
            <Send className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-[#1f4d36] rounded-xl p-6 md:p-8">
            <h2 className="font-display text-3xl text-[#f8f5ef]">ASRA VEDHA WELLNESS</h2>
            <p className="font-sans text-sm text-[#e8f0e9] leading-relaxed mt-3">
              Premium Herbal Nutrition | Nutraceuticals | Wellness Products
            </p>
            <div className="space-y-5 mt-8">
              <a href="tel:+917989255841" className="flex gap-4 text-[#f8f5ef] hover:text-[#e8c177] transition-colors">
                <Phone className="w-5 h-5 text-[#e8c177] shrink-0 mt-0.5" />
                <span>7989255841</span>
              </a>
              <a href="mailto:asravedha@gmail.com" className="flex gap-4 text-[#f8f5ef] hover:text-[#e8c177] transition-colors">
                <Mail className="w-5 h-5 text-[#e8c177] shrink-0 mt-0.5" />
                <span>asravedha@gmail.com</span>
              </a>
              <div className="flex gap-4 text-[#f8f5ef]">
                <MapPin className="w-5 h-5 text-[#e8c177] shrink-0 mt-0.5" />
                <span>Plot No. 4, New Ragavendra Colony, Nalgonda - 508001</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] border border-[#4d4639]/30 rounded-xl p-6">
            <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#c8a45d] font-bold mb-5">Business Hours</h3>
            <div className="space-y-3">
              {businessHours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-5 text-sm border-b border-[#4d4639]/20 pb-3 last:border-0 last:pb-0">
                  <span className="text-[#d1c5b4]">{day}</span>
                  <span className="text-[#f8f5ef] text-right">{time}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/917989255841"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full bg-[#25D366] text-white px-5 py-3 rounded text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2"
            >
              Chat with us
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </motion.aside>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-[#c8a45d]/25 bg-[#1e1e1e] min-h-[360px]">
          <iframe
            title="ASRA VEDHA Nalgonda map"
            src="https://www.google.com/maps?q=Nalgonda,%20Telangana,%20India&output=embed"
            className="w-full h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
