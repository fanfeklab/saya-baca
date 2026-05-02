"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Wrench, Navigation, Palette, Database, LayoutDashboard, Smartphone, Megaphone, TerminalSquare, Users, Lock, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";

const ROUTES = [
  { group: "Marketing", items: [
    { name: "Landing Page", path: "/", icon: Megaphone }
  ]},
  { group: "Auth Pages", items: [
    { name: "Login Gateway", path: "/login", icon: Smartphone },
  ]},
  { group: "Main App (Anak & Ortu)", items: [
    { name: "Home (Anak)", path: "/home", icon: Smartphone },
    { name: "Parent Dashboard", path: "/parent", icon: Smartphone },
    { name: "Game Belajar (Mock)", path: "/game/membaca", icon: Smartphone },
  ]},
  { group: "Admin ERP", items: [
    { name: "Analytics Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users Management", path: "/dashboard/users", icon: LayoutDashboard },
  ]},
  { group: "Dev & Design", items: [
    { name: "UI Components", path: "/demo/components", icon: Palette },
  ]}
];

export function DevNavigator() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Tampilkan di mana-mana selama pengembangan, namun utamakan di path utama
  const isExcluded = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isExcluded) {
    return null;
  }

  const MAIN_APP_ROUTES = [
    { 
      group: "Akses & Gate", 
      items: [
        { name: "Halaman Login", path: "/login", icon: Smartphone },
        { name: "Pilih Profil (Bento)", path: "/select-profile", icon: Users },
      ]
    },
    { 
      group: "Zona Belajar (Anak)", 
      items: [
        { name: "Home (Asembly)", path: "/home", icon: Smartphone },
        { name: "Gameplay (Membaca)", path: "/game/membaca", icon: Smartphone },
        { name: "Profil Saya", path: "/profil", icon: Users },
      ]
    },
    { 
      group: "Pusat Kontrol (Ortu)", 
      items: [
        { name: "Dashboard Orang Tua", path: "/parent", icon: Lock },
      ]
    }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger 
        className="fixed bottom-8 right-8 z-[9999] rounded-full h-16 w-16 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all bg-accent hover:bg-accent/90 text-accent-foreground border-4 border-black flex items-center justify-center outline-none"
      >
        <Navigation className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] z-[10000] flex flex-col p-0 border-l-4 border-black">
        <SheetHeader className="p-6 border-b-4 border-border bg-muted/50 shrink-0">
          <SheetTitle className="flex items-center gap-2 font-black text-2xl">
            <Smartphone className="w-6 h-6" />
            Main App Demo
          </SheetTitle>
          <p className="text-sm font-bold text-muted-foreground text-left">
            Navigasi Halaman Prototype
          </p>
        </SheetHeader>
        
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 space-y-8">
            <div>
              <h3 className="font-black text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
                Pengaturan Tampilan
              </h3>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className={`flex-1 h-12 rounded-2xl border-4 shadow-neo-sm hover:-translate-y-1 hover:shadow-neo transition-all ${theme === 'light' ? 'bg-primary text-primary-foreground border-border' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <Sun className="mr-2 h-5 w-5" />
                  Terang
                </Button>
                <Button 
                  variant="outline" 
                  className={`flex-1 h-12 rounded-2xl border-4 shadow-neo-sm hover:-translate-y-1 hover:shadow-neo transition-all ${theme === 'dark' ? 'bg-primary text-primary-foreground border-border' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="mr-2 h-5 w-5" />
                  Gelap
                </Button>
              </div>
            </div>

            {MAIN_APP_ROUTES.map((group) => (
              <div key={group.group}>
                <h3 className="font-black text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
                  {group.group}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((route) => {
                    const Icon = route.icon;
                    const isActive = pathname === route.path;
                    return (
                      <Link 
                        key={route.path} 
                        href={route.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-4 transition-all ${
                          isActive 
                            ? "bg-primary border-border shadow-neo translate-x-1 font-black text-white" 
                            : "bg-card border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 text-foreground font-bold"
                        } ${route.path === "#" ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center gap-3 text-sm">
                          <Icon className="w-5 h-5" />
                          {route.name}
                        </div>
                        {isActive && <div className="size-2 bg-white rounded-full animate-pulse" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
