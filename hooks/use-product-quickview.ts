// stores/useProductQuickview.ts
import { ProductAttributes } from "@/types/products";
import { create } from "zustand";

type State = {
  product: ProductAttributes | null;
  isOpen: boolean;

  open: (product: ProductAttributes) => void;
  close: () => void;
  update: (product: Partial<ProductAttributes>) => void;
};

export const useProductQuickview = create<State>((set) => ({
  product: null,
  isOpen: false,

  open: (product) => set({ product, isOpen: true }),

  close: () => set({ isOpen: false, product: null }),

  update: (data) =>
    set((state) => ({
      product: state.product ? { ...state.product, ...data } : null,
    })),
}));
