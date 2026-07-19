import type { Metadata } from "next";
import { CatalogueHero } from "@/components/storefront/catalogue-hero";
import { CatalogueView } from "@/components/storefront/catalogue-view";
import { getItemsServer } from "@/services/items.server.service";
import { getCategoriesServer } from "@/services/categories.server.service";

export const metadata: Metadata = { title: "Shop all products", description: "Compare appliances and electronics from K & LL Traders." };

export default async function ShopPage() { 
  const products = await getItemsServer();
  const categories = await getCategoriesServer();
  
  return <main id="main-content" className="shell py-7 sm:py-10"><CatalogueHero title="The current shop inventory." description="Browse the live list of stock and equipment available directly from the store." /><CatalogueView initialProducts={products} categories={categories} /></main>; 
}
