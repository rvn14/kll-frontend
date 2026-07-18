"use client";

import { create } from "zustand";
import { products } from "@/mocks/data";
import type { CartLine, Product } from "@/types";

interface CartState {
  lines: CartLine[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleSelected: (productId: string) => void;
  clear: () => void;
}

const mockLines: CartLine[] = [
  { product: products[0], quantity: 1, selected: true },
  { product: products[4], quantity: 1, selected: true },
];

export const useCartStore = create<CartState>((set) => ({
  lines: process.env.NEXT_PUBLIC_USE_MOCKS === "false" ? [] : mockLines,
  add: (product) => set((state) => {
    const existing = state.lines.find((line) => line.product.id === product.id);
    if (existing) {
      return { lines: state.lines.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) };
    }
    return { lines: [...state.lines, { product, quantity: 1, selected: true }] };
  }),
  remove: (productId) => set((state) => ({ lines: state.lines.filter((line) => line.product.id !== productId) })),
  setQuantity: (productId, quantity) => set((state) => ({
    lines: state.lines.map((line) => line.product.id === productId ? { ...line, quantity: Math.max(1, quantity) } : line),
  })),
  toggleSelected: (productId) => set((state) => ({
    lines: state.lines.map((line) => line.product.id === productId ? { ...line, selected: !line.selected } : line),
  })),
  clear: () => set({ lines: [] }),
}));
