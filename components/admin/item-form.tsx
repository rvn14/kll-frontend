"use client";

import { ImagePlus, Save, Loader2 } from "lucide-react";
import type { Product } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "@/services/items.service";
import { useRouter } from "next/navigation";

export function ItemForm({ product }: { product?: Product }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const payload = {
        name: formData.get("name"),
        description: formData.get("description") || "",
        price: Number(formData.get("price")) || 0,
        stock_quantity: Number(formData.get("stock_quantity")) || 0,
        category_id: 1, // hardcoded for now or fetched
        warranty_details: formData.get("warranty_details") || "",
      };
      
      if (product?.id) {
        return updateItem(product.id, payload);
      } else {
        return createItem(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-items"] });
      router.push("/admin/items");
    },
    onError: (error) => {
      console.error("Failed to save item:", error);
      alert("Failed to save item. Please check the inputs.");
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <form className="grid gap-6 xl:grid-cols-[1fr_330px]" onSubmit={onSubmit}>
      <section className="panel p-5 sm:p-7">
        <h2 className="text-lg font-black text-brand">Item information</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="field-label">Item name</span>
            <input name="name" className="field" defaultValue={product?.name} required />
          </label>
          <label>
            <span className="field-label">Category (ID)</span>
            <input name="category_id" className="field" type="number" defaultValue={1} required />
          </label>
          <label>
            <span className="field-label">Price</span>
            <input name="price" className="field" type="number" step="0.01" defaultValue={product?.price ?? undefined} required />
          </label>
          <label>
            <span className="field-label">Reported stock</span>
            <input name="stock_quantity" className="field" type="number" defaultValue={product?.stockQuantity ?? undefined} required />
          </label>
          <label className="sm:col-span-2">
            <span className="field-label">Description</span>
            <textarea name="description" className="field min-h-32" defaultValue={product?.description} />
          </label>
          <label>
            <span className="field-label">Warranty summary</span>
            <input name="warranty_details" className="field" defaultValue={product?.warranty} />
          </label>
          <label>
            <span className="field-label">Status</span>
            <select name="status" className="field" defaultValue="Active">
              <option>Active</option>
              <option>Draft</option>
              <option>Deleted</option>
            </select>
          </label>
        </div>
        <div className="mt-7 flex justify-end">
          <button type="submit" disabled={mutation.isPending} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-black text-white disabled:opacity-50">
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save item
          </button>
        </div>
      </section>
      <aside className="panel h-fit p-5">
        <h2 className="text-lg font-black text-brand">Product media</h2>
        <button type="button" className="mt-5 flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soft-strong bg-soft/20 p-5 text-center text-brand hover:bg-soft/35">
          <ImagePlus className="size-7" />
          <span className="mt-3 text-sm font-black">Upload product images</span>
          <span className="mt-1 text-xs text-ink-muted">PNG, JPG or WebP · multipart upload</span>
        </button>
        <p className="mt-4 text-xs leading-5 text-ink-muted">The upload response will be normalized after its contract is confirmed.</p>
      </aside>
    </form>
  );
}
