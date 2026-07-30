import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  productIds: string[];

  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  toggleProduct: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      addProduct: (productId) => {
        if (!get().productIds.includes(productId)) {
          set({ productIds: [...get().productIds, productId] });
        }
      },

      removeProduct: (productId) => {
        set({
          productIds: get().productIds.filter((id) => id !== productId),
        });
      },

      toggleProduct: (productId) => {
        if (get().isInWishlist(productId)) {
          get().removeProduct(productId);
        } else {
          get().addProduct(productId);
        }
      },

      isInWishlist: (productId) => get().productIds.includes(productId),
    }),
    { name: 'jwears-wishlist' }
  )
);
