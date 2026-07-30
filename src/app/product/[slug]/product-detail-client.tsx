'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/use-cart-store';
import { useWishlistStore } from '@/stores/use-wishlist-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import { CONDITION_LABELS } from '@/lib/constants';
import { toast } from 'sonner';
import type { Product, ProductSize } from '@/types/product';
import { motion } from 'framer-motion';
import { SITE_NAME } from '@/lib/constants';

interface ProductDetailClientProps {
  product: Product;
}

const ALL_SIZES: ProductSize[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { isInWishlist, toggleProduct } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? '',
      size: selectedSize,
      quantity,
      slug: product.slug,
    });
    toast.success('Added to cart!');
    setQuantity(1);
    setSelectedSize(null);
  };

  const discounted =
    product.compare_at_price && product.compare_at_price > product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-xs text-muted/60 hover:text-pink-500 transition-colors mb-6"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          Back to Shop
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative aspect-[3/4] bg-pink-50 overflow-hidden rounded-2xl">
            {product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted/30">
                No image
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge variant={product.condition as 'pre-loved' | 'recycled' | 'upcycled'}>
                {CONDITION_LABELS[product.condition]}
              </Badge>
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative w-20 h-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                    selectedImage === index
                      ? 'border-pink-500 shadow-sm'
                      : 'border-transparent hover:border-pink-200'
                  )}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col lg:sticky lg:top-24 lg:self-start"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={product.condition as 'pre-loved' | 'recycled' | 'upcycled'}>
              {CONDITION_LABELS[product.condition]}
            </Badge>
            {product.eco_score > 50 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 border border-pink-200 px-3 py-1 text-xs font-medium text-pink-600">
                <Check size={12} strokeWidth={2} />
                Eco Score {product.eco_score}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-display tracking-tight text-ink">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {discounted && (
              <span className="text-base text-muted/50 line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>

          {product.material && (
            <p className="mt-2 text-sm text-muted/70">{product.material}</p>
          )}

          <p className="mt-6 text-sm text-muted leading-relaxed">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-ink/40">
                Size
              </span>
              {selectedSize && (
                <span className="text-xs font-medium text-pink-600 uppercase">
                  {selectedSize}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => {
                const inStock = product.sizes.includes(size);
                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'h-11 w-13 text-sm font-medium border-2 rounded-xl transition-all',
                      selectedSize === size
                        ? 'bg-ink text-white border-ink shadow-sm'
                        : inStock
                        ? 'bg-transparent text-ink/50 border-pink-200 hover:border-pink-400 hover:text-ink'
                        : 'bg-pink-50 text-muted/30 border-transparent cursor-not-allowed line-through'
                    )}
                  >
                    {size.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-ink/40 mb-3 block">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-11 w-11 border-2 border-pink-200 rounded-xl text-sm font-medium hover:border-pink-400 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-ink">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="h-11 w-11 border-2 border-pink-200 rounded-xl text-sm font-medium hover:border-pink-400 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 group" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                toggleProduct(product.id);
                toast.success(
                  inWishlist ? 'Removed from wishlist' : 'Added to wishlist'
                );
              }}
              className="sm:w-14"
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                className={inWishlist ? 'fill-pink-500 stroke-pink-500' : ''}
              />
            </Button>
          </div>

          {/* Sustainability note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-5 bg-gradient-pink border border-pink-100 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={16} className="text-pink-500" />
              <p className="text-xs font-semibold tracking-wider uppercase text-pink-600">
                Sustainable Choice
              </p>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              By choosing this {product.condition} piece, you&apos;re saving approximately{' '}
              <strong className="text-ink">2,700L of water</strong> and preventing{' '}
              <strong className="text-ink">6.8kg of CO₂</strong> emissions compared to buying new.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
