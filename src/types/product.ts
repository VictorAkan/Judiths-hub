export type ProductCondition = 'pre-loved' | 'recycled' | 'upcycled';
export type ProductSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // cents
  compare_at_price: number | null;
  condition: ProductCondition;
  sizes: ProductSize[];
  images: string[];
  material: string | null;
  category: string | null;
  style: string | null;
  in_stock: boolean;
  featured: boolean;
  eco_score: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  sizes: ProductSize[];
  conditions: ProductCondition[];
  categories: string[];
  styles: string[];
  priceRange: [number, number];
  sortBy: SortOption;
}
