'use client';

import { useCartStore } from '@/stores/use-cart-store';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CartIconProps {
  className?: string;
}

export function CartIcon({ className }: CartIconProps) {
  const { toggleCart, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggleCart}
      className={cn('relative p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50', className)}
      aria-label="Open cart"
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      {mounted && itemCount() > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-bold text-white shadow-sm">
          {itemCount()}
        </span>
      )}
    </button>
  );
}
