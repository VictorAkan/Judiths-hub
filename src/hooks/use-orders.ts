import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/use-auth-store';
import type { Order } from '@/types/order';

export function useOrders() {
  const supabase = createClient();
  const { userId, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        (orders ?? []).map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);
          return { ...order, items: items ?? [] } as Order;
        })
      );

      return ordersWithItems;
    },
    enabled: isAuthenticated && !!userId,
    staleTime: 1000 * 60,
  });
}
