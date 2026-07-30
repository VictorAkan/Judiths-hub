'use client';

import { useCartStore } from '@/stores/use-cart-store';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-18 border-b border-pink-100">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-pink-500" strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-wider uppercase text-ink">Cart</span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 text-muted hover:text-ink transition-colors rounded-lg hover:bg-pink-50"
              aria-label="Close cart"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center">
                  <ShoppingBag size={28} className="text-pink-300" strokeWidth={1} />
                </div>
                <p className="text-sm text-muted">Your cart is empty</p>
                <Button variant="outline" size="sm" onClick={() => setCartOpen(false)} asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <motion.li
                    key={`${item.productId}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 pb-4 border-b border-pink-50"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="w-20 h-24 bg-pink-50 rounded-xl flex-shrink-0 overflow-hidden"
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="text-sm font-medium text-ink hover:text-pink-600 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-pink-500 mt-0.5 uppercase font-medium">{item.size}</p>
                      <p className="text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="p-1 text-muted hover:text-ink transition-colors"
                        >
                          <Minus size={14} strokeWidth={1.5} />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="p-1 text-muted hover:text-ink transition-colors"
                        >
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="ml-auto p-1 text-muted/40 hover:text-pink-500 transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-pink-100 px-6 py-4 space-y-3 bg-gradient-pink">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="text-sm font-bold text-ink">{formatPrice(subtotal())}</span>
              </div>
              <p className="text-xs text-muted/60">
                Shipping & taxes calculated at checkout
              </p>
              <Button className="w-full group" size="md" onClick={() => setCartOpen(false)} asChild>
                <Link href="/checkout">
                  Checkout
                  <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="ghost" className="w-full text-xs" size="sm" onClick={() => setCartOpen(false)} asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
