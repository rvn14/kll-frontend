import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UserForm } from "@/components/admin/user-form";
import { getAdminUserServer } from "@/services/admin-users.server.service";

export default async function EditUserPage({ params }: { params: Promise<{ userId: string }> }) { 
  const { userId } = await params; 
  const user = await getAdminUserServer(userId); 
  
  if (!user) notFound(); 
  
  return (
    <div>
      <AdminPageHeader eyebrow="Users / Edit" title={`Edit ${user.first_name} ${user.last_name}`} description={`Changes map to PUT /api/v1/admin/users/${user.id}.`} />
      <UserForm user={user} />
    </div>
  ); 
}
