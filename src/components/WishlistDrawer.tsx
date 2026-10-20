import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-sky-100 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#EC4899] fill-current" />
            <h2 className="font-serif text-lg font-bold text-[#0F172A]">
              Saved Nursery Essentials ({items.length})
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

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-sky-100 p-6 my-4">
              <div className="w-16 h-16 bg-pink-50 rounded-full mx-auto flex items-center justify-center text-[#EC4899]">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-serif font-bold text-[#0F172A]">No saved nursery items yet</p>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Tap the pink heart on any Zorite baby sleeper, swaddle, or mealtime kit to save for later.
              </p>
            </div>
          ) : (
            items.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-3.5 rounded-2xl border border-sky-100 flex gap-3 shadow-2xs hover:border-pink-200 transition-colors"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  onClick={() => {
                    onClose();
                    onQuickView(prod);
                  }}
                  className="w-18 h-18 object-cover rounded-xl shrink-0 bg-sky-50 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4
                        onClick={() => {
                          onClose();
                          onQuickView(prod);
                        }}
                        className="text-xs font-bold text-[#0F172A] hover:text-[#0284C7] cursor-pointer line-clamp-1"
                      >
                        {prod.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemove(prod)}
                        className="text-[#94A3B8] hover:text-[#EC4899] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#0284C7] font-serif font-bold tabular-nums mt-0.5">
                      ${prod.price}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart(prod);
                        onRemove(prod);
                      }}
                      className="flex-1 py-1.5 px-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-white" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
