import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (appliedDiscount: number, isGiftWrapped: boolean) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExplore,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = subtotal * promoDiscountRate;
  const giftWrapCost = giftWrap ? 4.50 : 0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 6.50;
  const finalTotal = Math.max(0, subtotal - discountAmount + giftWrapCost + shippingCost);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'ZORITE15' || code === 'MAMA15' || code === 'BUNDLE15') {
      setPromoDiscountRate(0.15);
      setPromoMessage('15% Zorite Mama Discount applied!');
    } else if (code === 'WELCOME10') {
      setPromoDiscountRate(0.10);
      setPromoMessage('10% Welcome Discount applied!');
    } else {
      setPromoMessage('Invalid code. Try "ZORITE15" or "WELCOME10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-sky-100 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-white border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0284C7]" />
            <h2 className="font-serif text-lg font-bold text-[#0F172A]">
              Your Zorite Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#64748B] hover:text-[#0F172A] rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Progress Bar in Pink & Sky Blue */}
        <div className="p-4 bg-gradient-to-r from-sky-50 to-pink-50 border-b border-sky-100 text-xs">
          {amountToFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#334155]">
                <span>Add <strong>${amountToFreeShipping.toFixed(2)}</strong> for <strong>Free Express Shipping & Bib</strong></span>
                <span className="tabular-nums font-semibold text-[#0284C7]">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#0284C7] to-[#EC4899] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#0284C7] font-semibold">
              <Check className="w-4 h-4 bg-[#0284C7] text-white rounded-full p-0.5" />
              <span>Free Express Delivery & Zorite Organic Bib Unlocked!</span>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-sky-100 p-6 my-4">
              <div className="w-16 h-16 bg-sky-50 rounded-full mx-auto flex items-center justify-center text-[#0284C7]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-serif font-bold text-[#0F172A]">Your nursery bag is empty</p>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Explore our pediatrician-tested organic sleepsuits, gentle swaddles, and mealtime kits.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-2 px-5 py-2.5 bg-[#0284C7] text-white rounded-full text-xs font-semibold cursor-pointer hover:bg-[#0369A1]"
              >
                Explore Essentials
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                className="bg-white p-3.5 rounded-2xl border border-sky-100 flex gap-3 shadow-2xs hover:border-pink-200 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 object-cover rounded-xl shrink-0 bg-sky-50"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(index)}
                        className="text-[#94A3B8] hover:text-[#EC4899] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-serif font-bold text-xs text-[#0284C7] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center border border-sky-100 rounded-full bg-sky-50/50 px-1.5 py-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#475569] hover:text-[#0F172A]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums text-[#0F172A]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#475569] hover:text-[#0F172A]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Optional Gift Wrap Checkbox in Pink */}
          {items.length > 0 && (
            <label className="flex items-center gap-2.5 p-3 bg-white rounded-2xl border border-pink-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="rounded text-[#EC4899] focus:ring-[#EC4899] w-4 h-4"
              />
              <Gift className="w-4 h-4 text-[#EC4899] shrink-0" />
              <div className="flex-1">
                <span className="font-semibold text-[#0F172A]">Add Pastel Pink & Blue Eco Gift Wrap</span>
                <span className="text-[#64748B] block text-[11px]">(+$4.50) Handwritten mama greeting included</span>
              </div>
            </label>
          )}

          {/* Promo code input */}
          {items.length > 0 && (
            <div className="bg-white p-3 rounded-2xl border border-sky-100 space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Discount code (try ZORITE15)"
                  className="flex-1 px-3 py-1.5 bg-[#F8FAFC] border border-sky-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-[#0284C7] text-white text-xs font-semibold rounded-xl hover:bg-[#0369A1] cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <div className="text-[11px] font-semibold text-[#0284C7]">
                  {promoMessage}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-sky-100 space-y-3">
            <div className="space-y-1 text-xs text-[#475569]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#EC4899]">
                  <span>Mama Discount</span>
                  <span className="tabular-nums font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between">
                  <span>Pastel Eco Gift Wrap</span>
                  <span className="tabular-nums font-medium">${giftWrapCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums font-medium">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-[#0F172A]">
                <span>Estimated Total</span>
                <span className="font-serif font-bold text-base tabular-nums text-[#0284C7]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckout(discountAmount, giftWrap)}
              className="w-full py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="text-center text-[11px] text-[#94A3B8]">
              🔒 256-bit Encrypted Checkout · 30-Day Money-Back Guarantee
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
