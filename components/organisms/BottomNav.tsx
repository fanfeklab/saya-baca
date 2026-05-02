'use client';

import React from 'react';
import { Home, BookOpen, Trophy, Settings, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const getActive = () => {
    if (pathname === '/main/home') return 'home';
    if (pathname.includes('/main/learn')) return 'modules';
    if (pathname.includes('/main/leaderboard')) return 'leaderboard';
    if (pathname.includes('/main/social')) return 'social';
    if (pathname.includes('/main/parent/dashboard') || pathname.includes('/main/settings')) return 'settings';
    return 'home';
  };

  const active = getActive();

  const items = [
    { id: 'modules', icon: BookOpen, path: '/main/learn' },
    { id: 'leaderboard', icon: Trophy, path: '/main/leaderboard' },
    { id: 'home', icon: Home, prominent: true, path: '/main/home' },
    { id: 'social', icon: Users, path: '/main/social' },
    { id: 'settings', icon: Settings, path: '/main/parent/dashboard' },
  ];

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-around bg-card/90 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full neo-border neo-shadow-lg w-[95%] max-w-[400px] transition-colors">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={cn(
              "relative transition-all duration-200",
              item.prominent 
                ? "-top-4 sm:-top-6 bg-yellow-400 p-3 sm:p-4 rounded-full neo-border neo-shadow hover:scale-110 active:scale-95 text-foreground" 
                : "p-2 hover:scale-110 active:scale-90 text-foreground/60/60",
              active === item.id && !item.prominent ? "text-foreground  scale-110 sm:scale-125" : ""
            )}
          >
            <Icon size={item.prominent ? 28 : 24} className={cn(active === item.id ? "stroke-[2.5px]" : "stroke-[2px]")} />
            {active === item.id && !item.prominent && (
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground  rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
