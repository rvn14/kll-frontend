import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const footerGroups = [
  { title: "Shop", links: [["All products", "/shop"], ["Stock & pricing", "/offers"], ["Televisions & audio", "/category/televisions-audio"], ["Home & kitchen", "/category/home-kitchen-appliances"]] },
  { title: "Customer care", links: [["Contact us", "/contact"], ["Track order", "/track-order"], ["Delivery", "/delivery"], ["Warranty", "/warranty"]] },
  { title: "About", links: [["Our story", "/about"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["My account", "/account"]] },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-brand pb-20 text-white lg:pb-0">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.25fr_2fr] lg:py-16">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3"><Image src="/images/kl-logo-transparent.png" alt="K & LL Traders" width={1095} height={321} className="h-auto w-[185px]" /></div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">Trusted appliances and electronics, selected for Sri Lankan homes and backed by helpful local service.</p>
          <div className="mt-6 space-y-3 text-sm font-semibold text-white/85">
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-soft" />Colombo, Sri Lanka</p>
            <a href="tel:+94111234567" className="flex items-center gap-3 hover:text-soft"><Phone className="size-4 text-soft" />011 123 4567</a>
            <a href="mailto:hello@klltraders.lk" className="flex items-center gap-3 hover:text-soft"><Mail className="size-4 text-soft" />hello@klltraders.lk</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => <div key={group.title}><h2 className="mb-4 text-sm font-black">{group.title}</h2><ul className="space-y-3">{group.links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-white/70 hover:text-soft">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 K &amp; LL Traders. All rights reserved.</p><a href="https://wa.me/94111234567" className="inline-flex items-center gap-2 font-bold text-soft"><MessageCircle className="size-4" />Chat on WhatsApp <ArrowRight className="size-3.5" /></a></div>
      </div>
    </footer>
  );
}
