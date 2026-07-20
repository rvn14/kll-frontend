"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/types";

const VISIBLE_DESKTOP = 5;

export function CategoryNav({ categories = [] }: { categories?: Category[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? categories : categories.slice(0, VISIBLE_DESKTOP);
  const hasMore = categories.length > VISIBLE_DESKTOP;

  return (
    <nav className="hidden border-t border-border bg-white lg:block" aria-label="Product categories">
      <div className="shell flex h-12 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1 flex-wrap">
          <Link href="/shop" className="category-link font-black">Shop all</Link>
          {visibleCategories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug} className="category-link">{category.name}</Link>
          ))}
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="category-link inline-flex items-center gap-1 text-ink-muted hover:text-brand transition-colors"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        <Link href="/offers" className="shrink-0 rounded-full bg-soft px-4 py-2 text-sm font-black text-brand hover:bg-soft-strong">Offers</Link>
      </div>
    </nav>
  );
}
