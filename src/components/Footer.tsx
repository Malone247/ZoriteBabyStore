import React, { useState } from 'react';
import { Heart, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-12 border-t border-sky-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Zorite</span>
              <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Zorite curates organic nursery essentials in gentle pinks, sky blues, and crisp whites. Created by mothers, for mothers.
            </p>
            <div className="text-xs text-slate-400">
              Customer Care: <span className="text-[#38BDF8] font-medium">care@zoritebaby.com</span> · Mon–Fri, 9am–5pm EST
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
              Milestone Collections
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#milestones" className="hover:text-[#EC4899] transition-colors">Newborn Warmth (0–3 Months)</a></li>
              <li><a href="#milestones" className="hover:text-[#38BDF8] transition-colors">Curious Explorer (3–6 Months)</a></li>
              <li><a href="#milestones" className="hover:text-[#EC4899] transition-colors">Little Foodie (6–12 Months)</a></li>
              <li><a href="#milestones" className="hover:text-[#38BDF8] transition-colors">Active Wonder (1–3 Years)</a></li>
              <li><a href="#standards" className="hover:text-white transition-colors">Our Non-Toxic Certifications</a></li>
            </ul>
          </div>

          {/* Newsletter for Mamas */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#EC4899]">
              Join the Zorite Mama Circle
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gentle parenting advice, midnight milestone tips, and early access to limited seasonal collections.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-2xl flex items-center gap-2 text-xs text-[#F472B6]">
                <Check className="w-4 h-4 text-[#F472B6]" />
                <span>Welcome to the circle! Check your inbox for your 10% welcome treat.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-full text-xs text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#0284C7] text-white rounded-full text-xs font-bold hover:bg-[#0369A1] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Zorite Baby Boutique. All rights reserved. Made with love for little ones.
          </div>
          <div className="flex items-center gap-4">
            <span>GOTS Organic Certified</span>
            <span aria-hidden="true" className="text-[#38BDF8]">·</span>
            <span>OEKO-TEX Class 1</span>
            <span aria-hidden="true" className="text-[#EC4899]">·</span>
            <span>Plastic-Free Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
