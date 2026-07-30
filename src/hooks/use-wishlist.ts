import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/use-auth-store';
import { useWishlistStore } from '@/stores/use-wishlist-store';

export function useWishlist() {
  const supabase = createClient();
  const { isAuthenticated, userId } = useAuthStore();
  const { productIds, addProduct, removeProduct } = useWishlistStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId);
      return (data ?? []).map((w) => w.product_id);
    },
    enabled: isAuthenticated && !!userId,
    staleTime: 1000 * 60,
  });

  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (isAuthenticated && userId) {
        await supabase
          .from('wishlists')
          .insert({ user_id: userId, product_id: productId });
      }
      addProduct(productId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (isAuthenticated && userId) {
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
      }
      removeProduct(productId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  return {
    wishlistIds: isAuthenticated ? (query.data ?? []) : productIds,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    isLoading: query.isLoading,
  };
}
