import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductVisual } from "@/components/product/product-visual";
import { ProductGallery } from "@/components/product/product-gallery";
import { SpecificationTable } from "@/components/product/specification-table";
import { ProductGrid } from "@/components/storefront/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getItemByIdServer, getItemsServer } from "@/services/items.server.service";

type Props = { params: Promise<{ itemId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> { 
  const product = await getItemByIdServer((await params).itemId); 
  return { title: product?.name ?? "Product", description: product?.description }; 
}

export default async function ProductPage({ params }: Props) { 
  const product = await getItemByIdServer((await params).itemId); 
  
  if (!product) notFound(); 
  
  const allProducts = await getItemsServer({ limit: 5 });
  const related = allProducts.filter((item) => item.id !== product.id).slice(0, 4); 
  
  return <main id="main-content"><div className="shell py-6"><nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-bold text-ink-muted"><Link href="/">Home</Link><ChevronRight className="size-3" /><Link href="/shop">Shop</Link><ChevronRight className="size-3" /><Link href={`/category/${product.categorySlug}`}>{product.category}</Link><ChevronRight className="size-3" /><span aria-current="page" className="text-brand">{product.name}</span></nav><div className="grid gap-7 lg:grid-cols-[1.05fr_.95fr]"><ProductGallery visuals={product.visuals && product.visuals.length > 0 ? product.visuals : [product.visual]} /><ProductPurchasePanel product={product} /></div><section className="page-section grid gap-8 lg:grid-cols-[1fr_.42fr]"><div><SectionHeading eyebrow="Product details" title="Specifications" /><SpecificationTable product={product} /></div><aside className="rounded-3xl bg-soft/45 p-6"><ShieldCheck className="size-8 text-brand" /><h2 className="mt-5 text-xl font-black text-brand">Buy with clarity</h2><p className="mt-3 text-sm leading-6 text-ink-muted">Warranty, stock and delivery details are shown as guidance. The backend will confirm availability and the authoritative order total before you place the order.</p><Link href="/warranty" className="mt-5 inline-flex min-h-11 items-center text-sm font-black text-brand hover:underline">Read our warranty guide</Link></aside></section></div><section className="bg-white py-16"><div className="shell"><SectionHeading title="You might also like" href="/shop" /><ProductGrid products={related} /></div></section></main>; 
}
