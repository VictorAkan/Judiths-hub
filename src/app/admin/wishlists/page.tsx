'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils';

interface WishlistEntry {
  id: string;
  product_id: string;
  created_at: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    condition: string;
  } | null;
  profile: {
    email: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export default function AdminWishlistsPage() {
  const [entries, setEntries] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/wishlists')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setEntries(data.entries ?? []);
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Heart size={20} className="text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
            Wishlists
          </h1>
        </div>
        <p className="text-sm text-muted">
          Items customers have saved ({entries.length})
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-soft">
          <Heart size={40} className="text-pink-200 mx-auto mb-3" strokeWidth={1} />
          <p className="text-sm text-muted">No saved items yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              className="bg-white border border-pink-100 rounded-2xl px-5 py-4 shadow-soft flex items-center gap-4"
            >
              <div className="w-12 h-14 bg-pink-50 rounded-xl overflow-hidden shrink-0">
                {entry.product?.images?.[0] && (
                  <img
                    src={entry.product.images[0]}
                    alt={entry.product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">
                  {entry.product?.name ?? 'Unknown product'}
                </p>
                <p className="text-xs text-muted truncate">
                  Saved by{' '}
                  <span className="text-pink-500 font-medium">
                    {entry.profile?.email ?? 'a customer'}
                  </span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-ink">
                  {entry.product ? formatPrice(entry.product.price) : '—'}
                </p>
                <p className="text-[10px] text-muted/60">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
