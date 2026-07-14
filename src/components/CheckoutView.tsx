import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowLeft, Heart, CheckCircle2, CreditCard } from 'lucide-react';
import { CartItem, Product, ShippingDetails, ViewState } from '../types';
import { products, getPrice } from '../data';

interface CheckoutViewProps {
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  cartItems: CartItem[];
  onSuccessClear: () => void;
  catalogProducts?: Product[];
}

export default function CheckoutView({
  setView,
  currency,
  cartItems,
  onSuccessClear,
  catalogProducts = products
}: CheckoutViewProps) {
  const [details, setDetails] = useState<ShippingDetails>({
    email: '',
    newsletter: true,
    country: currency === 'INR' ? 'India' : 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // Parse items
  const resolvedItems = cartItems.map(item => {
    const product = catalogProducts.find(p => p.id === item.productId);
    return {
      product,
      quantity: item.quantity,
      priceDetails: product ? getPrice(product, currency) : null
    };
  }).filter(item => item.product !== undefined);

  const subTotal = resolvedItems.reduce((acc, current) => {
    if (!current.priceDetails) return acc;
    return acc + (current.priceDetails.price * current.quantity);
  }, 0);

  const formattedSubTotal = currency === 'INR' 
    ? `₹${subTotal.toLocaleString()}` 
    : `$${subTotal.toFixed(2)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.email || !details.firstName || !details.lastName || !details.address || !details.city || !details.zipCode) {
      alert("Please ensure all botanical delivery fields are completed with standard parameters.");
      return;
    }

    setLoading(true);

    // Simulate authentic direct Razorpay validation node
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      onSuccessClear(); // Empty cart
    }, 2800);
  };

  return (
    <div className="pt-28 min-h-screen max-w-6xl mx-auto w-full px-6 md:px-12 flex flex-col mb-16">
      {/* Back to Cart */}
      <button
        onClick={() => setView('cart')}
        disabled={loading || orderComplete}
        className="flex items-center gap-2 text-xs text-[#C9A84C] hover:text-[#B8963C] uppercase tracking-wider font-sans font-bold cursor-pointer mb-8 self-start disabled:opacity-30"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Cart
      </button>

      {orderComplete ? (
        <motion.div 
          className="bg-[#f2f0eb] border border-[#C9A84C]/50 p-12 rounded-2xl max-w-2xl mx-auto w-full text-center flex flex-col items-center gap-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center border border-[rgba(0,0,0,0.06)]">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-sans text-xs tracking-widest text-[#C9A84C] uppercase font-bold">Order Placed Successfully</span>
            <h2 className="font-display text-3xl text-[rgba(0,0,0,0.87)] tracking-tight">Thank You for Your Order</h2>
          </div>

          <p className="font-sans text-sm text-[rgba(0,0,0,0.58)] leading-relaxed max-w-md">
            Your wellness order has been created under code <strong className="font-mono text-[#C9A84C]">#AV-{Math.floor(Math.random() * 89999 + 10000)}</strong>. Our team will confirm payment and delivery details by email: <strong className="text-[#C9A84C]">{details.email}</strong>.
          </p>

          <div className="w-full h-[1px] bg-[#C9A84C]/30"></div>

          <div className="flex flex-col gap-1 items-center">
            <Heart className="w-5 h-5 text-red-600 fill-current animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[rgba(0,0,0,0.38)]">May You Transcend Daily • Asra Vedha</span>
          </div>

          <button
            onClick={() => setView('home')}
            className="mt-4 bg-[#C9A84C] text-white px-8 py-3 rounded-full text-sm font-sans font-bold hover:bg-[#B8963C] transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Checkout Form Area - Left */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8">
            {/* Contact Box */}
            <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-xl p-6 flex flex-col gap-5">
              <h2 className="text-sm font-sans uppercase font-bold text-[#C9A84C] tracking-widest border-b border-[#C9A84C]/20 pb-3">
                1. Contact Details
              </h2>
              
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="checkout-email">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  id="checkout-email"
                  value={details.email}
                  disabled={loading}
                  onChange={(e) => setDetails({...details, email: e.target.value})}
                  placeholder="name@example.com"
                  className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  disabled={loading}
                  checked={details.newsletter}
                  onChange={(e) => setDetails({...details, newsletter: e.target.checked})}
                  className="w-4 h-4 rounded border-[#C9A84C]/60 text-[#C9A84C] focus:ring-[#C9A84C]/30"
                />
                <label htmlFor="newsletter" className="text-xs text-[rgba(0,0,0,0.58)] select-none cursor-pointer">
                  Subscribe to wellness updates, product launches, and offers.
                </label>
              </div>
            </div>

            {/* Delivery Box */}
            <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-xl p-6 flex flex-col gap-6">
              <h2 className="text-sm font-sans uppercase font-bold text-[#C9A84C] tracking-widest border-b border-[#C9A84C]/20 pb-3">
                2. Delivery Address
              </h2>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="country-select">
                  Country / Region *
                </label>
                <select
                  id="country-select"
                  disabled={loading}
                  value={details.country}
                  onChange={(e) => setDetails({...details, country: e.target.value})}
                  className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="India">India (Republic of India)</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="first-name-input">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="first-name-input"
                    disabled={loading}
                    value={details.firstName}
                    onChange={(e) => setDetails({...details, firstName: e.target.value})}
                    placeholder="Siddharth"
                    className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="last-name-input">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="last-name-input"
                    disabled={loading}
                    value={details.lastName}
                    onChange={(e) => setDetails({...details, lastName: e.target.value})}
                    placeholder="Varma"
                    className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="address-input">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  required
                  id="address-input"
                  disabled={loading}
                  value={details.address}
                  onChange={(e) => setDetails({...details, address: e.target.value})}
                    placeholder="House no., street, area"
                  className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="apartment-input">
                  Apartment, Suite, Unit, etc. (Optional)
                </label>
                <input
                  type="text"
                  id="apartment-input"
                  disabled={loading}
                  value={details.apartment}
                  onChange={(e) => setDetails({...details, apartment: e.target.value})}
                  placeholder="3rd Floor, Lotus Wing"
                  className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="city-input">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    id="city-input"
                    disabled={loading}
                    value={details.city}
                    onChange={(e) => setDetails({...details, city: e.target.value})}
                    placeholder="New Delhi"
                    className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="state-input">
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state-input"
                    disabled={loading}
                    value={details.state}
                    onChange={(e) => setDetails({...details, state: e.target.value})}
                    placeholder="Delhi NCT"
                    className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[rgba(0,0,0,0.38)] uppercase tracking-wider font-sans font-bold" htmlFor="zip-code-input">
                    Zip / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    id="zip-code-input"
                    disabled={loading}
                    value={details.zipCode}
                    onChange={(e) => setDetails({...details, zipCode: e.target.value})}
                    placeholder="110001"
                    className="bg-[#EDEDEC] border border-[#C9A84C]/50 text-xs text-[rgba(0,0,0,0.87)] px-4 py-3 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>
            </div>

            {/* Direct Transaction Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C9A84C] hover:bg-[#B8963C] text-[rgba(0,0,0,0.87)] px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-sans font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#C9A84C]/10"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#111] border-t-transparent rounded-full animate-spin"></div>
                  <span>Opening Razorpay secure checkout...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4.5 h-4.5" />
                  <span>Pay {formattedSubTotal}</span>
                </>
              )}
            </button>
          </form>

          {/* Checkout Item Summary - Right */}
          <div className="lg:col-span-5 bg-[#f2f0eb] border border-[#C9A84C]/40 rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xs font-sans uppercase font-bold text-[#C9A84C] tracking-widest border-b border-[#C9A84C]/20 pb-3">
              Order Summary
            </h2>

            {/* Item listing */}
            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto">
              {resolvedItems.map((item) => (
                <div key={item.product?.id} className="flex gap-3 justify-between items-center border-b border-[#C9A84C]/10 pb-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded bg-[#EDEDEC] overflow-hidden flex-shrink-0 border border-[#C9A84C]/20">
                      <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display text-[rgba(0,0,0,0.87)] font-bold">{item.product?.name}</h4>
                      <p className="text-[10px] text-[rgba(0,0,0,0.38)] font-mono mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C9A84C]">
                    {currency === 'INR' 
                      ? `₹${((item.priceDetails?.price || 0) * item.quantity).toLocaleString()}` 
                      : `$${((item.priceDetails?.price || 0) * item.quantity).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Total blocks */}
            <div className="flex flex-col gap-3 font-sans text-xs text-[rgba(0,0,0,0.58)] border-t border-[#C9A84C]/20 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[rgba(0,0,0,0.87)]">{formattedSubTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-[#C9A84C] font-semibold uppercase">Complimentary</span>
              </div>
            </div>

            <div className="h-[1px] bg-[#C9A84C]/30"></div>

            <div className="flex justify-between items-baseline font-display text-lg">
              <span className="text-[rgba(0,0,0,0.87)]">Total</span>
              <span className="font-mono font-bold text-[#C9A84C]">{formattedSubTotal}</span>
            </div>

            <div className="bg-white/80 rounded-xl p-4 flex flex-col gap-2 border border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 text-[#C9A84C]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-sans uppercase font-bold tracking-wider">Razorpay Secure Payment</span>
              </div>
              <p className="text-[10px] text-[rgba(0,0,0,0.38)] leading-relaxed">
                Asra Vedha checkout is prepared for Razorpay integration. Use test keys first, then switch to live keys on launch.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}











