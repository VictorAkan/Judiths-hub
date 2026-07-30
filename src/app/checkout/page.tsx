'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/use-cart-store';
import { useAuthStore } from '@/stores/use-auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { SITE_NAME } from '@/lib/constants';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-display text-ink mb-4">Nothing to checkout</h1>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Order placed successfully!');
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display tracking-tight text-ink mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {!isAuthenticated && (
            <div className="p-4 bg-gradient-pink border border-pink-100 rounded-xl text-sm text-muted">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-pink-600 font-medium hover:text-pink-700 transition-colors underline underline-offset-2">
                Sign in
              </Link>{' '}
              for faster checkout.
            </div>
          )}

          <ScrollReveal>
            <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-soft">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-ink mb-4">
                Contact
              </h2>
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-soft">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-ink mb-4">
                Shipping
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
              <Input placeholder="Address" className="mt-3" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              <div className="grid sm:grid-cols-3 gap-3 mt-3">
                <Input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                <Input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                <Input placeholder="ZIP code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required />
              </div>
            </div>
          </ScrollReveal>

          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto group">
            {loading ? 'Processing...' : `Pay ${formatPrice(subtotal())}`}
          </Button>
        </form>

        <div className="lg:col-span-2">
          <div className="border border-pink-100 bg-white p-6 space-y-4 sticky top-24 rounded-2xl shadow-soft">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-ink">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                  <div className="w-14 h-16 bg-pink-50 rounded-xl shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-pink-500 uppercase font-medium mt-0.5">{item.size} × {item.quantity}</p>
                    <p className="text-xs font-semibold mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-pink-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold text-ink">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-muted/60">Free</span>
              </div>
              <div className="border-t border-pink-100 pt-2 flex justify-between text-base font-semibold text-ink">
                <span>Total</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
