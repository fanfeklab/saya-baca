'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Card, CardContent } from '@/components/ui/card';
import { StoryCard } from '@/components/molecules/content-cards';
import { cn } from '@/lib/utils';

export default function GameGridsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Game Grids</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Layout organism untuk daftar game/modul yang menggunakan flex/grid responsif.
        </NeoText>
      </div>

      <ComponentPreview
        title="Game Selection Grid"
        description="Grid adaptif (1 kolom di HP, 2 di tablet, 3-4 di dekstop) untuk kartu modul belajar. Menggunakan layout yang dioptimalkan untuk engagement anak."
        code={`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <StoryCard title="Membaca" description="Level 1" emoji="📖" onRead={() => {}} />
  <StoryCard title="Berhitung" description="Level 2" emoji="🔢" onRead={() => {}} />
  <StoryCard title="Mewarnai" description="Level 5" emoji="🎨" onRead={() => {}} />
</div>`}
      >
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <StoryCard 
              title="Membaca Cerita" 
              description="Ayo baca petualangan kancil!" 
              emoji="📖" 
              onRead={() => {}}
              onListen={() => {}}
            />
            <StoryCard 
              title="Belajar Berhitung" 
              description="Selesaikan tantangan angka." 
              emoji="🔢" 
              onRead={() => {}}
            />
            <StoryCard 
              title="Dunia Mewarnai" 
              description="Beri warna pada duniamu." 
              emoji="🎨" 
              onRead={() => {}}
            />
         </div>
      </ComponentPreview>

      <ComponentPreview
        title="Interactive Board Grid"
        description="Grid untuk board game interaktif atau pilihan menu admin."
        code={`<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  <div className="aspect-square bg-card border-4 border-black shadow-neo rounded-2xl flex items-center justify-center">...</div>
</div>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {[
            { label: 'Matematika', color: 'bg-primary' },
            { label: 'Bahasa', color: 'bg-success' },
            { label: 'Seni', color: 'bg-accent' },
            { label: 'Musik', color: 'bg-secondary' }
          ].map((item, i) => (
            <div key={i} className={cn(
              "aspect-square border-4 border-black shadow-neo rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all",
              item.color
            )}>
              <div className="size-10 bg-white/30 rounded-full blur-xl absolute" />
              <div className="text-3xl">⭐</div>
              <span className="font-black text-xs uppercase tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

    </div>
  );
}
