"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Home, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { useTTS } from "@/hooks/use-tts";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";

const WORDS = [
  { full: "BOLA", parts: ["BO", "LA"] },
  { full: "CUCI", parts: ["CU", "CI"] },
  { full: "SAYA", parts: ["SA", "YA"] },
  { full: "BUKU", parts: ["BU", "KU"] },
  { full: "MATA", parts: ["MA", "TA"] },
];

export default function SukuKataGamePage() {
  const router = useRouter();
  const { speak } = useTTS();
  const addStars = useAppStore(state => state.addStars);
  const completeMission = useAppStore(state => state.completeMission);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [currentAnswers, setCurrentAnswers] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [isWon, setIsWon] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"correct" | "wrong" | null>(null);

  const currentWord = WORDS[questionIndex];

  const generateOptions = React.useCallback(() => {
    if (!currentWord) return;
    // Get correct parts
    const correct = [...currentWord.parts];
    // Add distractors from other words
    let distractors: string[] = [];
    WORDS.forEach(w => {
      w.parts.forEach(p => {
        if (!correct.includes(p) && !distractors.includes(p)) distractors.push(p);
      });
    });
    // Shuffle and pick 4 distractors
    const chosenDistractors = distractors.sort(() => Math.random() - 0.5).slice(0, 4);
    const finalOptions = [...correct, ...chosenDistractors].sort(() => Math.random() - 0.5);
    setOptions(finalOptions);
    setCurrentAnswers(Array(currentWord.parts.length).fill(""));
  }, [currentWord]);

  React.useEffect(() => {
    if (options.length === 0) {
        setTimeout(() => generateOptions(), 0);
    }
    if (currentWord && options.length > 0) {
        speak(`Susun suku katanya... ${currentWord.full.toLowerCase()}`);
    }
  }, [questionIndex, generateOptions, speak, options.length, currentWord]);

  const handleOptionClick = (part: string) => {
    const nextIndex = currentAnswers.findIndex(a => a === "");
    if (nextIndex === -1) return;

    const newAnswers = [...currentAnswers];
    newAnswers[nextIndex] = part;
    setCurrentAnswers(newAnswers);

    speak(part.toLowerCase());

    // Check if full
    if (newAnswers.every(a => a !== "")) {
      if (newAnswers.join("") === currentWord.full) {
        setFeedback("correct");
        speak("Bagus!");
        setTimeout(() => {
          if (questionIndex < WORDS.length - 1) {
            setQuestionIndex(prev => prev + 1);
            setFeedback(null);
          } else {
            setIsWon(true);
            addStars(75);
            completeMission('suku-kata');
          }
        }, 1500);
      } else {
        setFeedback("wrong");
        speak("Coba lagi!");
        setTimeout(() => {
          setCurrentAnswers(Array(currentWord.parts.length).fill(""));
          setFeedback(null);
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCurrentAnswers(Array(currentWord?.parts.length || 0).fill(""));
    setFeedback(null);
  };

  if (isWon) {
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
        <ConfettiBurst>
            <div className="size-32 bg-accent border-4 border-black shadow-neo rounded-full flex items-center justify-center mb-6">
                <Sparkles className="size-20 text-white" />
            </div>
        </ConfettiBurst>
        <div className="space-y-2">
            <NeoText variant="title" stroke className="text-5xl text-success">JUARA!</NeoText>
            <NeoText variant="body" className="font-black uppercase tracking-widest text-xs opacity-60">Kamu sudah jago menyusun kata</NeoText>
        </div>
        <Button 
            className="w-full h-16 text-xl font-black uppercase border-4 border-black shadow-neo bg-primary text-white"
            onClick={() => router.push("/main/learn")}
        >
            Lihat Hadiah <Home className="ml-2 size-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto min-h-screen">
      <GameHeader 
        title="SUSUN SUKU KATA"
        currentLevel={questionIndex + 1}
        totalLevels={WORDS.length}
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-12 mt-8">
         <div className="animate-bounce">
             <NeoText variant="title" stroke className="text-6xl text-primary">{currentWord?.full}</NeoText>
         </div>

         {/* Slots */}
         <div className="flex gap-4">
            {currentAnswers.map((ans, i) => (
                <div 
                    key={i}
                    className={cn(
                        "w-24 h-24 border-4 border-dashed border-black/20 rounded-3xl flex items-center justify-center transition-all",
                        ans !== "" ? "border-solid border-black bg-white shadow-neo animate-in zoom-in" : "bg-muted/10",
                        feedback === "correct" ? "bg-success text-white border-success" : feedback === "wrong" ? "animate-shake bg-destructive border-destructive text-white" : ""
                    )}
                >
                    <NeoText variant="title" className="text-4xl">{ans}</NeoText>
                </div>
            ))}
         </div>

         {/* Options */}
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
            {options.map((opt, i) => (
                <Button
                    key={i}
                    disabled={currentAnswers.includes(opt) || feedback !== null}
                    onClick={() => handleOptionClick(opt)}
                    className={cn(
                        "h-20 text-3xl font-black border-4 border-black shadow-neo bg-card hover:bg-muted text-black transition-all active:scale-95",
                        currentAnswers.includes(opt) ? "opacity-30 shadow-none grayscale" : ""
                    )}
                >
                    {opt}
                </Button>
            ))}
         </div>
         
         <Button 
            variant="ghost" 
            className="font-black uppercase tracking-widest text-xs opacity-50 hover:opacity-100"
            onClick={handleReset}
         >
            <RotateCcw className="size-4 mr-2" /> Reset Pilihan
         </Button>
      </div>
    </div>
  );
}
