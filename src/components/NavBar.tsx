import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ViewState } from '../types';
import logo from '../assets/logo.png';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  currency: 'USD' | 'INR';
  setCurrency: (currency: 'USD' | 'INR') => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  onSearchOpen: () => void;
}

type NavItem = { name: string; view?: ViewState };

export default function NavBar({
  currentView, setView, cartCount, isAuthenticated, isAdmin = false, onSearchOpen
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: NavItem[] = [
    { name: 'Home', view: 'home' },
    { name: 'About', view: 'wisdom' },
    { name: 'Products', view: 'shop' },
    { name: 'Quality', view: 'quality' },
    { name: 'Sustainability', view: 'sustainability' },
    { name: 'Contact', view: 'contact' }
  ];

  const isActive = (item: NavItem) => item.view !== undefined && currentView === item.view;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 ${scrolled ? 'nav-shadow' : ''} border-b border-[rgba(0,0,0,0.08)]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-[72px] flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 cursor-pointer shrink-0" aria-label="Asra Vedha home">
          <img src={logo} alt="Asra Vedha" className="h-9 w-auto" />
          <span className="font-serif text-xl tracking-normal text-[rgba(0,0,0,0.87)] font-semibold italic">
            Asra Vedha
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => item.view && handleNavClick(item.view)}
              className={`text-[14px] font-sans font-medium tracking-[0.01em] uppercase transition-colors cursor-pointer py-1 ${
                isActive(item) ? 'text-[#C9A84C]' : 'text-[rgba(0,0,0,0.87)] hover:text-[#C9A84C]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onSearchOpen} className="p-2.5 text-[rgba(0,0,0,0.7)] hover:text-[#C9A84C] transition-colors cursor-pointer" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>

          <button onClick={() => handleNavClick('cart')} className={`p-2.5 relative cursor-pointer transition-colors ${currentView === 'cart' ? 'text-[#C9A84C]' : 'text-[rgba(0,0,0,0.7)] hover:text-[#C9A84C]'}`} aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C9A84C] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')} className={`hidden md:flex p-2.5 cursor-pointer transition-colors ${currentView === 'sanctuary' || currentView === 'login' ? 'text-[#C9A84C]' : 'text-[rgba(0,0,0,0.7)] hover:text-[#C9A84C]'}`} aria-label="Account">
            <User className="w-5 h-5" />
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2.5 text-[rgba(0,0,0,0.7)] hover:text-[#C9A84C] cursor-pointer transition-colors" aria-label="Menu">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 bg-white z-[100] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.view && handleNavClick(item.view)}
                  className={`text-left text-base font-sans font-semibold py-4 border-b border-[rgba(0,0,0,0.06)] transition-colors cursor-pointer ${
                    isActive(item) ? 'text-[#C9A84C]' : 'text-[rgba(0,0,0,0.87)] hover:text-[#C9A84C]'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <button
                onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')}
                className={`text-left text-base font-sans font-semibold py-4 border-b border-[rgba(0,0,0,0.06)] transition-colors cursor-pointer ${
                  currentView === 'sanctuary' || currentView === 'login' ? 'text-[#C9A84C]' : 'text-[rgba(0,0,0,0.87)] hover:text-[#C9A84C]'
                }`}
              >
                {isAuthenticated ? 'Account' : 'Sign In'}
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className="mt-6 bg-[#C9A84C] text-white text-center font-semibold text-sm py-3.5 rounded-full cursor-pointer hover:bg-[#B8963C] transition-colors"
              >
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


