import { CircleCheck, CircleX, Clock3, PackageCheck, Truck } from "lucide-react";
import type { OrderStatus, StockLevel } from "@/types";
import { Badge } from "@/components/ui/badge";

export function StockBadge({ stock }: { stock: StockLevel }) {
  const label = stock === "in-stock" ? "In stock" : stock === "low-stock" ? "Low stock" : stock === "stock-unknown" ? "Confirm stock" : "Out of stock";
  const color = stock === "in-stock" ? "bg-emerald-50 text-emerald-700" : stock === "low-stock" ? "bg-amber-50 text-amber-700" : stock === "stock-unknown" ? "bg-soft/55 text-brand" : "bg-red-50 text-red-700";
  return <Badge variant="outline" className={`gap-1.5 rounded-full border-0 px-2.5 py-1 text-xs font-bold ${color}`}><span className="size-1.5 rounded-full bg-current" aria-hidden="true" />{label}</Badge>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const icons = { pending: Clock3, processing: PackageCheck, shipped: Truck, delivered: CircleCheck, cancelled: CircleX };
  const Icon = icons[status];
  return <Badge variant="secondary" className="gap-1.5 rounded-full bg-soft/55 px-3 py-1.5 text-xs font-bold capitalize text-brand"><Icon className="size-3.5" />{status}</Badge>;
}
