import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface BundleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddBundleToCart: (items: { product: Product; color: string; size?: string }[]) => void;
}

export const BundleBuilderModal: React.FC<BundleBuilderModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  // Split into 3 curated bundle slots
  const sleepItems = products.filter((p) => p.category === 'Apparel & Sleep' || p.id === 'prod-hooded-towel');
  const feedingCareItems = products.filter((p) => p.category === 'Feeding & Mealtime' || p.id === 'prod-pacifier');
  const playPlayItems = products.filter((p) => p.category === 'Sensory & Play' || p.id === 'prod-romper');

  const [selectedSleep, setSelectedSleep] = useState<Product>(sleepItems[0] || products[0]);
  const [selectedFeeding, setSelectedFeeding] = useState<Product>(feedingCareItems[0] || products[1]);
  const [selectedPlay, setSelectedPlay] = useState<Product>(playPlayItems[0] || products[2]);

  const [sleepColor, setSleepColor] = useState(selectedSleep.colors[0]?.name);
  const [feedingColor, setFeedingColor] = useState(selectedFeeding.colors[0]?.name);
  const [playColor, setPlayColor] = useState(selectedPlay.colors[0]?.name);

  // Dynamic calculations
  const rawSubtotal = selectedSleep.price + selectedFeeding.price + selectedPlay.price;
  const bundleDiscount = rawSubtotal * 0.15;
  const bundleTotal = rawSubtotal - bundleDiscount;

  const handleAddBundle = () => {
    onAddBundleToCart([
      { product: selectedSleep, color: sleepColor || selectedSleep.colors[0]?.name, size: selectedSleep.sizes?.[0] },
      { product: selectedFeeding, color: feedingColor || selectedFeeding.colors[0]?.name },
      { product: selectedPlay, color: playColor || selectedPlay.colors[0]?.name, size: selectedPlay.sizes?.[0] },
    ]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-sky-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Sky Blue & Baby Pink gradient */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-sky-50 via-white to-pink-50 border-b border-sky-100 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/80 hover:bg-white text-[#0F172A] rounded-full shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0284C7] text-white rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>Zorite Bundle & Save · Automatic 15% Off</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Curate Your Complete Zorite Nursery Kit
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl">
            Choose 1 sleep essential, 1 mealtime & soothing item, and 1 sensory growth toy. Take 15% off the full bundle + complimentary baby bib.
          </p>
        </div>

        {/* 3 Step Interactive Slots */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Slot 1: Sleep Essential */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Step 1: Choose Sleep Essential
              </span>
              <span className="text-xs text-[#64748B]">Selected: <strong className="text-[#0F172A]">{selectedSleep.name}</strong></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sleepItems.map((prod) => {
                const isPicked = selectedSleep.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedSleep(prod);
                      setSleepColor(prod.colors[0]?.name);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isPicked
                        ? 'bg-sky-50/60 border-[#0284C7] shadow-md ring-2 ring-[#0284C7]/20'
                        : 'bg-white border-slate-200 hover:border-sky-200'
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A] truncate">{prod.name}</div>
                      <div className="text-[11px] text-[#0284C7] font-serif font-bold tabular-nums">${prod.price}</div>
                    </div>
                    {isPicked && <Check className="w-4 h-4 text-[#0284C7] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slot 2: Feeding & Soothing */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EC4899]">
                Step 2: Choose Feeding & Soothing
              </span>
              <span className="text-xs text-[#64748B]">Selected: <strong className="text-[#0F172A]">{selectedFeeding.name}</strong></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {feedingCareItems.map((prod) => {
                const isPicked = selectedFeeding.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedFeeding(prod);
                      setFeedingColor(prod.colors[0]?.name);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isPicked
                        ? 'bg-pink-50/60 border-[#EC4899] shadow-md ring-2 ring-[#EC4899]/20'
                        : 'bg-white border-slate-200 hover:border-pink-200'
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A] truncate">{prod.name}</div>
                      <div className="text-[11px] text-[#EC4899] font-serif font-bold tabular-nums">${prod.price}</div>
                    </div>
                    {isPicked && <Check className="w-4 h-4 text-[#EC4899] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slot 3: Play & Growth */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Step 3: Choose Play & Movement
              </span>
              <span className="text-xs text-[#64748B]">Selected: <strong className="text-[#0F172A]">{selectedPlay.name}</strong></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {playPlayItems.map((prod) => {
                const isPicked = selectedPlay.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlay(prod);
                      setPlayColor(prod.colors[0]?.name);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isPicked
                        ? 'bg-sky-50/60 border-[#0284C7] shadow-md ring-2 ring-[#0284C7]/20'
                        : 'bg-white border-slate-200 hover:border-sky-200'
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A] truncate">{prod.name}</div>
                      <div className="text-[11px] text-[#0284C7] font-serif font-bold tabular-nums">${prod.price}</div>
                    </div>
                    {isPicked && <Check className="w-4 h-4 text-[#0284C7] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Summary & Add to Bag CTA */}
        <div className="p-6 sm:p-8 bg-white border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-[#64748B]">Bundle Total:</span>
              <span className="text-2xl font-bold font-serif text-[#0F172A] tabular-nums">
                ${bundleTotal.toFixed(2)}
              </span>
              <span className="text-xs text-[#94A3B8] line-through tabular-nums">
                ${rawSubtotal.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                Save ${bundleDiscount.toFixed(2)} (15% Off)
              </span>
            </div>
            <div className="text-[11px] text-[#EC4899] mt-0.5 font-semibold">
              ✓ Qualifies for Free Express Shipping & Zorite Organic Bib!
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddBundle}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Add 3-Piece Bundle to Bag</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
