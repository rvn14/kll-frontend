"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function MobileMenu({ categories = [] }: { categories?: any[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  
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
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} onClick={close} className="menu-link" key={category.slug}>
                {category.name}
              </Link>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-1">
            <Link href="/account" onClick={close} className="menu-link">My account</Link>
            <Link href="/track-order" onClick={close} className="menu-link">Track an order</Link>
            <Link href="/contact" onClick={close} className="menu-link">Help &amp; contact</Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
