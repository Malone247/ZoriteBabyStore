import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  isGiftWrapped: boolean;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  isGiftWrapped,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [address, setAddress] = useState('742 Evergreen Terrace, Nursery Suite');
  const [city, setCity] = useState('Portland');
  const [postal, setPostal] = useState('97201');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const giftWrapCost = isGiftWrapped ? 4.50 : 0;
  const shippingCost = subtotal >= 75 || subtotal === 0 ? 0 : 6.50;
  const finalTotal = Math.max(0, subtotal - discountAmount + giftWrapCost + shippingCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `ZORITE-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderComplete();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-sky-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#0F172A] rounded-full shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          /* Confirmed Order State */
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-sky-50 rounded-full mx-auto flex items-center justify-center text-[#0284C7]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Order Confirmed & Preparing Dispatch
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0F172A] mt-1">
                Thank you, Mama!
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Your Zorite order <strong className="text-[#0284C7]">#{orderId}</strong> has been received and is being packed with gentle love in recyclable non-toxic packaging.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-sky-100 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-[#64748B]">Confirmation sent to:</span>
                <span className="font-semibold text-[#0F172A]">{email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-[#64748B]">Shipping Address:</span>
                <span className="font-semibold text-[#0F172A]">{address}, {city}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-[#64748B]">Estimated Arrival:</span>
                <span className="font-semibold text-[#0284C7]">In 2 Business Days (Express)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-1">
                <span>Total Paid</span>
                <span className="tabular-nums font-serif text-base text-[#0284C7]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-full shadow-md transition-colors cursor-pointer"
            >
              Continue Browsing Zorite Boutique
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8">
            <div className="border-b border-sky-100 pb-4 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EC4899]">
                Zorite Express Checkout
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
                Mama & Baby Delivery Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Parent's Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Email (for tracking)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-200 rounded-xl text-xs text-[#0F172A] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>
              </div>

              {/* Payment selection */}
              <div className="pt-2">
                <label className="block font-bold text-[#0F172A] mb-2">Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-sky-50/70 border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-[#0F172A]">Credit / Debit Card</div>
                    <div className="text-[11px] text-[#64748B]">Instant secure checkout</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-pink-50/70 border-[#EC4899] ring-2 ring-[#EC4899]/20 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-[#0F172A]">Cash on Delivery (COD)</div>
                    <div className="text-[11px] text-[#64748B]">Pay at your doorstep</div>
                  </button>
                </div>
              </div>

              {/* Order total review */}
              <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div>
                  <span className="text-[#64748B]">Total Amount Due:</span>
                  <div className="text-xl font-serif font-bold text-[#0284C7] tabular-nums">
                    ${finalTotal.toFixed(2)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#EC4899] font-semibold">
                  ✓ Free delivery & Zorite bib included
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Processing Safe Order...</span>
                ) : (
                  <>
                    <span>Place Order · ${finalTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
