"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Banknote, Building2, CreditCard, Info } from "lucide-react";
import { toast } from "sonner";
import { ordersService } from "@/services/orders.service";
import { useCartStore } from "@/stores/cart-store";

const methods = [
  { id: "cod", icon: Banknote, title: "Cash on delivery", detail: "Pay when your order reaches you." },
  { id: "card", icon: CreditCard, title: "Card on delivery", detail: "Card availability is confirmed by the delivery team." },
  { id: "bank", icon: Building2, title: "Bank transfer", detail: "Transfer instructions will be provided after confirmation." }
];

export function PaymentForm() {
  const [method, setMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  const directBuyItemId = searchParams.get("directBuyItemId");
  const directBuyQty = searchParams.get("qty");
  
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clear);

  const handleSubmit = async () => {
    if (!addressId) {
      toast.error("Please select a delivery address first.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      let res;
      if (directBuyItemId) {
        res = await ordersService.direct({
          item_id: parseInt(directBuyItemId, 10),
          quantity: parseInt(directBuyQty || "1", 10),
          order_type: method.toUpperCase(),
          delivery_address_id: parseInt(addressId, 10),
          order_note: "",
        });
      } else {
        res = await ordersService.checkoutCart({
          order_type: method.toUpperCase(),
          delivery_address_id: parseInt(addressId, 10),
          order_note: "",
        });
        clearCart();
      }
      
      router.push(`/checkout/confirmation?orderId=${(res as any).order_id}`);
    } catch (e) {
      toast.error("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="panel p-5 sm:p-8">
      <h1 className="text-2xl font-black text-brand">Choose a payment method</h1>
      <p className="mt-2 text-sm text-ink-muted">No payment is authorized by this frontend. The gateway integration will be added when its API is confirmed.</p>
      
      <fieldset className="mt-7 space-y-3">
        <legend className="sr-only">Payment methods</legend>
        {methods.map(({ id, icon: Icon, title, detail }) => (
          <label className="flex min-h-20 cursor-pointer items-center gap-4 rounded-2xl border border-border p-4 has-checked:border-brand has-checked:bg-soft/25" key={id}>
            <input 
              type="radio" 
              name="payment" 
              checked={method === id} 
              onChange={() => setMethod(id)}
              className="size-4 accent-brand" 
            />
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-soft/55 text-brand"><Icon className="size-5" /></span>
            <span>
              <span className="block text-sm font-black text-brand">{title}</span>
              <span className="mt-1 block text-xs leading-5 text-ink-muted">{detail}</span>
            </span>
          </label>
        ))}
      </fieldset>
      
      <div className="mt-6 flex gap-3 rounded-2xl bg-soft/35 p-4 text-sm leading-6 text-ink-muted">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />
        <p>Availability of each method is a UI placeholder until the backend returns supported methods for this order.</p>
      </div>
      
      <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <Link href="/checkout/delivery" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-brand hover:bg-soft/45">
          <ArrowLeft className="size-4" />Back to delivery
        </Link>
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-black text-white disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Place order"} <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
