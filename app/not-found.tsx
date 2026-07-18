import { SearchX } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return <main id="main-content" className="shell flex min-h-[65vh] items-center justify-center py-16"><div className="text-center"><SearchX className="mx-auto size-12 text-brand" /><p className="mt-5 text-sm font-black uppercase tracking-[.18em] text-ink-muted">404 — page not found</p><h1 className="mt-2 text-3xl font-black text-brand">This page has moved or does not exist.</h1><p className="mx-auto mt-3 max-w-md text-ink-muted">Let’s get you back to products worth discovering.</p><ButtonLink href="/shop" className="mt-7">Browse the shop</ButtonLink></div></main>;
}
