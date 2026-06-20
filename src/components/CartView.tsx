import { Trash2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product, ViewState, CartItem } from '../types';
import { products, getPrice } from '../data';

interface CartViewProps {
  setView: (view: ViewState) => void;
  currency: 'USD' | 'INR';
  cartItems: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  catalogProducts?: Product[];
}

export default function CartView({
  setView,
  currency,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  catalogProducts = products
}: CartViewProps) {
  // Resolve Cart details
  const resolvedItems = cartItems.map(item => {
    const product = catalogProducts.find(p => p.id === item.productId);
    return {
      product,
      quantity: item.quantity,
      priceDetails: product ? getPrice(product, currency) : null
    };
  }).filter(item => item.product !== undefined) as {
    product: Product;
    quantity: number;
    priceDetails: { price: number; formatted: string };
  }[];

  const subTotal = resolvedItems.reduce((acc, current) => {
    if (!current.priceDetails) return acc;
    return acc + (current.priceDetails.price * current.quantity);
  }, 0);

  const formattedSubTotal = currency === 'INR' 
    ? `₹${subTotal.toLocaleString()}` 
    : `$${subTotal.toFixed(2)}`;

  return (
    <div className="pt-28 min-h-screen max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col">
      {/* Return button */}
      <button
        onClick={() => setView('shop')}
        className="flex items-center gap-2 text-xs text-[#C4A042] hover:text-[#d4b052] uppercase tracking-wider font-sans font-bold cursor-pointer mb-8 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </button>

      <div className="flex flex-col gap-2 mb-12">
        <span className="font-sans text-xs tracking-widest text-[#C4A042] uppercase font-bold">Shopping Cart</span>
        <h1 className="font-display text-4xl text-[#F5E4B0] tracking-tight">Your Wellness Cart</h1>
      </div>

      {resolvedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#2D1A00] border border-[#C4A042]/20 rounded-xl gap-6">
          <p className="font-serif italic text-lg text-[#9a8f80]">Your cart is empty.</p>
          <button
            onClick={() => setView('shop')}
            className="bg-[#C4A042] text-[#1A0F00] px-8 py-3 rounded text-xs uppercase tracking-widest font-sans font-bold hover:bg-[#d4b052] transition-colors cursor-pointer"
          >
            Shop Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Cart item listing table - Left */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {resolvedItems.map((item) => (
              <div 
                key={item.product.id}
                className="bg-[#3D2600] border border-[#C4A042]/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#C4A042]/20 transition-all"
              >
                {/* Product thumb */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#1A0F00] border border-[#C4A042]/20 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-display text-[#F5E4B0] font-semibold">{item.product.name}</h3>
                    <p className="text-xs text-[#9a8f80] tracking-wider mt-0.5 uppercase">{item.product.category.replace('-', ' ')}</p>
                    <span className="text-xs font-mono font-semibold text-[#C4A042] block mt-1">{item.priceDetails?.formatted} each</span>
                  </div>
                </div>

                {/* Quantitative controls / Delete */}
                <div className="flex sm:flex-col items-end sm:items-end w-full sm:w-auto justify-between border-t sm:border-0 border-[#C4A042]/10 pt-4 sm:pt-0 gap-4">
                  <div className="flex items-center bg-[#1A0F00] border border-[#C4A042]/60 rounded-md p-0.5">
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-[#d1c5b4] hover:text-[#C4A042] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-xs text-[#F5E4B0] font-bold select-none">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-[#d1c5b4] hover:text-[#C4A042] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[#F5E4B0] font-bold">
                      {currency === 'INR' 
                        ? `₹${((item.priceDetails?.price || 0) * item.quantity).toLocaleString()}` 
                        : `$${((item.priceDetails?.price || 0) * item.quantity).toFixed(2)}`}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 p-2 cursor-pointer transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing receipt totals card - Right */}
          <div className="lg:col-span-4 bg-[#2D1A00] border border-[#C4A042]/40 rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xs font-sans uppercase font-bold text-[#C4A042] tracking-widest border-b border-[#C4A042]/20 pb-3">
              Order Synthesis
            </h2>

            <div className="flex flex-col gap-3 font-sans text-xs text-[#d1c5b4]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono text-[#F5E4B0]">{formattedSubTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Duties</span>
                <span className="font-mono text-emerald-400 uppercase tracking-wider font-semibold">Calculated at Checkout</span>
              </div>
            </div>

            <div className="h-[1px] bg-[#C4A042]/30"></div>

            <div className="flex justify-between items-baseline font-display text-lg">
              <span className="text-[#F5E4B0]">Total</span>
              <span className="font-mono font-bold text-[#C4A042]">{formattedSubTotal}</span>
            </div>

            <button
              onClick={() => setView('checkout')}
              className="w-full bg-[#C4A042] hover:bg-[#d4b052] text-[#1A0F00] px-6 py-4 rounded text-xs uppercase tracking-widest font-sans font-bold transition-all flex items-center justify-center gap-2 cursor-pointer gold-glow mt-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 justify-center text-[10px] text-[#9a8f80] mt-1">
              <ShieldCheck className="w-4 h-4 text-[#24523a]" />
              <span>Secure checkout powered by Razorpay</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

