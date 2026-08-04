'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  shipping_address: Record<string, string>;
  items: OrderItem[];
  customer: { email: string; first_name: string; last_name: string } | null;
}

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadOrders = () => {
    setLoading(true);
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setOrders(data.orders ?? []);
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadOrders, []);

  const updateStatus = async (orderId: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    toast.success(`Order marked as ${status}`);
    loadOrders();
  };

  const filtered = statusFilter === 'all'
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag size={20} className="text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
            Orders
          </h1>
        </div>
        <p className="text-sm text-muted">Monitor and update customer orders.</p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...STATUSES].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border-2 ${
              statusFilter === status
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent'
                : 'bg-white text-muted border-pink-200 hover:border-pink-400'
            }`}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-soft">
          <ShoppingBag size={40} className="text-pink-200 mx-auto mb-3" strokeWidth={1} />
          <p className="text-sm text-muted">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="bg-white border border-pink-100 rounded-2xl shadow-soft overflow-hidden"
            >
              {/* Order header */}
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 hover:bg-pink-50/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-ink">
                    {formatPrice(order.total)}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-pink-50 text-pink-600 border border-pink-200">
                    {order.status}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform ${expanded === order.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded details */}
              {expanded === order.id && (
                <div className="px-5 sm:px-6 pb-5 border-t border-pink-50 pt-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                        Customer
                      </p>
                      <p className="text-sm text-ink">
                        {order.customer
                          ? `${order.customer.first_name ?? ''} ${order.customer.last_name ?? ''}`.trim() || '—'
                          : '—'}
                      </p>
                      <p className="text-xs text-muted">{order.customer?.email ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                        Shipping Address
                      </p>
                      <p className="text-sm text-ink">
                        {order.shipping_address?.line1 ?? ''}
                        {order.shipping_address?.line2 ? `, ${order.shipping_address.line2}` : ''}
                        {order.shipping_address?.city ? `, ${order.shipping_address.city}` : ''}
                        {order.shipping_address?.state ? `, ${order.shipping_address.state}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 mb-4">
                    {(order.items ?? []).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 px-3 py-2 bg-gradient-pink rounded-xl">
                        <div className="w-10 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                          {item.product_image && (
                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-ink truncate">{item.product_name}</p>
                          <p className="text-xs text-muted">
                            {item.size?.toUpperCase()} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-ink">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Status update */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                      Update status:
                    </span>
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(order.id, status)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border-2 transition-all ${
                          order.status === status
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white text-muted border-pink-200 hover:border-pink-400'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
