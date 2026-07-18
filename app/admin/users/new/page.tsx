import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UserForm } from "@/components/admin/user-form";
export default function NewUserPage() { return <div><AdminPageHeader eyebrow="Users / New" title="Create user" description="Prepare a new customer or admin record for POST /api/v1/admin/users." /><UserForm /></div>; }
