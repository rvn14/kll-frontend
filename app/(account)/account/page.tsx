import Link from "next/link";
import { ArrowRight, CircleUserRound, MapPin, Package, ShieldCheck } from "lucide-react";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { formatLkr } from "@/lib/formatting/currency";
import { getProfileServer, getAddressesServer } from "@/services/profile.server.service";
import { getMyOrdersServer } from "@/services/orders.server.service";

export default async function AccountPage() { 
  const [profile, addresses, ordersRes] = await Promise.all([
    getProfileServer(),
    getAddressesServer(),
    getMyOrdersServer(1, 1),
  ]);
  
  const latestOrder = ordersRes?.items?.[0] || null;
  const defaultAddress = addresses?.find((a: any) => a.is_default) || addresses?.[0] || null;

  return (
    <div>
      <section className="rounded-[2rem] bg-brand p-6 text-white sm:p-8">
        <p className="text-sm font-bold text-soft">Good afternoon{profile?.user?.first_name ? `, ${profile.user.first_name}` : ""}</p>
        <h2 className="mt-2 text-3xl font-black">Welcome back.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Your latest order is on its way. Everything else is right where you left it.</p>
        <Link href="/account/orders" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-brand">
          View orders <ArrowRight className="size-4" />
        </Link>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Link href="/account/orders" className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-card-hover">
          <Package className="size-5 text-brand" />
          <p className="mt-4 text-xs font-bold text-ink-muted">Latest order</p>
          {latestOrder ? (
            <>
              <p className="mt-1 font-black text-brand">KLL-{latestOrder.id}</p>
              <div className="mt-3">
                <OrderStatusBadge status={latestOrder.status.toLowerCase()} />
              </div>
            </>
          ) : (
            <p className="mt-1 font-black text-brand">No orders yet</p>
          )}
        </Link>
        <Link href="/account/addresses" className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-card-hover">
          <MapPin className="size-5 text-brand" />
          <p className="mt-4 text-xs font-bold text-ink-muted">Default delivery</p>
          {defaultAddress ? (
            <>
              <p className="mt-1 font-black text-brand">{defaultAddress.label || defaultAddress.recipient_name}</p>
              <p className="mt-2 text-xs leading-5 text-ink-muted">{defaultAddress.street_address}</p>
            </>
          ) : (
            <p className="mt-1 font-black text-brand">No address set</p>
          )}
        </Link>
        <Link href="/account/profile" className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-card-hover">
          <CircleUserRound className="size-5 text-brand" />
          <p className="mt-4 text-xs font-bold text-ink-muted">Profile</p>
          <p className="mt-1 font-black text-brand">Almost complete</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-soft/45">
            <span className="block h-full w-4/5 rounded-full bg-brand" />
          </div>
          <p className="mt-2 text-xs text-ink-muted">Add a secondary phone number</p>
        </Link>
      </div>

      {latestOrder && (
        <section className="panel mt-5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-ink-muted">Recent order</p>
              <h2 className="mt-1 text-xl font-black text-brand">KLL-{latestOrder.id}</h2>
            </div>
            <OrderStatusBadge status={latestOrder.status.toLowerCase()} />
          </div>
          <div className="mt-5 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3">
            <div>
              <p className="text-ink-muted">Placed</p>
              <p className="mt-1 font-black text-brand">{new Date(latestOrder.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-ink-muted">Items</p>
              <p className="mt-1 font-black text-brand">{latestOrder.items?.length || 0}</p>
            </div>
            <div>
              <p className="text-ink-muted">Total</p>
              <p className="mt-1 font-black text-brand">{formatLkr(latestOrder.total_amount)}</p>
            </div>
          </div>
        </section>
      )}

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-soft/35 p-5">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />
        <div>
          <p className="text-sm font-black text-brand">Session security managed</p>
          <p className="mt-1 text-sm leading-6 text-ink-muted">
            This account area securely fetches data using the authenticated API endpoints.
          </p>
        </div>
      </div>
    </div>
  ); 
}
