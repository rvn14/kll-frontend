import { ImagePlus, Save } from "lucide-react";
import { categories } from "@/mocks/data";
import type { Product } from "@/types";

export function ItemForm({ product }: { product?: Product }) {
  return (
    <form className="grid gap-6 xl:grid-cols-[1fr_330px]">
      <section className="panel p-5 sm:p-7">
        <h2 className="text-lg font-black text-brand">Item information</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className="field-label">Item name</span><input className="field" defaultValue={product?.name} /></label>
          <label><span className="field-label">Item ID</span><input className="field" defaultValue={product?.id} /></label>
          <label><span className="field-label">Category</span><select className="field" defaultValue={product?.category ?? categories[0].name}>{categories.map((category) => <option key={category.slug}>{category.name}</option>)}</select></label>
          <label><span className="field-label">Price</span><input className="field" type="number" defaultValue={product?.price ?? undefined} placeholder="Not supplied" /></label>
          <label><span className="field-label">Reported stock</span><input className="field" type="number" defaultValue={product?.stockQuantity ?? undefined} /></label>
          <label className="sm:col-span-2"><span className="field-label">Description</span><textarea className="field min-h-32" defaultValue={product?.description} /></label>
          <label><span className="field-label">Warranty summary</span><input className="field" defaultValue={product?.warranty} /></label>
          <label><span className="field-label">Status</span><select className="field"><option>Active</option><option>Draft</option><option>Deleted</option></select></label>
        </div>
        <div className="mt-7 flex justify-end"><button type="button" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-black text-white"><Save className="size-4" />Save item</button></div>
      </section>
      <aside className="panel h-fit p-5">
        <h2 className="text-lg font-black text-brand">Product media</h2>
        <button type="button" className="mt-5 flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soft-strong bg-soft/20 p-5 text-center text-brand hover:bg-soft/35"><ImagePlus className="size-7" /><span className="mt-3 text-sm font-black">Upload product images</span><span className="mt-1 text-xs text-ink-muted">PNG, JPG or WebP · multipart upload</span></button>
        <p className="mt-4 text-xs leading-5 text-ink-muted">The upload response will be normalized after its contract is confirmed.</p>
      </aside>
    </form>
  );
}
