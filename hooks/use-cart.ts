import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  documentId: string;
  slug: string;
  imageUrl: string;
  name: string;
  price: number;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (documentId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const items = get().items;

        const existing = items.find(
          (i) => i.name === newItem.name && i.color === newItem.color
        );

        if (existing) {
          const updated = items.map((i) =>
            i.name === newItem.name && i.color === newItem.color
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
          set({ items: updated });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeFromCart: (documentId) =>
        set({
          items: get().items.filter((i) => i.documentId !== documentId),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
