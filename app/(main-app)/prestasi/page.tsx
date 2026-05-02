"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";

const BADGES = [
  { id: 1, title: "Pembaca Pemula", emoji: "📖", unlocked: true },
  { id: 2, title: "Bintang Angka", emoji: "⭐", unlocked: true },
  { id: 3, title: "Si Penyanyi", emoji: "🎤", unlocked: true },
  { id: 4, title: "Pelukis Cilik", emoji: "🎨", unlocked: false },
  { id: 5, title: "7 Hari Runtun", emoji: "🔥", unlocked: false },
  { id: 6, title: "Master Puzzle", emoji: "🧩", unlocked: false },
];

export default function PrestasiPage() {
  const router = useRouter();

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
        {BADGES.map((badge) => (
          <Card key={badge.id} className={`border-2 border-black shadow-neo-sm flex flex-col transition-all ${!badge.unlocked ? 'opacity-70 bg-muted/40' : 'bg-card hover:-translate-y-1 hover:shadow-neo'}`}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full pt-8 pb-6">
              <IllustrationHolder 
                variant={badge.unlocked ? "accent" : "muted"} 
                size="lg" 
                emoji={badge.unlocked ? badge.emoji : "❓"} 
                className={!badge.unlocked ? "opacity-50 grayscale border-dashed" : "border-2"}
              />
              <div className="space-y-1">
                <NeoText variant="body" className="font-black leading-tight uppercase tracking-tighter text-sm italic">{badge.title}</NeoText>
                {!badge.unlocked && (
                   <div className="flex items-center justify-center gap-1 text-[8px] font-black uppercase text-muted-foreground opacity-60">
                      <Lock className="size-2" /> Terkunci
                   </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
