import type { Metadata } from "next";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { OrderSummary } from "@/components/checkout/order-summary";
import { DeliveryForm } from "@/components/checkout/delivery-form";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Delivery details" };

export default function DeliveryPage() { 
  return (
    <main id="main-content" className="shell py-8 sm:py-12">
      <CheckoutStepper current={1} />
      <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
        <Suspense fallback={<div className="panel p-5 sm:p-8">Loading delivery options...</div>}>
          <DeliveryForm />
        </Suspense>
        <OrderSummary />
      </div>
    </main>
  ); 
}
