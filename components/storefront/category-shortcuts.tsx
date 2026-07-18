import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/mocks/data";
import { ProductIcon } from "@/components/product/product-visual";

export function CategoryShortcuts() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug} className="group flex min-h-40 flex-col justify-between rounded-3xl border border-border bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-soft-strong hover:shadow-card-hover">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/55 text-brand transition group-hover:bg-brand group-hover:text-white"><ProductIcon visual={category.icon} className="size-5" /></span>
          <span className="mt-5 flex items-end justify-between gap-2"><span className="text-sm font-black leading-5 text-brand">{category.name}</span><ArrowUpRight className="size-4 shrink-0 text-ink-muted transition group-hover:text-brand" /></span>
        </Link>
      ))}
    </div>
  );
}
