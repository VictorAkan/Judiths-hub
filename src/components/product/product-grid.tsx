import type { Product } from '@/types/product';
import { ProductCard } from './product-card';
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-display text-ink">No pieces found</p>
        <p className="text-sm text-muted mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <StaggerContainer
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      staggerDelay={0.05}
    >
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
