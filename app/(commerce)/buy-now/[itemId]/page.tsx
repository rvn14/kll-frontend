import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import { PriceDisplay } from "@/components/product/price-display";
import { ProductVisual } from "@/components/product/product-visual";
import { getItemByIdServer } from "@/services/items.server.service";

export default async function BuyNowPage({ params }: { params: Promise<{ itemId: string }> }) { 
  const product = await getItemByIdServer((await params).itemId); 
  
  if (!product) notFound(); 
  
  return (
    <main id="main-content" className="shell py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-7 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/55 text-brand">
            <Zap className="size-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Direct buy preview</p>
            <h1 className="text-2xl font-black text-brand">One product, a shorter path.</h1>
          </div>
        </div>
        <div className="panel grid gap-6 p-5 sm:grid-cols-[220px_1fr] sm:p-7">
          <ProductVisual visual={product.visual} className="aspect-square" />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold text-ink-muted">{product.id}</p>
            <h2 className="mt-2 text-2xl font-black text-brand">{product.name}</h2>
            <div className="mt-4">
              <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-muted">The direct-purchase preview API will confirm current stock, tax, delivery fees and the authoritative total during checkout.</p>
            <Link 
              href={`/checkout/delivery?directBuyItemId=${product.id}&qty=1`} 
              className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-brand px-6 text-sm font-black text-white"
            >
              Continue with this item <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  ); 
}
