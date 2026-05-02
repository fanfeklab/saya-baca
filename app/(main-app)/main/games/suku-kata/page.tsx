"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Home, Sparkles, ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { useTTS } from "@/hooks/use-tts";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";

const SECTIONS = [
  {
    id: "vokal",
    title: "Mengenal Vokal",
    type: "grid",
    items: ["A", "I", "U", "E", "O"],
    description: "Ini adalah huruf vokal. Ayo ucapkan bersama!"
  },
  {
    id: "b",
    title: "Membaca B",
    type: "practice",
    items: [
      "ba bi bu be bo",
      "a a a b b b",
      "ba ba ba ba ba",
      "a ba a ba a ba",
      "ba ba a ba a ba ba a ba"
    ],
    description: "Mari belajar bunyi huruf B"
  },
  {
    id: "c",
    title: "Membaca C",
    type: "practice",
    items: [
      "ca ci cu ce co",
      "c c c c",
      "ca ca ca ca ca",
      "a ca ca a ca a",
      "ca ca a ca ca ca"
    ],
    description: "Sekarang kita coba huruf C"
  },
  {
    id: "d",
    title: "Membaca D",
    type: "practice",
    items: [
      "da di du de do",
      "d d d d",
      "da da da da da",
      "a da da a da da",
      "da da a da a da",
      "a ba ca da ca da"
    ],
    description: "Ayo lanjut ke huruf D"
  },
  {
      id: "f",
      title: "Membaca F",
      type: "practice",
      items: [
        "fa fi fu fe fo",
        "f f f f",
        "fa fa fa fa fa",
        "a fa fa a fa",
        "fa a fa fa a fa",
        "a da da fa ba ca"
      ],
      description: "Suara F seperti tiupan angin"
  },
  {
    id: "g",
    title: "Membaca G",
    type: "practice",
    items: [
      "ga gi gu ge go",
      "g g g g",
      "ga ga ga ga ga",
      "a ga ga a ga ga",
      "ga ga a ga a ga ga",
      "a ba ca da fa ga"
    ],
    description: "Tenggorokan bergetar untuk G"
  },
  {
    id: "s",
    title: "Membaca S",
    type: "practice",
    items: [
        "sa si su se so",
        "s s s s",
        "sa sa sa sa sa sa",
        "sa a sa sa a sa a sa sa sa",
        "a la ma ga ra fa ba da sa ca ra",
        "ha ja sa pa na ra qa ka sa ra",
        "ra sa sa ra sa ra"
    ],
    description: "Suara S seperti mendesis"
  }
];

export default function SukuKataGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const addStars = useAppStore(state => state.addStars);
  const completeMission = useAppStore(state => state.completeMission);

  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [isWon, setIsWon] = React.useState(false);

  const currentSection = SECTIONS[sectionIndex];
  
  React.useEffect(() => {
    if (currentSection.type === "grid") {
        speak(currentSection.description);
    } else {
        speak(currentSection.items[stepIndex]);
    }
  }, [sectionIndex, stepIndex, currentSection, speak]);

  const handleNext = () => {
    if (currentSection.type === "grid") {
        setSectionIndex(prev => prev + 1);
        setStepIndex(0);
    } else {
        if (stepIndex < currentSection.items.length - 1) {
            setStepIndex(prev => prev + 1);
        } else {
            if (sectionIndex < SECTIONS.length - 1) {
                setSectionIndex(prev => prev + 1);
                setStepIndex(0);
                addStars(10);
            } else {
                setIsWon(true);
                addStars(100);
                completeMission("suku-kata");
            }
        }
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
        setStepIndex(prev => prev - 1);
    } else if (sectionIndex > 0) {
        setSectionIndex(prev => prev - 1);
        setStepIndex(SECTIONS[sectionIndex - 1].type === "grid" ? 0 : SECTIONS[sectionIndex - 1].items.length - 1);
    }
  };

  if (isWon) {
    return (
        <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
          <ConfettiBurst>
            <IllustrationHolder variant="accent" size="xl" icon={Trophy} className="mx-auto mb-8 border-4 border-black shadow-neo-lg scale-125" />
          </ConfettiBurst>
          <div className="space-y-4">
               <NeoText variant="title" stroke className="text-5xl uppercase italic text-primary">JUARA BACA!</NeoText>
               <NeoText variant="subtitle" className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Kamu sudah menguasai banyak suku kata!</NeoText>
          </div>
          <div className="bg-card p-6 rounded-3xl border-4 border-black shadow-neo-sm w-full">
              <NeoText variant="body" className="font-black text-sm uppercase tracking-tight italic">Hebat! Kamu sudah siap membaca kalimat yang lebih panjang.</NeoText>
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
        title={currentSection.title}
        currentLevel={sectionIndex + 1}
        totalLevels={SECTIONS.length}
      />

      <Card className="flex-1 border-4 border-black shadow-neo-lg bg-card rounded-[2.5rem] overflow-hidden flex flex-col">
        <CardContent className="p-8 flex-1 flex flex-col items-center justify-center text-center gap-8">
            <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-40">
                {currentSection.type === "grid" ? "Kenali Huruf-Huruf Ini" : `Latihan ${stepIndex + 1} / ${currentSection.items.length}`}
            </NeoText>

            {currentSection.type === "grid" ? (
                <div className="grid grid-cols-5 gap-3 w-full">
                    {currentSection.items.map((item, i) => (
                        <button 
                            key={i} 
                            onClick={() => speak(item)}
                            className="aspect-square flex items-center justify-center bg-background border-4 border-black shadow-neo-sm rounded-2xl active:scale-95 transition-all"
                        >
                            <NeoText variant="title" stroke className="text-3xl text-primary italic">{item}</NeoText>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                    <div 
                        className="p-8 bg-background border-4 border-black shadow-neo rounded-[2rem] cursor-pointer hover:scale-105 transition-all group"
                        onClick={() => speak(currentSection.items[stepIndex])}
                    >
                        <NeoText 
                            variant="title" 
                            stroke 
                            className={cn(
                                "text-4xl sm:text-5xl tracking-normal text-primary lowercase",
                                currentSection.items[stepIndex].length > 15 ? "text-3xl sm:text-4xl" : ""
                            )}
                        >
                            {currentSection.items[stepIndex]}
                        </NeoText>
                        <div className="mt-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Play className="size-6 mx-auto" />
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 px-6 text-center">
                <NeoText variant="body" className="font-black text-sm uppercase tracking-tight italic opacity-60">
                    {currentSection.description}
                </NeoText>
            </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-6 py-4">
          <Button 
              variant="outline" 
              className="flex-1 h-16 border-4 border-black shadow-neo active:shadow-none rounded-2xl bg-background disabled:opacity-20"
              disabled={sectionIndex === 0 && stepIndex === 0}
              onClick={handlePrev}
          >
              <ArrowLeft className="size-6 mr-2" strokeWidth={3} /> <span className="font-black">KEMBALI</span>
          </Button>

          <Button 
              variant="default" 
              className="flex-1 h-16 border-4 border-black shadow-neo active:shadow-none rounded-2xl bg-accent"
              onClick={handleNext}
          >
              <span className="font-black">
                  {currentSection.type === "practice" && stepIndex < currentSection.items.length - 1 ? "ULANGI" : "LANJUT"}
              </span> 
              <ArrowRight className="size-6 ml-2" strokeWidth={3} />
          </Button>
      </div>
    </div>
  );
}
