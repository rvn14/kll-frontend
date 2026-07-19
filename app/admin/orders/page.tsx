import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { formatLkr } from "@/lib/formatting/currency";
import { getAdminOrdersServer } from "@/services/admin-orders.server.service";

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const requestedPage = Number((await searchParams).page ?? "1");
  const currentPage = Math.max(Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1, 1);
  
  const ordersRes = await getAdminOrdersServer(currentPage, 50);
  const orders = ordersRes?.items || [];
  
  return (
    <div>
      <AdminPageHeader title="Orders" description="Review customer orders and prepare confirmed status changes." />
      <section className="panel overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
            <input className="h-11 w-full rounded-full bg-surface-muted pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-soft" placeholder="Search order or customer" />
          </div>
          <select className="h-11 rounded-full border border-border bg-white px-4 text-sm font-bold text-brand">
            <option>All statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-ink-muted">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr className="border-t border-border" key={order.id}>
                  <td className="px-5 py-4 font-black text-brand">KLL-{order.id}</td>
                  <td className="px-5 py-4">{order.delivery_address?.recipient_name || `User #${order.user_id}`}</td>
                  <td className="px-5 py-4 text-ink-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-xs text-ink-muted">{order.order_type}</td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status.toLowerCase()} />
                  </td>
                  <td className="px-5 py-4 text-right font-black text-brand">
                    {formatLkr(order.total_amount)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="inline-flex size-10 items-center justify-center rounded-full text-brand hover:bg-soft/45" aria-label={`View ${order.id}`}>
                      <Eye className="size-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={7} className="px-5 py-8 text-center text-ink-muted">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  ); 
}
