import { formatLkr } from "@/lib/formatting/currency";

export function PriceDisplay({ price, originalPrice, size = "md" }: { price: number | null; originalPrice?: number | null; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "text-3xl sm:text-4xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-variant-numeric-tabular">
      <span className={`${price === null && size === "lg" ? "text-2xl sm:text-3xl" : sizeClass} font-black tracking-tight text-brand`}>{price === null ? "Contact for price" : formatLkr(price)}</span>
      {originalPrice && <span className="text-sm font-semibold text-ink-muted line-through">{formatLkr(originalPrice)}</span>}
    </div>
  );
}
