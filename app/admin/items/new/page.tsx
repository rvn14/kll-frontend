import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ItemForm } from "@/components/admin/item-form";
export default function NewItemPage() { return <div><AdminPageHeader eyebrow="Items / New" title="Create item" description="Prepare product information for POST /api/v1/items." /><ItemForm /></div>; }
