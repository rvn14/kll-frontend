export default function Loading() {
  return <main id="main-content" className="shell py-12" aria-busy="true" aria-label="Loading page"><div className="h-10 w-64 animate-pulse rounded-xl bg-soft/60" /><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div className="h-80 animate-pulse rounded-3xl bg-white" key={index} />)}</div></main>;
}
