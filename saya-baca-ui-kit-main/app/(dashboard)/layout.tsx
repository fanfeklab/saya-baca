import { AdminSidebar } from "@/components/organisms/admin-sidebar";
import { AdminTopbar } from "@/components/molecules/admin-topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />

        {/* Main Content Areas */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
