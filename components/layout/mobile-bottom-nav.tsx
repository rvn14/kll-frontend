"use client";

import Link from "next/link";
import { CircleUserRound, Home, Search, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/account", label: "Account", icon: CircleUserRound },
];

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.lines.length);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Quick navigation">
      <div className="mx-auto grid h-16 max-w-md grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return <Link href={href} key={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-11 flex-col items-center justify-center gap-1 text-[11px] font-bold ${active ? "text-brand" : "text-ink-muted"}`}><Icon className="size-5" />{label}{label === "Cart" && cartCount > 0 && <span className="absolute left-1/2 top-1 ml-2 flex size-4 items-center justify-center rounded-full bg-brand text-[9px] text-white">{cartCount}</span>}</Link>;
        })}
      </div>
    </nav>
  );
}
