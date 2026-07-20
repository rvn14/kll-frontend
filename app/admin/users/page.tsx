import Link from "next/link";
import { Eye, Pencil, Plus, Power, Search, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminUsersServer } from "@/services/admin-users.server.service";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const requestedPage = Number((await searchParams).page ?? "1");
  const currentPage = Math.max(Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1, 1);
  
  const usersRes = await getAdminUsersServer(currentPage, 50);
  const users = usersRes?.items || [];
  
  return (
    <div>
      <AdminPageHeader title="Users" description="Manage customer and admin user records, status and role display." actions={<Link href="/admin/users/new" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white"><Plus className="size-4" />New user</Link>} />
      <section className="panel overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
            <input className="h-11 w-full rounded-full bg-surface-muted pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-soft" placeholder="Search by name or email" />
          </div>
          <select className="h-11 rounded-full border border-border px-4 text-sm font-bold text-brand">
            <option>All roles</option>
            <option>Customer</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-ink-muted">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr className="border-t border-border" key={user.id}>
                  <td className="px-5 py-4 font-black text-brand">{user.first_name} {user.last_name}</td>
                  <td className="px-5 py-4 text-ink-muted">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-soft/45 px-2.5 py-1 text-xs font-black capitalize text-brand">{user.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-black ${user.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-ink-muted">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <Link href={`/admin/users/${user.id}`} className="flex size-10 items-center justify-center rounded-full text-brand hover:bg-soft/45" aria-label={`View ${user.first_name}`}>
                        <Eye className="size-4" />
                      </Link>
                      <Link href={`/admin/users/${user.id}/edit`} className="flex size-10 items-center justify-center rounded-full text-brand hover:bg-soft/45" aria-label={`Edit ${user.first_name}`}>
                        <Pencil className="size-4" />
                      </Link>
                      <button className="flex size-10 items-center justify-center rounded-full text-amber-700 hover:bg-amber-50" aria-label={`${user.is_active ? "Deactivate" : "Activate"} ${user.first_name}`}>
                        <Power className="size-4" />
                      </button>
                      <button className="flex size-10 items-center justify-center rounded-full text-red-700 hover:bg-red-50" aria-label={`Delete ${user.first_name}`}>
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={6} className="px-5 py-8 text-center text-ink-muted">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  ); 
}
