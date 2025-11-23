import { create } from "zustand";

type ConfirmState = {
  message: string;
  onConfirm?: () => void;
  open: boolean;
  ask: (message: string, onConfirm: () => void) => void;
  close: () => void;
};

export const useConfirm = create<ConfirmState>((set) => ({
  message: "",
  open: false,
  onConfirm: undefined,
  ask: (message, onConfirm) => set({ message, onConfirm, open: true }),
  close: () => set({ open: false }),
}));
