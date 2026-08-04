'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import {
  Package,
  ShoppingBag,
  Users,
  Heart,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  products: number;
  orders: number;
  users: number;
  wishlists: number;
  pendingOrders: number;
  revenue: number;
}

interface RecentOrder {
  id: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStats(data.stats);
        setRecentOrders(data.recentOrders ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Products', value: stats.products, icon: Package, color: 'from-pink-500 to-rose-500' },
        { label: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'from-rose-400 to-pink-600' },
        { label: 'Customers', value: stats.users, icon: Users, color: 'from-pink-400 to-rose-500' },
        { label: 'Saved Items', value: stats.wishlists, icon: Heart, color: 'from-rose-500 to-pink-400' },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={20} className="text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
            Dashboard Overview
          </h1>
        </div>
        <p className="text-sm text-muted">Welcome back — here&apos;s what&apos;s happening with Judith&apos;s Hub.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-600 mb-6">
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))
          : statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-pink-100 rounded-2xl p-5 sm:p-6 shadow-soft"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon size={20} className="text-white" strokeWidth={1.5} />
                </div>
                <p className="text-2xl sm:text-3xl font-display text-ink">{card.value}</p>
                <p className="text-xs text-muted mt-1">{card.label}</p>
              </motion.div>
            ))}
      </div>

      {/* Revenue + pending orders */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {loading ? (
          <>
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-glow"
            >
              <p className="text-sm text-white/80 font-medium">Total Revenue</p>
              <p className="text-3xl sm:text-4xl font-display mt-2">
                {formatPrice(stats?.revenue ?? 0)}
              </p>
              <p className="text-xs text-white/70 mt-2">Across all orders</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-pink-100 rounded-2xl p-6 shadow-soft"
            >
              <p className="text-sm text-muted font-medium">Pending Orders</p>
              <p className="text-3xl sm:text-4xl font-display mt-2 text-ink">
                {stats?.pendingOrders ?? 0}
              </p>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1 text-xs font-medium text-pink-500 hover:text-pink-600 transition-colors mt-3"
              >
                Review now <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-ink">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-pink-500 hover:text-pink-600 transition-colors"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <p className="text-sm text-muted py-8 text-center">No orders yet</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-4 py-3 bg-gradient-pink rounded-xl border border-pink-100"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink">
                    {formatPrice(order.total)}
                  </p>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                      order.status === 'pending'
                        ? 'text-amber-600'
                        : order.status === 'delivered'
                        ? 'text-emerald-600'
                        : 'text-pink-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
