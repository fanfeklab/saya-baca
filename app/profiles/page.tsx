'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useGameStore } from '@/store/useGameStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import { Plus } from 'lucide-react';

export default function ProfilesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { profiles, loading: profileLoading, selectProfile } = useProfile();
  const setActiveGameProfile = useGameStore(state => state.setActiveProfile);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin text-4xl">🍎</div>
      </div>
    );
  }

  const handleSelect = (profileId: string) => {
    selectProfile(profileId);
    
    // Also update game store
    const selected = profiles.find(p => p.id === profileId);
    if (selected) {
      setActiveGameProfile({
        id: selected.id,
        name: selected.displayName,
        avatarSeed: selected.avatar,
        globalExp: selected.totalXp,
        energy: selected.energy || 5,
        coins: selected.coins || 0,
        lastEnergyRefillAt: selected.lastEnergyRefillAt,
        longestStreak: selected.longestStreak || 0,
        currentStreak: selected.currentStreak || 0,
        level: selected.currentLevel || 1,
      });
      router.push('/main/home');
    }
  };

  return (
    <main className="min-h-screen grid-bg bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 z-10 mb-12"
      >
        <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase text-foreground">Siapa yang mau belajar?</h1>
        <p className="font-sans font-bold text-foreground/70">Pilih profilmu untuk memulai petualangan!</p>
      </motion.div>

      <div className="flex flex-wrap gap-6 items-center justify-center max-w-4xl z-10">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            onClick={() => handleSelect(profile.id)}
            className="group cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="bg-card w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] neo-border neo-shadow flex items-center justify-center group-hover:-translate-y-2 transition-all duration-300">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} />
                <AvatarFallback>{profile.displayName.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="font-heading font-black text-lg sm:text-xl uppercase bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full neo-border backdrop-blur-sm">
              {profile.displayName}
            </span>
          </motion.div>
        ))}

        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: profiles.length * 0.1, type: "spring" }}
           onClick={() => router.push('/profiles/new')}
           className="group cursor-pointer flex flex-col items-center gap-3"
        >
          <div className="bg-yellow-300 dark:bg-yellow-500 w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] neo-border neo-shadow flex items-center justify-center group-hover:-translate-y-2 transition-all duration-300 border-dashed">
             <Plus className="size-12 text-black" />
          </div>
          <span className="font-heading font-black text-lg sm:text-xl uppercase bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full neo-border backdrop-blur-sm">
            Tambah Baru
          </span>
        </motion.div>
      </div>

    </main>
  );
}
