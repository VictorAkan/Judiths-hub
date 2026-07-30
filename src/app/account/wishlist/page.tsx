'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { useWishlist } from '@/hooks/use-wishlist';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid } from '@/components/product/product-grid';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();
  const { wishlistIds } = useWishlist();
  const { data: allProducts } = useProducts();

  useEffect(() => {
    if (!isAuthenticated && !userId) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, userId, router]);

  if (!isAuthenticated) return null;

  const wishlistProducts = allProducts?.filter((p) =>
    wishlistIds.includes(p.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-display tracking-tight text-ink mb-8">
        My Wishlist
      </h1>

      {!wishlistProducts || wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center">
            <Heart size={32} className="text-pink-300" strokeWidth={1} />
          </div>
          <p className="text-sm text-muted">Your wishlist is empty</p>
          <p className="text-xs text-muted/60">Save your favorite pieces here</p>
        </div>
      ) : (
        <ProductGrid products={wishlistProducts} />
      )}
    </div>
  );
}
