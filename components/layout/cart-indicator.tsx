"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export function CartIndicator({ mobile = false }: { mobile?: boolean }) {
  const count = useCartStore((state) => state.lines.reduce((total, line) => total + line.quantity, 0));
  return (
    <Link href="/cart" className={`relative flex min-h-11 items-center justify-center gap-2 rounded-full text-brand transition hover:bg-soft/55 ${mobile ? "size-11" : "px-3"}`} aria-label={`Cart with ${count} items`}>
      <ShoppingBag className="size-5" />
      {!mobile && <span className="hidden text-sm font-bold xl:inline">Cart</span>}
      {count > 0 && <span className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-black text-white ring-2 ring-white">{count}</span>}
    </Link>
  );
}
