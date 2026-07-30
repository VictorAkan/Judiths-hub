'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/use-auth-store';
import { SITE_NAME, SITE_EMAIL, SITE_ADDRESS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50"
        aria-label="Open menu"
      >
        <Menu size={18} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex items-center justify-between h-18 px-4 border-b border-pink-100">
              <span className="font-display text-2xl tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
              <button onClick={() => setIsOpen(false)} className="p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50" aria-label="Close menu">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-10">
              {[
                { href: '/shop', label: 'Shop All' },
                { href: '/shop?condition=pre-loved', label: 'Pre-Loved' },
                { href: '/shop?condition=recycled', label: 'Recycled' },
                { href: '/shop?condition=upcycled', label: 'Upcycled' },
                { href: '/#sustainability', label: 'Our Impact' },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-lg tracking-wider uppercase text-ink/60 hover:text-pink-500 transition-colors border-b border-pink-50"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 mt-4"
              >
                <Link
                  href={isAuthenticated ? '/account' : '/auth/login'}
                  onClick={() => setIsOpen(false)}
                  className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 text-sm font-medium tracking-wider uppercase"
                >
                  {isAuthenticated ? 'My Account' : 'Sign In'}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
