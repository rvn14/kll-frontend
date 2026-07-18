import { Footer } from "@/components/layout/footer";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-nav";
import { StoreHeader } from "@/components/layout/store-header";
import { AccountNav } from "@/components/account/account-nav";

export default function AccountLayout({ children }: { children: React.ReactNode }) { return <><StoreHeader /><main id="main-content" className="shell py-8 sm:py-12"><div className="mb-7"><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Customer account</p><h1 className="mt-2 text-3xl font-black tracking-tight text-brand sm:text-4xl">Your K &amp; LL space</h1></div><div className="grid gap-7 lg:grid-cols-[230px_1fr]"><aside className="h-fit lg:sticky lg:top-40"><AccountNav /></aside><div className="min-w-0">{children}</div></div></main><Footer /><MobileBottomNavigation /></>; }
