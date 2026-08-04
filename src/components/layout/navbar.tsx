'use client';

import Link from 'next/link';
import { Heart, User, Search } from 'lucide-react';
import { CartIcon } from '@/components/cart/cart-icon';
import { useAuthStore } from '@/stores/use-auth-store';
import { MobileNav } from './mobile-nav';
import { SITE_NAME } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { ADMIN_EMAIL } from '@/lib/admin-constants';

export function Navbar() {
  const { isAuthenticated, email } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-rose-600 transition-all duration-300">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-sm tracking-wider uppercase text-ink/60 hover:text-pink-500 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-pink-400 after:transition-all hover:after:w-full"
          >
            Shop
          </Link>
          <Link
            href="/shop?condition=pre-loved"
            className="text-sm tracking-wider uppercase text-ink/60 hover:text-pink-500 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-pink-400 after:transition-all hover:after:w-full"
          >
            Pre-Loved
          </Link>
          <Link
            href="/shop?condition=upcycled"
            className="text-sm tracking-wider uppercase text-ink/60 hover:text-pink-500 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-pink-400 after:transition-all hover:after:w-full"
          >
            Upcycled
          </Link>
          <Link
            href="/#sustainability"
            className="text-sm tracking-wider uppercase text-ink/60 hover:text-pink-500 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-pink-400 after:transition-all hover:after:w-full"
          >
            Our Impact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden md:flex p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link
            href={isAuthenticated ? '/account/wishlist' : '/auth/login'}
            className="hidden md:flex p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50"
            aria-label="Wishlist"
          >
            <Heart size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href={isAuthenticated ? '/account' : '/auth/login'}
            className="hidden md:flex p-2.5 text-ink/50 hover:text-pink-500 transition-colors rounded-full hover:bg-pink-50"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-glow transition-all"
            >
              Admin
            </Link>
          )}
          <CartIcon />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
