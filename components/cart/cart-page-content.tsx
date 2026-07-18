"use client";

import Link from "next/link";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PriceDisplay } from "@/components/product/price-display";
import { ProductVisual } from "@/components/product/product-visual";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { formatLkr } from "@/lib/formatting/currency";
import { useCartStore } from "@/stores/cart-store";

export function CartPageContent() {
  const { lines, remove, setQuantity, toggleSelected, clear } = useCartStore();
  const selectedLines = lines.filter((line) => line.selected);
  const subtotal = selectedLines.reduce((total, line) => total + (line.product.price ?? 0) * line.quantity, 0);
  const hasPendingPrices = selectedLines.some((line) => line.product.price === null);

  if (!lines.length) return <Card className="flex min-h-[440px] flex-col items-center justify-center rounded-3xl p-8 text-center"><span className="flex size-16 items-center justify-center rounded-full bg-soft/55 text-brand"><ShoppingBag className="size-7" /></span><h1 className="mt-6 text-3xl font-black text-brand">Your cart is ready for something great.</h1><p className="mt-3 max-w-md text-ink-muted">Explore our catalogue and add the products that feel right for your home.</p><ButtonLink href="/shop" className="mt-7">Start shopping <ArrowRight className="size-4" /></ButtonLink></Card>;

  return <div>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Your selection</p><h1 className="mt-2 text-4xl font-black tracking-tight text-brand">Shopping cart</h1><p className="mt-2 text-sm text-ink-muted">{lines.length} products · {selectedLines.length} selected for checkout</p></div><Button variant="ghost" onClick={clear} className="text-red-700">Clear cart</Button></div>
    <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">{lines.map((line) => <Card key={line.product.id} className={`grid gap-4 rounded-3xl p-4 py-4 transition sm:grid-cols-[auto_130px_1fr_auto] sm:items-center ${line.selected ? "border-brand/20" : "opacity-65"}`}>
        <div className="flex size-11 items-center justify-center"><Checkbox checked={line.selected} onCheckedChange={() => toggleSelected(line.product.id)} aria-label={`Select ${line.product.name} for checkout`} /></div>
        <ProductVisual visual={line.product.visual} className="aspect-square w-full max-w-[130px]" />
        <div className="min-w-0"><Link href={`/product/${line.product.id}`} className="line-clamp-2 font-black text-brand hover:underline">{line.product.name}</Link><p className="mt-1 text-xs font-semibold text-ink-muted">{line.product.warranty}</p><div className="mt-3"><PriceDisplay price={line.product.price} size="sm" /></div></div>
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end"><div className="inline-flex h-11 items-center rounded-full border border-border"><Button variant="ghost" size="icon-sm" onClick={() => setQuantity(line.product.id, line.quantity - 1)} disabled={line.quantity <= 1} aria-label={`Decrease ${line.product.name} quantity`}><Minus className="size-3.5" /></Button><span className="w-7 text-center text-sm font-black">{line.quantity}</span><Button variant="ghost" size="icon-sm" onClick={() => setQuantity(line.product.id, line.quantity + 1)} aria-label={`Increase ${line.product.name} quantity`}><Plus className="size-3.5" /></Button></div><Button variant="destructive" size="sm" onClick={() => remove(line.product.id)}><Trash2 className="size-4" />Remove</Button></div>
      </Card>)}</div>
      <Card className="h-fit rounded-3xl p-6 lg:sticky lg:top-40"><h2 className="text-xl font-black text-brand">Order summary</h2><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4 text-ink-muted"><span>Selected items</span><span>{selectedLines.reduce((total, line) => total + line.quantity, 0)}</span></div><div className="flex justify-between gap-4 text-ink-muted"><span>Delivery</span><span>Confirmed at checkout</span></div><Separator /><div><div className="flex items-end justify-between gap-4"><span className="font-black text-brand">Estimated subtotal</span><span className="text-right text-lg font-black text-brand">{hasPendingPrices ? "Price confirmation required" : formatLkr(subtotal)}</span></div><p className="mt-2 text-xs leading-5 text-ink-muted">Prices were not included in the uploaded stock list. The backend will later provide authoritative totals.</p></div></div><ButtonLink href="/checkout/delivery" className={`mt-6 w-full ${selectedLines.length ? "" : "pointer-events-none opacity-50"}`}>Continue to enquiry <ArrowRight className="size-4" /></ButtonLink><p className="mt-4 flex items-start gap-2 text-xs leading-5 text-ink-muted"><Check className="mt-0.5 size-3.5 shrink-0 text-brand" />Selected items only will move to the enquiry flow.</p></Card>
    </div>
  </div>;
}
