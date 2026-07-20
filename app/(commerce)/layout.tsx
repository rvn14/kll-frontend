import { Footer } from "@/components/layout/footer";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-nav";
import { StoreHeader } from "@/components/layout/store-header";
import { AuthGuard } from "@/components/auth-guard";

export default function CommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHeader />
      <AuthGuard>{children}</AuthGuard>
      <Footer />
      <MobileBottomNavigation />
    </>
  );
}
