import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, Headphones, Phone, Truck } from "lucide-react";
import { CartIndicator } from "./cart-indicator";
import { MobileMenu } from "./mobile-menu";
import { SearchBar } from "./search-bar";
import { getCategoriesServer } from "@/services/categories.server.service";
import { getItemsPaginatedServer } from "@/services/items.server.service";

export async function StoreHeader() {
  const categories = await getCategoriesServer();
  const searchSuggestions = (await getItemsPaginatedServer({ page: 1, limit: 6 })).items.map(item => item.name);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,49,82,.08)]">
      <div className="hidden bg-brand text-white md:block">
        <div className="shell flex h-9 items-center justify-between text-xs font-semibold">
          <p className="flex items-center gap-2"><Truck className="size-3.5" />Islandwide delivery across Sri Lanka</p>
          <div className="flex items-center gap-6">
            <Link href="/track-order" className="hover:text-soft">Track your order</Link>
            <a href="tel:+94111234567" className="flex items-center gap-1.5 hover:text-soft"><Phone className="size-3.5" />011 123 4567</a>
          </div>
        </div>
      </div>
      <div className="shell flex h-[74px] items-center gap-3 lg:h-[86px] lg:gap-7">
        <MobileMenu categories={categories} />
        <Link href="/" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" aria-label="K and LL Traders home">
          <Image src="/images/kl-logo-transparent.png" alt="K & LL Traders" width={1095} height={321} priority className="h-auto w-[150px] sm:w-[180px] lg:w-[205px]" />
        </Link>
        <div className="hidden flex-1 justify-center lg:flex"><SearchBar suggestions={searchSuggestions} /></div>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/contact" className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-brand hover:bg-soft/55 xl:flex"><Headphones className="size-5" /><span className="text-sm font-bold">Help</span></Link>
          <Link href="/account" className="flex min-h-11 items-center gap-2 rounded-full px-2 text-brand hover:bg-soft/55 sm:px-3" aria-label="My account"><CircleUserRound className="size-5" /><span className="hidden text-sm font-bold xl:inline">Account</span></Link>
          <CartIndicator mobile />
        </div>
      </div>
      <div className="shell pb-3 lg:hidden"><SearchBar compact suggestions={searchSuggestions} /></div>
      <nav className="hidden border-t border-border bg-white lg:block" aria-label="Product categories">
        <div className="shell flex h-12 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1 overflow-hidden">
            <Link href="/shop" className="category-link font-black">Shop all</Link>
            {categories.slice(0, 7).map((category) => <Link href={`/category/${category.slug}`} key={category.slug} className="category-link">{category.name}</Link>)}
          </div>
          <Link href="/offers" className="shrink-0 rounded-full bg-soft px-4 py-2 text-sm font-black text-brand hover:bg-soft-strong">Offers</Link>
        </div>
      </nav>
    </header>
  );
}
