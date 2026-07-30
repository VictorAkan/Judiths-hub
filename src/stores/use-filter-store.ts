import { create } from 'zustand';
import type { ProductCondition, ProductSize, SortOption } from '@/types/product';

interface FilterState {
  sizes: ProductSize[];
  conditions: ProductCondition[];
  categories: string[];
  styles: string[];
  priceRange: [number, number];
  sortBy: SortOption;
  search: string;

  setSizes: (sizes: ProductSize[]) => void;
  setConditions: (conditions: ProductCondition[]) => void;
  setCategories: (categories: string[]) => void;
  setStyles: (styles: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const DEFAULTS = {
  sizes: [] as ProductSize[],
  conditions: [] as ProductCondition[],
  categories: [],
  styles: [],
  priceRange: [0, 50000] as [number, number],
  sortBy: 'newest' as SortOption,
  search: '',
};

export const useFilterStore = create<FilterState>()((set) => ({
  ...DEFAULTS,

  setSizes: (sizes) => set({ sizes }),
  setConditions: (conditions) => set({ conditions }),
  setCategories: (categories) => set({ categories }),
  setStyles: (styles) => set({ styles }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearch: (search) => set({ search }),
  resetFilters: () => set(DEFAULTS),
}));
