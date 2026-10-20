import React from 'react';
import { ShoppingBag, Sparkles, Heart, Compass } from 'lucide-react';

interface MobileQuickBarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBundleBuilder: () => void;
  onScrollToCatalog: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBundleBuilder,
  onScrollToCatalog,
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-100 h-14 px-3 flex items-center justify-around shadow-lg">
      <button
        type="button"
        onClick={onScrollToCatalog}
        className="flex flex-col items-center justify-center text-[#64748B] hover:text-[#0284C7] p-1 cursor-pointer"
      >
        <Compass className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Catalog</span>
      </button>

      <button
        type="button"
        onClick={onOpenBundleBuilder}
        className="flex flex-col items-center justify-center text-[#EC4899] p-1 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-0.5">Bundle -15%</span>
      </button>

      <button
        type="button"
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center justify-center text-[#64748B] hover:text-[#EC4899] p-1 cursor-pointer"
      >
        <Heart className="w-4 h-4" />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-[#EC4899] text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Saved</span>
      </button>

      <button
        type="button"
        onClick={onOpenCart}
        className="relative flex items-center gap-1.5 bg-[#0284C7] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
      >
        <ShoppingBag className="w-3.5 h-3.5 text-white" />
        <span>Bag</span>
        <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
          {cartCount}
        </span>
      </button>
    </div>
  );
};
