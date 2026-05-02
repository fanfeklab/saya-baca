'use client';

import { TopBar } from '@/components/organisms/TopBar';
import { BottomNav } from '@/components/organisms/BottomNav';
import { ModuleCard } from '@/components/molecules/ModuleCard';
import { motion } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { signOut } from '@/lib/auth';
import { seedWordBank } from '@/lib/seed';
import { Database, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/atoms/button';

export default function HomePage() {
  const { speak } = useTTS();
  const { isAdmin } = useAuth();
  const { activeProfile } = useProfile();
  const { progress } = useProgress();
  const router = useRouter();
  const [seeding, setSeeding] = React.useState(false);

  // AC-114 Logic: Suku Kata requires Abjad completion
  const abjadMastery = progress['abjad']?.mastery || 0;
  const isSyllableLocked = abjadMastery < 100;
  const isSentenceLocked = (progress['syllable']?.mastery || 0) < 100;

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedWordBank();
      speak("Data berhasil dimuat! Siap belajar!");
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-24 sm:pt-32 pb-40 px-4 sm:px-6 max-w-lg mx-auto overflow-x-hidden bg-warm-cream">
      <TopBar />
      
      <section className="space-y-6 sm:space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-heading text-3xl sm:text-4xl font-black text-neoblack tracking-tight leading-none uppercase"
            >
              Halo, <br /> 
              <span className="text-yellow-500">
                {activeProfile?.displayName || 'Pahlawan Kecil'}!
              </span>
            </motion.h1>
            <p className="font-sans text-neoblack/70 font-bold text-xs sm:text-sm italic">
              &quot;Siap bertualang hari ini?&quot;
            </p>
          </div>
          <Button 
            id="btn-logout"
            variant="destructive"
            size="icon"
            onClick={() => signOut()} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 neo-border"
          >
            <LogOut size={20} />
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <ModuleCard 
            title="Mengenal Abjad" 
            desc="Kenali huruf A sampai Z dengan suara!"
            color="bg-pink-300"
            progress={progress['abjad']?.mastery || 0}
            onClick={() => router.push('/main/learn/abjad')}
          />
          <ModuleCard 
            title="Huruf Vokal" 
            desc="Belajar ba bi bu be bo yuk!"
            color="bg-blue-300"
            progress={progress['syllable']?.mastery || 0}
            locked={isSyllableLocked}
            onClick={() => router.push('/main/learn/suku-kata')}
          />
          <ModuleCard 
            title="Merakit Kalimat" 
            desc="Susun kata jadi kalimat seru."
            color="bg-green-300"
            progress={progress['sentence']?.mastery || 0}
            locked={isSentenceLocked}
            onClick={() => router.push('/main/learn/kalimat')}
          />
        </div>

        {isAdmin && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-yellow-50 neo-border border-dashed space-y-4 rounded-3xl"
          >
            <h2 className="font-heading font-black text-xl flex items-center gap-2">
              <Database size={20} /> ADMIN PANEL
            </h2>
            <Button 
               id="btn-seed"
               onClick={handleSeed}
               disabled={seeding}
               className="w-full h-14"
            >
              <Database size={20} className={seeding ? "animate-spin" : ""} />
              <span className="font-heading">{seeding ? 'MEMUAT DATA...' : 'MASUKKAN DATA AWAL'}</span>
            </Button>
          </motion.div>
        )}
      </section>

      <BottomNav />
    </main>
  );
}
