'use client';

import React from 'react';
import { ArrowLeft, Moon, Sun, Type, Lock, Heart, Star, Coins, Menu, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ParentGuard } from '@/components/organisms/ParentGuard';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import { useProfile } from '@/hooks/useProfile';
import { useGameStore } from '@/store/useGameStore';
import { useTheme } from 'next-themes';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/atoms/dropdown-menu';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isUppercase, setIsUppercase] = React.useState(false);
  const router = useRouter();
  
  const { activeProfile, loading } = useProfile();
  
  // Game Store for Realtime HUD
  const isImmersiveMode = useGameStore(state => state.isImmersiveMode);
  const energy = useGameStore(state => state.energy);
  const coins = useGameStore(state => state.coins);
  const globalExp = useGameStore(state => state.globalExp);
  const timerSeconds = useGameStore(state => state.timerSeconds);
  const currentSessionPoints = useGameStore(state => state.currentSessionPoints);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // AC-003/004: Redirect to profiles screen if no active profile found
  React.useEffect(() => {
    if (!loading && !activeProfile && mounted) {
      router.push('/profiles');
    }
  }, [loading, activeProfile, mounted, router]);

  const handleParentAccess = () => {
    router.push('/main/parent/dashboard');
  };

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 flex items-center justify-between pointer-events-none gap-2">
      {/* Left Group: Nav & Identity */}
      <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto bg-card/90 backdrop-blur-md p-1 sm:p-1.5 rounded-full neo-border neo-shadow max-w-[200px] sm:max-w-none min-w-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            if (isImmersiveMode) {
              // If immersive, could back to home or warn
              router.back();
            } else {
              router.push('/profiles');
            }
          }} 
          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 active:translate-x-0 active:translate-y-0 active:shadow-none shrink-0"
        >
          <ArrowLeft className="size-4 sm:size-6 text-foreground" />
        </Button>
        
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 min-w-0 overflow-hidden cursor-pointer" onClick={() => router.push('/profiles')}>
          <Avatar size="sm" className="sm:size-10 shrink-0 neo-border bg-background">
            <AvatarImage 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile?.avatar || 'Bima'}`} 
              alt={activeProfile?.displayName || 'Avatar'} 
            />
            <AvatarFallback>{(activeProfile?.displayName || 'B').substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-heading font-black text-[10px] sm:text-xs md:text-sm leading-none uppercase truncate">
                Halo, {activeProfile?.displayName || '...'}
              </span>
              {activeProfile && (
                <span className="bg-foreground text-background text-[7px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black shrink-0">
                  LVL {activeProfile.currentLevel}
                </span>
              )}
            </div>
            {!isImmersiveMode && (
               <span className="font-sans text-[8px] sm:text-[10px] font-bold text-foreground/60 uppercase truncate">
                 {activeProfile ? `${activeProfile.currentStreak} HARI STREAK` : '...'}
               </span>
            )}
            {isImmersiveMode && (
               <span className="font-sans text-[8px] sm:text-[10px] font-bold text-foreground/60 uppercase truncate">
                 BERMAIN
               </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Group: Status & Actions */}
      <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto shrink-0 flex-wrap justify-end">
        
        {/* HUD: Points */}
        <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-md px-2 py-1.5 sm:px-3 sm:py-2 rounded-full neo-border neo-shadow">
          <Coins className="size-4 text-yellow-500 fill-yellow-500" />
          <span className="font-heading font-black text-xs sm:text-sm">{isImmersiveMode ? currentSessionPoints : coins}</span>
        </div>

        {/* HUD: EXP */}
        <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-md px-2 py-1.5 sm:px-3 sm:py-2 rounded-full neo-border neo-shadow hidden sm:flex">
          <Star className="size-4 text-blue-500 fill-blue-500" />
          <span className="font-heading font-black text-xs sm:text-sm">{globalExp}</span>
        </div>

        {/* HUD: Energy (Nyawa) */}
        <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-md px-2 py-1.5 sm:px-3 sm:py-2 rounded-full neo-border neo-shadow">
          <Heart className={cn("size-4", energy > 0 ? "text-red-500 fill-red-500" : "text-gray-400 fill-gray-400")} />
          <span className="font-heading font-black text-xs sm:text-sm">{energy}/5</span>
        </div>

        {/* Settings Toggle (Dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9 sm:h-12 sm:w-12 bg-card/90 backdrop-blur-md neo-shadow neo-border">
              <Menu className="size-4 sm:size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 neo-border neo-shadow p-2 rounded-2xl">
            <div className="px-2 py-1.5 font-heading font-black text-xs opacity-50 uppercase">Pengaturan</div>
            <ParentGuard onSuccess={handleParentAccess}>
               <DropdownMenuItem className="cursor-pointer font-bold gap-2 focus:bg-muted rounded-xl p-2">
                 <Lock className="size-4" /> Akses Orang Tua
               </DropdownMenuItem>
             </ParentGuard>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setIsUppercase(!isUppercase)}
              className="cursor-pointer font-bold gap-2 focus:bg-muted rounded-xl p-2"
            >
              <Type className="size-4" /> {isUppercase ? 'Normal Text' : 'Teks Besar (KAPITAL)'}
            </DropdownMenuItem>
            <DropdownMenuItem 
               onClick={() => setTheme(isDark ? 'light' : 'dark')}
               className="cursor-pointer font-bold gap-2 focus:bg-muted rounded-xl p-2"
            >
               {mounted && (isDark ? <Sun className="size-4" /> : <Moon className="size-4" />)}
               {isDark ? 'Mode Terang' : 'Mode Gelap'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
