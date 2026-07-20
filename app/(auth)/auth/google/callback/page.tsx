"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (!accessToken || !refreshToken) {
      setError("Authentication failed. Missing tokens.");
      return;
    }

    // Send tokens to our Next.js API route to set httpOnly cookies
    fetch("/api/v1/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to store session");
        // Fetch user profile now that cookies are set
        await fetchUser();
        router.replace("/");
        router.refresh();
      })
      .catch(() => {
        setError("Something went wrong during sign-in. Please try again.");
      });
  }, [searchParams, fetchUser, router]);

  if (error) {
    return (
      <div className="text-center" role="alert">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-destructive">
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </span>
        <h1 className="mt-5 text-2xl font-black text-brand">Sign-in failed</h1>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{error}</p>
        <a href="/login" className="mt-5 inline-flex rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-strong transition-colors">
          Try again
        </a>
      </div>
    );
  }

  return (
    <div className="text-center" role="status">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-soft/55 text-brand">
        <Loader2 className="size-6 animate-spin" />
      </span>
      <h1 className="mt-5 text-2xl font-black text-brand">Completing your Google sign-in</h1>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Please wait while we securely store your session...
      </p>
    </div>
  );
}
