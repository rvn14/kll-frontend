import type { Product } from "@/types";

export function SpecificationTable({ product }: { product: Product }) { return <div className="overflow-hidden rounded-3xl border border-border bg-white">{product.specifications.map((spec, index) => <div className={`grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] ${index ? "border-t border-border" : ""}`} key={spec.label}><dt className="text-sm font-bold text-ink-muted">{spec.label}</dt><dd className="text-sm font-extrabold text-brand">{spec.value}</dd></div>)}</div>; }
