import Link from "next/link";
import { ArchiveRestore, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductVisual } from "@/components/product/product-visual";
import { formatLkr } from "@/lib/formatting/currency";
import { products } from "@/mocks/data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 16;

function displayPrice(price: number | null) { return price === null ? "Contact shop" : formatLkr(price); }

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const items: Array<number | "start-ellipsis" | "end-ellipsis"> = [1];
  if (currentPage > 3) items.push("start-ellipsis");
  for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page += 1) items.push(page);
  if (currentPage < totalPages - 2) items.push("end-ellipsis");
  items.push(totalPages);
  return items;
}

export default async function AdminItemsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const requestedPage = Number((await searchParams).page ?? "1");
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1, 1), totalPages);
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProducts = products.slice(firstItemIndex, firstItemIndex + ITEMS_PER_PAGE);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return <div>
    <AdminPageHeader title="Items" description={`${products.length} hardcoded items from STOCK SHOP.pdf. Ready to replace with GET /api/v1/items.`} actions={<Link href="/admin/items/new" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white"><Plus className="size-4" />New item</Link>} />
    <section className="panel overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-4"><div className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" /><input className="h-11 w-full rounded-full bg-surface-muted pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-soft" placeholder="Search by name or item ID" /></div><select className="h-11 rounded-full border border-border bg-white px-4 text-sm font-bold text-brand"><option>All statuses</option><option>Active</option><option>Draft</option><option>Deleted</option></select></div>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-surface-muted text-xs text-ink-muted"><tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">Item ID</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Source</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{pageProducts.map((product, index) => <tr className="border-t border-border" key={product.id}><td className="px-4 py-3"><div className="flex items-center gap-3"><ProductVisual visual={product.visual} className="size-14 shrink-0" /><span className="max-w-64 font-black text-brand">{product.name}</span></div></td><td className="px-4 py-3 text-xs font-bold text-ink-muted">{product.id}</td><td className="px-4 py-3 font-black text-brand">{displayPrice(product.price)}</td><td className="px-4 py-3 text-ink-muted">{product.stockQuantity ?? "Confirm"}</td><td className="px-4 py-3"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">Active</span></td><td className="px-4 py-3 text-xs text-ink-muted">PDF import</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Link href={`/admin/items/${product.id}/edit`} className="flex size-10 items-center justify-center rounded-full text-brand hover:bg-soft/45" aria-label={`Edit ${product.name}`}><Pencil className="size-4" /></Link><button className="flex size-10 items-center justify-center rounded-full text-red-700 hover:bg-red-50" aria-label={`Delete ${product.name}`}><Trash2 className="size-4" /></button>{firstItemIndex + index === products.length - 1 && <button className="flex size-10 items-center justify-center rounded-full text-brand hover:bg-soft/45" aria-label={`Restore ${product.name}`}><ArchiveRestore className="size-4" /></button>}</div></td></tr>)}</tbody></table></div>
      <div className="divide-y divide-border md:hidden">{pageProducts.map((product) => <article className="p-4" key={product.id}><div className="flex gap-3"><ProductVisual visual={product.visual} className="size-20 shrink-0" /><div className="min-w-0"><h2 className="line-clamp-2 text-sm font-black text-brand">{product.name}</h2><p className="mt-1 text-xs text-ink-muted">{product.id}</p><p className="mt-2 font-black text-brand">{displayPrice(product.price)}</p><p className="mt-1 text-xs text-ink-muted">Stock: {product.stockQuantity ?? "Confirm"}</p></div></div><div className="mt-3 flex justify-end gap-2"><Link href={`/admin/items/${product.id}/edit`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-soft/45 px-4 text-xs font-black text-brand"><Pencil className="size-3.5" />Edit</Link><button className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-black text-red-700"><Trash2 className="size-3.5" />Delete</button></div></article>)}</div>
      <div className="border-t border-border p-4"><p className="mb-4 text-center text-xs font-semibold text-ink-muted">Showing {firstItemIndex + 1}–{Math.min(firstItemIndex + ITEMS_PER_PAGE, products.length)} of {products.length} items</p><Pagination><PaginationContent className="flex-wrap justify-center"><PaginationItem><PaginationPrevious href={`/admin/items?page=${Math.max(1, currentPage - 1)}`} aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-45" : undefined} /></PaginationItem>{paginationItems.map((item) => typeof item === "number" ? <PaginationItem key={item}><PaginationLink href={`/admin/items?page=${item}`} isActive={item === currentPage}>{item}</PaginationLink></PaginationItem> : <PaginationItem key={item}><PaginationEllipsis /></PaginationItem>)}<PaginationItem><PaginationNext href={`/admin/items?page=${Math.min(totalPages, currentPage + 1)}`} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-45" : undefined} /></PaginationItem></PaginationContent></Pagination></div>
    </section>
  </div>;
}
