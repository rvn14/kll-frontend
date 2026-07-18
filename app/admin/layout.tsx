import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopBar } from "@/components/admin/admin-top-bar";
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-surface"><AdminSidebar /><div className="lg:pl-64"><AdminTopBar /><main id="main-content" className="p-4 sm:p-7 lg:p-9">{children}</main></div></div>; }
