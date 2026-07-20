import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueHero } from "@/components/storefront/catalogue-hero";
import { CatalogueView } from "@/components/storefront/catalogue-view";
import { getCategoriesServer } from "@/services/categories.server.service";
import { getItemsServer } from "@/services/items.server.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> { 
  const { slug } = await params; 
  const categories = await getCategoriesServer();
  const category = categories.find((item) => item.slug === slug); 
  return { title: category?.name ?? "Product category", description: category?.description }; 
}

export default async function CategoryPage({ params }: Props) { 
  const { slug } = await params; 
  const categories = await getCategoriesServer();
  const category = categories.find((item) => item.slug === slug); 
  
  if (!category) notFound(); 
  
  // Pass category_id if found to filter on backend
  const categoryProducts = await getItemsServer({ category_id: category.id });
  
  return <main id="main-content" className="shell py-7 sm:py-10"><CatalogueHero eyebrow="Shop by category" title={category.name} description={category.description} /><CatalogueView initialProducts={categoryProducts} categories={categories} /></main>; 
}
