import Link from "next/link";
import { Pencil, Power, Trash2, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminUserServer } from "@/services/admin-users.server.service";

export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) { 
  const { userId } = await params; 
  const user = await getAdminUserServer(userId); 
  
  if (!user) notFound(); 
  
  return (
    <div>
      <AdminPageHeader eyebrow="Users / Details" title={`${user.first_name} ${user.last_name}`} description={user.email} actions={<Link href={`/admin/users/${user.id}/edit`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white"><Pencil className="size-4" />Edit user</Link>} />
      <section className="panel max-w-3xl p-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-soft/45 text-brand"><UserRound className="size-6" /></span>
        <div className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
          <div><p className="text-xs text-ink-muted">Full name</p><p className="mt-1 font-black text-brand">{user.first_name} {user.last_name}</p></div>
          <div><p className="text-xs text-ink-muted">Email</p><p className="mt-1 font-black text-brand">{user.email}</p></div>
          <div><p className="text-xs text-ink-muted">Role</p><p className="mt-1 font-black capitalize text-brand">{user.role}</p></div>
          <div><p className="text-xs text-ink-muted">Created</p><p className="mt-1 font-black text-brand">{new Date(user.created_at).toLocaleDateString()}</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
          <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-50 px-4 text-xs font-black text-amber-800"><Power className="size-3.5" />{user.is_active ? "Deactivate" : "Activate"}</button>
          <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-red-50 px-4 text-xs font-black text-red-700"><Trash2 className="size-3.5" />Delete user</button>
        </div>
        <p className="mt-4 text-xs text-ink-muted">Both actions require explicit confirmation before calling the backend.</p>
      </section>
    </div>
  ); 
}
