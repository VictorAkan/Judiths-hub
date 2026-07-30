'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Send } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing! We\'ll keep you posted on new arrivals.');
    setEmail('');
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <ScrollReveal className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center mx-auto shadow-soft">
          <Send size={22} className="text-pink-500" strokeWidth={1.5} />
        </div>
        <span className="mt-6 block text-xs font-semibold tracking-widest uppercase text-pink-400">
          Stay in the Loop
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-display tracking-tight text-ink">
          New Arrivals,{' '}
          <span className="text-gradient">Straight to Your Inbox</span>
        </h2>
        <p className="mt-3 text-base text-muted leading-relaxed max-w-sm mx-auto">
          Be the first to know about new pre-loved drops, exclusive upcycled pieces, and sustainable fashion tips.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" className="shrink-0 group">
            Subscribe
            <Send size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </ScrollReveal>
    </section>
  );
}
