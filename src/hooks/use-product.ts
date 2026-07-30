import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/product';

export function useProduct(slug: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
