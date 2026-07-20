import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { getAddressesServer } from "@/services/profile.server.service";

export default async function AddressesPage() { 
  const addresses = (await getAddressesServer()) || [];
  
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand">Delivery addresses</h2>
          <p className="mt-1 text-sm text-ink-muted">Choose where future orders should arrive.</p>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-black text-white"><Plus className="size-4" />Add address</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address: any) => (
          <article className="panel p-5" key={address.id}>
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-soft/55 text-brand"><MapPin className="size-5" /></span>
              {address.is_default && <span className="inline-flex items-center gap-1 rounded-full bg-soft px-3 py-1 text-xs font-black text-brand"><Star className="size-3" />Default</span>}
            </div>
            <h3 className="mt-5 text-lg font-black text-brand">{address.label}</h3>
            <p className="mt-2 text-sm font-bold text-brand">{address.recipient_name}</p>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{address.address_line1}<br />{address.city}, {address.state}<br />{address.phone_number}</p>
            <div className="mt-5 flex gap-2 border-t border-border pt-4">
              <button className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black text-brand hover:bg-soft/45"><Pencil className="size-3.5" />Edit</button>
              <button className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black text-red-700 hover:bg-red-50"><Trash2 className="size-3.5" />Delete</button>
            </div>
          </article>
        ))}
      </div>
      {addresses.length === 0 && <p className="mt-4 text-sm text-ink-muted">No addresses saved yet.</p>}
    </div>
  ); 
}
