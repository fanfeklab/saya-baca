"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { GameSelectionGrid } from "@/components/organisms/game-selection-grid";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";

export default function GamesPage() {
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-4">
            <IllustrationHolder variant="success" size="lg" emoji="🎮" className="border-4 border-black shadow-neo rotate-3" />
            <div className="space-y-1">
                <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Waktunya Bermain!</NeoText>
                <NeoText variant="title" stroke className="text-4xl md:text-5xl italic uppercase leading-none">DUNIA GAME</NeoText>
            </div>
        </div>
        <NeoText variant="body" className="text-sm font-bold opacity-60">
            Halo {currentProfile?.name}, ayo pilih game seru yang ingin kamu mainkan hari ini!
        </NeoText>
      </header>

      {/* Game Selection */}
      <section className="mt-4">
        <GameSelectionGrid />
      </section>

      {/* Game Stats Prompt */}
      <div className="bg-primary/5 border-4 border-dashed border-black/10 rounded-3xl p-8 text-center space-y-4">
         <div className="flex justify-center -space-x-3">
            {["⭐", "🏆", "🔥"].map((e, i) => (
                <div key={i} className="size-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-xl shadow-neo-sm">
                    {e}
                </div>
            ))}
         </div>
         <NeoText variant="body" className="font-black uppercase text-xs opacity-40">Mainkan semua game untuk membuka badge spesial!</NeoText>
      </div>
    </div>
  );
}
