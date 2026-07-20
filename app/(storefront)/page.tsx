import { ArrowRight, Mail } from "lucide-react";
import { CategoryShortcuts } from "@/components/storefront/category-shortcuts";
import { HeroBanner } from "@/components/storefront/hero-banner";
import { ProductGrid } from "@/components/storefront/product-grid";
import { PromoBlocks } from "@/components/storefront/promo-blocks";
import { TrustStrip } from "@/components/storefront/trust-strip";
import { SectionHeading } from "@/components/ui/section-heading";
import { getItemsServer } from "@/services/items.server.service";
import { getCategoriesServer } from "@/services/categories.server.service";

export default async function HomePage() {
  const products = await getItemsServer({ limit: 8 });
  const categories = await getCategoriesServer();
  
  return (
    <main id="main-content">
      <HeroBanner />
      <section className="shell page-section"><SectionHeading eyebrow="Browse your way" title="Everything for a better home" description="Start with the room or product you have in mind." href="/shop" /><CategoryShortcuts categories={categories} /></section>
      <section className="bg-white py-14 sm:py-20"><div className="shell"><SectionHeading eyebrow="Current shop stock" title="Televisions and audio" description="Browse the quantities reported in the uploaded stock list. Contact the shop for current pricing." href="/category/televisions-audio" /><ProductGrid products={products.slice(0, 4)} /></div></section>
      <section className="shell page-section"><PromoBlocks /></section>
      <section className="shell pb-16 sm:pb-24"><SectionHeading eyebrow="More in stock" title="Audio and home essentials" href="/shop" linkLabel="Browse the inventory" /><ProductGrid products={products.slice(4, 8)} /></section>
      <section className="shell pb-16"><TrustStrip /></section>
      <section className="shell pb-10 sm:pb-16"><div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-9"><div className="flex gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-soft/55 text-brand"><Mail className="size-5" /></span><div><h2 className="text-xl font-black text-brand">Useful offers, without the noise.</h2><p className="mt-1 text-sm text-ink-muted">Join our updates for new arrivals and practical buying guides.</p></div></div><form className="flex w-full max-w-md gap-2" action="#"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" placeholder="you@example.com" className="field min-w-0" /><button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white" aria-label="Subscribe"><ArrowRight className="size-4" /></button></form></div></section>
    </main>
  );
}
