"use client";

import Link from "next/link";
import { CircleUserRound, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export function HeaderAuthButton() {
  const { isAuthenticated, isLoading, user, logout } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-11 items-center gap-2 rounded-full px-2 text-brand sm:px-3">
        <CircleUserRound className="size-5 animate-pulse opacity-40" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex min-h-11 items-center gap-2 rounded-full px-2 text-brand hover:bg-soft/55 sm:px-3 transition-colors"
          aria-label="Sign in options"
          aria-expanded={open}
        >
          <LogIn className="size-5" />
          <span className="hidden text-sm font-bold xl:inline">Sign in</span>
          <ChevronDown className={`hidden size-3.5 xl:inline transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 z-50">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-soft/55 transition-colors"
            >
              <LogIn className="size-4" />
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-soft/55 transition-colors"
            >
              <CircleUserRound className="size-4" />
              Create account
            </Link>
            <div className="my-1 border-t border-border" />
            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/v1/auth/google/auth`}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-soft/55 transition-colors"
            >
              <svg className="size-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/></svg>
              Sign in with Google
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-h-11 items-center gap-2 rounded-full px-2 text-brand hover:bg-soft/55 sm:px-3 transition-colors"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <CircleUserRound className="size-5" />
        <span className="hidden text-sm font-bold xl:inline">{user?.full_name?.split(" ")[0] || "Account"}</span>
        <ChevronDown className={`hidden size-3.5 xl:inline transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 z-50">
          <div className="px-4 py-3 border-b border-border mb-1">
            <p className="text-sm font-black text-brand truncate">{user?.full_name}</p>
            <p className="text-xs text-ink-muted truncate">{user?.email}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-soft/55 transition-colors"
          >
            <CircleUserRound className="size-4" />
            My account
          </Link>
          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await logout();
              router.push("/");
              router.refresh();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-destructive hover:bg-red-50 transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
