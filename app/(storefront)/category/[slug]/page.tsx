import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueHero } from "@/components/storefront/catalogue-hero";
import { CatalogueView } from "@/components/storefront/catalogue-view";
import { categories, products } from "@/mocks/data";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const category = categories.find((item) => item.slug === slug); return { title: category?.name ?? "Product category", description: category?.description }; }
export default async function CategoryPage({ params }: Props) { const { slug } = await params; const category = categories.find((item) => item.slug === slug); if (!category) notFound(); const categoryProducts = products.filter((product) => product.categorySlug === slug); return <main id="main-content" className="shell py-7 sm:py-10"><CatalogueHero eyebrow="Shop by category" title={category.name} description={category.description} /><CatalogueView initialProducts={categoryProducts} /></main>; }
