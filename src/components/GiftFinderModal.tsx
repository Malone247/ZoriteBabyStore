import React, { useState } from 'react';
import { Product } from '../types';
import { X, Gift, Check, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('newborn');
  const [goal, setGoal] = useState('sleep');
  const [budget, setBudget] = useState('any');

  // Filter recommendations based on quiz choices
  const getRecommendations = () => {
    let list = [...products];

    if (recipient === 'newborn') {
      list = list.filter((p) => p.stage === 'newborn');
    } else if (recipient === 'baby') {
      list = list.filter((p) => p.stage === 'explorer' || p.stage === 'foodie');
    } else if (recipient === 'toddler') {
      list = list.filter((p) => p.stage === 'toddler' || p.stage === 'explorer');
    }

    if (goal === 'sleep') {
      list = list.filter((p) => p.category === 'Apparel & Sleep' || p.id === 'prod-hooded-towel');
    } else if (goal === 'feeding') {
      list = list.filter((p) => p.category === 'Feeding & Mealtime' || p.id === 'prod-pacifier');
    } else if (goal === 'play') {
      list = list.filter((p) => p.category === 'Sensory & Play');
    }

    if (list.length === 0) {
      list = products.slice(0, 3);
    }

    if (budget === 'under35') {
      const budgetList = list.filter((p) => p.price <= 35);
      return budgetList.length > 0 ? budgetList : list.slice(0, 2);
    }

    return list.slice(0, 3);
  };

  const matches = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-sky-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-50 via-white to-pink-50 border-b border-sky-100 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/80 hover:bg-white text-[#0F172A] rounded-full shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EC4899] mb-2">
            <Gift className="w-4 h-4 text-[#EC4899]" />
            <span>Zorite Gift Matcher Quiz</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Find the Perfect Nursery Gift in 3 Clicks
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Answer 3 quick questions to get parent-tested, pediatrician-approved Zorite baby picks.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Question 1 of 3: Who are you shopping for?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'newborn', title: 'Expecting / Newborn', subtitle: '0 to 3 months' },
                  { id: 'baby', title: 'Curious Baby', subtitle: '3 to 12 months' },
                  { id: 'toddler', title: 'Little Explorer', subtitle: '1 to 3 years' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRecipient(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      recipient === item.id
                        ? 'bg-sky-50/70 border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-sky-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0F172A]">{item.title}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.subtitle}</div>
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#EC4899]">
                Question 2 of 3: What's the main goal?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'sleep', title: 'Calm Rest & Sleep', subtitle: 'Swaddles, sleepers, bath' },
                  { id: 'feeding', title: 'Mess-Free Mealtime', subtitle: 'Suction sets & pacifiers' },
                  { id: 'play', title: 'Sensory Development', subtitle: 'Montessori wooden toys' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      goal === item.id
                        ? 'bg-pink-50/70 border-[#EC4899] ring-2 ring-[#EC4899]/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-pink-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0F172A]">{item.title}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.subtitle}</div>
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-[#64748B] hover:text-[#0F172A]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Question 3 of 3: Desired budget?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'under35', title: 'Under $35', subtitle: 'Sweet thoughtful gifts' },
                  { id: 'any', title: 'Under $50+ / Premium', subtitle: 'Boutique essential sets' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBudget(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      budget === item.id
                        ? 'bg-sky-50/70 border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-sky-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0F172A]">{item.title}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.subtitle}</div>
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-[#64748B] hover:text-[#0F172A]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0284C7] to-[#EC4899] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal Zorite Picks</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                  ✓ Matched Just For You
                </span>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#EC4899] hover:underline font-semibold"
                >
                  Retake Quiz
                </button>
              </div>

              <div className="space-y-3">
                {matches.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-white border border-sky-100 flex items-center justify-between gap-3 shadow-xs hover:border-pink-200 transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded-xl shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A] truncate">{prod.name}</div>
                      <div className="text-[11px] text-[#64748B] line-clamp-1">{prod.mamaHighlight}</div>
                      <div className="text-xs font-bold font-serif text-[#0284C7] mt-1 tabular-nums">
                        ${prod.price}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(prod);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-white" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onQuickView(prod);
                        }}
                        className="text-[11px] text-[#64748B] hover:text-[#0F172A] text-center"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
