"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantitySelector({ value, onChange }: { value: number; onChange: (quantity: number) => void }) {
  return <div className="inline-flex h-12 items-center rounded-full border border-border bg-white"><Button type="button" variant="ghost" size="icon" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity" disabled={value <= 1}><Minus className="size-4" /></Button><output className="w-9 text-center text-sm font-black text-brand" aria-live="polite">{value}</output><Button type="button" variant="ghost" size="icon" onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus className="size-4" /></Button></div>;
}
