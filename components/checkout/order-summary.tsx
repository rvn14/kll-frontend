"use client";

import { formatLkr } from "@/lib/formatting/currency";
import { useCartStore } from "@/stores/cart-store";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function OrderSummary() { const lines = useCartStore((state) => state.lines.filter((line) => line.selected)); const subtotal = lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.quantity, 0); const hasPendingPrices = lines.some((line) => line.product.price === null); return <Card className="h-fit rounded-3xl p-6"><h2 className="text-lg font-black text-brand">Order summary</h2><div className="mt-5 space-y-4">{lines.map((line) => <div className="flex justify-between gap-4 text-sm" key={line.product.id}><div><p className="line-clamp-2 font-bold text-brand">{line.product.name}</p><p className="mt-1 text-xs text-ink-muted">Qty {line.quantity}</p></div><span className="shrink-0 font-bold text-brand">{line.product.price === null ? "Price pending" : formatLkr(line.product.price * line.quantity)}</span></div>)}</div><Separator className="my-5" /><div><div className="flex justify-between gap-3"><span className="font-black text-brand">Estimated subtotal</span><span className="text-right text-base font-black text-brand">{hasPendingPrices ? "To be confirmed" : formatLkr(subtotal)}</span></div><p className="mt-2 text-xs leading-5 text-ink-muted">The uploaded inventory contains quantities but no prices. Future API data will provide the authoritative total.</p></div></Card>; }
