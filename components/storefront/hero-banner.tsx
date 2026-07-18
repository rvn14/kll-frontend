import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductVisual } from "@/components/product/product-visual";

export function HeroBanner() {
  return (
    <section className="shell pt-5 sm:pt-8">
      <div className="hero-grid relative overflow-hidden rounded-[2rem] bg-brand text-white shadow-[0_24px_70px_rgba(0,49,82,.18)]">
        <span className="hero-dot -right-14 -top-16 size-56" /><span className="hero-dot bottom-8 right-[38%] size-4" />
        <div className="grid min-h-[490px] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-11 sm:px-10 lg:px-14 lg:py-16">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold text-soft backdrop-blur"><Sparkles className="size-3.5" />July home upgrade event</div>
            <h1 className="max-w-2xl text-[clamp(2.55rem,5.5vw,5.15rem)] font-black leading-[.98] tracking-[-.055em]">Better living,<br /><span className="text-soft">beautifully simple.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/76 sm:text-lg">Browse the shop&apos;s current appliance, electronics and sewing-machine inventory with reported stock quantities and direct support for pricing.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-brand transition hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft focus-visible:ring-offset-2 focus-visible:ring-offset-brand">Shop all products <ArrowRight className="size-4" /></Link>
              <Link href="/offers" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-black text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft">Explore offers</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-white/78"><span className="flex items-center gap-2"><Truck className="size-4 text-soft" />Islandwide delivery</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-soft" />Warranty support</span><span className="flex items-center gap-2"><MessageCircle className="size-4 text-soft" />WhatsApp help</span></div>
          </div>
          <div className="relative hidden items-center justify-center p-10 lg:flex">
            <div className="absolute left-1/2 top-1/2 size-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-soft/12" />
            <div className="relative w-full max-w-[470px] rotate-1 rounded-[2rem] border border-white/25 bg-white/95 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Featured this week</p><p className="mt-1 text-lg font-black text-brand">Designed for everyday ease</p></div><BadgeCheck className="size-7 text-brand" /></div>
              <div className="grid grid-cols-[1.25fr_.75fr] gap-3"><ProductVisual visual="tv" className="aspect-square" /><div className="grid gap-3"><ProductVisual visual="kitchen" className="aspect-square" /><ProductVisual visual="audio" className="aspect-square" /></div></div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-soft/55 px-4 py-3"><span className="text-sm font-bold text-brand">Flexible choices. Clear support.</span><ArrowRight className="size-4 text-brand" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
