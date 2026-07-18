import Link from "next/link";
import { Package, ShieldCheck } from "lucide-react";
import { routes } from "@/config/routes";
import type { Product } from "@/types";
import { CartAction } from "./cart-action";
import { PriceDisplay } from "./price-display";
import { ProductVisual } from "./product-visual";
import { StockBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card role="article" className="group min-w-0 gap-0 rounded-3xl border-border bg-white p-3 py-3 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={routes.product(product.id)} className="relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
        {product.badge && <Badge className="absolute left-3 top-3 z-20 rounded-full bg-brand px-2.5 py-1 text-[11px] font-black text-white">{product.badge}</Badge>}
        <ProductVisual visual={product.visual} className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03]" />
      </Link>
      <CardContent className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-ink-muted">{product.category}</span>
          <StockBadge stock={product.stock} />
        </div>
        <Link href={routes.product(product.id)} className="line-clamp-2 min-h-12 text-base font-extrabold leading-6 text-brand hover:underline">
          {product.name}
        </Link>
        <div className="mt-3"><PriceDisplay price={product.price} originalPrice={product.originalPrice} /></div>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink-muted"><Package className="size-3.5 text-brand" />{product.stockQuantity === null ? "Quantity to confirm" : `${product.stockQuantity} unit${product.stockQuantity === 1 ? "" : "s"} reported`}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-muted"><ShieldCheck className="size-3.5 text-brand" />{product.warranty}</p>
        <CartAction product={product} className="mt-4 w-full" />
      </CardContent>
    </Card>
  );
}
