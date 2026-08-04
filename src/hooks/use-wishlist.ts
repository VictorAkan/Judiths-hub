import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/use-auth-store';
import { useWishlistStore } from '@/stores/use-wishlist-store';
import { useCallback, useMemo } from 'react';

export function useWishlist() {
  const supabase = createClient();
  const { isAuthenticated, userId } = useAuthStore();
  const localIds = useWishlistStore((s) => s.productIds);
  const { addProduct, removeProduct } = useWishlistStore();
  const queryClient = useQueryClient();

  // Fetch wishlist from Supabase when signed in
  const query = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId);
      if (error) throw error;
      return (data ?? []).map((w) => w.product_id);
    },
    enabled: isAuthenticated && !!userId,
    staleTime: 1000 * 30,
  });

  // Effective wishlist: DB ids when authenticated, local store otherwise
  const wishlistIds = useMemo(() => {
    if (isAuthenticated && userId) {
      return query.data ?? [];
    }
    return localIds;
  }, [isAuthenticated, userId, query.data, localIds]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (isAuthenticated && userId) {
        const { error } = await supabase
          .from('wishlists')
          .insert({ user_id: userId, product_id: productId })
          .select();
        if (error) throw error;
      }
      addProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (isAuthenticated && userId) {
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
        if (error) throw error;
      }
      removeProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (isInWishlist(productId)) {
        removeMutation.mutate(productId);
      } else {
        addMutation.mutate(productId);
      }
    },
    [isInWishlist, addMutation, removeMutation]
  );

  return {
    wishlistIds,
    isInWishlist,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    toggleWishlist,
    isLoading: query.isLoading,
  };
}
