/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { ViewState, CartItem, Product, AuthUser } from './types';
import { products } from './data';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SearchOverlay from './components/SearchOverlay';
import WisdomView from './components/WisdomView';
import QualityView from './components/QualityView';
import SustainabilityView from './components/SustainabilityView';
import ContactView from './components/ContactView';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import SanctuaryView from './components/SanctuaryView';
import AdminView from './components/AdminView';
import NotFoundView from './components/NotFoundView';

const validViews: ViewState[] = ['home', 'shop', 'product-details', 'cart', 'checkout', 'success', 'wisdom', 'quality', 'sustainability', 'contact', 'login', 'signup', 'sanctuary', 'admin', 'not-found'];

function getViewFromHash(): ViewState {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return 'home';
  return validViews.includes(hash as ViewState) ? (hash as ViewState) : 'not-found';
}

export default function App() {
  const [view, setViewState] = useState<ViewState>(getViewFromHash);
  const setView = (v: ViewState) => {
    setViewState(v);
    window.location.hash = v === 'home' ? '' : v;
  };

  useEffect(() => {
    const onHashChange = () => setViewState(getViewFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const [selectedProductId, setSelectedProductId] = useState<string>('moringa-powder');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(products);

  // Sourced disclosures popups
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');

  // Cart contains current ASRA products for a populated preview state.
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 'moringa-powder', quantity: 1 },
    { productId: 'ashwagandha-powder', quantity: 1 },
    { productId: 'amla-powder', quantity: 1 }
  ]);

  // Handle active product events dispatched across views
  useEffect(() => {
    const handleProductChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedProductId(customEvent.detail);
      }
    };
    window.addEventListener('change-active-product', handleProductChange);
    return () => {
      window.removeEventListener('change-active-product', handleProductChange);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          if (!cancelled) {
            setAuthUser(data.user);
          }
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    }

    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch('/api/products?limit=60');
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
          setCatalogProducts(data.items);
        }
      } catch {
        // Local catalog remains the fallback until DATABASE_URL is configured.
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  // Quick toast notification on addition
  const [toastStr, setToastStr] = useState<string>('');
  const triggerToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => {
      setToastStr('');
    }, 2500);
  };

  // Find currently selected product object
  const selectedProduct = catalogProducts.find(p => p.id === selectedProductId) || catalogProducts[0] || products[0];
  const isAuthenticated = Boolean(authUser);
  const isAdmin = authUser?.role === 'admin';

  // Helper properties
  const cartCount = cartItems.reduce((acc, current) => acc + current.quantity, 0);

  // Cart operations
  const handleAddToCart = (productId: string, qty: number = 1) => {
    const prod = catalogProducts.find(p => p.id === productId);
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
    triggerToast(`Added ${qty} ${prod?.name || 'product'} to cart.`);
  };

  const handleUpdateQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const prod = catalogProducts.find(p => p.id === productId);
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    triggerToast(`Removed ${prod?.name || 'blend'} from selection.`);
  };

  const handleSuccessClear = () => {
    setCartItems([]);
  };

  // Direct checkout path
  const handleInstantBuy = (productId: string, qty: number) => {
    setCartItems([{ productId, quantity: qty }]);
    setView('checkout');
  };

  // Select Product and navigate to detail page
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('product-details');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkDialog = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).catch(() => undefined);
    setAuthUser(null);
    setView('home');
    triggerToast('Signed out successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EDEDEC] text-[rgba(0,0,0,0.87)] flex flex-col justify-between selection:bg-[#C9A84C] selection:text-white">
      

      {/* Main navigation menu */}
      <NavBar
        currentView={view}
        setView={setView}
        cartCount={cartCount}
        currency={currency}
        setCurrency={setCurrency}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Real-time Toast Alerts feedback */}
      <AnimatePresence>
        {toastStr && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[80] bg-[#E5E4E2] border border-[#C9A84C]/50 text-[#C9A84C] font-sans text-xs font-semibold px-5 py-3 rounded-lg shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-[#C9A84C] stroke-[2.2]" />
            <span>{toastStr}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary viewport content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomeView
                setView={setView}
                currency={currency}
                onSelectProduct={handleSelectProduct}
                addToCart={handleAddToCart}
                catalogProducts={catalogProducts}
              />
            </motion.div>
          )}

          {view === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopView
                setView={setView}
                currency={currency}
                onSelectProduct={handleSelectProduct}
                addToCart={handleAddToCart}
                searchTerm={globalSearchTerm}
                setSearchTerm={setGlobalSearchTerm}
                catalogProducts={catalogProducts}
              />
            </motion.div>
          )}

          {view === 'product-details' && (
            <motion.div
              key="product-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetailView
                product={selectedProduct}
                setView={setView}
                currency={currency}
                addToCart={handleAddToCart}
                onInstantBuy={handleInstantBuy}
                catalogProducts={catalogProducts}
              />
            </motion.div>
          )}

          {view === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CartView
                setView={setView}
                currency={currency}
                cartItems={cartItems}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                catalogProducts={catalogProducts}
              />
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckoutView
                setView={setView}
                currency={currency}
                cartItems={cartItems}
                onSuccessClear={handleSuccessClear}
                catalogProducts={catalogProducts}
              />
            </motion.div>
          )}

          {view === 'wisdom' && (
            <motion.div
              key="wisdom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WisdomView setView={setView} />
            </motion.div>
          )}

          {view === 'quality' && (
            <motion.div
              key="quality"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QualityView setView={setView} />
            </motion.div>
          )}

          {view === 'sustainability' && (
            <motion.div
              key="sustainability"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SustainabilityView setView={setView} />
            </motion.div>
          )}


          {view === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactView />
            </motion.div>
          )}

          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoginView setView={setView} onGoogleLogin={handleGoogleLogin} />
            </motion.div>
          )}

          {view === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SignupView setView={setView} onGoogleLogin={handleGoogleLogin} />
            </motion.div>
          )}

          {view === 'sanctuary' && (
            <motion.div
              key="sanctuary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {authLoading ? (
                <div className="pt-32 px-6 text-center text-[#9a8f80]">Checking account session...</div>
              ) : isAuthenticated ? (
                <SanctuaryView
                  currency={currency}
                  addToCart={handleAddToCart}
                  setView={setView}
                  user={authUser}
                  onLogout={handleLogout}
                  catalogProducts={catalogProducts}
                />
              ) : (
                <LoginView setView={setView} onGoogleLogin={handleGoogleLogin} />
              )}
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {authLoading ? (
                <div className="pt-32 px-6 text-center text-[#9a8f80]">Checking admin session...</div>
              ) : isAdmin ? (
                <AdminView />
              ) : (
                <LoginView setView={setView} onGoogleLogin={handleGoogleLogin} />
              )}
            </motion.div>
          )}

          {view === 'not-found' && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NotFoundView setView={setView} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Interactive wisdom dialogs */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#E5E4E2] border border-[#C9A84C]/30 rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
            >
              <div className="flex justify-between items-center bg-[#EDEDEC] px-6 py-4 border-b border-[#C9A84C]/20">
                <h3 className="font-display text-[#C9A84C] font-semibold uppercase text-xs tracking-widest">{modalTitle}</h3>
                <button onClick={() => setModalOpen(false)} className="text-[#9a8f80] hover:text-[#2B2B2B] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed whitespace-pre-wrap">{modalContent}</p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-6 w-full bg-[#C9A84C] text-[#EDEDEC] text-xs font-sans font-bold uppercase py-3 rounded-md hover:bg-[#B8963C] transition-colors cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full screen overlays */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(id) => {
          handleSelectProduct(id);
          setSearchOpen(false);
        }}
        catalogProducts={catalogProducts}
      />

      {/* Footer component */}
      <Footer setView={setView} onLinkDialog={handleLinkDialog} />
    </div>
  );
}


