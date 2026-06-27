import { useEffect, useState } from 'react';
import { Menu, Search, ShieldCheck, ShoppingBag, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

type NavItem = {
  name: string;
  view?: ViewState;
  onClick?: () => void;
};

export default function NavBar({
  currentView,
  setView,
  cartCount,
  currency,
  setCurrency,
  isAuthenticated,
  isAdmin = false,
  onSearchOpen
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const runNavAction = (item: NavItem) => {
    if (item.view) {
      handleNavClick(item.view);
      return;
    }
    item.onClick?.();
  };

  const isItemActive = (item: NavItem) => item.view !== undefined && currentView === item.view;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#EDEDEC] ${
        scrolled
          ? 'bg-[rgba(237,237,236,0.95)] backdrop-blur-md border-b border-[#C9A84C]/20 shadow-sm'
          : 'lg:bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex justify-between items-center gap-4">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left text-[#C9A84C] hover:text-[#B8963C] transition-colors cursor-pointer shrink-0"
          id="nav-logo"
          aria-label="ASRA VEDHA home"
        >
          <img src={logo} alt="ASRA VEDHA" className="h-9 w-auto" />
          <span className="font-display text-lg md:text-xl tracking-[0.14em] uppercase leading-none text-[#2B2B2B]">
            ASRA VEDHA
          </span>
        </button>

        <nav className="hidden lg:flex items-center justify-center gap-6">
          {navLinks.map((item) => {
            const isActive = isItemActive(item);
            return (
              <button
                key={item.name}
                onClick={() => runNavAction(item)}
                className={`font-accent text-[11px] tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer relative py-2 whitespace-nowrap ${
                  isActive ? 'text-[#C9A84C]' : 'text-[#6B6B6B] hover:text-[#C9A84C]'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">

          <button
            onClick={onSearchOpen}
            className="text-[#6B6B6B] hover:text-[#C9A84C] transition-colors p-2 cursor-pointer"
            aria-label="Search products"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          <button
            onClick={() => handleNavClick('cart')}
            className={`p-2 relative cursor-pointer flex items-center justify-center transition-colors ${
              currentView === 'cart' ? 'text-[#C9A84C]' : 'text-[#6B6B6B] hover:text-[#C9A84C]'
            }`}
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-[#2B2B2B] text-[9px] font-sans font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')}
            className={`hidden md:flex p-2 transition-colors cursor-pointer ${
              currentView === 'sanctuary' || currentView === 'login' || currentView === 'signup'
                ? 'text-[#C9A84C]'
                : 'text-[#6B6B6B] hover:text-[#C9A84C]'
            }`}
            aria-label={isAuthenticated ? 'Customer account' : 'Sign in'}
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:flex p-2 transition-colors cursor-pointer ${
                currentView === 'admin' ? 'text-[#C9A84C]' : 'text-[#6B6B6B] hover:text-[#C9A84C]'
              }`}
              aria-label="Admin panel"
            >
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </button>
          )}

          <button
            onClick={() => handleNavClick('shop')}
            className="hidden xl:inline-flex bg-[#C9A84C] hover:bg-[#B8963C] text-[#2B2B2B] text-[11px] uppercase tracking-[0.14em] font-bold px-4 py-2.5 rounded transition-colors cursor-pointer"
          >
            Shop Now
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#6B6B6B] hover:text-[#C9A84C] p-2 cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-0 bg-[#EDEDEC] border-t border-[#C9A84C]/20 z-[100] overflow-y-auto pt-[61px]"
          >
            <div className="px-6 py-8 flex flex-col gap-5 min-h-[calc(100vh-61px)]">
              {navLinks.map((item) => {
                const isActive = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => runNavAction(item)}
                    className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#C9A84C]/10 ${
                      isActive ? 'text-[#C9A84C] font-semibold' : 'text-[#6B6B6B] hover:text-[#C9A84C]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')}
                className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#C9A84C]/10 ${
                  currentView === 'sanctuary' || currentView === 'login' || currentView === 'signup'
                    ? 'text-[#C9A84C] font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#C9A84C]'
                }`}
              >
                {isAuthenticated ? 'Account' : 'Login'}
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#C9A84C]/10 ${
                    currentView === 'admin'
                      ? 'text-[#C9A84C] font-semibold'
                      : 'text-[#6B6B6B] hover:text-[#C9A84C]'
                  }`}
                >
                  Admin
                </button>
              )}

              <button
                onClick={() => handleNavClick('shop')}
                className="mt-auto bg-[#C9A84C] text-[#2B2B2B] text-center font-bold font-mono tracking-widest uppercase text-xs py-4 rounded cursor-pointer hover:bg-[#B8963C] transition-colors"
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




