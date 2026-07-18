import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ItemForm } from "@/components/admin/item-form";
import { getProduct } from "@/mocks/data";
export default async function EditItemPage({ params }: { params: Promise<{ itemId: string }> }) { const product = getProduct((await params).itemId); if (!product) notFound(); return <div><AdminPageHeader eyebrow="Items / Edit" title={`Edit ${product.name}`} description={`Changes will map to PATCH /api/v1/items/${product.id}.`} /><ItemForm product={product} /></div>; }
