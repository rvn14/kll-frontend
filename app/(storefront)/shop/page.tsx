import type { Metadata } from "next";
import { CatalogueHero } from "@/components/storefront/catalogue-hero";
import { CatalogueView } from "@/components/storefront/catalogue-view";
import { products } from "@/mocks/data";

export const metadata: Metadata = { title: "Shop all products", description: "Compare appliances and electronics from K & LL Traders." };
export default function ShopPage() { return <main id="main-content" className="shell py-7 sm:py-10"><CatalogueHero title="The current shop inventory." description="Browse the hardcoded list imported from STOCK SHOP.pdf. Quantities reflect the report; prices and full specifications will come from the future database." /><CatalogueView initialProducts={products} /></main>; }
