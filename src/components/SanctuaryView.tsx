/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  ShoppingBag, 
  History, 
  Settings, 
  Heart, 
  LogOut, 
  Sparkles, 
  Truck, 
  CheckCircle, 
  RefreshCcw, 
  Lock, 
  Bell, 
  X, 
  Info,
  Calendar,
  Gift,
  ArrowRight,
  ChevronRight,
  Package,
  MapPin
} from 'lucide-react';
import { ViewState, Product, AuthUser } from '../types';
import { products, getPrice } from '../data';

interface SanctuaryViewProps {
  currency: 'USD' | 'INR';
  addToCart: (productId: string, quantity: number) => void;
  setView: (view: ViewState) => void;
  user?: AuthUser | null;
  onLogout?: () => void;
  catalogProducts?: Product[];
}

interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: 'Shipped' | 'Delivered' | 'In Process';
  trackingStep: number; // 0 to 3
}

interface Subscription {
  id: string;
  name: string;
  image: string;
  frequency: string;
  status: 'Active' | 'Paused';
  nextDelivery: string;
  price: string;
}

export default function SanctuaryView({
  currency,
  addToCart,
  setView,
  user,
  onLogout,
  catalogProducts = products
}: SanctuaryViewProps) {
  // Navigation inside the dashboard
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'subscriptions' | 'settings' | 'wishlist'>('overview');

  // Account state that updates in real-time on Save Changes
  const [initialFirstName, ...initialLastNameParts] = (user?.name || 'ASRA Customer').split(' ');
  const [profile, setProfile] = useState({
    firstName: initialFirstName || 'ASRA',
    lastName: initialLastNameParts.join(' ') || 'Customer',
    email: user?.email || 'customer@example.com',
    phone: user?.phone || '+91 7989255841'
  });

  // Settings form input holders
  const [formState, setFormState] = useState({ ...profile });
  const [passwordState, setPasswordState] = useState({ current: '', new: '' });
  const [isFormSaving, setIsFormSaving] = useState(false);

  // Preference switches
  const [preferences, setPreferences] = useState({
    journalUpdates: true,
    ritualReminders: false
  });

  // Loyalty Points
  const [sattvaPoints, setSattvaPoints] = useState(1450);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);

  // Tracking modal status
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Success messaging toasts inside Sanctuary
  const [sanctuaryToast, setSanctuaryToast] = useState('');
  const triggerSanctuaryToast = (msg: string) => {
    setSanctuaryToast(msg);
    setTimeout(() => {
      setSanctuaryToast('');
    }, 3000);
  };

  // Subscriptions items state
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'sub-ashwa',
      name: 'Ashwagandha Powder',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByoRpPAdGiiL4NH0MjLqZ0gaxyPB4qoe7GOU8uV10uQTE6qNp7jj4PgTmtsnzU2B5-lrx91G0S5Sm03_CtVc1UlxTLMH8qwtl72xV9IBqLaYkcy1wx_pPABfP3_gf_pCD-Rivd80Tz9Wpj7al3egvYzDuvD2H_P8JJIV34-a6fXhiOJLkzsIlajTbQXk8aaup8gnTVf8FqCfrzm0gFEKyRhG4wauxco_8gRPOAKx3wmdvfSAuKlc2ZlIXH5u9_BCCqPlBMnFrpplA',
      frequency: 'Monthly Delivery',
      status: 'Active',
      nextDelivery: 'in 5 days',
      price: currency === 'USD' ? '$4.20' : '₹349'
    },
    {
      id: 'sub-moringa',
      name: 'Moringa Powder',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNJkPV88HZ_Lb-4ByRf-TuzlzegoMXXHtSYtL2KRW0k9B_6i45beE3EX8sNSZXd6sg7dl1sSF3sG-NjrGolpptCLuuqp8mTc53Eu5c6kXRus6X-V6fTKAlvImdnRvJb3DsSH3JAIQd0PJZIpnIWWEspRAKzXhoTLE7rvTbH3mvK3CEIxOb0x012YhZ_lugd_bfu7kBHkLCPvn491O8SZzMSsi-JWdcnKeLaSZG4ONAirWheRYk_HiLcPOlFYSeJNfOp0K5i-miqw',
      frequency: 'Every 2 Months',
      status: 'Paused',
      nextDelivery: 'Paused (Click to resume)',
      price: currency === 'USD' ? '$3.60' : '₹299'
    }
  ]);

  // Order history
  const [orders] = useState<Order[]>([
    {
      id: 'AV-88392',
      date: 'June 10, 2026',
      items: 'Moringa Powder x1, Amla Powder x2',
      total: currency === 'USD' ? '$9.60' : '₹797',
      status: 'Shipped',
      trackingStep: 2
    },
    {
      id: 'AV-87110',
      date: 'May 14, 2026',
      items: 'Turmeric Powder x1',
      total: currency === 'USD' ? '$2.40' : '₹199',
      status: 'Delivered',
      trackingStep: 3
    }
  ]);

  // Wishlist items
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([
    catalogProducts.find(p => p.id === 'superfood-blend') || catalogProducts[9] || products[9],
    catalogProducts.find(p => p.id === 'immunity-booster') || catalogProducts[10] || products[10]
  ]);

  // Handle subscriber edit
  const handleToggleSubStatus = (id: string) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        const nextStatus = sub.status === 'Active' ? 'Paused' : 'Active';
        triggerSanctuaryToast(`Subscription ${sub.name} is now ${nextStatus}.`);
        return {
          ...sub,
          status: nextStatus as 'Active' | 'Paused',
          nextDelivery: nextStatus === 'Active' ? 'in 30 days' : 'Paused (Click to resume)'
        };
      }
      return sub;
    }));
  };

  const handleUpdateSubFrequency = (id: string, freq: string) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        triggerSanctuaryToast(`Delivery cycle updated to ${freq}.`);
        return { ...sub, frequency: freq };
      }
      return sub;
    }));
  };

  // Redeem rewards options
  const handleRedeemReward = (cost: number, label: string) => {
    if (sattvaPoints < cost) {
      triggerSanctuaryToast('Insufficient Sattva points. Continue your wellness journey to earn more.');
      return;
    }
    setSattvaPoints(prev => prev - cost);
    setRedeemModalOpen(false);
    triggerSanctuaryToast(`Successfully redeemed: "${label}". Code dispatched via Email.`);
  };

  // Click on Buy Again
  const handleBuyAgain = (productId: string, name: string) => {
    addToCart(productId, 1);
    // Global toast triggered by App is beautiful, but we can also toast internally
    triggerSanctuaryToast(`Added ${name} directly to cart.`);
  };

  // Remove from Wishlist
  const handleRemoveWishlist = (id: string, name: string) => {
    setWishlistProducts(prev => prev.filter(p => p.id !== id));
    triggerSanctuaryToast(`Removed ${name} from your sacred wishlist.`);
  };

  // Submit Settings Changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSaving(true);
    setTimeout(() => {
      setProfile({ ...formState });
      setIsFormSaving(false);
      triggerSanctuaryToast('Sourced Profile successfully synchronized to secure cloud vaults!');
    }, 800);
  };

  // Reset password handler
  const handleUpdatePassword = () => {
    triggerSanctuaryToast('Password auth is disabled. Please manage account access through Google.');
    setPasswordState({ current: '', new: '' });
  };

  return (
    <div className="bg-gradient-to-tr from-[#111] via-[#121614] to-[#111] text-[#F5E4B0] min-h-screen pt-12 pb-24 font-sans relative">
      {/* Toast Alert */}
      <AnimatePresence>
        {sanctuaryToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] bg-[#3D2600] border border-[#C4A042]/60 text-[#C4A042] font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-md shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#C4A042] animate-spin" />
            <span>{sanctuaryToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        
        {/* Banner with layout tabs for mobile view */}
        <div className="md:hidden mb-10">
          <label className="block text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase mb-2">Sanctuary Ingress</label>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value as any)}
            className="w-full bg-[#3D2600] border border-[#C4A042]/40 rounded px-4 py-3 text-xs font-mono text-[#C4A042] focus:ring-1 focus:ring-[#C4A042] outline-none"
          >
            <option value="overview">Profile Overview</option>
            <option value="orders">Recent Journeys (Orders)</option>
            <option value="subscriptions">Botanical Rituals (Subscriptions)</option>
            <option value="wishlist">Wishlist Favorites</option>
            <option value="settings">Ritual Settings</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left Sidebar Layout Navigation */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#9a8f80] uppercase block mb-4 pb-2 border-b border-[#C4A042]/20">
                  YOUR SANCTUARY
                </span>
                <nav className="flex flex-col gap-1">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-mono font-medium rounded transition-all text-left ${
                      activeTab === 'overview' 
                        ? 'bg-[#24523a]/30 text-[#C4A042] border-l-2 border-[#C4A042]' 
                        : 'text-[#9a8f80] hover:text-[#F5E4B0] hover:bg-[#3D2600]/45'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Overview</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-mono font-medium rounded transition-all text-left ${
                      activeTab === 'orders' 
                        ? 'bg-[#24523a]/30 text-[#C4A042] border-l-2 border-[#C4A042]' 
                        : 'text-[#9a8f80] hover:text-[#F5E4B0] hover:bg-[#3D2600]/45'
                    }`}
                  >
                    <History className="w-4 h-4" />
                    <span>Order History</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('subscriptions')}
                    className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-mono font-medium rounded transition-all text-left ${
                      activeTab === 'subscriptions' 
                        ? 'bg-[#24523a]/30 text-[#C4A042] border-l-2 border-[#C4A042]' 
                        : 'text-[#9a8f80] hover:text-[#F5E4B0] hover:bg-[#3D2600]/45'
                    }`}
                  >
                    <RefreshCcw className="w-4 h-4" />
                    <span>Botanical Rituals</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('wishlist')}
                    className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-mono font-medium rounded transition-all text-left ${
                      activeTab === 'wishlist' 
                        ? 'bg-[#24523a]/30 text-[#C4A042] border-l-2 border-[#C4A042]' 
                        : 'text-[#9a8f80] hover:text-[#F5E4B0] hover:bg-[#3D2600]/45'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Wishlist ({wishlistProducts.length})</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-mono font-medium rounded transition-all text-left ${
                      activeTab === 'settings' 
                        ? 'bg-[#24523a]/30 text-[#C4A042] border-l-2 border-[#C4A042]' 
                        : 'text-[#9a8f80] hover:text-[#F5E4B0] hover:bg-[#3D2600]/45'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Ritual Settings</span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-[#C4A042]/20">
                <button 
                  onClick={() => {
                    if (onLogout) {
                      onLogout();
                      return;
                    }
                    setView('home');
                  }}
                  className="flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-widest font-mono text-[#9a8f80] hover:text-red-400 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow min-w-0">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  {/* Portrait & Welcome Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-[#3D2600]/30 p-8 rounded-lg border border-[#C4A042]/10">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#C4A042] p-0.5 bg-[#1a1a1a]">
                        <img 
                          alt="Portrait of an elegant woman" 
                          className="w-full h-full object-cover rounded-full"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBww0xhTx0KUZNsmgosQJAbKG2X5kgCZxF9nBKVSmPh0-dsziFJ8u2dI3-QIvyOl5VSLjTEsMpdQraEn07s4mKtJGURuwzHYXxgWp-C6HYZ-0ex2G8n8BvdiVvo-ZQNfKGqABIj4FNxqXI5itbzfuLvrpL6T5zlskxr2utjGrEha873A2cfmLB0B_AC9lQSfHydyzz2-oXIVCcu9Q7QKSJDoaLcBV-2NnA6q1nIIPO73VhdXve0UGHrlsq7SH7E7EOcHnM7BlJyVuE"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#24523a] text-[#a0d2b3] p-1.5 rounded-full border border-[#a0d2b3]/20 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 fill-[#a0d2b3]" />
                      </div>
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase">NAMASTE • WELCOME BACK</span>
                      <h1 className="font-display text-3xl md:text-4xl text-[#C4A042]">
                        Amara, {profile.firstName} {profile.lastName}
                      </h1>
                      <p className="font-sans text-xs md:text-sm text-[#d1c5b4] max-w-xl leading-relaxed">
                        Welcome back to your ASRA VEDHA wellness account. Review orders, wishlist products, saved details, and future subscription preferences from one place.
                      </p>
                    </div>
                  </div>

                  {/* Loyalty Points Sattva Balance (Screen 2 High Fidelity Card) */}
                  <div className="relative p-8 rounded-xl border border-[#C4A042]/20 bg-[#3D2600] overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A042]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-[#C4A042] uppercase block mb-1 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#C4A042]" /> SATTVA POINTS BALANCE
                        </span>
                        <div className="font-display text-4xl md:text-5xl text-[#F5E4B0] font-semibold mt-1">
                          {sattvaPoints.toLocaleString()} <span className="text-xs font-mono font-normal tracking-wide text-[#9a8f80]">Prana Vials</span>
                        </div>
                        <p className="font-sans text-xs text-[#d1c5b4] mt-2">
                          Current Status: <span className="text-[#C4A042] font-semibold">Gold Radiance Tier</span>. Just <span className="text-emerald-400 font-bold">550 points</span> until ultimate botanical enlightenment rewards.
                        </p>
                      </div>
                      <button 
                        onClick={() => setRedeemModalOpen(true)}
                        className="bg-[#C4A042] hover:bg-[#d4b052] text-[#1A0F00] text-[11px] font-mono uppercase tracking-widest font-bold px-6 py-3.5 rounded transition-all w-full sm:w-auto text-center cursor-pointer shadow-md"
                      >
                        Redeem Wisdom
                      </button>
                    </div>
                  </div>

                  {/* Summary of Active subscriptions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active sub */}
                    <div className="bg-[#3D2600]/40 p-6 rounded-lg border border-[#C4A042]/15 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#C4A042]/10">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#9a8f80]">Active Ritual</span>
                        <button onClick={() => setActiveTab('subscriptions')} className="text-xs text-[#C4A042] hover:underline flex items-center gap-1">
                          Manage <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuByoRpPAdGiiL4NH0MjLqZ0gaxyPB4qoe7GOU8uV10uQTE6qNp7jj4PgTmtsnzU2B5-lrx91G0S5Sm03_CtVc1UlxTLMH8qwtl72xV9IBqLaYkcy1wx_pPABfP3_gf_pCD-Rivd80Tz9Wpj7al3egvYzDuvD2H_P8JJIV34-a6fXhiOJLkzsIlajTbQXk8aaup8gnTVf8FqCfrzm0gFEKyRhG4wauxco_8gRPOAKx3wmdvfSAuKlc2ZlIXH5u9_BCCqPlBMnFrpplA" 
                          alt="Ashwa" 
                          className="w-16 h-16 rounded object-cover filter brightness-90 border border-[#C4A042]/20"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-[#F5E4B0] uppercase tracking-wider">Ashwagandha Root Elixir</h4>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-[#24523a]/40 text-emerald-400 text-[9px] rounded-full font-mono font-medium">Monthly Auto-Refill</span>
                          <p className="text-[11px] text-[#9a8f80] mt-1">Dispatched next in 5 days.</p>
                        </div>
                      </div>
                    </div>

                    {/* Order tracking preview */}
                    <div className="bg-[#3D2600]/40 p-6 rounded-lg border border-[#C4A042]/15 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#C4A042]/10">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#9a8f80]">Active Parcel</span>
                        <button onClick={() => setActiveTab('orders')} className="text-xs text-[#C4A042] hover:underline flex items-center gap-1">
                          Track <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold text-[#F5E4B0]">Order #AV-88392</span>
                            <p className="text-[10px] text-[#9a8f80] mt-0.5">En route to your location</p>
                          </div>
                          <span className="text-[10px] bg-[#24523a]/40 text-emerald-400 font-mono font-bold px-2.5 py-0.5 rounded-full">Shipped</span>
                        </div>
                        <button 
                          onClick={() => setActiveTrackingOrder(orders[0])}
                          className="w-full bg-[#3D2600] border border-[#C4A042]/30 text-xs text-[#C4A042] hover:bg-[#C4A042]/10 py-2 rounded text-center transition-all cursor-pointer inline-flex items-center justify-center gap-2 font-mono"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          Track Journey progress
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Curated quote block */}
                  <div className="p-8 border-l-2 border-[#C4A042] bg-[#2D1A00]/30 italic text-[#9a8f80] text-xs leading-relaxed rounded">
                    "When the breath is still, the mind is still. Deep within the soil of the ancient rivers lies the molecular key to standard physiological peace. Savor your Ashwagandha blends at sunrise with coconut lipids to ground the energetic winds." 
                    <span className="block not-italic text-[10px] uppercase font-mono tracking-widest text-[#C4A042] mt-3">— Ayurvedic Sutras section XVII</span>
                  </div>

                </motion.div>
              )}

              {/* TAB 2: ORDER HISTORY (RECENT JOURNEYS) */}
              {activeTab === 'orders' && (
                <motion.div 
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="pb-4 border-b border-[#C4A042]/20 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#9a8f80] uppercase">HISTORIC TRANSACTIONS</span>
                      <h2 className="font-display text-2xl md:text-3xl text-[#F5E4B0]">Recent Journeys</h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {orders.map(order => {
                      const isShipped = order.status === 'Shipped';
                      return (
                        <div key={order.id} className="p-6 bg-[#3D2600] rounded-lg border border-[#C4A042]/15 flex flex-col md:flex-row justify-between md:items-center gap-6">
                          <div className="space-y-2 max-w-xl">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold text-[#C4A042] tracking-wider uppercase">Order #{order.id}</span>
                              <span className="text-[10px] text-[#9a8f80] font-mono">{order.date}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-[#F5E4B0]">{order.items}</h4>
                            <p className="text-xs text-[#9a8f80]">Value: <span className="text-[#C4A042] font-bold">{order.total}</span> • Safe checkout logs verified.</p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
                            {isShipped ? (
                              <button 
                                onClick={() => setActiveTrackingOrder(order)}
                                className="bg-[#24523a]/30 border border-emerald-400/30 hover:border-emerald-400 text-[#a0d2b3] px-5 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Track Journey
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleBuyAgain('turmeric-powder', 'Turmeric Powder')}
                                className="bg-[#2D1A00] border border-[#C4A042]/40 text-[#C4A042] hover:bg-[#C4A042]/15 px-5 py-2.5 rounded text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                Buy Again
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: BOTANICAL RITUALS (SUBSCRIPTIONS) */}
              {activeTab === 'subscriptions' && (
                <motion.div 
                  key="subscriptions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="pb-4 border-b border-[#C4A042]/20">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#9a8f80] uppercase">AUTOMATIC SOURCING</span>
                    <h2 className="font-display text-2xl md:text-3xl text-[#F5E4B0]">Active Botanical Subscriptions</h2>
                  </div>

                  <div className="space-y-6">
                    {subscriptions.map(sub => {
                      const isActive = sub.status === 'Active';
                      return (
                        <div key={sub.id} className="p-6 bg-[#3D2600] rounded-lg border border-[#C4A042]/15 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
                          <div className="flex items-start gap-5">
                            <img 
                              src={sub.image} 
                              alt={sub.name} 
                              className="w-20 h-20 rounded object-cover filter brightness-90 border border-[#C4A042]/25"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-[#F5E4B0] uppercase tracking-wider">{sub.name}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                  isActive ? 'bg-[#24523a]/40 text-emerald-400' : 'bg-red-950/40 text-red-400'
                                }`}>
                                  {sub.status}
                                </span>
                              </div>
                              <p className="text-xs text-[#9a8f80]">{sub.frequency} • Price: {sub.price}</p>
                              <p className="text-[11px] text-[#d1c5b4] flex items-center gap-1 pt-1.5 font-mono">
                                <Calendar className="w-3.5 h-3.5 text-[#C4A042]" /> Next Lunar Cycle refill: {sub.nextDelivery}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {/* Cycle selection drop */}
                            <select 
                              onChange={(e) => handleUpdateSubFrequency(sub.id, e.target.value)}
                              value={sub.frequency}
                              className="bg-[#111] border border-[#C4A042]/40 rounded text-xs font-mono text-[#d1c5b4] px-3 py-2 outline-none focus:ring-1 focus:ring-[#C4A042]"
                            >
                              <option value="Weekly Delivery">Refill Every Week</option>
                              <option value="Monthly Delivery">Refill Monthly</option>
                              <option value="Every 2 Months">Refill Every 2 Months</option>
                              <option value="Every 3 Months">Refill Quarterly</option>
                            </select>

                            <button 
                              onClick={() => handleToggleSubStatus(sub.id)}
                              className={`px-4 py-2 border text-xs font-mono rounded transition-colors cursor-pointer uppercase ${
                                isActive 
                                  ? 'border-red-900/40 text-red-400 hover:bg-red-950/20' 
                                  : 'border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/20'
                              }`}
                            >
                              {isActive ? 'Pause' : 'Resume'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === 'wishlist' && (
                <motion.div 
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="pb-4 border-b border-[#C4A042]/20">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#9a8f80] uppercase">SAVED FOR LATER</span>
                    <h2 className="font-display text-2xl md:text-3xl text-[#F5E4B0]">Wishlist Sanctuary</h2>
                  </div>

                  {wishlistProducts.length === 0 ? (
                    <div className="py-16 text-center text-[#9a8f80] space-y-4">
                      <Heart className="w-10 h-10 text-[#C4A042] mx-auto opacity-40" />
                      <p className="text-xs tracking-wider uppercase font-mono">Your wishlist sanctuary lies in silent contemplation.</p>
                      <button 
                        onClick={() => setView('shop')}
                        className="bg-[#C4A042] text-[#1A0F00] px-6 py-2.5 rounded font-mono font-bold text-xs uppercase"
                      >
                        Browse Apothecary
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {wishlistProducts.map(prod => (
                        <div key={prod.id} className="bg-[#3D2600] rounded-lg border border-[#C4A042]/15 overflow-hidden flex flex-col h-full justify-between">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-full h-44 object-cover filter brightness-85"
                          />
                          <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-sm font-mono tracking-wider text-[#F5E4B0] uppercase font-bold">{prod.name}</h3>
                                <span className="text-xs font-bold text-[#C4A042]">{getPrice(prod, currency).formatted}</span>
                              </div>
                              <p className="text-xs text-[#d1c5b4] leading-relaxed mt-2 line-clamp-2">{prod.description}</p>
                            </div>
                            
                            <div className="flex gap-4 pt-4 border-t border-[#C4A042]/15">
                              <button 
                                onClick={() => handleBuyAgain(prod.id, prod.name)}
                                className="flex-grow bg-[#24523a]/30 text-[#a0d2b3] border border-emerald-500/20 hover:bg-[#24523a]/50 py-2 rounded text-center text-xs font-mono font-bold uppercase transition-colors"
                              >
                                Add to bag
                              </button>
                              <button 
                                onClick={() => handleRemoveWishlist(prod.id, prod.name)}
                                className="px-3 border border-[#C4A042]/40 hover:border-red-400 text-[#9a8f80] hover:text-red-400 rounded py-2 transition-transform active:scale-95"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 5: RITUAL SETTINGS (Screen 3 Preference formulation) */}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div className="pb-4 border-b border-[#C4A042]/20">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#9a8f80] uppercase">ADMINISTRATIVE SETTINGS</span>
                    <h2 className="font-display text-2xl md:text-3xl text-[#F5E4B0]">Sanctuary Settings &amp; Preferences</h2>
                  </div>

                  {/* Profile Form */}
                  <div className="bg-[#3D2600] p-8 rounded-lg border border-[#C4A042]/15 space-y-6">
                    <h3 className="font-display text-lg text-[#C4A042] border-b border-[#C4A042]/20 pb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#C4A042]" />
                      Profile Information
                    </h3>

                    <form onSubmit={handleSaveChanges} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">First Name</label>
                          <input 
                            type="text" 
                            required
                            value={formState.firstName} 
                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                            className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none focus:border-[#C4A042] text-[#F5E4B0] py-2 text-xs font-mono placeholder:text-[#C4A042]" 
                            placeholder="First identity name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">Last Name</label>
                          <input 
                            type="text" 
                            required
                            value={formState.lastName} 
                            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                            className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none focus:border-[#C4A042] text-[#F5E4B0] py-2 text-xs font-mono" 
                            placeholder="Second family name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">Secure Email</label>
                          <input 
                            type="email" 
                            required
                            value={formState.email} 
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none focus:border-[#C4A042] text-[#F5E4B0] py-2 text-xs font-mono" 
                            placeholder="customer@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">Phone Number</label>
                          <input 
                            type="text" 
                            required
                            value={formState.phone} 
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none focus:border-[#C4A042] text-[#F5E4B0] py-2 text-xs font-mono" 
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button 
                          type="submit" 
                          disabled={isFormSaving}
                          className="bg-[#C4A042] hover:bg-[#d4b052] text-[#1A0F00] px-8 py-3 rounded text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-45"
                        >
                          {isFormSaving ? 'Synchronizing...' : 'Save Profile Changes'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Security Fields */}
                  <div className="bg-[#3D2600] p-8 rounded-lg border border-[#C4A042]/15 space-y-6">
                    <h3 className="font-display text-lg text-[#C4A042] border-b border-[#C4A042]/20 pb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#C4A042]" />
                      Google Account Security
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">Password Login</label>
                        <input 
                          type="text" 
                          disabled
                          value={passwordState.current}
                          onChange={(e) => setPasswordState({ ...passwordState, current: e.target.value })}
                          className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none text-[#9a8f80] py-2 text-xs font-mono disabled:opacity-70"
                          placeholder="Disabled for Google OAuth"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest text-[#9a8f80] uppercase block">Access Provider</label>
                        <input 
                          type="text" 
                          disabled
                          value={passwordState.new}
                          onChange={(e) => setPasswordState({ ...passwordState, new: e.target.value })}
                          className="w-full bg-[#111] border-b border-[#C4A042]/50 border-t-0 border-x-0 outline-none text-[#9a8f80] py-2 text-xs font-mono disabled:opacity-70"
                          placeholder="Google OAuth"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleUpdatePassword}
                        className="bg-transparent border border-[#C4A042] text-[#C4A042] hover:bg-[#C4A042]/10 px-8 py-3 rounded text-xs font-mono uppercase tracking-widest font-normal cursor-pointer transition-colors"
                      >
                        Manage Through Google
                      </button>
                    </div>
                  </div>

                  {/* Curated Notifications Preferences (Screen 3 styled checkboxes/toggles) */}
                  <div className="bg-[#3D2600] p-8 rounded-lg border border-[#C4A042]/15 space-y-6">
                    <h3 className="font-display text-lg text-[#C4A042] border-b border-[#C4A042]/20 pb-3 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#C4A042]" />
                      Spiritual Preferences
                    </h3>

                    <div className="space-y-6">
                      {/* Toggle 1 */}
                      <div className="flex items-center justify-between py-3 border-b border-[#C4A042]/20">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium text-[#F5E4B0] uppercase tracking-wider">Wellness Journal Updates</h4>
                          <p className="text-xs text-[#9a8f80]">Receive lunar notifications, curated botanical papers, and Ayurvedic recipes.</p>
                        </div>
                        <button 
                          onClick={() => setPreferences({ ...preferences, journalUpdates: !preferences.journalUpdates })}
                          className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
                            preferences.journalUpdates ? 'bg-[#24523a]' : 'bg-[#2a2a2a]'
                          }`}
                        >
                          <div 
                            className={`w-5 h-5 rounded-full bg-[#C4A042] shadow-md transform transition-transform duration-300 ${
                              preferences.journalUpdates ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Toggle 2 */}
                      <div className="flex items-center justify-between py-3">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium text-[#F5E4B0] uppercase tracking-wider">Product Ritual Reminders</h4>
                          <p className="text-xs text-[#9a8f80]">Gentle alerts for optimal dosage resets and simple single-tap restocks.</p>
                        </div>
                        <button 
                          onClick={() => setPreferences({ ...preferences, ritualReminders: !preferences.ritualReminders })}
                          className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
                            preferences.ritualReminders ? 'bg-[#24523a]' : 'bg-[#2a2a2a]'
                          }`}
                        >
                          <div 
                            className={`w-5 h-5 rounded-full bg-[#C4A042] shadow-md transform transition-transform duration-300 ${
                              preferences.ritualReminders ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* LOYALTY REDEMPTION MODAL DIALOG */}
      <AnimatePresence>
        {redeemModalOpen && (
          <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#3D2600] border border-[#C4A042]/40 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center bg-[#2D1A00] px-6 py-4 border-b border-[#C4A042]/30">
                <h3 className="font-mono text-xs text-[#C4A042] font-semibold uppercase tracking-widest">Sattva Points - Redeem Wisdom</h3>
                <button onClick={() => setRedeemModalOpen(false)} className="text-[#9a8f80] hover:text-[#F5E4B0] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="text-center p-4 bg-[#111] rounded border border-[#C4A042]/20">
                  <span className="text-[10px] text-[#9a8f80] font-mono uppercase tracking-wider block">YOUR RITUAL BALANCE</span>
                  <div className="text-2xl font-display text-[#C4A042] mt-1 font-bold">{sattvaPoints} Prana Points</div>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {/* Reward 1 */}
                  <div className="flex justify-between items-center p-4 bg-[#111]/30 rounded border border-[#C4A042]/10 hover:border-emerald-500/30 transition-all">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5E4B0]">Free Sourced Logistics</h4>
                      <p className="text-[10px] text-[#9a8f80] mt-0.5">Waiver for shipping fees globally.</p>
                    </div>
                    <button 
                      onClick={() => handleRedeemReward(300, 'Free Sourced Logistics')}
                      className="bg-[#24523a]/50 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#24523a] px-3.5 py-2 rounded shrink-0 cursor-pointer"
                    >
                      300 pts
                    </button>
                  </div>

                  {/* Reward 2 */}
                  <div className="flex justify-between items-center p-4 bg-[#111]/30 rounded border border-[#C4A042]/10 hover:border-emerald-500/30 transition-all">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5E4B0]">Wellness Cart Discount</h4>
                      <p className="text-[10px] text-[#9a8f80] mt-0.5">Complementary ₹300 credit for any herbal product order.</p>
                    </div>
                    <button 
                      onClick={() => handleRedeemReward(500, 'Wellness Cart Discount')}
                      className="bg-[#24523a]/50 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#24523a] px-3.5 py-2 rounded shrink-0 cursor-pointer"
                    >
                      500 pts
                    </button>
                  </div>

                  {/* Reward 3 */}
                  <div className="flex justify-between items-center p-4 bg-[#111]/30 rounded border border-[#C4A042]/10 hover:border-emerald-500/30 transition-all">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5E4B0]">Free Sacred Rose Buds sampler Vague</h4>
                      <p className="text-[10px] text-[#9a8f80] mt-0.5">Sent securely in your next order pack.</p>
                    </div>
                    <button 
                      onClick={() => handleRedeemReward(1000, 'Free Sacred Rose Buds sampler Vague')}
                      className="bg-[#24523a]/50 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#24523a] px-3.5 py-2 rounded shrink-0 cursor-pointer"
                    >
                      1,000 pts
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED JOURNEY TRACKER DIALOG (AV-88392) */}
      <AnimatePresence>
        {activeTrackingOrder && (
          <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#3D2600] border border-[#C4A042]/40 rounded-lg max-w-xl w-full overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center bg-[#2D1A00] px-6 py-4 border-b border-[#C4A042]/30">
                <div>
                  <h3 className="font-mono text-xs text-[#C4A042] font-semibold uppercase tracking-widest">Journey Tracker</h3>
                  <span className="text-[10px] text-[#9a8f80]">Order ID: #{activeTrackingOrder.id}</span>
                </div>
                <button onClick={() => setActiveTrackingOrder(null)} className="text-[#9a8f80] hover:text-[#F5E4B0] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Visual state map */}
                <div className="relative pt-4 pb-2">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2a2a2a] -translate-y-1/2 rounded-full"></div>
                  {/* Active progress bar */}
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#C4A042] to-[#24523a] -translate-y-1/2 rounded-full transition-all duration-1000"
                    style={{ width: `${(activeTrackingOrder.trackingStep / 3) * 100}%` }}
                  ></div>

                  <div className="relative flex justify-between items-center z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        activeTrackingOrder.trackingStep >= 0 ? 'bg-[#C4A042] text-[#1A0F00]' : 'bg-[#3D2600] border border-[#C4A042]/30 text-[#9a8f80]'
                      }`}>1</div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#9a8f80] mt-2 block">Harvest</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        activeTrackingOrder.trackingStep >= 1 ? 'bg-[#C4A042] text-[#1A0F00]' : 'bg-[#3D2600] border border-[#C4A042]/30 text-[#9a8f80]'
                      }`}>2</div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#9a8f80] mt-2 block">Solarized</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        activeTrackingOrder.trackingStep >= 2 ? 'bg-[#C4A042] text-[#1A0F00]' : 'bg-[#3D2600] border border-[#C4A042]/30 text-[#9a8f80]'
                      }`}>3</div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#9a8f80] mt-2 block">Transit</span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        activeTrackingOrder.trackingStep >= 3 ? 'bg-[#24523a] text-[#a0d2b3]' : 'bg-[#3D2600] border border-[#C4A042]/30 text-[#9a8f80]'
                      }`}>4</div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#9a8f80] mt-2 block">Delivered</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#C4A042]/20">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C4A042]">Logistics Chronicles</h4>
                  <div className="space-y-4 text-xs">
                    {activeTrackingOrder.trackingStep >= 2 && (
                      <div className="flex gap-3">
                        <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="font-semibold text-[#F5E4B0]">Parcel Handed to Luxury Carrier Vows</span>
                          <p className="text-[10px] text-[#9a8f80]">June 12, 2026 - Mumbai Hub. Carrier dispatched via humidity-certified refrigeration chambers.</p>
                        </div>
                      </div>
                    )}
                    {activeTrackingOrder.trackingStep >= 1 && (
                      <div className="flex gap-3">
                        <Package className="w-4 h-4 text-[#C4A042] shrink-0" />
                        <div>
                          <span className="font-semibold text-[#F5E4B0]">Quality Assayed &amp; Sealed In Amber Glass</span>
                          <p className="text-[10px] text-[#9a8f80]">June 11, 2026 - Bangalore Labs. Sealed under inert gas protocols to prevent vital enzymes degradation.</p>
                        </div>
                      </div>
                    )}
                    {activeTrackingOrder.trackingStep >= 0 && (
                      <div className="flex gap-3">
                        <MapPin className="w-4 h-4 text-[#C4A042] shrink-0" />
                        <div>
                          <span className="font-semibold text-[#F5E4B0]">Himalayan Botanical Harvest Completed</span>
                          <p className="text-[10px] text-[#9a8f80]">June 10, 2026 - Uttarakhand Forest. Sourced at dawn by ancestral farming collectives.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTrackingOrder(null)}
                  className="w-full bg-[#C4A042] text-[#1A0F00] text-xs font-mono uppercase tracking-widest font-bold py-3.5 rounded mt-4"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

