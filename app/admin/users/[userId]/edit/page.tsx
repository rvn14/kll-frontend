import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UserForm } from "@/components/admin/user-form";
import { mockUsers } from "@/mocks/data";
export default async function EditUserPage({ params }: { params: Promise<{ userId: string }> }) { const { userId } = await params; const user = mockUsers.find((item) => item.id === userId); if (!user) notFound(); return <div><AdminPageHeader eyebrow="Users / Edit" title={`Edit ${user.name}`} description={`Changes map to PUT /api/v1/admin/users/${user.id}.`} /><UserForm user={user} /></div>; }
