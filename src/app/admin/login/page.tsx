'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/admin-constants';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate against dedicated admin credentials
    const isCorrectEmail = email.trim().toLowerCase() === ADMIN_EMAIL;
    const isCorrectPassword = password === ADMIN_PASSWORD;

    if (!isCorrectEmail || !isCorrectPassword) {
      toast.error('Invalid admin credentials');
      setLoading(false);
      return;
    }

    // Sign in via Supabase (admin user is provisioned via ensure-admin-user API)
    try {
      const supabase = createClient();

      // First, try to sign in directly
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (signInError) {
        // Admin user may not exist yet — provision it server-side, then retry
        await fetch('/api/admin/ensure-user');
        const retry = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });
        if (retry.error) throw retry.error;
      }

      toast.success('Welcome, Admin!');
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-pink">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-pink-100 rounded-2xl p-8 sm:p-10 shadow-soft">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
              Admin Portal
            </h1>
            <p className="text-sm text-muted mt-2">
              Restricted access — authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40" />
              <Input
                type="email"
                placeholder="Admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-11"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40" />
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-11"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading} size="lg">
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <p className="text-xs text-muted/60 text-center mt-6">
            For store owner use only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
