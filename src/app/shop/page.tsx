'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductFilter } from '@/components/product/product-filter';
import { Skeleton } from '@/components/ui/skeleton';
import { useFilterStore } from '@/stores/use-filter-store';
import { useEffect, useMemo } from 'react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const { data: allProducts, isLoading } = useProducts();
  const { conditions, sizes, priceRange, sortBy, setConditions } = useFilterStore();

  useEffect(() => {
    const conditionParam = searchParams.get('condition');
    if (conditionParam) {
      setConditions([conditionParam as any]);
    }
  }, [searchParams, setConditions]);

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    let results = [...allProducts];
    if (conditions.length > 0) {
      results = results.filter((p) => conditions.includes(p.condition));
    }
    if (sizes.length > 0) {
      results = results.filter((p) =>
        p.sizes.some((s) => sizes.includes(s))
      );
    }
    results = results.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }
    return results;
  }, [allProducts, conditions, sizes, priceRange, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ScrollReveal>
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">
            Browse Our Collection
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display tracking-tight text-ink">
            All Pieces
          </h1>
          <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
          <p className="mt-3 text-sm text-muted">
            {isLoading ? 'Loading...' : `${filteredProducts.length} pieces available`}
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <ProductFilter />
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
