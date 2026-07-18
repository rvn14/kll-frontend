import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Tag } from "lucide-react";

export const metadata: Metadata = { title: "Stock and pricing" };

export default function OffersPage() {
  return <main id="main-content" className="shell py-7 sm:py-10">
    <div className="grid overflow-hidden rounded-[2rem] bg-soft lg:grid-cols-[1fr_.55fr]">
      <div className="p-7 sm:p-12"><span className="flex size-11 items-center justify-center rounded-2xl bg-white text-brand"><Tag className="size-5" /></span><p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-brand/60">Pricing update</p><h1 className="mt-3 text-4xl font-black tracking-tight text-brand sm:text-5xl">Prices are being prepared.</h1><p className="mt-4 max-w-xl leading-7 text-brand/72">The uploaded stock report contains item names and quantities, but no selling prices. We have kept pricing honest instead of inventing values.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white">Browse current stock <ArrowRight className="size-4" /></Link><a href="https://wa.me/94111234567" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-brand"><MessageCircle className="size-4" />Ask for a price</a></div></div>
      <div className="flex min-h-64 items-center justify-center bg-brand p-10 text-center text-white"><div><p className="text-6xl font-black text-soft">PDF</p><p className="mt-3 text-sm font-bold">Stock list imported</p><p className="mt-2 text-xs leading-5 text-white/55">Database pricing can replace the hardcoded values later.</p></div></div>
    </div>
  </main>;
}
