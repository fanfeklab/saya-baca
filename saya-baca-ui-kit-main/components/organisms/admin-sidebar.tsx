"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Content", path: "/dashboard/content", icon: FileText },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r-2 border-border hidden md:flex flex-col bg-card">
      <div className="p-6 font-bold text-xl border-b-2 border-border flex items-center justify-between">
        Saya Baca ERP
      </div>
      <nav className="p-4 flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 font-bold rounded-lg cursor-pointer transition-colors border-2",
                isActive 
                  ? "bg-primary/10 text-primary border-primary" 
                  : "hover:bg-muted border-transparent"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t-2 border-border">
         <Link 
            href="/login"
            className="flex items-center gap-3 px-4 py-2.5 font-bold rounded-lg cursor-pointer transition-colors border-2 border-transparent hover:bg-destructive/10 text-destructive hover:border-destructive"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
      </div>
    </aside>
  );
}
