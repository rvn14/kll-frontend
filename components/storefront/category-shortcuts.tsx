"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ProductIcon } from "@/components/product/product-visual";
import type { Category } from "@/types";

const VISIBLE_HOME = 6;

export function CategoryShortcuts({ categories = [] }: { categories?: Category[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, VISIBLE_HOME);
  const hasMore = categories.length > VISIBLE_HOME;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {visibleCategories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.slug} className="group flex min-h-40 flex-col justify-between rounded-3xl border border-border bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-soft-strong hover:shadow-card-hover">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/55 text-brand transition group-hover:bg-brand group-hover:text-white"><ProductIcon visual={category.icon} className="size-5" /></span>
            <span className="mt-5 flex items-end justify-between gap-2"><span className="text-sm font-black leading-5 text-brand">{category.name}</span><ArrowUpRight className="size-4 shrink-0 text-ink-muted transition group-hover:text-brand" /></span>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-brand shadow-card transition hover:border-soft-strong hover:shadow-card-hover"
          >
            {showAll ? "Show fewer categories" : `Show all ${categories.length} categories`}
            <ChevronDown className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}
