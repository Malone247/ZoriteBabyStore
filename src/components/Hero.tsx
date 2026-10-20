import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onOpenBundleBuilder: () => void;
  onOpenGiftFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onOpenBundleBuilder,
  onOpenGiftFinder,
}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-sky-100">
      {/* Soft Pink and Sky Blue gentle nursery glows on pure white canvas */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCE7F3]/70 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E0F2FE]/80 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Direct, high-converting copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker with pink & sky blue dot separators */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              <span>Zorite Nursery Care</span>
              <span aria-hidden="true" className="text-[#EC4899]">·</span>
              <span>100% Certified Organic</span>
              <span aria-hidden="true" className="text-[#EC4899]">·</span>
              <span>Pediatrician Approved</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.12] text-balance">
              Pure essentials for baby. <span className="text-[#0284C7]">Total peace of mind</span> <span className="text-[#EC4899]">for mama.</span>
            </h1>

            {/* Direct, empathetic, clear body copy */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
              Zorite is crafted by mothers for delicate infant skin and midnight routines. From buttery 2-way zip sleepers to stay-put suction dining and cloud swaddles—tested 100% non-toxic, and dispatched same-day with love.
            </p>

            {/* Direct Conversion Actions: Sky Blue and Baby Pink */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm rounded-full transition-all duration-150 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Shop Baby Essentials</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                type="button"
                onClick={onOpenBundleBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-pink-50 hover:bg-pink-100 text-[#BE185D] font-semibold text-sm rounded-full border border-pink-200 transition-all duration-150 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#EC4899]" />
                <span>Build a Bundle (Save 15%)</span>
              </button>
            </div>

            {/* Adjacent Proof Strip (Claim-to-Proof Adjacency) */}
            <div className="pt-4 border-t border-sky-100 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-serif text-[#0284C7] tabular-nums">14,200+</div>
                <div className="text-xs text-[#64748B]">Restful mamas served</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-[#EC4899] tabular-nums">100%</div>
                <div className="text-xs text-[#64748B]">GOTS organic pure</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-[#0F172A] tabular-nums">4.95 ★</div>
                <div className="text-xs text-[#64748B]">Average mama rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Point with Pure White Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[5/6] bg-[#F0F9FF]">
              <img
                src={HERO_IMAGE}
                alt="Loving mother gently cradling her smiling baby in nursery"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Mama Testimonial Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pink-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-[#F59E0B]">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs font-semibold text-[#0F172A]">Verified Zorite Mama</span>
                </div>
                <p className="text-xs text-[#475569] italic line-clamp-2">
                  "The 2-way zipper saved my sanity at 3am. Best gift I received as a first-time mother."
                </p>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>— Clara H., mama of 4-month-old Maya</span>
                  <span className="text-[#0284C7] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#0284C7]" /> Zorite Tested
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Helper Floating Bar */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                Orders before 2pm ship today
              </span>
              <button
                type="button"
                onClick={onOpenGiftFinder}
                className="text-[#EC4899] hover:underline font-semibold cursor-pointer"
              >
                Need gift inspiration? Try Quiz →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
