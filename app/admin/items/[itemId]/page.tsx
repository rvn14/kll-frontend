import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PriceDisplay } from "@/components/product/price-display";
import { ProductVisual } from "@/components/product/product-visual";
import { SpecificationTable } from "@/components/product/specification-table";
import { getItemByIdServer } from "@/services/items.server.service";

export default async function AdminItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) { 
  const { itemId } = await params;
  const product = await getItemByIdServer(itemId); 
  
  if (!product) notFound(); 
  
  return (
    <div>
      <AdminPageHeader 
        eyebrow="Items / Details" 
        title={product.name} 
        description={product.id} 
        actions={
          <Link href={`/admin/items/${product.id}/edit`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white">
            <Pencil className="size-4" />Edit item
          </Link>
        } 
      />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <ProductVisual visual={product.visual} className="aspect-square" />
        <section className="panel p-6">
          <p className="text-sm text-ink-muted">{product.description}</p>
          <div className="mt-5">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
          </div>
          <div className="mt-6">
            <SpecificationTable product={product} />
          </div>
        </section>
      </div>
    </div>
  ); 
}
