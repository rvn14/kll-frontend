"use client";

import { create } from "zustand";
import { cartService } from "@/services/cart.service";
import type { CartLine, Product } from "@/types";
import { toast } from "sonner";

interface CartState {
  lines: CartLine[];
  setLines: (lines: CartLine[]) => void;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleSelected: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
  add: async (product) => {
    // Optimistic update
    set((state) => {
      const existing = state.lines.find((line) => line.product.id === product.id);
      if (existing) {
        return { lines: state.lines.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) };
      }
      return { lines: [...state.lines, { product, quantity: 1, selected: true }] };
    });
    
    // API call
    try {
      await cartService.add({ item_id: product.id, quantity: 1 });
      toast.success("Added to cart");
    } catch (e) {
      toast.error("Failed to update cart on server");
    }
  },
  remove: async (productId) => {
    set((state) => ({ lines: state.lines.filter((line) => line.product.id !== productId) }));
    try {
      await cartService.remove(productId);
    } catch (e) {
      toast.error("Failed to remove from server");
    }
  },
  setQuantity: async (productId, quantity) => {
    const qty = Math.max(1, quantity);
    set((state) => ({
      lines: state.lines.map((line) => line.product.id === productId ? { ...line, quantity: qty } : line),
    }));
    try {
      await cartService.update(productId, { quantity: qty });
    } catch (e) {
      toast.error("Failed to update server quantity");
    }
  },
  toggleSelected: async (productId) => {
    const line = get().lines.find((l) => l.product.id === productId);
    if (!line) return;
    
    const newSelected = !line.selected;
    set((state) => ({
      lines: state.lines.map((l) => l.product.id === productId ? { ...l, selected: newSelected } : l),
    }));
    
    try {
      await cartService.select(productId, { is_selected: newSelected });
    } catch (e) {
      toast.error("Failed to select on server");
    }
  },
  clear: async () => {
    set({ lines: [] });
    try {
      await cartService.clear();
    } catch (e) {
      toast.error("Failed to clear server cart");
    }
  },
}));
