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

const PAGES = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X", "Y", "Z"]
];

export default function AbjadGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const [pageIndex, setPageIndex] = React.useState(0);
  const [viewedIndices, setViewedIndices] = React.useState<Set<string>>(new Set(["A"]));
  const [isFinished, setIsFinished] = React.useState(false);

  const currentPage = PAGES[pageIndex];

  const handleLetterClick = (letter: string) => {
    speak(letter);
    setViewedIndices(prev => new Set(prev).add(letter));
    
    // Auto transition logic if it was the last letter of the page (optional, but let's keep it manual for better learning)
  };

  const handleNextPage = () => {
    if (pageIndex < PAGES.length - 1) {
      setPageIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    }
  };

  const totalLetters = 26;
  const progressPercent = (viewedIndices.size / totalLetters) * 100;
  const allViewedInCurrentPage = currentPage.every(l => viewedIndices.has(l));

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
    <div className="flex flex-col p-6 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto min-h-screen overflow-hidden">
      <GameHeader 
        title="MENGENAL ABJAD"
        currentLevel={pageIndex + 1}
        totalLevels={PAGES.length}
      />

      <div className="w-full space-y-2 mt-2">
          <div className="flex justify-between items-end px-1">
              <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-40">Progres Mengenal Huruf</NeoText>
              <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest text-primary">{Math.round(progressPercent)}%</NeoText>
          </div>
          <Progress value={progressPercent} className="h-3 border-4 border-black shadow-neo-sm bg-background rounded-full overflow-hidden" indicatorClassName="bg-primary" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2">
        {currentPage.map((letter) => {
          const isViewed = viewedIndices.has(letter);
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={cn(
                "aspect-square flex items-center justify-center rounded-[2rem] border-4 border-black shadow-neo-sm transition-all transform active:scale-90 active:shadow-none translate-y-0 active:translate-y-1 relative group",
                isViewed ? "bg-background shadow-none translate-y-0.5 border-black/40" : "bg-card shadow-neo"
              )}
            >
              <NeoText 
                variant="title" 
                stroke={!isViewed}
                className={cn(
                  "text-4xl italic",
                  isViewed ? "text-primary/40" : "text-primary"
                )}
              >
                {letter}
              </NeoText>
              {isViewed && (
                 <div className="absolute top-2 right-2">
                    <CheckCircle2 className="size-4 text-success fill-success/20 stroke-[3px]" />
                 </div>
              )}
              {!isViewed && (
                <div className="absolute -top-1 -right-1 size-3 bg-accent rounded-full border-2 border-black animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-6 mt-auto py-4">
          <Button 
              variant="outline" 
              className="flex-1 h-16 border-4 border-black shadow-neo active:shadow-none rounded-2xl bg-background disabled:opacity-20"
              disabled={pageIndex === 0}
              onClick={handlePrevPage}
          >
              <ArrowLeft className="size-6 mr-2" strokeWidth={3} /> <span className="font-black">KEMBALI</span>
          </Button>

          <Button 
              variant="default" 
              className={cn(
                  "flex-1 h-16 border-4 border-black shadow-neo active:shadow-none rounded-2xl",
                  allViewedInCurrentPage ? "bg-accent" : "bg-muted"
              )}
              onClick={handleNextPage}
              disabled={!allViewedInCurrentPage && viewedIndices.size < totalLetters}
          >
              <span className="font-black">{pageIndex === PAGES.length - 1 ? "SELESAI" : "LANJUT"}</span> <ArrowRight className="size-6 ml-2" strokeWidth={3} />
          </Button>
      </div>

      {!allViewedInCurrentPage && (
          <div className="flex items-center justify-center gap-3 px-6 py-4 bg-muted/50 border-4 border-dashed border-black/10 rounded-2xl">
              <Lock className="size-4 opacity-40" strokeWidth={3} />
              <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-40">Ketuk semua huruf untuk lanjut</NeoText>
          </div>
      )}
    </div>
  );
}
