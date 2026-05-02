"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomNavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const DEFAULT_NAV_ITEMS: BottomNavItem[] = [
  { name: "Beranda", path: "/main/learn", icon: Home },
  { name: "Peringkat", path: "/main/leaderboard", icon: Trophy },
  { name: "Hadiah", path: "/main/achievements", icon: Award },
  { name: "Profil", path: "/main/profile", icon: User },
];

export interface BottomNavProps {
  className?: string;
  items?: BottomNavItem[];
}

export function BottomNav({ className, items = DEFAULT_NAV_ITEMS }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 animate-in slide-in-from-bottom-10 duration-500", className)}>
      <nav className="flex items-center justify-around w-full max-w-md bg-card border-4 border-black rounded-[2rem] shadow-neo-lg p-2 h-20">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path !== "/main/learn" && pathname?.startsWith(item.path));
          
          return (
            <Link key={item.path} href={item.path} className="relative group">
              <div 
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-300 active:scale-90",
                  isActive 
                    ? "bg-primary text-primary-foreground border-2 border-black shadow-neo -translate-y-1.5" 
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Icon className={cn("size-6 transition-transform group-hover:scale-110", isActive ? "stroke-[3px]" : "stroke-[2.5px]")} />
                <span className={cn(
                  "text-[9px] font-black tracking-widest uppercase transition-all",
                  isActive ? "opacity-100" : "opacity-40"
                )}>
                  {item.name}
                </span>
                {isActive && (
                    <div className="absolute -top-1 -right-1 size-3 bg-yellow-400 border-2 border-black rounded-full animate-bounce shadow-neo-sm" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
