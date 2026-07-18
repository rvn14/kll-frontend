import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Islandwide delivery", detail: "Coordinated delivery across Sri Lanka" },
  { icon: ShieldCheck, title: "Genuine warranty", detail: "Clear warranty details before you buy" },
  { icon: Headphones, title: "Human support", detail: "Helpful phone and WhatsApp assistance" },
  { icon: RotateCcw, title: "Straightforward help", detail: "Support if your order needs attention" },
];

export function TrustStrip() { return <div className="grid overflow-hidden rounded-3xl border border-brand/10 bg-soft/38 sm:grid-cols-2 lg:grid-cols-4">{items.map(({ icon: Icon, title, detail }) => <div className="flex gap-3 border-brand/10 p-5 sm:border-r last:border-0" key={title}><span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-brand"><Icon className="size-5" /></span><div><h3 className="text-sm font-black text-brand">{title}</h3><p className="mt-1 text-xs leading-5 text-ink-muted">{detail}</p></div></div>)}</div>; }
