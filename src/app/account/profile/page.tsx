'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Sparkles, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { userId, firstName, lastName, email, isAuthenticated, setUser } = useAuthStore();
  const [form, setForm] = useState({
    first_name: firstName ?? '',
    last_name: lastName ?? '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !userId) {
      router.push('/auth/login');
    }
    if (firstName || lastName) {
      setForm({ first_name: firstName ?? '', last_name: lastName ?? '' });
    }
  }, [isAuthenticated, userId, firstName, lastName, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ first_name: form.first_name, last_name: form.last_name })
      .eq('id', userId);

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    // Update local store
    setUser({
      id: userId!,
      email,
      first_name: form.first_name,
      last_name: form.last_name,
      avatar_url: null,
    });

    toast.success('Profile updated!');
    setSaving(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/account"
          className="text-xs text-muted/60 hover:text-pink-500 transition-colors"
        >
          ← Back to My Account
        </Link>
      </div>

      <ScrollReveal>
        <div className="bg-white border border-pink-100 rounded-2xl p-6 sm:p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-glow">
              <User size={26} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-pink-500" />
                <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
                  My Profile
                </h1>
              </div>
              <p className="text-sm text-muted mt-0.5">
                Update your personal information
              </p>
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="mb-6 p-4 bg-gradient-pink border border-pink-100 rounded-xl flex items-center gap-3">
            <Mail size={18} className="text-pink-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                Email Address
              </p>
              <p className="text-sm text-ink truncate">{email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                First Name
              </label>
              <Input
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                placeholder="Your first name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                Last Name
              </label>
              <Input
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                placeholder="Your last name"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="group" disabled={saving}>
                <Save size={16} className="mr-1.5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href="/account">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
