"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ProductGrid } from "./product-grid";
import type { Product, Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const items: Array<number | "start-ellipsis" | "end-ellipsis"> = [1];
  if (currentPage > 3) items.push("start-ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) items.push(page);

  if (currentPage < totalPages - 2) items.push("end-ellipsis");
  items.push(totalPages);
  return items;
}

type FiltersProps = {
  selected: string[];
  setSelected: (categories: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  categories: Category[];
  brands: string[];
};

function Filters({ selected, setSelected, selectedBrands, setSelectedBrands, inStockOnly, setInStockOnly, categories, brands }: FiltersProps) {
  const options = categories.map((category) => category.name);
  return <div>
    <div className="flex items-center justify-between"><h2 className="font-black text-brand">Filters</h2><Button type="button" variant="ghost" size="xs" onClick={() => { setSelected([]); setSelectedBrands([]); setInStockOnly(false); }}>Clear all</Button></div>
    <fieldset className="mt-6"><legend className="text-sm font-black text-brand">Category</legend><div className="mt-3 space-y-1">{options.map((option) => { const id = `category-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return <div className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-accent" key={option}><Checkbox id={id} checked={selected.includes(option)} onCheckedChange={(checked) => setSelected(checked === true ? [...selected, option] : selected.filter((item) => item !== option))} /><Label htmlFor={id} className="flex min-h-11 flex-1 cursor-pointer items-center text-sm font-semibold text-ink-muted">{option}</Label></div>; })}</div></fieldset>
    <Separator className="my-5" />
    {brands.length > 0 && <><fieldset className="mt-6"><legend className="text-sm font-black text-brand">Brand</legend><div className="mt-3 space-y-1">{brands.map((option) => { const id = `brand-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return <div className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-accent" key={option}><Checkbox id={id} checked={selectedBrands.includes(option)} onCheckedChange={(checked) => setSelectedBrands(checked === true ? [...selectedBrands, option] : selectedBrands.filter((item) => item !== option))} /><Label htmlFor={id} className="flex min-h-11 flex-1 cursor-pointer items-center text-sm font-semibold text-ink-muted">{option}</Label></div>; })}</div></fieldset><Separator className="my-5" /></>}
    <div className="flex min-h-11 items-center gap-3 rounded-xl px-2"><Checkbox id="in-stock-only" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(checked === true)} /><Label htmlFor="in-stock-only" className="flex min-h-11 flex-1 cursor-pointer items-center text-sm font-bold text-brand">In-stock products only</Label></div>
  </div>;
}

export function CatalogueView({ initialProducts, categories = [] }: { initialProducts: Product[], categories?: Category[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const catalogueTop = useRef<HTMLDivElement>(null);

  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    initialProducts.forEach(p => p.brand && brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [initialProducts]);

  const visible = useMemo(() => {
    const filtered = initialProducts.filter((product) => (!selected.length || selected.includes(product.category)) && (!selectedBrands.length || selectedBrands.includes(product.brand)) && (!inStockOnly || product.stock === "in-stock"));
    return [...filtered].sort((a, b) => {
      if (sort === "stock-high") return (b.stockQuantity ?? -1) - (a.stockQuantity ?? -1);
      if (sort === "stock-low") return (a.stockQuantity ?? Number.MAX_SAFE_INTEGER) - (b.stockQuantity ?? Number.MAX_SAFE_INTEGER);
      return a.id.localeCompare(b.id);
    });
  }, [initialProducts, inStockOnly, selected, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = visible.slice(firstItemIndex, firstItemIndex + ITEMS_PER_PAGE);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  const updateSelected = (value: string[]) => { setSelected(value); setPage(1); };
  const updateSelectedBrands = (value: string[]) => { setSelectedBrands(value); setPage(1); };
  const updateInStockOnly = (value: boolean) => { setInStockOnly(value); setPage(1); };
  const filterProps = { selected, setSelected: updateSelected, selectedBrands, setSelectedBrands: updateSelectedBrands, inStockOnly, setInStockOnly: updateInStockOnly, categories, brands: availableBrands };

  function changePage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
    catalogueTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
    <Card className="hidden h-fit rounded-3xl p-5 lg:block"><Filters {...filterProps} /></Card>
    <div ref={catalogueTop} className="min-w-0 scroll-mt-36">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-muted">{visible.length ? <>Showing <span className="font-black text-brand">{firstItemIndex + 1}–{Math.min(firstItemIndex + ITEMS_PER_PAGE, visible.length)}</span> of </> : null}<span className="font-black text-brand">{visible.length}</span> products</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => setDrawerOpen(true)} className="lg:hidden"><SlidersHorizontal className="size-4" />Filter</Button>
          <Select value={sort} onValueChange={(value) => { setSort(value); setPage(1); }}><SelectTrigger className="h-11 min-w-44 rounded-full border-border bg-white px-4 font-bold text-brand"><SelectValue placeholder="Sort products" /></SelectTrigger><SelectContent><SelectItem value="featured">Catalogue order</SelectItem><SelectItem value="stock-high">Stock: high to low</SelectItem><SelectItem value="stock-low">Stock: low to high</SelectItem></SelectContent></Select>
        </div>
      </div>
      {visible.length ? <><ProductGrid products={paginatedProducts} />{totalPages > 1 && <Pagination className="mt-10" aria-label="Product catalogue pages"><PaginationContent className="flex-wrap justify-center">
        <PaginationItem><PaginationPrevious href="#catalogue-products" aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-45" : undefined} onClick={(event) => { event.preventDefault(); changePage(currentPage - 1); }} /></PaginationItem>
        {paginationItems.map((item) => typeof item === "number" ? <PaginationItem key={item}><PaginationLink href={`#page-${item}`} isActive={item === currentPage} aria-label={`Go to page ${item}`} onClick={(event) => { event.preventDefault(); changePage(item); }}>{item}</PaginationLink></PaginationItem> : <PaginationItem key={item}><PaginationEllipsis /></PaginationItem>)}
        <PaginationItem><PaginationNext href="#catalogue-products" aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-45" : undefined} onClick={(event) => { event.preventDefault(); changePage(currentPage + 1); }} /></PaginationItem>
      </PaginationContent></Pagination>}</> : <Card className="flex min-h-72 flex-col items-center justify-center rounded-3xl p-8 text-center"><SlidersHorizontal className="size-10 text-brand" /><h2 className="mt-4 text-xl font-black text-brand">No products match your filters.</h2><p className="mt-2 text-sm text-ink-muted">Try clearing one or more filters to see more choices.</p></Card>}
    </div>
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}><SheetContent side="right" className="w-[90%] overflow-y-auto sm:max-w-sm"><SheetHeader><SheetTitle>Filter products</SheetTitle><SheetDescription>Narrow the catalogue by category and availability.</SheetDescription></SheetHeader><div className="px-4"><Filters {...filterProps} /></div><SheetFooter><Button onClick={() => setDrawerOpen(false)} className="w-full">Show {visible.length} products</Button></SheetFooter></SheetContent></Sheet>
  </div>;
}
