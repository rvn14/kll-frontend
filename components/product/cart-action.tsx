"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";

export function CartAction({ product, className = "", label = "Add to cart" }: { product: Product; className?: string; label?: string }) {
  const add = useCartStore((state) => state.add);
  const [added, setAdded] = useState(false);
  return (
    <Button
      type="button"
      onClick={() => { add(product); setAdded(true); window.setTimeout(() => setAdded(false), 1600); }}
      className={className}
      aria-live="polite"
    >
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}{added ? "Added" : label}
    </Button>
  );
}
