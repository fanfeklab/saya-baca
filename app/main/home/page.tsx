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

import { ModuleOverviewPopup } from '@/components/organisms/ModuleOverviewPopup';

interface ModuleData {
  id: string;
  title: string;
  desc: string;
  color: string;
  icon: string;
  path: string;
  locked?: boolean;
}

const MODULES: ModuleData[] = [
  { 
    id: 'abjad', 
    title: "Mengenal Abjad", 
    desc: "Petualangan seru mengenal huruf A sampai Z dengan suara!", 
    color: "bg-pink-400", 
    icon: "🍎", 
    path: "/main/learn/abjad" 
  },
  { 
    id: 'syllable', 
    title: "Suku Kata", 
    desc: "Ayo belajar membaca gabungan huruf! Ba, Ci, Du...", 
    color: "bg-blue-400", 
    icon: "🗣️", 
    path: "/main/learn/suku-kata" 
  },
  { 
    id: 'sentence', 
    title: "Merakit Kalimat", 
    desc: "Hebat! Sekarang waktunya menyusun kata jadi kalimat.", 
    color: "bg-green-400", 
    icon: "📚", 
    path: "/main/learn/kalimat" 
  }
];

export default function HomePage() {
  const { speak } = useTTS();
  const { isAdmin } = useAuth();
  const { activeProfile } = useProfile();
  const { progress } = useProgress();
  const router = useRouter();
  const [seeding, setSeeding] = React.useState(false);
  
  const [selectedModule, setSelectedModule] = React.useState<ModuleData | null>(null);

  // Lock logic
  const getIsLocked = (modId: string) => {
    if (modId === 'abjad') return false;
    if (modId === 'syllable') return (progress['abjad']?.bestQuizScore || 0) < 100;
    if (modId === 'sentence') return (progress['syllable']?.bestQuizScore || 0) < 100;
    return false;
  };

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

  const handleModuleClick = (mod: ModuleData) => {
    if (getIsLocked(mod.id)) {
      speak("Modul ini masih terkunci! Selesaikan modul sebelumnya ya!");
      return;
    }
    setSelectedModule(mod);
  };

  const startModule = (mode: 'learn' | 'quiz') => {
    if (!selectedModule) return;
    router.push(`${selectedModule.path}?mode=${mode}`);
    setSelectedModule(null);
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
              className="font-heading text-3xl sm:text-4xl font-black text-neoblack dark:text-foreground tracking-tight leading-none uppercase"
            >
              Halo, <br /> 
              <span className="text-yellow-500">
                {activeProfile?.displayName || 'Pahlawan Kecil'}!
              </span>
            </motion.h1>
            <p className="font-sans text-neoblack/70 dark:text-foreground/70 font-bold text-xs sm:text-sm italic">
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
          {MODULES.map((mod) => (
            <ModuleCard 
              key={mod.id}
              title={mod.title}
              desc={mod.desc}
              color={mod.color}
              progress={progress[mod.id]?.bestQuizScore || 0}
              locked={getIsLocked(mod.id)}
              onClick={() => handleModuleClick(mod)}
            />
          ))}
        </div>

        {isAdmin && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-yellow-50 dark:bg-slate-900/50 neo-border border-dashed space-y-4 rounded-3xl"
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

      <ModuleOverviewPopup 
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        title={selectedModule?.title || ''}
        description={selectedModule?.desc || ''}
        icon={selectedModule?.icon}
        isUnlocked={true}
        learningFinished={progress[selectedModule?.id || '']?.learningFinished || false}
        onStartLearning={() => startModule('learn')}
        onStartQuiz={() => startModule('quiz')}
      />

      <BottomNav />
    </main>
  );
}
