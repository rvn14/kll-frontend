import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://klltraders.lk"),
  title: { default: "K & LL Traders | Appliances & Electronics", template: "%s | K & LL Traders" },
  description: "Shop reliable appliances and electronics for Sri Lankan homes, with helpful support from K & LL Traders.",
  openGraph: { title: "K & LL Traders", description: "Appliances and electronics, selected for everyday life.", type: "website", locale: "en_LK" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
