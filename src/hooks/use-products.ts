import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/product';

export function useProducts() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProducts() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) throw error;
      return data as Product[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
