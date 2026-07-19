import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { CatalogueView } from "@/components/storefront/catalogue-view";
import { getItemsServer } from "@/services/items.server.service";

export const metadata: Metadata = { title: "Search products" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) { 
  const query = (await searchParams).query?.trim() ?? ""; 
  const results = await getItemsServer({ search: query });
  
  return <main id="main-content" className="shell py-10"><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Search results</p><h1 className="mt-2 text-3xl font-black tracking-tight text-brand sm:text-4xl">{query ? <>Results for “{query}”</> : "Browse all results"}</h1><p className="mb-8 mt-3 text-ink-muted">{results.length} {results.length === 1 ? "product" : "products"} found</p>{results.length ? <CatalogueView initialProducts={results} /> : <div className="panel flex min-h-80 flex-col items-center justify-center p-8 text-center"><SearchX className="size-12 text-brand" /><h2 className="mt-5 text-xl font-black text-brand">We couldn&apos;t find that product.</h2><p className="mt-2 max-w-md text-ink-muted">Check the spelling or try a broader term such as “television” or “kitchen”.</p></div>}</main>; 
}
