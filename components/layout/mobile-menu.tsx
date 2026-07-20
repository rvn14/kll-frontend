"use client";

import Link from "next/link";
import { ChevronDown, LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";

const VISIBLE_MOBILE = 5;

export function MobileMenu({ categories = [] }: { categories?: any[] }) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const close = () => setOpen(false);

  const visibleCategories = showAll ? categories : categories.slice(0, VISIBLE_MOBILE);
  const hasMore = categories.length > VISIBLE_MOBILE;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[90%] overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Browse K &amp; LL</SheetTitle>
          <SheetDescription>Products, stock information and account support.</SheetDescription>
        </SheetHeader>
        <nav className="px-4 pb-6" aria-label="Mobile navigation">
          <div className="space-y-1">
            <Link href="/shop" onClick={close} className="menu-link">Shop all products</Link>
            <Link href="/offers" onClick={close} className="menu-link">Stock &amp; pricing</Link>
            {visibleCategories.map((category) => (
              <Link href={`/category/${category.slug}`} onClick={close} className="menu-link" key={category.slug}>
                {category.name}
              </Link>
            ))}
            {hasMore && (
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="menu-link w-full justify-between text-ink-muted"
              >
                {showAll ? "Show less categories" : "Show more categories"}
                <ChevronDown className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
          <Separator className="my-6" />
          <div className="space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-black text-brand">{user?.full_name}</p>
                  <p className="text-xs text-ink-muted">{user?.email}</p>
                </div>
                <Link href="/account" onClick={close} className="menu-link">My account</Link>
                <Link href="/cart" onClick={close} className="menu-link">My cart</Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={close} className="menu-link font-black">
                  <LogIn className="mr-2 size-4" /> Sign in
                </Link>
                <Link href="/register" onClick={close} className="menu-link">
                  Create account
                </Link>
              </>
            )}
            <Link href="/track-order" onClick={close} className="menu-link">Track an order</Link>
            <Link href="/contact" onClick={close} className="menu-link">Help &amp; contact</Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
