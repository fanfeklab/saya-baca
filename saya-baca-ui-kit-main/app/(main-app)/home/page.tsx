'use client';

import Link from 'next/link';
import { NeoText } from '@/components/atoms/neo-text';
import { MissionCard, StoryCard } from '@/components/molecules/content-cards';
import { GameSelectionGrid } from '@/components/organisms/game-selection-grid';

export default function HomeAppPage() {
  return (
    <div className="flex flex-col p-6 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      
      {/* 🚀 Daily Focus Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Tantangan Hari Ini</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none">AKTIVITAS SERU</NeoText>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black border-2 border-primary/20">
            3 MISI TERSISA
          </div>
        </div>

        <div className="grid gap-4">
          <MissionCard 
            title="Jagoan Membaca!"
            description="Latih kemampuan eja kata hari ini."
            progress={1}
            total={3}
            className="border-2 shadow-neo hover:shadow-neo-lg transition-all"
          />
        </div>
      </section>

      {/* 🎲 Exploration Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Eksplorasi</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none">PILIH DUNIA</NeoText>
          </div>
        </div>
        <GameSelectionGrid />
      </section>

      {/* 📖 Storytelling Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Waktu Cerita</NeoText>
            <NeoText variant="subtitle" stroke className="text-3xl leading-none">DUNIA IMAJINASI</NeoText>
          </div>
        </div>
        <div className="bg-secondary/30 p-4 rounded-3xl border-4 border-black shadow-neo-sm">
          <StoryCard 
            title="Singa yang Pemberani"
            description="Belajar tentang keberanian di hutan rimba bersama Raja Hutan."
            emoji="🦁"
            onRead={() => {}}
            onListen={() => {}}
            className="bg-white hover:scale-[1.02] active:scale-[0.98] transition-transform"
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
