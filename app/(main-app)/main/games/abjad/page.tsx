"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { useTTS } from "@/hooks/use-tts";
import { cn } from "@/lib/utils";

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

  if (isFinished) {
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
        <IllustrationHolder variant="success" size="xl" emoji="🎉" className="mx-auto mb-6 border-4 border-black shadow-neo-lg scale-125" />
        <div className="space-y-4">
           <NeoText variant="title" stroke className="text-5xl text-success">HEBAT!</NeoText>
           <NeoText variant="body" className="font-black uppercase tracking-widest text-xs opacity-60">Kamu sudah mengenal semua huruf!</NeoText>
        </div>
        <Button 
            className="w-full h-16 text-xl font-black uppercase border-4 border-black shadow-neo hover:shadow-none bg-primary text-white"
            onClick={() => router.push("/main/games/abjad/quiz")}
        >
            Ayo Kuis! <ArrowRight className="ml-2 size-6" />
        </Button>
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

      <Card className="mt-8 border-4 border-black shadow-neo-lg overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardContent className="p-12 flex flex-col items-center gap-12">
            <div 
                className="size-64 bg-background border-4 border-black shadow-neo rounded-[40px] flex items-center justify-center cursor-pointer hover:rotate-3 transition-all active:scale-95"
                onClick={() => speak(currentLetter)}
            >
                <NeoText variant="title" stroke className="text-[120px] leading-none text-primary">{currentLetter}</NeoText>
                <div className="absolute top-4 right-4 animate-bounce">
                    <Play className="size-8 text-black fill-black/10" />
                </div>
            </div>

            <div className="flex items-center gap-6 w-full">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="size-16 border-4 border-black shadow-neo-sm active:shadow-none bg-background disabled:opacity-30"
                    disabled={index === 0}
                    onClick={handlePrev}
                >
                    <ArrowLeft className="size-8" />
                </Button>
                
                <div className="flex-1 flex justify-center gap-2">
                    {ALPHABET.map((_, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "h-2 rounded-full transition-all",
                                i === index ? "w-8 bg-primary border-2 border-black" : "w-2 bg-muted border border-black/20",
                                viewedIndices.has(i) && i !== index ? "bg-success" : ""
                            )} 
                        />
                    ))}
                </div>

                <Button 
                    variant="default" 
                    size="icon" 
                    className="size-16 border-4 border-black shadow-neo active:shadow-none bg-accent disabled:opacity-30"
                    onClick={handleNext}
                >
                    <ArrowRight className="size-8" />
                </Button>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
         {allViewed ? (
            <Button 
                variant="outline" 
                className="h-14 px-8 border-4 border-black shadow-neo bg-success text-black font-black uppercase"
                onClick={() => setIsFinished(true)}
            >
                Selesai Belajar <CheckCircle2 className="ml-2 size-5" />
            </Button>
         ) : (
            <div className="flex items-center gap-2 px-6 py-3 bg-muted border-2 border-dashed border-black/20 rounded-2xl">
                <Lock className="size-4 opacity-40" />
                <NeoText variant="body" className="text-[10px] font-black uppercase opacity-40">Lihat semua huruf untuk lanjut kuis</NeoText>
            </div>
         )}
      </div>
    </div>
  );
}
