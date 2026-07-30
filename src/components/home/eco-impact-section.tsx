'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';
import { Recycle, Droplets, Wind, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: Droplets,
    value: '2,700L',
    label: 'Water saved per item',
    description: 'The average dress takes 2,700 litres of water to produce. By choosing pre-loved, you save every drop.',
  },
  {
    icon: Wind,
    value: '6.8 kg',
    label: 'CO₂ prevented',
    description: 'Every reused garment prevents 6.8kg of carbon emissions from entering the atmosphere.',
  },
  {
    icon: Package,
    value: '2.3 kg',
    label: 'Waste diverted',
    description: 'Keep textiles out of landfills — 92 million tonnes of clothing waste are discarded globally each year.',
  },
  {
    icon: Recycle,
    value: '100%',
    label: 'Circular fashion',
    description: 'Every purchase supports a circular economy where clothes are loved, re-loved, and never wasted.',
  },
];

export function EcoImpactSection() {
  return (
    <section id="sustainability" className="py-24 sm:py-32 bg-gradient-pink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">
              Sustainability
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display tracking-tight text-ink">
              Fashion That{' '}
              <span className="text-gradient">Gives Back</span>
            </h2>
            <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
            <p className="mt-6 text-base text-muted leading-relaxed">
              The fashion industry is one of the largest polluters on the planet. 
              We&apos;re changing that — one beautiful dress at a time. Every purchase 
              on Judith&apos;s Hub directly reduces waste, saves water, and cuts carbon emissions.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Pre-Loved', 'Recycled', 'Upcycled'].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-full bg-white border border-pink-200 px-3.5 py-1.5 text-xs font-medium text-pink-600 tracking-wide shadow-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-pink-100 shadow-soft h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
                    <stat.icon size={20} className="text-pink-500" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 text-2xl sm:text-3xl font-display text-ink">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold tracking-wider uppercase text-pink-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-xs text-muted/70 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
