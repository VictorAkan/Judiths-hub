'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Admin area has its own layout — no storefront navbar, footer, or cart
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-18 min-h-[60vh]">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
