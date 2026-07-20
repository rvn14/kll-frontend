"use client";

import { AlertTriangle, Percent, Save, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "@/services/settings.service";

export function TaxForm({ initialRate }: { initialRate: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const rate = Number(formData.get("tax_rate"));
      return settingsService.updateTaxRate({ rate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxRate"] });
      alert("Tax rate updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update tax rate:", error);
      alert("Failed to update tax rate.");
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(new FormData(e.currentTarget));
  };

  return (
    <form onSubmit={onSubmit} className="contents">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/50 text-brand">
          <Percent className="size-5" />
        </span>
        <div>
          <h2 className="font-black text-brand">Current tax rate</h2>
          <p className="text-xs text-ink-muted">Currently connected to backend</p>
        </div>
      </div>
      <label className="mt-7 block max-w-sm">
        <span className="field-label">Tax rate (%)</span>
        <div className="relative">
          <input name="tax_rate" className="field pr-12 text-lg font-black" type="number" min="0" step="0.01" defaultValue={initialRate} required />
          <Percent className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        </div>
      </label>
      <div className="mt-6 flex gap-3 rounded-2xl bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
        <p className="text-xs leading-5 text-amber-900">
          Changing the tax rate affects backend calculations. Production must show a confirmation modal and use the authoritative value returned after update.
        </p>
      </div>
      <button type="submit" disabled={mutation.isPending} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-black text-white disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Review change
      </button>
    </form>
  );
}
