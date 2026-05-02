"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Home, Star, Frown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/molecules/game-header";
import { useTTS } from "@/hooks/use-tts";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AbjadQuizPage() {
  const router = useRouter();
  const { speak } = useTTS();
  const addStars = useAppStore(state => state.addStars);
  const completeMission = useAppStore(state => state.completeMission);
  const loseEnergy = useAppStore(state => state.loseEnergy);
  const energy = useAppStore(state => state.currentProfile?.energy ?? 0);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [options, setOptions] = React.useState<string[]>([]);
  const [target, setTarget] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"correct" | "wrong" | null>(null);
  const [wrongOpsi, setWrongOpsi] = React.useState<string[]>([]);

  const totalQuestions = 5;

  const generateQuestion = React.useCallback(() => {
    const correct = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    let distractors: string[] = [];
    while (distractors.length < 5) {
      const d = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (d !== correct && !distractors.includes(d)) {
        distractors.push(d);
      }
    }
    const combined = [...distractors, correct].sort(() => Math.random() - 0.5);
    setTarget(correct);
    setOptions(combined);
    setFeedback(null);
    setWrongOpsi([]);
    speak(`Cari huruf... ${correct}`);
  }, [speak]);

  React.useEffect(() => {
    if (energy <= 0 && !isFinished) {
        setTimeout(() => setIsFinished(true), 0);
        return;
    }
    if (energy > 0 && target === "") {
        setTimeout(() => generateQuestion(), 0);
    }
  }, [energy, generateQuestion, isFinished, target]);

  const handleOptionClick = (option: string) => {
    if (feedback === "correct" || wrongOpsi.includes(option)) return;

    if (option === target) {
      setFeedback("correct");
      setScore(prev => prev + 1);
      speak("Heba! Jawabanmu Benar!");
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          setQuestionIndex(prev => prev + 1);
          generateQuestion();
        } else {
          setIsFinished(true);
          const finalStars = score >= 4 ? 50 : 20;
          addStars(finalStars);
          completeMission('abjad');
        }
      }, 1500);
    } else {
      setFeedback("wrong");
      setWrongOpsi(prev => [...prev, option]);
      loseEnergy();
      speak("Yuk, coba lagi!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (isFinished) {
    const isSuccess = energy > 0 && score >= 1;
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 items-center justify-center text-center max-w-md mx-auto min-h-[80vh]">
        {isSuccess ? (
          <ConfettiBurst>
            <div className="size-32 bg-yellow-400 border-4 border-black shadow-neo rounded-full flex items-center justify-center mb-6">
                <Star className="size-20 fill-black" />
            </div>
          </ConfettiBurst>
        ) : (
          <div className="size-32 bg-muted border-4 border-black shadow-neo rounded-full flex items-center justify-center mb-6 opacity-60">
             <Frown className="size-20 text-black" />
          </div>
        )}

        <div className="space-y-2">
            <NeoText variant="title" stroke className={cn("text-5xl", isSuccess ? "text-success" : "text-destructive")}>
                {energy <= 0 ? "ISI ENERGI!" : "SKOR: " + score}
            </NeoText>
            <NeoText variant="body" className="font-black uppercase tracking-widest text-xs opacity-60">
                {energy <= 0 ? "Istirahat sejenak ya..." : "Kuis Abjad Selesai"}
            </NeoText>
        </div>

        <div className="flex flex-col gap-4 w-full">
            <Button 
                className="w-full h-16 text-xl font-black uppercase border-4 border-black shadow-neo bg-primary text-white"
                onClick={() => router.push("/main/learn")}
            >
                Ke Beranda <Home className="ml-2 size-6" />
            </Button>
            {energy > 0 && (
                <Button 
                    variant="outline"
                    className="w-full h-14 border-4 border-black shadow-neo hover:shadow-none font-black uppercase"
                    onClick={() => {
                        setQuestionIndex(0);
                        setScore(0);
                        setIsFinished(false);
                    }}
                >
                    Main Lagi <RotateCcw className="ml-2 size-5" />
                </Button>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto min-h-screen">
      <GameHeader 
        title="KUIS ABJAD"
        currentLevel={questionIndex + 1}
        totalLevels={totalQuestions}
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-12 mt-8">
         <Button 
            className="size-32 border-4 border-black shadow-neo rounded-full bg-accent animate-pulse"
            onClick={() => speak(`Cari huruf... ${target}`)}
         >
            <Play className="size-16 text-black fill-black/20" />
         </Button>

         <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
            {options.map((opt, i) => (
                <Button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className={cn(
                        "h-28 text-6xl font-black border-4 border-black shadow-neo transition-all active:scale-95",
                        wrongOpsi.includes(opt) ? "bg-muted text-muted-foreground opacity-40 shadow-none scale-90" : "bg-card hover:bg-muted text-black",
                        feedback === "correct" && opt === target ? "bg-success border-success text-white animate-bounce shadow-neo-lg" : "",
                        feedback === "wrong" && opt === wrongOpsi[wrongOpsi.length - 1] ? "bg-destructive border-destructive text-white animate-shake" : ""
                    )}
                >
                    {opt}
                </Button>
            ))}
         </div>
      </div>

      {feedback === "correct" && (
         <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-in zoom-in-50 duration-300 bg-success border-4 border-black shadow-neo-lg p-6 rounded-3xl">
                <Sparkles className="size-20 text-white animate-spin-slow" />
            </div>
         </div>
      )}
    </div>
  );
}
