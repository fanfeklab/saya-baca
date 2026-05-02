"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";

const BADGE_MAP = [
  { id: "membaca", title: "Pembaca Pemula", emoji: "📖" },
  { id: "berhitung", title: "Bintang Angka", emoji: "⭐" },
  { id: "menyanyi", title: "Si Penyanyi", emoji: "🎤" },
  { id: "mewarnai", title: "Pelukis Cilik", emoji: "🎨" },
  { id: "streak_7", title: "7 Hari Runtun", emoji: "🔥" },
  { id: "master_puzzle", title: "Master Puzzle", emoji: "🧩" },
];

export default function PrestasiPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  const completedMissions = currentProfile?.completedMissions || [];

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon-sm" 
          onClick={() => router.back()}
          className="rounded-xl shadow-neo-sm hover:shadow-neo active:shadow-none border-2 border-black bg-background"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <NeoText variant="subtitle" stroke className="text-3xl uppercase tracking-tighter italic">Piala & Badge</NeoText>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-2">
        {BADGE_MAP.map((badge) => {
          const isUnlocked = completedMissions.includes(badge.id);
          
          return (
            <Card key={badge.id} className={`border-4 border-black shadow-neo-sm flex flex-col transition-all ${!isUnlocked ? 'opacity-70 bg-muted/40' : 'bg-card hover:-translate-y-1 hover:shadow-neo'}`}>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full pt-8 pb-6">
                <IllustrationHolder 
                    variant={isUnlocked ? "accent" : "muted"} 
                    size="lg" 
                    emoji={isUnlocked ? badge.emoji : "❓"} 
                    className={!isUnlocked ? "opacity-50 grayscale border-dashed" : "border-2 border-black shadow-neo-sm"}
                />
                <div className="space-y-1">
                    <NeoText variant="body" className="font-black leading-tight uppercase tracking-tighter text-sm italic">{badge.title}</NeoText>
                    {!isUnlocked && (
                    <div className="flex items-center justify-center gap-1 text-[8px] font-black uppercase text-muted-foreground opacity-60">
                        <Lock className="size-2" /> Terkunci
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
