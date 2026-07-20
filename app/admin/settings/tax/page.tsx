import { History } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getTaxRateServer } from "@/services/settings.server.service";
import { TaxForm } from "@/components/admin/tax-form";

export default async function TaxRatePage() {
  const data = await getTaxRateServer();
  const taxRate = data?.tax_rate ?? 18; // Default fallback if undefined

  return (
    <div>
      <AdminPageHeader eyebrow="Settings / Tax" title="Tax rate" description="Review the value returned by the settings API before making a change." />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="panel p-6 sm:p-8">
          <TaxForm initialRate={taxRate} />
        </section>
        <aside className="panel h-fit p-5">
          <History className="size-5 text-brand" />
          <h2 className="mt-4 font-black text-brand">Audit information</h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">An audit trail will appear here if a supported endpoint is added later.</p>
          <div className="mt-5 rounded-2xl bg-surface-muted p-4 text-xs text-ink-muted">No audit endpoint has been invented.</div>
        </aside>
      </div>
    </div>
  );
}
