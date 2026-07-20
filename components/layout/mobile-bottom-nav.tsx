"use client";

import Link from "next/link";
import { CircleUserRound, Home, LogIn, Search, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.lines.length);
  const { isAuthenticated } = useAuthStore();

  const items = [
    { href: "/", label: "Home", icon: Home, show: true },
    { href: "/shop", label: "Shop", icon: Search, show: true },
    { href: "/cart", label: "Cart", icon: ShoppingBag, show: isAuthenticated },
    { href: isAuthenticated ? "/account" : "/login", label: isAuthenticated ? "Account" : "Sign in", icon: isAuthenticated ? CircleUserRound : LogIn, show: true },
  ].filter((item) => item.show);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Quick navigation">
      <div className={`mx-auto grid h-16 max-w-md`} style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return <Link href={href} key={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-11 flex-col items-center justify-center gap-1 text-[11px] font-bold ${active ? "text-brand" : "text-ink-muted"}`}><Icon className="size-5" />{label}{label === "Cart" && cartCount > 0 && <span className="absolute left-1/2 top-1 ml-2 flex size-4 items-center justify-center rounded-full bg-brand text-[9px] text-white">{cartCount}</span>}</Link>;
        })}
      </div>
    </nav>
  );
}
