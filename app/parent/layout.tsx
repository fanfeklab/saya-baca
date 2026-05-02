"use client";

import React from "react";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { NeoText } from "@/components/atoms/neo-text";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  BarChart3, 
  LayoutDashboard,
  Menu
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { href: "/parent", icon: BarChart3, label: "Ringkasan" },
  { href: "/parent/children", icon: Users, label: "Anak-Anak" },
  { href: "/parent/reports", icon: TrendingUp, label: "Perkembangan" },
  { href: "/parent/settings", icon: Settings, label: "Pengaturan" },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string, onNavigate: (href: string) => void }) {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="size-10 bg-primary border-2 border-black shadow-neo-sm rotate-3 flex items-center justify-center">
          <LayoutDashboard className="size-6 text-white" />
        </div>
        <NeoText variant="subtitle" stroke className="text-xl uppercase italic">Parent HUB</NeoText>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <Button 
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "justify-start h-12 text-sm font-black transition-all uppercase tracking-tighter",
              pathname === item.href 
                ? "border-2 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-black" 
                : "opacity-60 hover:opacity-100"
            )}
            onClick={() => onNavigate(item.href)}
          >
            <item.icon className="size-5 mr-3" /> {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t-2 border-black/5">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 font-black uppercase tracking-tighter"
          onClick={() => onNavigate("/select-profile")}
        >
          <LogOut className="size-5 mr-3" /> Kembali
        </Button>
      </div>
    </div>
  );
}

import { ParentGate } from "@/components/organisms/parent-gate";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <ParentGate>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-72 border-r-4 border-black p-6 gap-8 bg-card shadow-neo-sm sticky top-0 h-screen overflow-y-auto">
          <SidebarContent pathname={pathname || ""} onNavigate={handleNavigate} />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Mobile & Desktop Top Bar */}
          <header className="h-16 border-b-2 border-black lg:border-none p-4 flex items-center justify-between lg:justify-end gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-30 lg:px-12">
              <div className="lg:hidden flex items-center gap-2">
                   <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                      <SheetTrigger asChild>
                          <Button variant="outline" size="icon" className="border-2 border-black shadow-neo-sm active:shadow-none">
                              <Menu className="size-6" />
                          </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-72 p-6 border-r-4 border-black">
                          <SidebarContent pathname={pathname || ""} onNavigate={handleNavigate} />
                      </SheetContent>
                   </Sheet>
                   <NeoText variant="subtitle" stroke className="text-lg uppercase italic ml-2">HUB</NeoText>
              </div>
              <ThemeToggle className="border-2 border-black h-10 w-10 shadow-neo-sm active:shadow-none bg-background" />
          </header>

          <main className="flex-1 p-6 md:p-12">
            {children}
          </main>
        </div>
      </div>
    </ParentGate>
  );
}
