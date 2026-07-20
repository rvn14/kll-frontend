import Image from "next/image";
import { AirVent, Clock3, Cog, Droplets, Fan, Gauge, Microwave, Package, Refrigerator, Scissors, ShowerHead, Smartphone, Speaker, Tv, WashingMachine, Wrench } from "lucide-react";
import type { Product } from "@/types";

const icons: Record<string, React.ElementType> = { tv: Tv, fridge: Refrigerator, washer: WashingMachine, air: AirVent, kitchen: Microwave, audio: Speaker, phone: Smartphone, fan: Fan, sewing: Scissors, parts: Cog, tool: Wrench, oil: Droplets, pump: Gauge, heater: ShowerHead, clock: Clock3 };

export function ProductIcon({ visual, className = "" }: { visual: string; className?: string }) {
  if (visual.startsWith("http") || visual.startsWith("/")) {
    return <Image src={visual} alt="Product icon" width={100} height={100} className={`object-contain ${className}`} />;
  }
  const Icon = icons[visual] ?? Package;
  return <Icon className={className} />;
}

export function ProductVisual({ visual, className = "" }: { visual: string; className?: string }) {
  const isImage = visual.startsWith("http") || visual.startsWith("/");
  
  if (isImage) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-surface-muted ${className}`}>
        <Image src={visual} alt="Product visual" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
      </div>
    );
  }

  return (
    <div className={`product-visual ${className}`} aria-hidden="true">
      <span className="product-orbit product-orbit-one" />
      <span className="product-orbit product-orbit-two" />
      <ProductIcon visual={visual} className="relative z-10 h-[52%] w-[52%] stroke-[1.25] text-brand drop-shadow-sm" />
    </div>
  );
}
