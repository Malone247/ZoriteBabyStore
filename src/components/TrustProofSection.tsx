import React from 'react';
import { ShieldCheck, Leaf, Heart, Award, Star, Check } from 'lucide-react';
import { MAMA_PROMISES } from '../data/products';

export const TrustProofSection: React.FC = () => {
  return (
    <section id="standards" className="py-16 sm:py-20 bg-gradient-to-b from-white via-sky-50/40 to-pink-50/30 border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#EC4899] mb-2">
            Pediatrician & Mama Approved
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Every Zorite Fiber Tested for Newborn Skin
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-2">
            Mothers shouldn't have to spend late nights scrutinizing toxic chemical labels. Zorite exceeds the highest global infant standards so you can simply snuggle.
          </p>
        </div>

        {/* 3 Pillars of Mama Trust in White with Pink & Sky Blue icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {MAMA_PROMISES.map((promise, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-sky-100 shadow-2xs hover:border-pink-200 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
                  {idx === 0 && <Leaf className="w-5 h-5 text-[#0284C7]" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5 text-[#EC4899]" />}
                  {idx === 2 && <Award className="w-5 h-5 text-[#0284C7]" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0F172A] mb-2">
                  {promise.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {promise.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0284C7] font-semibold">
                <Check className="w-4 h-4 text-[#0284C7]" />
                <span>Verified Zorite Clean Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Testimonials from Mothers */}
        <div id="reviews" className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                Community Voices
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1">
                Real Mamas. Real Midnight Relief.
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <div className="flex text-[#F59E0B]">{'★'.repeat(5)}</div>
              <span className="font-bold tabular-nums text-[#0F172A]">4.95 / 5.0</span>
              <span className="text-[#64748B]">across 1,480+ verified Zorite orders</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-2xs hover:border-pink-200 transition-colors">
              <div>
                <div className="flex text-[#F59E0B] mb-3">{'★'.repeat(5)}</div>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  "When you are on your 3rd wakeup at 4 AM, the last thing you want is 15 tiny buttons in the dark. The Zorite two-way zip sleeper in petal pink is a blessing."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="font-bold text-xs text-[#0F172A]">Danielle Sterling</div>
                <div className="text-[11px] text-[#64748B]">Mama of 6-month-old Maya · Austin, TX</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-2xs hover:border-sky-300 transition-colors">
              <div>
                <div className="flex text-[#F59E0B] mb-3">{'★'.repeat(5)}</div>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  "The sky blue suction bowl actually holds! We tried other big brands that kept popping off our highchair tray. This one stays glued down."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="font-bold text-xs text-[#0F172A]">Priya Sharma</div>
                <div className="text-[11px] text-[#64748B]">Mama of 9-month-old Arjun · Seattle, WA</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-2xs hover:border-pink-200 transition-colors">
              <div>
                <div className="flex text-[#F59E0B] mb-3">{'★'.repeat(5)}</div>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  "My baby has sensitive eczema-prone cheeks. The pure white organic muslin swaddle and bear towel are the only fabrics that leave her skin calm."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="font-bold text-xs text-[#0F172A]">Emma Lindqvist</div>
                <div className="text-[11px] text-[#64748B]">Mama of 3-month-old Freja · Denver, CO</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
