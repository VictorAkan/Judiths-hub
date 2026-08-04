'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { createClient } from '@/lib/supabase/client';
import { ADMIN_EMAIL } from '@/lib/admin-constants';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Heart,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/wishlists', label: 'Wishlists', icon: Heart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { email, isAuthenticated } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      const userEmail = session?.user?.email;
      if (!session || userEmail?.toLowerCase() !== ADMIN_EMAIL) {
        router.replace('/admin/login');
      }
      setChecking(false);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success('Signed out of admin');
    router.push('/admin/login');
    router.refresh();
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-pink">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
          <p className="text-sm text-muted">Checking access...</p>
        </div>
      </div>
    );
  }

  // Render admin login page as a full-page wrapper for /admin/login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-pink flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white rounded-xl shadow-md text-ink/60 hover:text-pink-500"
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || pathname !== '/admin/login') && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className={cn(
              'fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-50 w-64 shrink-0',
              'bg-ink text-white flex flex-col',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            )}
          >
            {/* Logo */}
            <div className="h-18 flex items-center justify-between px-6 border-b border-white/10">
              <Link href="/admin" className="flex items-center gap-2">
                <Sparkles size={20} className="text-pink-400" />
                <span className="font-display text-xl tracking-tight">
                  Judith&apos;s Hub
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all',
                      active
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-glow'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon size={18} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-white/10 space-y-2">
              <p className="px-4 text-xs text-white/40 truncate">{email}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <LogOut size={18} strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
