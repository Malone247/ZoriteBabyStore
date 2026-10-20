import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl border border-sky-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-pink-200 cursor-pointer"
    >
      {/* Product Image Stage (65-75% visual weight on soft sky blue/white backdrop) */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#F0F9FF] to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Text Tag */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0284C7] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-sky-100">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button in Pink */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to Zorite nursery wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-150 backdrop-blur-md cursor-pointer ${
            isWishlisted
              ? 'bg-[#EC4899] text-white shadow-sm scale-110'
              : 'bg-white/90 text-[#94A3B8] hover:text-[#EC4899] hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-md text-[#0F172A] hover:bg-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Quick View & Reviews</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with dot separators */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#0F172A]">
              <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
              <span className="font-semibold tabular-nums">{product.rating}</span>
              <span className="text-[#64748B]">({product.reviewsCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Benefit for mothers */}
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Swatches (Pink, Sky Blue, White) */}
          {product.colors.length > 1 && (
            <div className="mt-3 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] text-[#64748B] mr-1">Color:</span>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                    selectedColor === color.name
                      ? 'ring-2 ring-[#0284C7] ring-offset-1 border-white scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[11px] text-[#334155] ml-1 font-medium">{selectedColor}</span>
            </div>
          )}

          {/* Size picker if apparel */}
          {product.sizes && (
            <div className="mt-2.5 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] text-[#64748B] mr-1">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#0284C7] text-white'
                      : 'bg-sky-50 text-[#0369A1] hover:bg-pink-50 hover:text-[#BE185D]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & 1-Click Purchase Bar in Sky Blue & Pink */}
        <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold font-serif text-[#0F172A] tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#94A3B8] line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 shadow-xs cursor-pointer active:scale-95 ${
              justAdded
                ? 'bg-[#10B981] text-white'
                : 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sky-100'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
