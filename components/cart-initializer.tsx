"use client";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";
import { cartService } from "@/services/cart.service";
import type { CartLine } from "@/types";

export function CartInitializer() {
  const setLines = useCartStore((state) => state.setLines);

  useEffect(() => {
    cartService.get().then((cart: any) => {
      // Map backend cart format to frontend CartLine array
      if (cart && cart.items) {
        const lines: CartLine[] = cart.items.map((item: any) => ({
          product: {
            id: item.item_id.toString(),
            name: item.item.name,
            price: item.item.price,
            visual: item.item.blob?.url || "package",
            category: item.item.category?.name || "General",
            categorySlug: item.item.category?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || "general",
            description: item.item.description || "",
          },
          quantity: item.quantity,
          selected: item.is_selected,
        }));
        setLines(lines);
      } else {
        setLines([]);
      }
    }).catch(err => {
      console.error("Failed to load cart", err);
      setLines([]);
    });
  }, [setLines]);

  return null;
}
