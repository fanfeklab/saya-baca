"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";
import { cn } from "@/lib/utils";

const LEVELS = [
  { question: "1 + 1 = ?", answer: 2, options: [1, 2, 3, 4] },
  { question: "2 + 3 = ?", answer: 5, options: [3, 4, 5, 6] },
  { question: "4 - 2 = ?", answer: 2, options: [1, 2, 3, 4] },
];

export default function BerhitungGamePage() {
  const router = useRouter();
  const [levelIndex, setLevelIndex] = React.useState(0);
  const [isWon, setIsWon] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);

  const currentLevel = LEVELS[levelIndex];

  const handleAnswer = (option: number) => {
    setSelectedAnswer(option);
    setTimeout(() => {
      if (option === currentLevel.answer) {
        if (levelIndex < LEVELS.length - 1) {
          setLevelIndex(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setIsWon(true);
        }
      } else {
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
    return (
      <div className="flex flex-col p-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28 min-h-[70vh] items-center justify-center text-center">
        <ConfettiBurst>
          <IllustrationHolder variant="success" size="xl" emoji="🎉" className="mx-auto mb-6" />
        </ConfettiBurst>
        <NeoText variant="title" className="text-3xl text-success">Hebat!</NeoText>
        <NeoText variant="body" className="mb-6">Kamu jago sekali berhitung!</NeoText>
        
        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Main Lagi
          </Button>
          <Button variant="default" className="flex-1" onClick={() => router.push("/home")}>
            Selesai
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28">
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
          <NeoText variant="title">Mari Berhitung</NeoText>
        </div>
        <div className="font-bold text-sm bg-success/20 text-success font-mono px-3 py-1 rounded-full border-2 border-success">
          {levelIndex + 1} / {LEVELS.length}
        </div>
      </div>

      {/* Main Game Area */}
      <Card className="mt-4 bg-secondary border-4 border-black shadow-neo-lg text-center overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none scale-150 rotate-12">
           <NeoText variant="title" className="text-9xl">123</NeoText>
        </div>
        <CardContent className="p-12 border-b-4 border-black bg-white flex flex-col items-center gap-8 relative z-10 transition-all hover:scale-[1.02]">
          <NeoText variant="title" stroke className="text-7xl md:text-9xl tracking-[0.2em] text-primary mb-2 drop-shadow-lg">
            {currentLevel.question.replace('= ?', '')}
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
              : "bg-destructive text-destructive-foreground border-black shadow-none translate-y-1 shake";
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
