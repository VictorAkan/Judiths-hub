'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { useOrders } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils';
import { Package } from 'lucide-react';
import type { OrderItem } from '@/types/order';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();
  const { data: orders, isLoading } = useOrders();

  useEffect(() => {
    if (!isAuthenticated && !userId) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, userId, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-display tracking-tight text-ink mb-8">
        Order History
      </h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center">
            <Package size={32} className="text-pink-300" strokeWidth={1} />
          </div>
          <p className="text-sm text-muted">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-pink-100 bg-white p-6 rounded-2xl shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted">
                    Order placed{' '}
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-[11px] text-muted/50 mt-0.5 font-mono">
                    #{order.id.slice(0, 8)}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-pink-50 text-pink-600 border border-pink-200">
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items?.map((item: OrderItem) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-14 bg-pink-50 rounded-xl shrink-0 overflow-hidden">
                      <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{item.product_name}</p>
                      <p className="text-xs text-pink-500 mt-0.5 font-medium">{item.size.toUpperCase()} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-pink-100 mt-4 pt-3 flex justify-between">
                <span className="text-xs text-muted">Total</span>
                <span className="text-sm font-semibold text-ink">{formatPrice(order.total)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
