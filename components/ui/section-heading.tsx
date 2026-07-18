import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({ eyebrow, title, description, href, linkLabel = "View all" }: { eyebrow?: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-brand">{eyebrow}</p>}
        <h2 className="text-2xl font-black tracking-tight text-brand sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted sm:text-base">{description}</p>}
      </div>
      {href && <Link href={href} className="hidden shrink-0 items-center gap-2 text-sm font-bold text-brand hover:underline sm:flex">{linkLabel}<ArrowRight className="size-4" /></Link>}
    </div>
  );
}
