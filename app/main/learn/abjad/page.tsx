'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { PaginatedGrid, GridItem } from '@/components/organisms/PaginatedGrid';

import { ALPHABET, ALPHABET_EXAMPLES } from '@/lib/constants';

const ALPHABET_ITEMS = ALPHABET.map((letter) => ({
  id: letter,
  text: letter,
  speechText: letter 
}));

import { useSearchParams } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { QuizResultView } from '@/components/organisms/QuizResultView';
import { QuizComponent } from '@/components/organisms/QuizComponent';

function AbjadPageContent() {
  const { speak } = useTTS();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { markLearningFinished, saveQuizResult } = useProgress();
  
  const modeParam = searchParams.get('mode') as 'learn' | 'quiz' | null;
  const initialMode = modeParam || 'learn';

  const [view, setView] = React.useState<'learn' | 'quiz' | 'result'>(initialMode);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [quizScore, setQuizScore] = React.useState(0);
  const [xpGained, setXpGained] = React.useState(0);

  const generateAbjadQuestions = React.useCallback(() => {
    const questions = [];
    const pool = [...ALPHABET];
    for (let i = 0; i < 5; i++) {
        const correct = pool[Math.floor(Math.random() * pool.length)];
        const others = pool.filter(a => a !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
        questions.push({
          id: `q-${i}`,
          question: correct,
          correctAnswer: correct,
          options: [...others, correct].sort(() => 0.5 - Math.random()),
          type: 'abjad' as const
        });
    }
    return questions;
  }, []);

  const handleLetterClick = (letter: string) => {
    setSelected(letter);
    const example = ALPHABET_EXAMPLES[letter];
    if (example) {
      speak(`${letter}. ${example.word}`);
    }
  };

  const handleFinishLearning = async () => {
    await markLearningFinished('abjad');
    speak("Hebat! Kamu sudah menyelesaikan materi abjad. Sekarang waktunya latihan soal!");
    router.push('/main/home');
  };

  const handleQuizComplete = async (score: number) => {
    const { xpEarned } = await saveQuizResult('abjad', score);
    setQuizScore(score);
    setXpGained(xpEarned);
    setView('result');
  };

  if (view === 'quiz') {
    return (
      <QuizComponent 
        questions={generateAbjadQuestions()}
        onComplete={handleQuizComplete}
        onCancel={() => router.push('/main/home')}
      />
    );
  }

  if (view === 'result') {
    return (
      <QuizResultView 
        score={quizScore}
        xpGained={xpGained}
        onRetry={() => {
          setView('quiz');
        }}
        onFinish={() => router.push('/main/home')}
      />
    );
  }

  return (
    <main className="fixed inset-0 bg-warm-cream dark:bg-background overflow-hidden flex flex-col pt-20 pb-8 px-6">
      <TopBar />
      
      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full gap-6">
        <header className="flex items-center gap-4 shrink-0">
          <Button variant="outline" size="icon" onClick={() => router.push('/main/home')} className="rounded-full neo-border shrink-0">
            <ArrowLeft />
          </Button>
          <div className="min-w-0">
            <h1 className="font-heading text-xl md:text-2xl font-black text-neoblack dark:text-foreground uppercase truncate">Belajar Abjad</h1>
            <p className="font-sans text-[10px] font-bold text-neoblack/60 dark:text-foreground/60 italic leading-none">Klik kotak untuk mendengar</p>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                className="w-full h-40 md:h-44 bg-white dark:bg-slate-900 neo-border neo-shadow-lg rounded-[2.5rem] flex items-center justify-center relative shrink-0"
              >
                <div className="absolute top-4 right-6 animate-pulse">
                  <Volume2 size={24} className="text-yellow-500" />
                </div>
                <div className="text-center">
                  <span className="text-7xl md:text-8xl font-black text-neoblack dark:text-foreground font-heading leading-none block">{selected}</span>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="text-2xl">{ALPHABET_EXAMPLES[selected]?.icon}</span>
                    <span className="text-base md:text-lg font-heading font-black text-neoblack/40 dark:text-foreground/40 uppercase tracking-widest leading-none">
                      {ALPHABET_EXAMPLES[selected]?.word}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
                <div className="w-full h-40 md:h-44 bg-slate-100 dark:bg-slate-800/20 neo-border border-dashed rounded-[2.5rem] flex items-center justify-center text-center p-6 shrink-0">
                  <p className="font-heading font-black text-neoblack/30 dark:text-foreground/20 text-xl md:text-2xl leading-tight">
                    PILIH HURUF <br />DI BAWAH INI!
                  </p>
                </div>
            )}
          </AnimatePresence>

          <div className="flex-1 min-h-0">
            <PaginatedGrid
              rows={3}
              cols={3}
              items={ALPHABET_ITEMS}
              selectedId={selected}
              onItemClick={(item) => handleLetterClick(item.text)}
              className="h-full"
            />
          </div>
        </div>

        {selected === 'Z' && (
           <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="shrink-0 pt-2"
           >
             <Button 
                variant="neo" 
                onClick={handleFinishLearning}
                className="w-full py-6 bg-green-400 dark:text-neoblack group"
             >
                <span className="text-lg">SELESAI BELAJAR!</span>
                <ArrowLeft size={20} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
             </Button>
           </motion.div>
        )}
      </div>
    </main>
  );
}

export default function AbjadPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-warm-cream dark:bg-background flex items-center justify-center font-heading font-black">MEMUAT...</div>}>
      <AbjadPageContent />
    </React.Suspense>
  );
}
