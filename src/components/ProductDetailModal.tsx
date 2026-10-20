import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Heart, ShoppingBag, Check, Sparkles, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  onInstantBuy: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onInstantBuy,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuy = () => {
    onInstantBuy(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-sky-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-white text-[#0F172A] rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Product Visual */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#F0F9FF] to-white relative p-6 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-white shadow-inner border border-sky-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#0284C7] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick trust reminders */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-sky-100 shadow-2xs">
                <Truck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Same-day dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-pink-100 shadow-2xs">
                <RefreshCw className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>30-day sleep trial</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-semibold text-[#0284C7]">{product.category}</span>
                <div className="flex items-center gap-1 text-[#0F172A]">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span>({product.reviewsCount} mama reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#0F172A] tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#94A3B8] line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  In Stock · Dispatches Today
                </span>
              </div>

              {/* Mama Highlight Box in Soft Pink */}
              <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-3.5 text-xs text-[#831843] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-[#BE185D] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                  <span>Mama-Tested Feature:</span>
                </div>
                {product.mamaHighlight}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center justify-between">
                    <span>Shade: <span className="font-normal text-[#64748B]">{selectedColor}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'bg-white border-[#0284C7] shadow-xs ring-2 ring-[#0284C7]/20'
                            : 'bg-white border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-medium text-[#0F172A]">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center justify-between">
                    <span>Size / Age:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#0284C7] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-[#475569] hover:bg-sky-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#0F172A]">Quantity:</span>
                <div className="flex items-center border border-sky-200 rounded-full bg-white px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#475569] hover:text-[#0F172A]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums text-[#0F172A]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-[#475569] hover:text-[#0F172A]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-2 pt-4 border-t border-sky-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-150 shadow-md cursor-pointer active:scale-98 ${
                    added
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#EC4899] text-white border-[#EC4899]'
                      : 'bg-white border-slate-200 text-[#64748B] hover:text-[#EC4899]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuy}
                className="w-full py-3 px-4 bg-pink-50 hover:bg-pink-100 text-[#BE185D] font-semibold text-xs rounded-full border border-pink-200 transition-colors cursor-pointer"
              >
                Instant Express Checkout (1-Click)
              </button>
            </div>

            {/* Certifications & Materials */}
            <div className="pt-2 border-t border-sky-100 space-y-2 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span><strong>Pediatrician Safety:</strong> {product.safety}</span>
              </div>
              <div className="pl-6 space-y-1">
                {product.materials.map((mat, i) => (
                  <div key={i} className="text-[11px] text-[#64748B]">
                    • {mat}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Mama Review */}
            {product.reviews.length > 0 && (
              <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-sky-100 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">{product.reviews[0].author}</span>
                  <span className="text-[11px] text-[#64748B]">{product.reviews[0].date}</span>
                </div>
                <div className="text-[11px] text-[#0284C7] font-semibold mb-1">{product.reviews[0].role}</div>
                <p className="text-[#475569] italic">"{product.reviews[0].text}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
