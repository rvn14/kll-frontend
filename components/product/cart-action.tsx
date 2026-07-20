"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";

export function CartAction({ product, className = "", label = "Add to cart" }: { product: Product; className?: string; label?: string }) {
  const add = useCartStore((state) => state.add);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={className}
      aria-live="polite"
    >
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}{added ? "Added" : label}
    </Button>
  );
}
