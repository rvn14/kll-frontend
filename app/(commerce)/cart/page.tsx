import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = { title: "Shopping cart" };
export default function CartPage() { return <main id="main-content" className="shell py-8 sm:py-12"><CartPageContent /></main>; }
