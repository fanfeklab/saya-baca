"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Gamepad2, Award } from "lucide-react";
import { IconButton } from "@/components/atoms/icon-button";
import { cn } from "@/lib/utils";

export interface BottomNavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const DEFAULT_NAV_ITEMS: BottomNavItem[] = [
  { name: "Beranda", path: "/home", icon: Home },
  { name: "Game", path: "/game", icon: Gamepad2 },
  { name: "Prestasi", path: "/prestasi", icon: Award },
  { name: "Profil", path: "/profile", icon: User },
];

export interface BottomNavProps {
  className?: string;
  items?: BottomNavItem[];
  variant?: "default" | "floating" | "dock";
}

export function BottomNav({ className, items = DEFAULT_NAV_ITEMS, variant = "default" }: BottomNavProps) {
  const pathname = usePathname();

  // Root container styles based on variant
  const containerStyle = {
    default: "fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4",
    floating: "fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4",
    dock: "fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full",
  };

  // Inner nav styles based on variant
  const navStyle = {
    default: "flex items-center justify-around w-full max-w-md bg-card border-2 border-black rounded-2xl shadow-neo p-1",
    floating: "flex items-center justify-around w-full max-w-xs bg-card border-2 border-black rounded-full shadow-neo p-1",
    dock: "flex items-center justify-around w-full bg-card border-t-2 border-black p-2 pb-safe",
  };

  return (
    <div className={cn(containerStyle[variant], className)}>
      <nav className={navStyle[variant]}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          
          return (
            <Link key={item.path} href={item.path} passHref>
              <IconButton 
                variant="ghost" 
                className={cn(
                  "flex flex-col gap-0 transition-all border-2",
                  variant === "floating" ? "h-12 w-12 rounded-full" : "h-14 w-16 rounded-xl",
                  isActive 
                    ? "bg-primary text-primary-foreground border-black shadow-neo -translate-y-1" 
                    : "text-muted-foreground hover:bg-muted/50 border-transparent shadow-none hover:shadow-neo-sm hover:-translate-y-0.5"
                )}
              >
                <Icon className={cn("w-5 h-5 stroke-[2.5px]", isActive && "fill-white/20")} />
                {variant !== "floating" && (
                  <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">{item.name}</span>
                )}
              </IconButton>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
