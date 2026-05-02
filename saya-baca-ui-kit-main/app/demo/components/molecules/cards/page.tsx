'use client';

import { MissionCard, StoryCard, StatCard } from '@/components/molecules/content-cards';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';
import { Activity } from 'lucide-react';

export default function CardsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Content Cards</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen card interaktif untuk menampilkan modul, misi, atau konten penting.
        </NeoText>
      </div>

      <ComponentPreview
        title="Mission Card (Hero)"
        description="Card yang digunakan untuk menampilkan The Main Game (Misi utama)."
        code={`import { MissionCard } from "@/components/molecules/content-cards"\n
<MissionCard 
  title="Misi Hari Ini"
  description="Selesaikan tantangan matematika dasar."
  progress={3}
  total={5}
  onAction={() => alert("Gas!")}
/>`}
      >
        <div className="w-full max-w-sm">
          <MissionCard 
            title="Misi Hari Ini"
            description="Selesaikan tantangan matematika dasar."
            progress={3}
            total={5}
            onAction={() => alert("Lanjutkan")}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Story/Module Card"
        description="Digunakan untuk mempresentasikan satu silabus/modul di daftar pelajaran atau cerita dongeng."
        code={`import { StoryCard } from "@/components/molecules/content-cards"\n
<StoryCard 
  title="Kelinci dan Kura-Kura"
  description="Cerita rakyat pendek"
  emoji="🐢"
  onRead={() => alert("Membaca")}
  onListen={() => alert("Mendengarkan")}
/>`}
      >
        <div className="w-full max-w-sm space-y-4">
          <StoryCard 
            title="Kelinci dan Kura-Kura"
            description="Dongeng tentang kesabaran."
            emoji="🐢"
            onRead={() => alert("Membaca")}
            onListen={() => alert("Mendengarkan")}
          />
          <StoryCard 
            title="Aktivitas Mewarnai"
            description="Mengenal warna primer."
            emoji="🎨"
            onRead={() => alert("Membaca")}
          />
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Stat Card"
        description="Card untuk statistik admin/orang tua."
        code={`import { StatCard } from "@/components/molecules/content-cards"
import { Activity } from "lucide-react"\n
<StatCard 
  title="Total Bintang"
  value="1,240"
  icon={Activity}
  trend={{ value: 24, label: "dari minggu lalu", positive: true }}
/>`}
      >
        <div className="w-full max-w-xs">
          <StatCard 
            title="Bintang Terkumpul"
            value="1,240"
            icon={Activity}
            trend={{ value: 24, label: "dari minggu lalu", positive: true }}
          />
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference - MissionCard</NeoText>
        <PropsTable props={[
          { name: "title", type: "string", description: "Judul utama" },
          { name: "description", type: "string", description: "Deskripsi singkat" },
          { name: "progress", type: "number", description: "Jumlah selesai" },
          { name: "total", type: "number", description: "Total keseluruhan" },
          { name: "onAction", type: "() => void", description: "Aksi tombol lanjutkan" }
        ]} />
      </div>
    </div>
  );
}
