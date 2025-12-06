import { Product } from "./products";

export interface OrderResponse {
  orders: Order[];
}

export interface Order {
  id: number;
  createdAt: string;
  deliveryAddress: string;
  documentId: string;
  totalPrice: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  price: number | string;
  documentId: string;
  quantity: number;
  title: string;
  product: Product | null;
}
