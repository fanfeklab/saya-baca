"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col p-4 gap-6 animate-in fade-in pb-28">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full shadow-[2px_2px_0_0_#000000]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <NeoText variant="title">Piala & Badge</NeoText>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {BADGES.map((badge) => (
          <Card key={badge.id} className={`border-4 shadow-[4px_4px_0_0_#000000] ${!badge.unlocked ? 'opacity-70 bg-muted border-border' : ''}`}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full pt-6">
              <IllustrationHolder 
                variant={badge.unlocked ? "accent" : "muted"} 
                size="lg" 
                emoji={badge.unlocked ? badge.emoji : "❓"} 
                className={!badge.unlocked ? "opacity-50 grayscale" : ""}
              />
              <NeoText variant="body" className="font-bold leading-tight">{badge.title}</NeoText>
              {!badge.unlocked && <Lock className="w-4 h-4 text-muted-foreground mt-1" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
