import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ItemForm } from "@/components/admin/item-form";
import { getItemByIdServer } from "@/services/items.server.service";

export default async function EditItemPage({ params }: { params: Promise<{ itemId: string }> }) { 
  const { itemId } = await params;
  const product = await getItemByIdServer(itemId); 
  
  if (!product) notFound(); 
  
  return (
    <div>
      <AdminPageHeader 
        eyebrow="Items / Edit" 
        title={`Edit ${product.name}`} 
        description={`Changes will map to PATCH /api/v1/items/${product.id}.`} 
      />
      <ItemForm product={product} />
    </div>
  ); 
}
