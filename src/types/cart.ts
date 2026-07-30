import type { ProductSize } from './product';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: ProductSize;
  quantity: number;
  slug: string;
}
