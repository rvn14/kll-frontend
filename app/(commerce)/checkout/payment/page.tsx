import type { Metadata } from "next";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentForm } from "@/components/checkout/payment-form";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Payment method" };

export default function PaymentPage() { 
  return (
    <main id="main-content" className="shell py-8 sm:py-12">
      <CheckoutStepper current={2} />
      <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
        <Suspense fallback={<div className="panel p-5 sm:p-8">Loading payment options...</div>}>
          <PaymentForm />
        </Suspense>
        <OrderSummary />
      </div>
    </main>
  ); 
}
