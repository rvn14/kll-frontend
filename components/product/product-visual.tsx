import { AirVent, Clock3, Cog, Droplets, Fan, Gauge, Microwave, Package, Refrigerator, Scissors, ShowerHead, Smartphone, Speaker, Tv, WashingMachine, Wrench } from "lucide-react";
import type { Product } from "@/types";

const icons = { tv: Tv, fridge: Refrigerator, washer: WashingMachine, air: AirVent, kitchen: Microwave, audio: Speaker, phone: Smartphone, fan: Fan, sewing: Scissors, parts: Cog, tool: Wrench, oil: Droplets, pump: Gauge, heater: ShowerHead, clock: Clock3 };

export function ProductIcon({ visual, className = "" }: { visual: Product["visual"]; className?: string }) {
  const Icon = icons[visual] ?? Package;
  return <Icon className={className} />;
}

export function ProductVisual({ visual, className = "" }: { visual: Product["visual"]; className?: string }) {
  return (
    <div className={`product-visual ${className}`} aria-hidden="true">
      <span className="product-orbit product-orbit-one" />
      <span className="product-orbit product-orbit-two" />
      <ProductIcon visual={visual} className="relative z-10 h-[52%] w-[52%] stroke-[1.25] text-brand drop-shadow-sm" />
    </div>
  );
}
