"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, RotateCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

import { useTTS } from "@/hooks/use-tts";
import { GameHeader } from "@/components/molecules/game-header";

const LEVELS = [
  { question: "1 + 1 = ?", answer: 2, options: [1, 2, 3, 4] },
  { question: "2 + 3 = ?", answer: 5, options: [3, 4, 5, 6] },
  { question: "4 - 2 = ?", answer: 2, options: [1, 2, 3, 4] },
];

export default function BerhitungGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const addStars = useAppStore(state => state.addStars);
  const completeMission = useAppStore(state => state.completeMission);
  const loseEnergy = useAppStore(state => state.loseEnergy);
  const energy = useAppStore(state => state.currentProfile?.energy ?? 0);

  const [levelIndex, setLevelIndex] = React.useState(0);
  const [isWon, setIsWon] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);

  const currentLevel = LEVELS[levelIndex];

  React.useEffect(() => {
    if (energy <= 0 && !isWon) {
      setTimeout(() => setIsWon(true), 0);
    }
  }, [energy, isWon]);

  React.useEffect(() => {
    if (currentLevel && energy > 0) {
      const q = currentLevel.question.replace('?', '').replace('=', '').trim();
      speak(`Berapa hasil dari... ${q}?`);
    }
  }, [levelIndex, speak, currentLevel, energy]);

  const handleAnswer = (option: number) => {
    setSelectedAnswer(option);
    setTimeout(() => {
      if (option === currentLevel.answer) {
        speak("Pintar! Jawabanmu Benar!");
        if (levelIndex < LEVELS.length - 1) {
          setLevelIndex(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setIsWon(true);
          addStars(30);
          completeMission('berhitung');
        }
      } else {
        speak("Aduh, salah... Coba lagi!");
        loseEnergy();
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const handleReset = () => {
    setLevelIndex(0);
    setIsWon(false);
    setSelectedAnswer(null);
  };

  if (isWon) {
    const isSuccess = energy > 0;
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 pb-32 min-h-[80vh] items-center justify-center text-center max-w-md mx-auto">
        <ConfettiBurst>
          <IllustrationHolder 
            variant={isSuccess ? "success" : "destructive"} 
            size="xl" 
            emoji={isSuccess ? "🎉" : "😴"} 
            className="mx-auto mb-6 scale-125 border-4 border-black shadow-neo-lg" 
          />
        </ConfettiBurst>
        <div className="space-y-4">
          <NeoText variant="title" stroke className={cn("text-5xl", isSuccess ? "text-success" : "text-destructive")}>
            {isSuccess ? "Hebat!" : "Istirahat!"}
          </NeoText>
          <NeoText variant="subtitle" className="text-muted-foreground uppercase tracking-widest text-sm font-black">
            {isSuccess ? "Misi Berhitung Selesai" : "Energi Kamu Habis"}
          </NeoText>
        </div>
        <NeoText variant="body" className="font-medium">
          {isSuccess 
            ? "Kamu jago sekali berhitung! Teruslah berlatih ya!" 
            : "Waktunya istirahat sejenak untuk mengisi kembali energimu."}
        </NeoText>
        
        <div className="flex flex-col gap-4 w-full mt-8">
          <Button variant="default" className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-neo hover:shadow-neo-lg active:shadow-none transition-all text-black border-2 border-black" onClick={() => router.push("/main/learn")}>
            Ke Beranda <Home className="ml-2 size-6 text-black" />
          </Button>
          {isSuccess && (
            <Button variant="ghost" className="w-full text-foreground/60 font-black uppercase tracking-tight text-xs" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Ulangi Petualangan
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      <GameHeader 
        title="DUNIA ANGKA"
        currentLevel={levelIndex + 1}
        totalLevels={LEVELS.length}
      />

      <div className="flex items-center gap-4 hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full shadow-[2px_2px_0_0_#000000] border-2 border-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Game Area */}
      <Card className="mt-4 bg-secondary border-4 border-black shadow-neo-lg text-center overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none scale-150 rotate-12">
           <NeoText variant="title" className="text-9xl">123</NeoText>
        </div>
        <CardContent className="p-12 border-b-4 border-black bg-white flex flex-col items-center gap-8 relative z-10 transition-all hover:scale-[1.02]">
          <NeoText variant="title" stroke className="text-7xl md:text-9xl tracking-[0.2em] text-primary mb-2 drop-shadow-lg">
            {currentLevel.question.split('=')[0].trim()}
          </NeoText>
          <div className="size-20 bg-accent rounded-full border-4 border-black shadow-neo-sm flex items-center justify-center">
            <span className="text-4xl font-black">?</span>
          </div>
        </CardContent>
        <div className="p-4 bg-secondary-foreground/5 text-center">
          <NeoText variant="body" className="text-xs font-black uppercase tracking-widest opacity-60">Selesaikan soal di atas!</NeoText>
        </div>
      </Card>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        {currentLevel.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentLevel.answer;
          let buttonStyles = "bg-white text-black border-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1";
          
          if (isSelected) {
            buttonStyles = isCorrect 
              ? "bg-success text-success-foreground border-black shadow-none translate-y-1" 
              : "bg-destructive text-destructive-foreground border-black shadow-none translate-y-1";
          }
          
          return (
            <Button
              key={idx}
              className={cn(
                "h-28 text-5xl font-black rounded-3xl border-4 transition-all duration-200",
                buttonStyles
              )}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              <div className="relative">
                {option}
                {isSelected && isCorrect && <Check className="absolute -top-10 -right-8 w-10 h-10 text-white stroke-[4px]" />}
                {isSelected && !isCorrect && <X className="absolute -top-10 -right-8 w-10 h-10 text-white stroke-[4px]" />}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
