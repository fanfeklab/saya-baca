"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, ArrowLeft, CheckCircle2, Lock, Trophy, Award, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { useTTS } from "@/hooks/use-tts";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AbjadGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const [index, setIndex] = React.useState(0);
  const [viewedIndices, setViewedIndices] = React.useState<Set<number>>(new Set([0]));
  const [isFinished, setIsFinished] = React.useState(false);

  const currentLetter = ALPHABET[index];

  React.useEffect(() => {
    speak(currentLetter);
  }, [index, speak, currentLetter]);

  const handleNext = () => {
    if (index < ALPHABET.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setViewedIndices(prev => new Set(prev).add(nextIndex));
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  };

  const allViewed = viewedIndices.size === ALPHABET.length;
  const progressPercent = (viewedIndices.size / ALPHABET.length) * 100;

  if (isFinished) {
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
        <IllustrationHolder variant="accent" size="xl" icon={Trophy} className="mx-auto mb-8 border-4 border-black shadow-neo-lg scale-125" />
        <div className="space-y-4">
           <NeoText variant="title" stroke className="text-5xl uppercase italic text-primary">HEBAT!</NeoText>
           <NeoText variant="subtitle" className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Kamu sudah mengenal semua huruf!</NeoText>
        </div>
        <div className="bg-card p-6 rounded-3xl border-4 border-black shadow-neo-sm w-full">
            <NeoText variant="body" className="font-black text-sm uppercase tracking-tight italic">Huruf A sampai Z sudah kamu kuasai!</NeoText>
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
            <Button 
                variant="default"
                className="w-full h-16 text-xl font-black uppercase border-4 border-black shadow-neo hover:shadow-neo-lg active:shadow-none bg-primary text-black rounded-2xl"
                onClick={() => router.push("/main/games/abjad/quiz")}
            >
                Ayo Kuis! <ArrowRight className="ml-3 size-6" strokeWidth={3} />
            </Button>
            <Button variant="ghost" className="w-full h-12 text-foreground/40 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-muted/50" onClick={() => router.push("/main/learn")}>
                <Home className="w-4 h-4 mr-2" strokeWidth={3} /> Kembali ke Beranda
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      <GameHeader 
        title="MENGENAL ABJAD"
        currentLevel={index + 1}
        totalLevels={ALPHABET.length}
      />

      <Card className="mt-4 border-4 border-black shadow-neo-lg overflow-hidden bg-card rounded-[2.5rem]">
        <CardContent className="p-10 flex flex-col items-center gap-10">
            <div 
                className="size-56 bg-background border-4 border-black shadow-neo rounded-[3rem] flex items-center justify-center cursor-pointer hover:rotate-3 transition-all active:scale-95 group relative"
                onClick={() => speak(currentLetter)}
            >
                <NeoText variant="title" stroke className="text-[120px] leading-none text-primary italic drop-shadow-lg">{currentLetter}</NeoText>
                <div className="absolute top-4 right-4 animate-bounce bg-accent p-2 rounded-full border-2 border-black">
                    <Play className="size-5 text-black fill-black" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
                <div className="w-full space-y-3">
                    <div className="flex justify-between items-end px-1">
                        <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-40">Progres Belajar</NeoText>
                        <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest text-primary">{Math.round(progressPercent)}%</NeoText>
                    </div>
                    <Progress value={progressPercent} className="h-4 border-4 border-black shadow-neo-sm bg-background rounded-full overflow-hidden" indicatorClassName="bg-primary" />
                </div>

                <div className="flex items-center gap-6 w-full">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-14 w-14 border-4 border-black shadow-neo-sm active:shadow-none bg-background disabled:opacity-30 rounded-2xl"
                        disabled={index === 0}
                        onClick={handlePrev}
                    >
                        <ArrowLeft className="size-7" strokeWidth={3} />
                    </Button>
                    
                    <div className="flex-1 flex justify-center">
                        <NeoText variant="title" className="text-4xl italic">{index + 1} <span className="text-muted-foreground/30 mx-1">/</span> {ALPHABET.length}</NeoText>
                    </div>

                    <Button 
                        variant="default" 
                        size="icon" 
                        className="h-14 w-14 border-4 border-black shadow-neo active:shadow-none bg-accent disabled:opacity-30 rounded-2xl"
                        onClick={handleNext}
                    >
                        <ArrowRight className="size-7" strokeWidth={3} />
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-2">
         {allViewed ? (
            <Button 
                variant="outline" 
                className="h-16 px-10 border-4 border-black shadow-neo bg-success text-black font-black uppercase tracking-widest text-lg rounded-2xl hover:shadow-neo-lg transition-all"
                onClick={() => setIsFinished(true)}
            >
                Selesai Belajar <CheckCircle2 className="ml-3 size-6" strokeWidth={3} />
            </Button>
         ) : (
            <div className="flex items-center gap-3 px-6 py-4 bg-muted/50 border-4 border-dashed border-black/10 rounded-2xl">
                <Lock className="size-4 opacity-40" strokeWidth={3} />
                <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-40">Kenali semua huruf untuk lanjut kuis</NeoText>
            </div>
         )}
      </div>
    </div>
  );
}
