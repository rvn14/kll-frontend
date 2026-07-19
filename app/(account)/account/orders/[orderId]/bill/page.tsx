import Link from "next/link";
import { ChevronLeft, Printer } from "lucide-react";
import { notFound } from "next/navigation";
import { formatLkr } from "@/lib/formatting/currency";
import { getMyOrderBillServer } from "@/services/orders.server.service";

export default async function BillPage({ params }: { params: Promise<{ orderId: string }> }) { 
  const { orderId } = await params; 
  
  const bill = await getMyOrderBillServer(orderId);
  if (!bill) notFound(); 
  
  return (
    <div>
      <Link href={`/account/orders/${orderId}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-brand hover:underline">
        <ChevronLeft className="size-4" />Back to order
      </Link>
      <section className="panel mt-3 overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 bg-brand p-6 text-white sm:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-soft">Bill summary</p>
            <h2 className="mt-2 text-3xl font-black">K & LL Traders</h2>
            <p className="mt-2 text-sm text-white/65">Order KLL-{bill.order_id}</p>
          </div>
          <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-black text-brand">
            <Printer className="size-4" />Print
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="grid gap-5 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs text-ink-muted">Bill to</p>
              <p className="mt-1 font-black text-brand">{bill.delivery_address?.recipient_name || "Customer"}</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Date</p>
              <p className="mt-1 font-black text-brand">{new Date(bill.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Payment</p>
              <p className="mt-1 font-black text-brand">{bill.order_type}</p>
            </div>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-ink-muted">
                  <th className="pb-3 font-bold">Item</th>
                  <th className="pb-3 font-bold">Qty</th>
                  <th className="pb-3 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bill.items?.map((item: any) => (
                  <tr className="border-b border-border" key={item.id || item.item_id}>
                    <td className="py-4 font-bold text-brand">{item.item_name}</td>
                    <td className="py-4">{item.quantity}</td>
                    <td className="py-4 text-right font-black text-brand">{formatLkr(item.price_at_purchase * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ml-auto mt-6 max-w-sm space-y-3 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span>{formatLkr(bill.total_amount)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Tax & delivery</span>
              <span>LKR 0.00</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-black text-brand">
              <span>Total</span>
              <span>{formatLkr(bill.total_amount)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  ); 
}
