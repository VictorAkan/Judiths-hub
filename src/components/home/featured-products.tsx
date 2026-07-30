'use client';

import Link from 'next/link';
import { useFeaturedProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">
                Curated for You
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display tracking-tight text-ink">
                Featured Pieces
              </h2>
              <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium tracking-wider uppercase text-pink-500 hover:text-pink-600 transition-colors group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {(products ?? []).slice(0, 8).map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <ScrollReveal className="mt-12 text-center sm:hidden">
          <Link href="/shop">
            <Button variant="outline" className="group">
              View All Pieces
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
