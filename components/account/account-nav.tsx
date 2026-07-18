"use client";

import Link from "next/link";
import { CircleUserRound, KeyRound, LayoutDashboard, MapPin, Package } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [{ href: "/account", label: "Overview", icon: LayoutDashboard }, { href: "/account/profile", label: "Profile", icon: CircleUserRound }, { href: "/account/addresses", label: "Addresses", icon: MapPin }, { href: "/account/orders", label: "Orders", icon: Package }, { href: "/account/security", label: "Security", icon: KeyRound }];
export function AccountNav() { const pathname = usePathname(); return <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" aria-label="Account sections">{links.map(({ href, label, icon: Icon }) => { const active = href === "/account" ? pathname === href : pathname.startsWith(href); return <Link href={href} key={href} aria-current={active ? "page" : undefined} className={`flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-4 text-sm font-bold transition ${active ? "bg-brand text-white" : "text-brand hover:bg-soft/45"}`}><Icon className="size-4.5" />{label}</Link>; })}</nav>; }
