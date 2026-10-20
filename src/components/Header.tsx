import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBundleBuilder: () => void;
  onOpenGiftFinder: () => void;
  onSelectStage: (stage: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBundleBuilder,
  onOpenGiftFinder,
  onSelectStage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs transition-shadow">
      {/* Top Banner: Sky blue & pink accent */}
      <div className="bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#EC4899] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span>Free Express Delivery & Organic Cotton Bib on orders over $75</span>
        <span className="mx-2 opacity-60" aria-hidden="true">·</span>
        <span className="text-[#FDF2F8] font-semibold">Same-Day Dispatch before 2pm</span>
      </div>

      {/* Main Top Bar strictly complying with Section 2 Contract:
          [Brand title, 1 line] — [4-5 nav links, 1-2 words, single line] — [1 primary action] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face: Zorite) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] hover:text-[#0284C7] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>Zorite</span>
          <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
          <a
            href="#milestones"
            className="hover:text-[#0284C7] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#38BDF8] underline-offset-4"
          >
            Milestones
          </a>
          <button
            type="button"
            onClick={onOpenBundleBuilder}
            className="hover:text-[#EC4899] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:underline decoration-[#F472B6] underline-offset-4 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>Bundle Builder</span>
          </button>
          <button
            type="button"
            onClick={onOpenGiftFinder}
            className="hover:text-[#0284C7] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#38BDF8] underline-offset-4 cursor-pointer"
          >
            Gift Finder
          </button>
          <a
            href="#standards"
            className="hover:text-[#0284C7] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#38BDF8] underline-offset-4"
          >
            Mama Promise
          </a>
          <a
            href="#reviews"
            className="hover:text-[#EC4899] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#F472B6] underline-offset-4"
          >
            Mama Reviews
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action block */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Wishlist quick peek */}
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label="Saved nursery wishlist"
            className="relative p-2 text-[#64748B] hover:text-[#EC4899] transition-colors rounded-full hover:bg-pink-50"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EC4899] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Action: Shopping Bag Button in Sky Blue with Pink Counter */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 shadow-sm whitespace-nowrap cursor-pointer active:scale-98"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Bag</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full tabular-nums text-[11px] font-bold">
              {cartCount}
            </span>
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline border-l border-white/25 pl-2 tabular-nums">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sky-100 bg-white px-4 py-5 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenBundleBuilder();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-pink-50 text-[#BE185D] text-xs font-semibold rounded-xl text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              Bundle & Save 15%
            </button>
            <button
              onClick={() => {
                onOpenGiftFinder();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-sky-50 text-[#0284C7] text-xs font-semibold rounded-xl text-center"
            >
              Gift Matcher Quiz
            </button>
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#475569] pt-2 border-t border-slate-100">
            <a
              href="#milestones"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0284C7]"
            >
              Shop by Milestones (0-3M, 3-6M, 6-12M, 1-3Y)
            </a>
            <a
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0284C7]"
            >
              Our Certified Non-Toxic Promise
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#EC4899]"
            >
              Motherhood Community Reviews
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
