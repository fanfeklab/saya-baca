"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Sparkles, Trophy, Gift, Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { Badge } from "@/components/ui/badge";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";

import { useAppStore } from "@/lib/store";
import { useTTS } from "@/hooks/use-tts";
import { cn } from "@/lib/utils";

const QUIZ_ITEMS = [
  { full: "BOLA", parts: ["BO", "LA"], image: "⚽", category: "Benda" },
  { full: "BUKU", parts: ["BU", "KU"], image: "📚", category: "Benda" },
  { full: "MATA", parts: ["MA", "TA"], image: "👁️", category: "Tubuh" },
  { full: "CUCI", parts: ["CU", "CI"], image: "🧼", category: "Kegiatan" },
  { full: "BABI", parts: ["BA", "BI"], image: "🐷", category: "Hewan" },
  { full: "KUE", parts: ["KU", "E"], image: "🍰", category: "Makanan" },
  { full: "SAYA", parts: ["SA", "YA"], image: "🧒", category: "Orang" },
];

export default function MembacaGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const addStars = useAppStore(state => state.addStars);
  const completeMission = useAppStore(state => state.completeMission);

  const [itemIndex, setItemIndex] = React.useState(0);
  const [selectedParts, setSelectedParts] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [feedback, setFeedback] = React.useState<"correct" | "wrong" | null>(null);
  const [isWon, setIsWon] = React.useState(false);

  const currentItem = QUIZ_ITEMS[itemIndex];

  const generateOptions = React.useCallback(() => {
    if (!currentItem) return;
    const correct = currentItem.parts;
    let dist: string[] = [];
    QUIZ_ITEMS.forEach(item => {
        item.parts.forEach(p => {
            if (!correct.includes(p) && !dist.includes(p)) dist.push(p);
        });
    });
    const shuffledDist = dist.sort(() => Math.random() - 0.5).slice(0, 4);
    const final = [...correct, ...shuffledDist].sort(() => Math.random() - 0.5);
    setOptions(final);
  }, [currentItem]);

  React.useEffect(() => {
    generateOptions();
    if (currentItem) {
        speak(`Ayo susun kata... ${currentItem.full.toLowerCase()}`);
    }
  }, [itemIndex, generateOptions, speak, currentItem]);

  const handleOptionClick = (part: string) => {
    if (feedback) return;
    
    const newSelected = [...selectedParts, part];
    setSelectedParts(newSelected);
    speak(part.toLowerCase());

    if (newSelected.length === currentItem.parts.length) {
        if (newSelected.join("") === currentItem.full) {
            setFeedback("correct");
            speak("Bagus sekali!");
            setTimeout(() => {
                if (itemIndex < QUIZ_ITEMS.length - 1) {
                    setItemIndex(prev => prev + 1);
                    setSelectedParts([]);
                    setFeedback(null);
                } else {
                    setIsWon(true);
                    addStars(100);
                    completeMission("membaca");
                }
            }, 1500);
        } else {
            setFeedback("wrong");
            speak("Coba lagi sayang!");
            setTimeout(() => {
                setSelectedParts([]);
                setFeedback(null);
            }, 1000);
        }
    }
  };

  if (isWon) {
    return (
        <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
          <ConfettiBurst>
            <IllustrationHolder variant="accent" size="xl" icon={Trophy} className="mx-auto mb-8 border-4 border-black shadow-neo-lg scale-125" />
          </ConfettiBurst>
          <div className="space-y-4">
               <NeoText variant="title" stroke className="text-5xl uppercase italic text-primary">MASTER KATA!</NeoText>
               <NeoText variant="subtitle" className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Kamu sudah bisa menyusun banyak benda!</NeoText>
          </div>
          <div className="bg-card p-6 rounded-3xl border-4 border-black shadow-neo-sm w-full">
              <NeoText variant="body" className="font-black text-sm uppercase tracking-tight italic">Hebat! Kamu makin jago membaca ya.</NeoText>
          </div>
          <div className="flex flex-col gap-4 w-full mt-4">
              <Button 
                  variant="default"
                  className="w-full h-16 text-xl font-black uppercase border-4 border-black shadow-neo hover:shadow-neo-lg active:shadow-none bg-primary text-black rounded-2xl"
                  onClick={() => router.push("/main/learn")}
              >
                  Lanjut Belajar <ArrowRight className="ml-3 size-6" strokeWidth={3} />
              </Button>
          </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col p-6 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto min-h-screen overflow-hidden">
      <GameHeader 
        title="RAKIT KATA"
        currentLevel={itemIndex + 1}
        totalLevels={QUIZ_ITEMS.length}
      />

      <Card className="mt-2 border-4 border-black shadow-neo-lg bg-card rounded-[2.5rem] overflow-hidden flex flex-col">
        <CardContent className="p-8 flex-1 flex flex-col items-center justify-center gap-8">
            <div className="relative group">
                <IllustrationHolder variant="primary" size="xl" emoji={currentItem.image} className="w-48 h-48 text-9xl bg-background border-4 border-black shadow-neo group-hover:rotate-3 transition-all" />
                <Badge variant="accent" className="absolute -top-4 -right-4 border-4 border-black shadow-neo-sm text-sm uppercase font-black px-4 py-1 rounded-xl">
                    {currentItem.category}
                </Badge>
            </div>

            <div className="flex gap-4">
                {currentItem.parts.map((_, i) => (
                    <div 
                        key={i}
                        className={cn(
                            "w-24 h-24 border-4 border-dashed border-black/20 rounded-3xl flex items-center justify-center transition-all",
                            selectedParts[i] ? "border-solid border-black bg-background shadow-neo scale-105" : "bg-muted/10",
                            feedback === "correct" ? "bg-success text-black border-success" : feedback === "wrong" ? "animate-shake bg-destructive border-destructive text-white" : ""
                        )}
                    >
                        <NeoText variant="title" stroke className="text-4xl text-primary lowercase italic">{selectedParts[i] || "?"}</NeoText>
                    </div>
                ))}
            </div>

            <div className="w-full px-6 text-center">
                <NeoText variant="body" className="font-black text-sm uppercase tracking-widest opacity-40">Susun potongan kata di bawah</NeoText>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {options.map((opt, i) => (
            <button
                key={i}
                disabled={feedback !== null || selectedParts.includes(opt)}
                onClick={() => handleOptionClick(opt)}
                className={cn(
                    "h-20 flex items-center justify-center bg-background border-4 border-black shadow-neo-sm rounded-[1.5rem] active:scale-95 active:shadow-none transition-all relative overflow-hidden group",
                    selectedParts.includes(opt) ? "opacity-20 grayscale shadow-none" : "hover:shadow-neo hover:-translate-y-1"
                )}
            >
                <NeoText variant="title" stroke className="text-3xl text-primary lowercase italic">{opt}</NeoText>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
                    <Play className="size-4 text-primary" />
                </div>
            </button>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <Button 
            variant="ghost" 
            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 rounded-xl"
            onClick={() => setSelectedParts([])}
        >
            <RotateCcw className="size-4 mr-2" strokeWidth={3} /> Ulangi Pilihan
        </Button>
      </div>
    </div>
  );
}
