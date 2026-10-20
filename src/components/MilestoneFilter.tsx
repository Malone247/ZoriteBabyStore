import React from 'react';
import { Stage, Category } from '../types';
import { STAGES_CONFIG, CATEGORIES } from '../data/products';
import { Search } from 'lucide-react';

interface MilestoneFilterProps {
  selectedStage: Stage;
  onSelectStage: (stage: Stage) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalFilteredCount: number;
}

export const MilestoneFilter: React.FC<MilestoneFilterProps> = ({
  selectedStage,
  onSelectStage,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
}) => {
  return (
    <div id="milestones" className="pt-8 pb-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#EC4899] mb-1">
            Intuitive Milestone Shopping
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Shop By Baby’s Developmental Stage
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-xl">
            Because a 2-month-old needs soothing womb security, while a 9-month-old needs suction plates and teething relief.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sleepers, swaddles, bibs..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-sky-200 rounded-full text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Stage Selector Buttons (Interactive Segmented Filter Tabs in White, Sky Blue, and Pink) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
        {STAGES_CONFIG.map((stage) => {
          const isActive = selectedStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id as Stage)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-sm'
                  : 'bg-white/80 border-slate-200 hover:bg-sky-50/50 hover:border-sky-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-[#0284C7]' : 'text-[#64748B]'}`}>
                  {stage.age}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
                )}
              </div>
              <div className={`text-sm font-bold ${isActive ? 'text-[#0F172A]' : 'text-[#334155]'}`}>
                {stage.label}
              </div>
              <div className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                {stage.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Category Filters */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-sky-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((category) => {
            const isCatActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer font-medium ${
                  isCatActive
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-[#475569] hover:bg-pink-50 hover:text-[#BE185D] hover:border-pink-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Count summary */}
        <div className="text-xs text-[#64748B] tabular-nums whitespace-nowrap">
          Showing <span className="font-semibold text-[#0F172A]">{totalFilteredCount}</span> nursery essential{totalFilteredCount === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
};
