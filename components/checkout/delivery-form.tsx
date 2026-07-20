"use client";

import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function DeliveryForm() {
  const searchParams = useSearchParams();
  const directBuyItemId = searchParams.get("directBuyItemId");
  const qty = searchParams.get("qty");
  
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await profileService.getAddresses();
      return res;
    },
  });

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  if (isLoading) {
    return <div className="p-8 text-center">Loading addresses...</div>;
  }

  let paymentUrl = `/checkout/payment${selectedAddress ? `?addressId=${selectedAddress}` : ""}`;
  if (selectedAddress && directBuyItemId) {
    paymentUrl += `&directBuyItemId=${directBuyItemId}&qty=${qty || 1}`;
  }

  return (
    <section className="panel p-5 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/55 text-brand">
          <MapPin className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-black text-brand">Where should we deliver?</h1>
          <p className="text-sm text-ink-muted">Choose a saved address or enter delivery details.</p>
        </div>
      </div>
      
      {(addresses as any[])?.length > 0 && (
        <fieldset className="mt-7 grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">Saved addresses</legend>
          {(addresses as any[]).map((address: any) => (
            <label className="relative rounded-2xl border border-border p-4 has-checked:border-brand has-checked:bg-soft/25" key={address.id}>
              <input 
                type="radio" 
                name="delivery-address" 
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
                className="absolute right-4 top-4 size-4 accent-brand" 
              />
              <span className="text-sm font-black text-brand">{address.label || "Address"}</span>
              {address.is_default && <span className="ml-2 rounded-full bg-soft px-2 py-1 text-[10px] font-black text-brand">Default</span>}
              <span className="mt-3 block text-sm font-bold text-brand">{address.recipient_name}</span>
              <span className="mt-1 block text-xs leading-5 text-ink-muted">{address.street_address}, {address.city}<br />{address.phone_number}</span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold text-ink-muted">{(addresses as any[])?.length ? "or add another address" : "add an address"}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="grid gap-4 sm:grid-cols-2">
        <label><span className="field-label">Recipient name</span><input className="field" autoComplete="name" /></label>
        <label><span className="field-label">Phone number</span><input className="field" type="tel" autoComplete="tel" /></label>
        <label className="sm:col-span-2"><span className="field-label">Delivery address</span><textarea className="field min-h-28" autoComplete="street-address" /></label>
        <label><span className="field-label">City / town</span><input className="field" autoComplete="address-level2" /></label>
        <label><span className="field-label">Delivery note <span className="font-normal text-ink-muted">(optional)</span></span><input className="field" /></label>
      </form>

      <div className="mt-7 flex justify-end">
        <Link 
          href={paymentUrl} 
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white ${selectedAddress ? "bg-brand" : "bg-soft text-ink-muted cursor-not-allowed"}`}
          onClick={(e) => !selectedAddress && e.preventDefault()}
        >
          Continue to payment <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
