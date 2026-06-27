import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ViewState } from '../types';
import logo from '../assets/logo.png';

interface FooterProps {
  setView: (view: ViewState) => void;
  onLinkDialog: (title: string, content: string) => void;
}

const productLinks = [
  'Moringa Powder',
  'Ashwagandha Powder',
  'Amla Powder',
  'Turmeric Powder',
  'Spirulina Powder',
  'Wheatgrass Powder',
  'Beetroot Powder'
];

export default function Footer({ setView, onLinkDialog }: FooterProps) {
  const showInfo = (title: string, markdown: string) => {
    onLinkDialog(title, markdown);
  };

  const goToView = (view: ViewState) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="site-footer"
        className="relative bg-[#2B2B2B] border-t border-[#C9A84C]/20 px-6 md:px-12 pt-20 pb-8 mt-24 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,164,93,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,93,.5) 1px, transparent 1px)',
            backgroundSize: '42px 42px'
          }}
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-5">
            <button
              className="flex items-center gap-3 text-left text-[#C9A84C] hover:text-[#B8963C] transition-colors cursor-pointer"
              onClick={() => goToView('home')}
            >
              <img src={logo} alt="ASRA VEDHA" className="h-10 w-auto" />
              <span className="font-display text-2xl tracking-[0.12em] uppercase text-[#F0F0EF]">ASRA VEDHA</span>
            </button>
            <div>
              <p className="font-sans text-sm font-semibold text-[#F0F0EF]">ASRA VEDHA WELLNESS PVT LTD</p>
              <p className="font-sans text-xs text-[#C9A84C] mt-2">Rooted in Nature, Crafted for Wellness</p>
            </div>
            <p className="font-sans text-sm text-[#A0A0A0] leading-relaxed">
              Premium Herbal Nutrition | Nutraceuticals | Wellness Products
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/asra_vedha_wellness"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#C9A84C]/50 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => showInfo('Facebook', 'Facebook page placeholder. Add the official ASRA VEDHA Facebook URL before launch.')}
                className="w-9 h-9 rounded-full border border-[#C9A84C]/50 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => showInfo('LinkedIn', 'LinkedIn page placeholder. Add the official ASRA VEDHA LinkedIn URL before launch.')}
                className="w-9 h-9 rounded-full border border-[#C9A84C]/50 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-bold mb-5">Quick Links</h3>
            <nav className="flex flex-col gap-3 font-sans text-sm text-[#A0A0A0]">
              <button onClick={() => goToView('home')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">Home</button>
              <button onClick={() => goToView('wisdom')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">About Us</button>
              <button onClick={() => goToView('shop')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">Products</button>
              <button onClick={() => goToView('quality')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">Quality & Certifications</button>
              <button onClick={() => goToView('sustainability')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">Sustainability</button>
              <button onClick={() => goToView('contact')} className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer">Contact Us</button>
            </nav>
          </div>

          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-bold mb-5">Products</h3>
            <div className="flex flex-col gap-3 font-sans text-sm text-[#A0A0A0]">
              {productLinks.map((product) => (
                <button
                  key={product}
                  onClick={() => goToView('shop')}
                  className="text-left hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  {product}
                </button>
              ))}
              <button onClick={() => goToView('shop')} className="text-left text-[#C9A84C] hover:text-[#B8963C] transition-colors cursor-pointer">
                View All Products
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-bold mb-5">Contact</h3>
            <div className="flex flex-col gap-4 font-sans text-sm text-[#A0A0A0]">
              <a href="tel:+917989255841" className="flex gap-3 hover:text-[#C9A84C] transition-colors">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>7989255841</span>
              </a>
              <a href="mailto:asravedha@gmail.com" className="flex gap-3 hover:text-[#C9A84C] transition-colors">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>asravedha@gmail.com</span>
              </a>
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>Plot No. 4, New Ragavendra Colony, Nalgonda - 508001</span>
              </div>
              <div className="pt-2 border-t border-[#C9A84C]/30 text-xs leading-relaxed text-[#8C8C8C]">
                <p className="text-[#E0E0E0] font-semibold mb-1">Business Hours</p>
                <p>Mon-Fri: 9:00 AM - 6:30 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Holiday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto mt-14 pt-6 border-t border-[#C9A84C]/30 flex flex-col md:flex-row gap-4 justify-between items-center text-[11px] text-[#8C8C8C] font-sans">
          <p>© 2024 ASRA VEDHA WELLNESS PVT LTD. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <button onClick={() => showInfo('Privacy Policy', 'ASRA VEDHA protects customer data and uses it only for order, support, and account-related communication.')} className="hover:text-[#C9A84C] transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => showInfo('Terms & Conditions', 'Use of this website is subject to product availability, verified pricing, and responsible wellness guidance. Products do not replace medical advice.')} className="hover:text-[#C9A84C] transition-colors cursor-pointer">Terms & Conditions</button>
            <button onClick={() => showInfo('Refund Policy', 'Refund and return rules should be finalized before launch based on product category, packaging condition, and payment gateway policy.')} className="hover:text-[#C9A84C] transition-colors cursor-pointer">Refund Policy</button>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/917989255841"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-[70] group flex items-center gap-3"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all bg-[#EDEDEC] border border-[#C9A84C]/50 text-[#2B2B2B] text-xs px-3 py-2 rounded shadow-lg">
          Chat with us on WhatsApp
        </span>
        <span className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/30 hover:scale-105 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </span>
      </a>
    </>
  );
}




