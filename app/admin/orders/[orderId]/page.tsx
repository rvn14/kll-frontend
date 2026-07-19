import { notFound } from "next/navigation";
import { MapPin, PackageCheck, Save, UserRound } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { formatLkr } from "@/lib/formatting/currency";
import { getAdminOrderServer } from "@/services/admin-orders.server.service";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) { 
  const { orderId } = await params; 
  const order = await getAdminOrderServer(orderId); 
  
  if (!order) notFound(); 
  
  return (
    <div>
      <AdminPageHeader eyebrow="Orders / Details" title={`KLL-${order.id}`} description="Review the order before submitting any status update." actions={<OrderStatusBadge status={order.status.toLowerCase()} />} />
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <section className="panel p-6">
            <div className="flex items-center gap-3">
              <PackageCheck className="size-5 text-brand" />
              <h2 className="text-lg font-black text-brand">Item summary</h2>
            </div>
            {order.items?.map((item: any) => (
              <div key={item.id || item.item_id} className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-surface-muted p-4">
                <div>
                  <p className="font-black text-brand">{item.item_name}</p>
                  <p className="mt-1 text-xs text-ink-muted">Item ID: {item.item_id} · Qty {item.quantity}</p>
                </div>
                <p className="shrink-0 font-black text-brand">{formatLkr(item.price_at_purchase * item.quantity)}</p>
              </div>
            ))}
          </section>
          <section className="grid gap-5 sm:grid-cols-2">
            <div className="panel p-5">
              <UserRound className="size-5 text-brand" />
              <h2 className="mt-4 font-black text-brand">Customer</h2>
              <p className="mt-2 text-sm text-ink-muted">
                User ID: {order.user_id}<br />
                {order.delivery_address?.recipient_name || "Unknown"}
              </p>
            </div>
            <div className="panel p-5">
              <MapPin className="size-5 text-brand" />
              <h2 className="mt-4 font-black text-brand">Delivery</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {order.delivery_address?.street_address}<br />
                {order.delivery_address?.city}<br />
                Sri Lanka
              </p>
            </div>
          </section>
        </div>
        <aside className="panel h-fit p-6">
          <h2 className="text-lg font-black text-brand">Update status</h2>
          <p className="mt-2 text-xs leading-5 text-ink-muted">Update the production status of this order.</p>
          <form action={async () => {
             "use server";
             // Server action placeholder for status update
          }}>
            <label className="mt-5 block">
              <span className="field-label">New status</span>
              <select name="status" className="field" defaultValue={order.status.toLowerCase()}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
            <label className="mt-4 block">
              <span className="field-label">Internal note</span>
              <textarea name="note" className="field min-h-24" />
            </label>
            <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-black text-white">
              <Save className="size-4" />Review update
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-ink-muted">PATCH /api/v1/admin/orders/{order.id}/status</p>
        </aside>
      </div>
    </div>
  ); 
}
