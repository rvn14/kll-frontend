import Link from "next/link";
import { ArrowRight, MessageCircle, Snowflake, Sparkles } from "lucide-react";
import { ProductVisual } from "@/components/product/product-visual";

export function PromoBlocks() {
  return <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
    <div className="relative overflow-hidden rounded-[2rem] bg-soft p-6 sm:p-9"><div className="relative z-10 max-w-md"><span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-black text-brand"><Snowflake className="size-3.5" />Cool & comfortable</span><h2 className="mt-5 text-3xl font-black tracking-tight text-brand sm:text-4xl">Refresh your space for the season.</h2><p className="mt-3 leading-7 text-brand/72">Explore the reported air-conditioning stock for homes, workspaces and installation needs.</p><Link href="/category/air-conditioning" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white">Shop cooling <ArrowRight className="size-4" /></Link></div><ProductVisual visual="air" className="absolute -bottom-10 -right-5 hidden size-72 rotate-6 bg-white/60 sm:flex" /></div>
    <div className="flex flex-col justify-between rounded-[2rem] bg-brand p-6 text-white sm:p-8"><div><span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-soft"><Sparkles className="size-5" /></span><h2 className="mt-6 text-2xl font-black">Need help choosing?</h2><p className="mt-3 text-sm leading-6 text-white/70">Tell our team what matters to you. We’ll help narrow the choice.</p></div><a href="https://wa.me/94111234567" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-brand"><MessageCircle className="size-4" />Ask on WhatsApp</a></div>
  </div>;
}
