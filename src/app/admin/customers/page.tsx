'use client';

import { useEffect, useState } from 'react';
import { Users, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/customers')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCustomers(data.customers ?? []);
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users size={20} className="text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
            Customers
          </h1>
        </div>
        <p className="text-sm text-muted">{customers.length} registered users</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-soft">
          <Users size={40} className="text-pink-200 mx-auto mb-3" strokeWidth={1} />
          <p className="text-sm text-muted">No customers yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="bg-white border border-pink-100 rounded-2xl px-5 py-4 shadow-soft flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-pink-500" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">
                    {customer.first_name || customer.last_name
                      ? `${customer.first_name ?? ''} ${customer.last_name ?? ''}`.trim()
                      : 'Customer'}
                  </p>
                  <p className="text-xs text-muted flex items-center gap-1 truncate">
                    <Mail size={11} className="shrink-0" />
                    {customer.email}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted/60 shrink-0">
                Joined {new Date(customer.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
