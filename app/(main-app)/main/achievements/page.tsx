"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Type, BookOpen, Star, Music, Paintbrush, Flame, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { GameHeader } from "@/components/molecules/game-header";

const BADGE_MAP = [
  { id: "abjad", title: "Master Abjad", icon: Type },
  { id: "membaca", title: "Pembaca Pemula", icon: BookOpen },
  { id: "berhitung", title: "Bintang Angka", icon: Star },
  { id: "menyanyi", title: "Si Penyanyi", icon: Music },
  { id: "mewarnai", title: "Pelukis Cilik", icon: Paintbrush },
  { id: "streak_7", title: "7 Hari Runtun", icon: Flame },
  { id: "master_puzzle", title: "Master Puzzle", icon: Puzzle },
];

export default function PrestasiPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  const completedMissions = currentProfile?.completedMissions || [];

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <GameHeader title="Piala & Badge" currentLevel={0} totalLevels={0} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-2">
        {BADGE_MAP.map((badge) => {
          const isUnlocked = completedMissions.includes(badge.id);
          
          return (
            <Card key={badge.id} className={`border-4 border-black shadow-neo-sm flex flex-col transition-all rounded-3xl ${!isUnlocked ? 'opacity-70 bg-muted/40' : 'bg-card hover:-translate-y-1 hover:shadow-neo'}`}>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full pt-8 pb-6">
                <IllustrationHolder 
                    variant={isUnlocked ? "accent" : "muted"} 
                    size="lg" 
                    icon={badge.icon} 
                    className={!isUnlocked ? "opacity-50 grayscale border-dashed border-4" : "border-4 border-black shadow-neo-sm"}
                />
                <div className="space-y-1">
                    <NeoText variant="body" className="font-black leading-tight uppercase tracking-tighter text-sm italic">{badge.title}</NeoText>
                    {!isUnlocked && (
                    <div className="flex items-center justify-center gap-1 text-[8px] font-black uppercase text-muted-foreground opacity-60">
                        <Lock className="size-2" strokeWidth={3} /> Terkunci
                    </div>
                    )}
                </div>
                </CardContent>
            </Card>
          );
        })}
      </div>

      {completedMissions.length === 0 && (
          <div className="text-center p-8 border-4 border-dashed border-black/10 rounded-3xl">
              <NeoText variant="body" className="opacity-40 font-black uppercase text-xs">Belum ada badge yang terbuka. Ayo mulai bermain!</NeoText>
          </div>
      )}
    </div>
  );
}
