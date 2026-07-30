import Link from 'next/link';
import { Heart, Mail, MapPin } from 'lucide-react';
import { SITE_NAME, SITE_EMAIL, SITE_ADDRESS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-white mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Affordable, beautiful, and sustainable fashion. Every purchase gives
              pre-loved clothing a second life.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                <Mail size={14} className="text-pink-400" />
                {SITE_EMAIL}
              </a>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-pink-400 mt-0.5 shrink-0" />
                <span>{SITE_ADDRESS}</span>
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">All Dresses</Link></li>
              <li><Link href="/shop?condition=pre-loved" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">Pre-Loved</Link></li>
              <li><Link href="/shop?condition=recycled" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">Recycled</Link></li>
              <li><Link href="/shop?condition=upcycled" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">Upcycled</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li><Link href="/account/orders" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">Track Order</Link></li>
              <li><Link href="/account" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">My Account</Link></li>
              <li><Link href="/#sustainability" className="text-sm text-ink/60 hover:text-pink-500 transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4">
              Our Impact
            </h4>
            <div className="space-y-3 text-sm text-muted">
              <p className="flex items-center gap-2">
                <Heart size={14} className="text-pink-400" strokeWidth={1.5} />
                Every item saves 2,700L of water
              </p>
              <p className="flex items-center gap-2">
                <Heart size={14} className="text-pink-400" strokeWidth={1.5} />
                Keeps clothes out of landfills
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/70">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted/50">
            Fashion that doesn&apos;t cost the earth.
          </p>
        </div>
      </div>
    </footer>
  );
}
