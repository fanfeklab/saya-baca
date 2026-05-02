'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { Card } from '@/components/ui/card';
import { MissionCard, StoryCard } from '@/components/molecules/content-cards';
import { GameSelectionGrid } from '@/components/organisms/game-selection-grid';
import { useRouter } from 'next/navigation';

import { useAppStore } from '@/lib/store';
import { useStore } from '@/hooks/use-store';

const MISSIONS = [
  { id: 'abjad', title: 'Kenali Abjad!', description: 'Belajar huruf A sampai Z yuk.', path: '/main/games/abjad', total: 26 },
  { id: 'suku-kata', title: 'Susun Kata!', description: 'Gabungkan suku kata menjadi kata.', path: '/main/games/suku-kata', total: 5 },
  { id: 'membaca', title: 'Jagoan Membaca!', description: 'Latih kemampuan eja kata hari ini.', path: '/main/games/membaca', total: 3 },
  { id: 'berhitung', title: 'Si Pintar Berhitung', description: 'Ayo belajar angka bersama!', path: '/main/games/berhitung', total: 5 },
];

export default function HomeAppPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  const completedMissions = currentProfile?.completedMissions || [];

  const remainingMissions = MISSIONS.filter(m => !completedMissions.includes(m.id));

  return (
    <div className="flex flex-col p-6 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      
      {/* 🚀 Daily Focus Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Tantangan Hari Ini</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none italic">AKTIVITAS SERU</NeoText>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black border-2 border-primary/20">
            {remainingMissions.length} MISI TERSISA
          </div>
        </div>

        <div className="grid gap-4">
          {remainingMissions.length > 0 ? (
            <MissionCard 
              key={remainingMissions[0].id}
              title={remainingMissions[0].title}
              description={remainingMissions[0].description}
              progress={0}
              total={remainingMissions[0].total}
              onAction={() => router.push(remainingMissions[0].path)}
              className="border-2 border-black shadow-neo hover:shadow-neo-lg transition-all"
            />
          ) : (
            <Card className="p-6 border-4 border-dashed border-black/10 flex flex-col items-center text-center gap-4">
              <span className="text-4xl">🎊</span>
              <NeoText variant="body" className="font-black uppercase text-xs opacity-40">Semua Misi Hari Ini Selesai!</NeoText>
            </Card>
          )}
        </div>
      </section>

      {/* 🎲 Exploration Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Eksplorasi</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none italic">PILIH DUNIA</NeoText>
          </div>
        </div>
        <GameSelectionGrid />
      </section>

      {/* 📖 Storytelling Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Waktu Cerita</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none italic">DUNIA IMAJINASI</NeoText>
          </div>
        </div>
        <div className="bg-secondary/10 p-4 rounded-3xl border-4 border-black shadow-neo-sm">
          <StoryCard 
            title="Singa yang Pemberani"
            description="Belajar tentang keberanian di hutan rimba bersama Raja Hutan."
            emoji="🦁"
            onRead={() => {}}
            onListen={() => {}}
            className="bg-white hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-black"
          />
        </div>
      </section>

      {/* Bottom Spacer/Footer info */}
      <footer className="text-center opacity-20 py-8">
        <NeoText variant="body" className="text-[10px] font-black uppercase tracking-[0.2em]">Pusat Belajar Saya Baca • Versi 1.0</NeoText>
      </footer>
    </div>
  );
}
