'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/use-cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center">
            <ShoppingBag size={40} className="text-pink-300" strokeWidth={1} />
          </div>
          <h1 className="text-2xl font-display text-ink">Your cart is empty</h1>
          <p className="text-sm text-muted">Add some pre-loved pieces to get started.</p>
          <Link href="/shop">
            <Button variant="primary" className="mt-2 group">
              Continue Shopping
              <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display tracking-tight text-ink mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={`${item.productId}-${item.size}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 sm:gap-6 p-5 border border-pink-100 bg-white rounded-2xl shadow-soft"
            >
              <Link
                href={`/product/${item.slug}`}
                className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 bg-pink-50 rounded-xl overflow-hidden"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-sm font-medium text-ink hover:text-pink-600 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-pink-500 mt-0.5 uppercase font-medium">{item.size}</p>
                  <p className="text-sm font-semibold mt-2 text-ink">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border-2 border-pink-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-pink-50 transition-colors"
                    >
                      <Minus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="w-9 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-pink-50 transition-colors"
                    >
                      <Plus size={12} strokeWidth={1.5} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-muted/40 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-pink-50"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-pink-100 bg-white p-6 space-y-4 sticky top-24 rounded-2xl shadow-soft">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-ink">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold text-ink">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-muted/60">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-pink-100 pt-4">
              <div className="flex justify-between text-base font-semibold text-ink">
                <span>Estimated Total</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full group" size="lg">
                Checkout
                <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link
              href="/shop"
              className="flex items-center justify-center gap-1 text-xs text-muted/60 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={1.5} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
