'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center shadow-soft">
          <CheckCircle size={40} className="text-pink-500" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-display tracking-tight text-ink mb-3"
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted leading-relaxed mb-2"
      >
        Thank you for your purchase. You&apos;ve just made a sustainable choice
        that helps reduce fashion waste.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-muted/60 mb-8"
      >
        A confirmation email will be sent shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <Link href="/account/orders">
          <Button variant="outline">View Orders</Button>
        </Link>
        <Link href="/shop">
          <Button className="group">
            Continue Shopping
            <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-10 p-6 bg-gradient-pink border border-pink-100 rounded-2xl text-left"
      >
        <p className="text-xs font-semibold tracking-wider uppercase text-pink-600 mb-3">
          Your Impact
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 rounded-xl p-3 border border-pink-100">
            <p className="text-lg font-display text-ink">2,700L</p>
            <p className="text-[10px] text-pink-500 uppercase tracking-wider font-medium">Water Saved</p>
          </div>
          <div className="bg-white/80 rounded-xl p-3 border border-pink-100">
            <p className="text-lg font-display text-ink">6.8 kg</p>
            <p className="text-[10px] text-pink-500 uppercase tracking-wider font-medium">CO₂ Prevented</p>
          </div>
          <div className="bg-white/80 rounded-xl p-3 border border-pink-100">
            <p className="text-lg font-display text-ink">2.3 kg</p>
            <p className="text-[10px] text-pink-500 uppercase tracking-wider font-medium">Waste Diverted</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
