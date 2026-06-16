import { useEffect, useState } from 'react';
import { Leaf, Menu, Search, ShieldCheck, ShoppingBag, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState } from '../types';

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#c8a45d]/20 shadow-lg shadow-black/20'
          : 'bg-[#111111]/30 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex justify-between items-center gap-4">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left text-[#e8c177] hover:text-[#ffdea3] transition-colors cursor-pointer shrink-0"
          id="nav-logo"
          aria-label="ASRA VEDHA home"
        >
          <span className="w-8 h-8 rounded-full border border-[#c8a45d]/40 bg-[#111111]/70 flex items-center justify-center">
            <Leaf className="w-4 h-4" />
          </span>
          <span className="font-display text-lg md:text-xl tracking-[0.14em] uppercase leading-none">
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
                  isActive ? 'text-[#e8c177]' : 'text-[#d1c5b4] hover:text-[#e8c177]'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#e8c177]"
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
            className="text-[#e8c177] hover:text-[#ffdea3] transition-colors p-2 cursor-pointer"
            aria-label="Search products"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          <button
            onClick={() => handleNavClick('cart')}
            className={`p-2 relative cursor-pointer flex items-center justify-center transition-colors ${
              currentView === 'cart' ? 'text-[#ffdea3]' : 'text-[#e8c177] hover:text-[#ffdea3]'
            }`}
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#c8a45d] text-[#111111] text-[9px] font-sans font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')}
            className={`hidden md:flex p-2 transition-colors cursor-pointer ${
              currentView === 'sanctuary' || currentView === 'login' || currentView === 'signup'
                ? 'text-[#ffdea3]'
                : 'text-[#e8c177] hover:text-[#ffdea3]'
            }`}
            aria-label={isAuthenticated ? 'Customer account' : 'Sign in'}
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:flex p-2 transition-colors cursor-pointer ${
                currentView === 'admin' ? 'text-[#ffdea3]' : 'text-[#e8c177] hover:text-[#ffdea3]'
              }`}
              aria-label="Admin panel"
            >
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </button>
          )}

          <button
            onClick={() => handleNavClick('shop')}
            className="hidden xl:inline-flex bg-[#c8a45d] hover:bg-[#ffdea3] text-[#261900] text-[11px] uppercase tracking-[0.14em] font-bold px-4 py-2.5 rounded transition-colors cursor-pointer"
          >
            Shop Now
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#e8c177] hover:text-[#ffdea3] p-2 cursor-pointer transition-colors"
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
            className="lg:hidden fixed inset-0 top-[61px] bg-[#111111]/98 backdrop-blur-md border-t border-[#c8a45d]/20"
          >
            <div className="px-6 py-8 flex flex-col gap-5 min-h-[calc(100vh-61px)]">
              {navLinks.map((item) => {
                const isActive = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => runNavAction(item)}
                    className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#4d4639]/20 ${
                      isActive ? 'text-[#e8c177] font-semibold' : 'text-[#d1c5b4] hover:text-[#e8c177]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick(isAuthenticated ? 'sanctuary' : 'login')}
                className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#4d4639]/20 ${
                  currentView === 'sanctuary' || currentView === 'login' || currentView === 'signup'
                    ? 'text-[#e8c177] font-semibold'
                    : 'text-[#d1c5b4] hover:text-[#e8c177]'
                }`}
              >
                {isAuthenticated ? 'Account' : 'Login'}
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`font-accent text-base tracking-[0.14em] uppercase text-left transition-colors cursor-pointer py-3 border-b border-[#4d4639]/20 ${
                    currentView === 'admin'
                      ? 'text-[#e8c177] font-semibold'
                      : 'text-[#d1c5b4] hover:text-[#e8c177]'
                  }`}
                >
                  Admin
                </button>
              )}

              <button
                onClick={() => handleNavClick('shop')}
                className="mt-auto bg-[#c8a45d] text-[#111] text-center font-bold font-mono tracking-widest uppercase text-xs py-4 rounded cursor-pointer hover:bg-[#ffdea3] transition-colors"
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
