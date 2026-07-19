import Link from "next/link";
import { ArrowRight, FileText, Package } from "lucide-react";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { formatLkr } from "@/lib/formatting/currency";
import { getMyOrdersServer } from "@/services/orders.server.service";

export default async function OrdersPage() { 
  const res = await getMyOrdersServer(1, 50);
  const orders = res?.items || [];
  
  return (
    <div>
      <h2 className="text-2xl font-black text-brand">Order history</h2>
      <p className="mt-1 text-sm text-ink-muted">Review purchases, delivery status and bill summaries.</p>
      
      {orders.length ? (
        <div className="mt-6 space-y-4">
          {orders.map((order: any) => (
            <article className="panel p-5 sm:p-6" key={order.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-ink-muted">Order ID</p>
                  <h3 className="mt-1 text-lg font-black text-brand">KLL-{order.id}</h3>
                </div>
                <OrderStatusBadge status={order.status.toLowerCase()} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-ink-muted">Placed</p>
                  <p className="mt-1 font-bold text-brand">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Items</p>
                  <p className="mt-1 font-bold text-brand">{order.items?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Payment</p>
                  <p className="mt-1 font-bold text-brand">{order.order_type}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Total</p>
                  <p className="mt-1 font-black text-brand">{formatLkr(order.total_amount)}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/account/orders/${order.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 text-xs font-black text-white">
                  View details <ArrowRight className="size-3.5" />
                </Link>
                <Link href={`/account/orders/${order.id}/bill`} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-black text-brand hover:bg-soft/45">
                  <FileText className="size-3.5" />View bill
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel mt-6 flex min-h-80 flex-col items-center justify-center p-8 text-center">
          <Package className="size-10 text-brand" />
          <h3 className="mt-4 text-xl font-black text-brand">You have not placed any orders yet.</h3>
          <p className="mt-2 text-sm text-ink-muted">When you do, every order will appear here.</p>
        </div>
      )}
    </div>
  ); 
}
