'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const { userId, firstName, lastName, email, isAuthenticated, clearUser } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !userId) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, userId, router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearUser();
    toast.success('Signed out');
    router.push('/');
    router.refresh();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-pink-500" />
            <h1 className="text-3xl font-display tracking-tight text-ink">My Account</h1>
          </div>
          <p className="text-sm text-muted mt-1">
            {firstName || lastName ? `${firstName ?? ''} ${lastName ?? ''}`.trim() : email}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted hover:text-pink-500">
          <LogOut size={16} strokeWidth={1.5} className="mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/account/orders"
          className="flex flex-col items-center gap-3 p-8 border border-pink-100 bg-white hover:bg-pink-50/50 transition-all duration-200 text-center rounded-2xl shadow-soft hover:shadow-glow group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Package size={26} className="text-pink-500" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-ink">Order History</span>
          <span className="text-xs text-muted/60">View your past orders</span>
        </Link>
        <Link
          href="/account/wishlist"
          className="flex flex-col items-center gap-3 p-8 border border-pink-100 bg-white hover:bg-pink-50/50 transition-all duration-200 text-center rounded-2xl shadow-soft hover:shadow-glow group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart size={26} className="text-pink-500" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-ink">Wishlist</span>
          <span className="text-xs text-muted/60">Your saved pieces</span>
        </Link>
        <Link
          href="/account/profile"
          className="flex flex-col items-center gap-3 p-8 border border-pink-100 bg-white hover:bg-pink-50/50 transition-all duration-200 text-center rounded-2xl shadow-soft hover:shadow-glow group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <User size={26} className="text-pink-500" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-ink group-hover:text-pink-600 transition-colors">Profile</span>
          <span className="text-xs text-muted/60">View and edit your details</span>
        </Link>
      </div>
    </div>
  );
}
