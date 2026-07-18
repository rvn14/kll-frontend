"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="main-content" className="shell flex min-h-[60vh] items-center justify-center py-16"><div className="panel max-w-lg p-8 text-center"><AlertTriangle className="mx-auto size-10 text-brand" /><h1 className="mt-4 text-2xl font-black text-brand">We could not load this information</h1><p className="mt-2 text-ink-muted">Something interrupted the page. Your cart and account details have not been changed.</p><Button className="mt-6" onClick={reset}>Try again</Button></div></main>;
}
