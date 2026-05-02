'use client';

import React from 'react';
import { ArrowLeft, Moon, Sun, Type, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ParentGuard } from '@/components/organisms/ParentGuard';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';

import { useProfile } from '@/hooks/useProfile';
import { useTheme } from 'next-themes';
import { ProfileModal } from '@/components/organisms/ProfileModal';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isUppercase, setIsUppercase] = React.useState(false);
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const router = useRouter();
  const { activeProfile, loading } = useProfile();

  // Prevent hydration mismatch
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // AC-003/004: Open profile modal if no active profile found after loading
  React.useEffect(() => {
    if (!loading && !activeProfile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfileModalOpen(true);
    }
  }, [loading, activeProfile]);

  const handleParentAccess = () => {
    router.push('/main/parent/dashboard');
  };

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 flex items-center justify-between pointer-events-none gap-2">
      {/* Left Profile Pill */}
      <div 
        onClick={() => setProfileModalOpen(true)}
        className="flex items-center gap-1 sm:gap-2 pointer-events-auto bg-card dark:bg-slate-800 p-1 sm:p-1.5 rounded-full neo-border neo-shadow max-w-[200px] sm:max-w-none min-w-0 cursor-pointer hover:bg-muted transition-colors"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            router.back();
          }} 
          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 active:translate-x-0 active:translate-y-0 active:shadow-none shrink-0"
        >
          <ArrowLeft className="size-4 sm:size-6 text-neoblack" />
        </Button>
        
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 min-w-0 overflow-hidden">
          <Avatar size="sm" className="sm:size-10 shrink-0 neo-border">
            <AvatarImage 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile?.avatar || 'Bima'}`} 
              alt={activeProfile?.displayName || 'Bima'} 
            />
            <AvatarFallback>{(activeProfile?.displayName || 'B').substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-heading font-black text-[10px] sm:text-xs md:text-sm leading-none uppercase truncate">
                {activeProfile?.displayName || 'Pilih Profil'}
              </span>
              {activeProfile && (
                <span className="bg-neoblack text-white text-[7px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black shrink-0">
                  LVL {activeProfile.currentLevel}
                </span>
              )}
            </div>
            <span className="font-sans text-[8px] sm:text-[10px] font-bold text-neoblack/60 uppercase truncate">
              {activeProfile ? `${activeProfile.totalXp} XP • ${activeProfile.currentStreak} HARI` : 'Klik untuk masuk'}
            </span>
          </div>
        </div>
      </div>

      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />

      {/* Right Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto shrink-0">
        <ParentGuard onSuccess={handleParentAccess}>
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9 sm:h-12 sm:w-12">
            <Lock className="size-4 sm:size-5" />
          </Button>
        </ParentGuard>
        
        <Button 
          variant={isUppercase ? "default" : "outline"}
          size="icon"
          onClick={() => setIsUppercase(!isUppercase)}
          className="rounded-full h-9 w-9 sm:h-12 sm:w-12"
        >
          <Type className="size-4 sm:size-5" />
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="rounded-full h-9 w-9 sm:h-12 sm:w-12"
        >
          {mounted && (isDark ? <Sun className="size-4 sm:size-5" /> : <Moon className="size-4 sm:size-5" />)}
          {!mounted && <Sun className="size-4 sm:size-5" />}
        </Button>
      </div>
    </header>
  );
}
