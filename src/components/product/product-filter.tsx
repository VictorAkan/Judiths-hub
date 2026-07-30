'use client';

import { useFilterStore } from '@/stores/use-filter-store';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import type { ProductCondition, ProductSize, SortOption } from '@/types/product';

const CONDITION_OPTIONS: { value: ProductCondition; label: string }[] = [
  { value: 'pre-loved', label: 'Pre-Loved' },
  { value: 'recycled', label: 'Recycled' },
  { value: 'upcycled', label: 'Upcycled' },
];

const SIZE_OPTIONS: { value: ProductSize; label: string }[] = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function ProductFilter() {
  const { conditions, sizes, sortBy, setConditions, setSizes, setSortBy, resetFilters } = useFilterStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCondition = (value: ProductCondition) => {
    setConditions(
      conditions.includes(value)
        ? conditions.filter((c) => c !== value)
        : [...conditions, value]
    );
  };

  const toggleSize = (value: ProductSize) => {
    setSizes(
      sizes.includes(value)
        ? sizes.filter((s) => s !== value)
        : [...sizes, value]
    );
  };

  const hasActiveFilters = conditions.length > 0 || sizes.length > 0;

  const filterContent = (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-3">
          Sort By
        </h4>
        <div className="space-y-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${
                sortBy === option.value
                  ? 'bg-pink-50 text-pink-600 font-medium border border-pink-200'
                  : 'text-muted/70 hover:text-ink hover:bg-pink-50/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-3">
          Condition
        </h4>
        <div className="space-y-2">
          {CONDITION_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={conditions.includes(option.value)}
                onChange={() => toggleCondition(option.value)}
                className="h-4 w-4 rounded border-pink-200 text-pink-500 focus:ring-pink-300 accent-pink-500"
              />
              <span className="text-sm text-ink/70 group-hover:text-ink transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleSize(option.value)}
              className={`h-9 w-11 text-xs font-medium border-2 rounded-lg transition-all ${
                sizes.includes(option.value)
                  ? 'bg-ink text-white border-ink'
                  : 'bg-transparent text-ink/50 border-pink-200 hover:border-pink-400 hover:text-ink'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="text-xs font-semibold tracking-wider uppercase text-pink-500 hover:text-pink-600 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="w-full"
        >
          <SlidersHorizontal size={16} strokeWidth={1.5} className="mr-2" />
          Filters & Sort
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] text-white font-bold">
              {(conditions.length + sizes.length)}
            </span>
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase text-ink">Filters</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 text-muted hover:text-ink rounded-lg hover:bg-pink-50 transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      <div className="hidden lg:block sticky top-24">{filterContent}</div>
    </>
  );
}
