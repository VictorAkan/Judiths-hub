'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { SITE_NAME } from '@/lib/constants';
import { Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { first_name: form.firstName, last_name: form.lastName } },
    });
    if (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success('Account created! Check your email to confirm.');
    router.push('/auth/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-pink">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white border border-pink-100 rounded-2xl p-8 shadow-soft">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={20} className="text-pink-500" />
            </div>
            <h1 className="text-2xl font-display tracking-tight text-ink">Create Account</h1>
            <p className="text-sm text-muted mt-1">Join the sustainable fashion movement</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
            </div>
            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-xs text-muted text-center mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-pink-600 font-medium hover:text-pink-700 transition-colors underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
