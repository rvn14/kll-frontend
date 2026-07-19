import { Boxes, PackageCheck, ShoppingCart, TriangleAlert, UserRoundCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { formatLkr } from "@/lib/formatting/currency";
import { getAdminOrdersServer } from "@/services/admin-orders.server.service";

export default async function AdminDashboardPage() { 
  const ordersRes = await getAdminOrdersServer(1, 10);
  const orders = ordersRes?.items || [];
  const totalOrders = ordersRes?.total || 0;
  
  const metrics = [
    { label: "Total items", value: "...", note: "Dashboard API pending", icon: Boxes }, 
    { label: "Orders", value: totalOrders.toString(), note: "Total system orders", icon: ShoppingCart }, 
    { label: "Pending orders", value: "...", note: "Needs review", icon: PackageCheck }, 
    { label: "Customers", value: "...", note: "Registered users", icon: UsersRound }, 
    { label: "Active customers", value: "...", note: "Recent activity", icon: UserRoundCheck }, 
    { label: "Low-stock", value: "...", note: "Requires attention", icon: TriangleAlert }
  ];
  
  return (
    <div>
      <AdminPageHeader 
        title="Admin Dashboard" 
        description="Here is the current storefront snapshot. Some metrics are pending the dashboard aggregation API." 
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, note, icon: Icon }) => (
          <article className="panel p-5" key={label}>
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/50 text-brand">
                <Icon className="size-5" />
              </span>
            </div>
            <p className="mt-5 text-sm font-bold text-ink-muted">{label}</p>
            <p className="mt-1 text-3xl font-black text-brand">{value}</p>
            <p className="mt-2 text-xs text-ink-muted">{note}</p>
          </article>
        ))}
      </div>
      <section className="panel mt-6 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
          <div>
            <h2 className="text-lg font-black text-brand">Recent orders</h2>
            <p className="mt-1 text-xs text-ink-muted">Latest customer activity</p>
          </div>
          <Link href="/admin/orders" className="text-xs font-black text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-bold">Order</th>
                <th className="px-5 py-3 font-bold">Customer</th>
                <th className="px-5 py-3 font-bold">Date</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr className="border-t border-border" key={order.id}>
                  <td className="px-5 py-4 font-black text-brand">KLL-{order.id}</td>
                  <td className="px-5 py-4">{order.delivery_address?.recipient_name || `User #${order.user_id}`}</td>
                  <td className="px-5 py-4 text-ink-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status.toLowerCase()} />
                  </td>
                  <td className="px-5 py-4 text-right font-black text-brand">
                    {formatLkr(order.total_amount)}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-5 py-8 text-center text-ink-muted">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  ); 
}
