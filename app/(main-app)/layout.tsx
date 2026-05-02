'use client';

import { BottomNav } from '@/components/molecules/bottom-nav';
import { TopAppBar } from '@/components/molecules/top-app-bar';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGamePath = pathname?.includes('/game/');

  return (
    <div className="min-h-screen flex flex-col relative pb-24 overflow-x-hidden">
      {/* Top Header */}
      {!isGamePath && (
        <div className="fixed top-4 left-0 right-0 px-6 z-40 max-w-lg mx-auto">
          <TopAppBar />
        </div>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 w-full max-w-lg mx-auto pt-24",
        isGamePath && "pt-6"
      )}>
        {children}
      </main>

      {/* Floating Bottom Navigation - Hide in game */}
      {!isGamePath && (
        <div className="fixed bottom-6 left-0 right-0 px-6 z-40 max-w-lg mx-auto">
          <BottomNav variant="floating" />
        </div>
      )}
    </div>
  );
}
