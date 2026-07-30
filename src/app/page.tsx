'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeaturedProducts } from '@/components/home/featured-products';
import { EcoImpactSection } from '@/components/home/eco-impact-section';
import { NewsletterSignup } from '@/components/home/newsletter-signup';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-pink">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-pink-200 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-pink-600 shadow-sm">
                  <Sparkles size={14} />
                  Sustainable Style
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 heading-1 text-ink"
              >
                Beautiful Fashion,
                <br />
                <span className="text-gradient">Kind to the Planet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-4 body-base text-muted max-w-md"
              >
                Discover pre-loved, recycled, and upcycled dresses that combine
                high-end style with eco-conscious values — at prices that feel good.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Shop Now
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/#sustainability">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Our Impact
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right: Editorial Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="hidden lg:block relative h-[550px]"
            >
              {/* Main image — tall, left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-[220px] h-[340px] rounded-2xl overflow-hidden shadow-xl shadow-pink-200/30 border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
                  alt="Elegant dress"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Secondary image — right, lower */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="absolute top-20 right-0 w-[200px] h-[280px] rounded-2xl overflow-hidden shadow-xl shadow-rose-200/30 border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80"
                  alt="Silk dress"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Tertiary image — bottom left, overlapping */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-0 left-24 w-[180px] h-[240px] rounded-2xl overflow-hidden shadow-xl shadow-pink-200/20 border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80"
                  alt="Boho dress"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-2 right-8 bg-white rounded-2xl px-5 py-3 shadow-lg border border-pink-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                  <Sparkles size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Eco-Friendly</p>
                  <p className="text-[11px] text-muted">Every piece matters</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-pink-300">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-pink-300 to-transparent"
          />
        </motion.div>
      </section>

      <FeaturedProducts />
      <EcoImpactSection />
      <NewsletterSignup />
    </>
  );
}
