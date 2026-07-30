import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] bg-ivory overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-ivory to-sand/40" />
      <div className="absolute inset-0 bg-[url('/hero-dress.jpg')] bg-cover bg-center bg-no-repeat opacity-30" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-lg animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-sage">
            Sustainable Style
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight text-charcoal leading-[1.08]">
            Beautiful Fashion,
            <br />
            <span className="text-stone">Kind to the Planet</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone leading-relaxed max-w-md">
            Discover pre-loved, recycled, and upcycled dresses that combine
            high-end style with eco-conscious values — at prices that feel good.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link href="/#sustainability">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone/40">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-stone/20" />
      </div>
    </section>
  );
}
