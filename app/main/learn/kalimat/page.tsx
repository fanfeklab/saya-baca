'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, HeartCrack } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useProgress } from '@/hooks/useProgress';
import { useGameStore } from '@/store/useGameStore';

import { useSearchParams } from 'next/navigation';
import { QuizResultView } from '@/components/organisms/QuizResultView';
import { SENTENCE_TRIALS } from '@/lib/constants';

function KalimatPageContent() {
  const { speak } = useTTS();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { markLearningFinished, saveQuizResult } = useProgress();
  
  const modeParam = searchParams.get('mode') as 'learn' | 'quiz' | null;
  const initialMode = modeParam || 'learn';

  const [view, setView] = React.useState<'learn' | 'quiz' | 'result'>(initialMode);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [quizScore, setQuizScore] = React.useState(0);
  const [xpGained, setXpGained] = React.useState(0);
  const [coinsEarned, setCoinsEarned] = React.useState(0);

  const current = SENTENCE_TRIALS[currentIdx];
  const decreaseEnergy = useGameStore(state => state.decreaseEnergy);
  const energy = useGameStore(state => state.energy);
  const addCoins = useGameStore(state => state.addCoins);
  const addGlobalExp = useGameStore(state => state.addGlobalExp);

  const handleOptionClick = (word: string) => {
    if (answers.length < current.correctWords.length) {
      if (answers.includes(word)) return; // prevent duplicate clicks if we want
      
      const newAnswers = [...answers, word];
      setAnswers(newAnswers);
      speak(word);

      if (newAnswers.length === current.correctWords.length) {
        checkAnswer(newAnswers);
      }
    }
  };

  const checkAnswer = (finalAnswers: string[]) => {
    const isCorrect = finalAnswers.every((val, index) => val === current.correctWords[index]);
    
    if (isCorrect) {
      speak("Pintar! Kalimatnya benar!");
      setShowFeedback(true);
      setTimeout(async () => {
        if (currentIdx < SENTENCE_TRIALS.length - 1) {
          setCurrentIdx(c => c + 1);
          setAnswers([]);
          setShowFeedback(false);
        } else {
          // Learning finished
          if (view === 'learn') {
            await markLearningFinished('sentence');
            addGlobalExp(50);
            addCoins(10);
            speak("Luar biasa! Kamu sudah bisa menyusun kalimat. Sekarang coba kuisnya ya!");
            router.push('/main/home');
          } else {
            // If it was a "Quiz" mode (maybe we use different trials for quiz later)
            const score = 100; // Simplified for this interactive module
            const { xpEarned, coinsEarned: cEarned } = await saveQuizResult('sentence', score);
            setQuizScore(score);
            setXpGained(xpEarned);
            setCoinsEarned(cEarned);
            addGlobalExp(xpEarned);
            addCoins(cEarned);
            setView('result');
          }
        }
      }, 2000);
    } else {
      decreaseEnergy();
      if (energy - 1 <= 0) {
         speak('Yaah, nyawa kamu habis. Kita istirahat dulu ya!');
         setTimeout(() => {
            router.push('/main/home');
         }, 3000);
         return;
      }
      speak("Coba lagi, susunannya belum tepat.");
      setTimeout(() => setAnswers([]), 1000);
    }
  };

  const playSentence = () => {
    let ansIdx = 0;
    const fullText = current.template.map(part => {
      if (part === '[ ]') {
        const ans = answers[ansIdx] || '...';
        ansIdx++;
        return ans;
      }
      return part;
    }).join(' ');
    speak(fullText);
  };

  if (view === 'result') {
    return (
      <QuizResultView 
        score={quizScore}
        xpGained={xpGained}
        coinsEarned={coinsEarned}
        onRetry={() => {
            setCurrentIdx(0);
            setAnswers([]);
            setView(initialMode);
        }}
        onFinish={() => router.push('/main/home')}
      />
    );
  }

  if (energy <= 0) {
    return (
      <main className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center p-6 bg-background text-center">
        <HeartCrack size={80} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="font-heading font-black text-4xl uppercase mb-2">Kehabisan Nyawa!</h1>
        <p className="font-sans text-xl font-bold text-foreground/60">Tunggu nyawamu pulih untuk belajar lagi.</p>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 overflow-hidden flex flex-col pt-20 pb-8 px-6">
      
      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full gap-6">
        <header className="flex items-center gap-4 shrink-0">
          <Button variant="outline" size="icon" onClick={() => router.push('/main/home')} className="rounded-full neo-border shrink-0">
            <ArrowLeft />
          </Button>
          <div className="min-w-0">
            <h1 className="font-heading text-xl md:text-2xl font-black text-foreground uppercase truncate">Merakit Kalimat</h1>
            <p className="font-sans text-[10px] font-bold text-foreground/60  italic leading-none">Susun kata di bawah ini</p>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col gap-6">
            <Card className="p-8 neo-border neo-shadow bg-card rounded-[2.5rem] flex flex-col items-center gap-6 shrink-0">
                <div className="text-8xl animate-bounce">{current.image}</div>
                
                <div className="flex flex-wrap justify-center gap-2 text-xl md:text-2xl font-black font-heading uppercase text-foreground ">
                    {current.template.map((part, idx) => {
                    if (part === '[ ]') {
                        const slotIdx = current.template.slice(0, idx).filter(p => p === '[ ]').length;
                        const answer = answers[slotIdx];
                        return (
                        <div key={idx} className={cn(
                            "min-w-[80px] md:min-w-[100px] h-10 md:h-12 border-b-4 border-foreground  flex items-center justify-center transition-all",
                            answer ? "text-yellow-500 scale-110" : "text-foreground/20 "
                        )}>
                            {answer || '...'}
                        </div>
                        );
                    }
                    return <span key={idx}>{part}</span>;
                    })}
                </div>

                <Button variant="outline" size="icon" className="rounded-full neo-border" onClick={playSentence}>
                    <Play className="fill-current" />
                </Button>
            </Card>

            <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
                {current.options.map((word) => (
                    <motion.button
                        key={word}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOptionClick(word)}
                        className={cn(
                            "rounded-[2rem] bg-card neo-border neo-shadow font-heading font-black text-lg md:text-xl hover:bg-yellow-50  transition-colors uppercase flex items-center justify-center p-4",
                            answers.includes(word) && "bg-yellow-100 "
                        )}
                    >
                        {word}
                    </motion.button>
                ))}
            </div>
        </div>

        <AnimatePresence>
            {showFeedback && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="shrink-0 flex items-center justify-center gap-2 text-green-500 font-heading font-black text-xl md:text-2xl uppercase py-2"
                >
                    <CheckCircle2 size={32} /> LUAR BIASA!
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function KalimatPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen relative z-10  items-center justify-center font-heading font-black">MEMUAT...</div>}>
      <KalimatPageContent />
    </React.Suspense>
  );
}

