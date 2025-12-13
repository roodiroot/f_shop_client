import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  documentId: string;
  slug: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  variantId: string;
  color: string;
  stock: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (documentId: string, quantity: number) => void;
  removeFromCart: (documentId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const items = get().items;

        const existing = items.find((i) => i.variantId === newItem.variantId);

        if (existing) {
          const updated = items.map((i) =>
            i.name === newItem.name
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
          set({ items: updated });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      updateItemQuantity: (documentId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === documentId ? { ...item, quantity } : item
          ),
        }));
      },

      removeFromCart: (documentId) =>
        set({
          items: get().items.filter((i) => i.variantId !== documentId),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
