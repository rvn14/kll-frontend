"use client";

import { MessageCircle, Package, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import type { Product } from "@/types";
import { PriceDisplay } from "./price-display";
import { QuantitySelector } from "./quantity-selector";
import { StockBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const add = useCartStore((state) => state.add);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    for (let index = 0; index < quantity; index += 1) add(product);
    setMessage(`${quantity} ${quantity === 1 ? "item" : "items"} added to cart`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push(`/buy-now/${product.id}`);
  };

  return <Card className="rounded-3xl p-5 sm:p-7">
    <div className="flex flex-wrap items-center gap-2"><StockBadge stock={product.stock} />{product.badge && <Badge className="rounded-full">{product.badge}</Badge>}</div>
    <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-ink-muted">{product.category} · {product.id}</p>
    <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-brand sm:text-4xl">{product.name}</h1>
    <p className="mt-4 leading-7 text-ink-muted">{product.description}</p>
    <div className="mt-6"><PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" /></div>
    <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-ink-muted"><Package className="size-3.5 text-brand" />{product.stockQuantity === null ? "Reported quantity needs confirmation" : `${product.stockQuantity} unit${product.stockQuantity === 1 ? "" : "s"} in the uploaded stock list`}</p>
    <Separator className="my-6" />
    <div className="flex items-center justify-between gap-3"><span className="text-sm font-black text-brand">Quantity</span><QuantitySelector value={quantity} onChange={setQuantity} /></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <Button size="lg" onClick={handleAddToCart}><ShoppingBag className="size-4" />Add to cart</Button>
      <Button size="lg" variant="outline" onClick={handleBuyNow}>Buy now</Button>
    </div>
    <p className="mt-2 min-h-5 text-center text-xs font-bold text-emerald-700" aria-live="polite">{message}</p>
    <Button asChild variant="secondary" size="lg" className="mt-2 w-full"><a href={`https://wa.me/94111234567?text=${encodeURIComponent(`Hello, I would like to know more about ${product.name} (${product.id}).`)}`}><MessageCircle className="size-4" />Ask for price on WhatsApp</a></Button>
    <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm font-semibold text-ink-muted sm:grid-cols-2"><p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />{product.warranty}</p><p className="flex items-start gap-2"><Truck className="mt-0.5 size-4 shrink-0 text-brand" />Delivery date confirmed by our team</p></div>
  </Card>;
}
