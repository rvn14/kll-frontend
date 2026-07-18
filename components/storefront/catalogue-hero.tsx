export function CatalogueHero({ eyebrow = "K & LL catalogue", title, description }: { eyebrow?: string; title: string; description: string }) {
  return <div className="mb-10 overflow-hidden rounded-[2rem] bg-brand px-6 py-10 text-white sm:px-10 sm:py-14"><p className="text-xs font-black uppercase tracking-[.18em] text-soft">{eyebrow}</p><h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/72">{description}</p></div>;
}
