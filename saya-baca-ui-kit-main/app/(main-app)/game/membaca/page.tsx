"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, RotateCcw, Gift, Sparkles, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { AudioButton } from "@/components/atoms/audio-button";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";

const LEVELS = [
  { word: "B - U - K - U", image: "📚", audio: "Buku!" },
  { word: "A - P - E - L", image: "🍎", audio: "Apel!" },
  { word: "M - E - J - A", image: "🪑", audio: "Meja!" },
];

export default function MembacaGamePage() {
  const router = useRouter();
  const [levelIndex, setLevelIndex] = React.useState(0);
  const [isWon, setIsWon] = React.useState(false);

  const currentLevel = LEVELS[levelIndex];

  const handleNext = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
    } else {
      setIsWon(true);
    }
  };

  const handleReset = () => {
    setLevelIndex(0);
    setIsWon(false);
  };

  if (isWon) {
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 pb-32 min-h-[80vh] items-center justify-center text-center max-w-md mx-auto">
        <ConfettiBurst>
          <IllustrationHolder variant="success" size="xl" emoji="🏆" className="mx-auto mb-6 scale-125 border-4 shadow-neo-lg" />
        </ConfettiBurst>
        <div className="space-y-4">
          <NeoText variant="title" stroke className="text-5xl text-success">Luar Biasa!</NeoText>
          <NeoText variant="subtitle" className="text-muted-foreground uppercase tracking-widest text-sm font-black">Misi Membaca Selesai</NeoText>
        </div>
        <NeoText variant="body" className="font-medium">Kamu telah berhasil mengeja semua kata dengan sangat baik hari ini!</NeoText>
        
        <div className="flex flex-col gap-4 w-full mt-8">
          <Button variant="default" className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-neo hover:shadow-neo-lg active:shadow-none transition-all text-black" onClick={() => router.push("/home")}>
            Terima Hadiah <Gift className="ml-2 size-6 text-black" />
          </Button>
          <Button variant="ghost" className="w-full text-foreground/60 font-black uppercase tracking-tight text-xs" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Ulangi Petualangan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Refined Game Header */}
      <GameHeader 
        title="DUNIA MEMBACA"
        currentLevel={levelIndex + 1}
        totalLevels={LEVELS.length}
      />

      {/* Question Card */}
      <Card className="mt-4 bg-card/60 backdrop-blur-sm border-2 shadow-neo-lg text-center overflow-visible">
        <CardContent className="p-8 pb-14 flex flex-col items-center gap-10">
          <div className="relative group">
            <IllustrationHolder variant="primary" size="xl" emoji={currentLevel.image} className="w-48 h-48 text-[120px] shadow-neo bg-background border-4 group-hover:rotate-3 transition-transform" />
            <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground p-3 rounded-2xl border-2 border-border shadow-neo-sm">
              <Sparkles className="size-8 text-black animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-6 w-full">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {currentLevel.word.split(" - ").map((letter, idx) => (
                <div key={idx} className="size-16 bg-background rounded-2xl border-4 border-border shadow-neo flex items-center justify-center">
                  <NeoText variant="title" className="text-3xl text-primary">{letter}</NeoText>
                </div>
              ))}
            </div>
            
            <AudioButton variant="secondary" className="w-full max-w-[240px] mx-auto mt-8 h-16 text-lg font-black uppercase tracking-widest border-2 shadow-neo active:shadow-none">
              <Play className="w-6 h-6 mr-3 fill-current" />
              Dengar Suara
            </AudioButton>
          </div>
        </CardContent>
      </Card>

      {/* Main Action Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-2xl mx-auto z-40 pointer-events-none">
         <Button 
            variant="default" 
            className="w-full text-2xl h-20 rounded-2xl border-2 shadow-neo-lg hover:shadow-neo active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase font-black tracking-widest pointer-events-auto" 
            onClick={handleNext}
          >
            Selesai & Lanjut
          </Button>
      </div>

      {/* Decorative Floor */}
      <div className="h-12" />
    </div>
  );
}
