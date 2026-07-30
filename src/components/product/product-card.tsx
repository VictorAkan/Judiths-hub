'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';
import { useWishlistStore } from '@/stores/use-wishlist-store';
import { CONDITION_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleProduct } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col"
    >
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-pink-50 rounded-2xl"
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted/30 text-sm">
            No image
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge variant={product.condition as 'pre-loved' | 'recycled' | 'upcycled'}>
            {CONDITION_LABELS[product.condition]}
          </Badge>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wide uppercase shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleProduct(product.id);
          }}
          className={cn(
            'absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200',
            'opacity-0 group-hover:opacity-100 focus:opacity-100',
            inWishlist && 'opacity-100 bg-white/90 shadow-sm',
            !inWishlist && 'bg-white/70 backdrop-blur-sm hover:bg-white'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={cn(
              'transition-colors',
              inWishlist
                ? 'fill-pink-500 stroke-pink-500'
                : 'stroke-ink/40'
            )}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1 px-0.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-ink group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-xs text-muted/50 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        {product.material && (
          <p className="text-xs text-muted/60">{product.material}</p>
        )}
      </div>
    </motion.div>
  );
}
