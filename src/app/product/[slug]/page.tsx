import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/types/product';
import { ProductDetailClient } from './product-detail-client';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product as Product} />;
}
