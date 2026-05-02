'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { X, Volume2, CheckCircle2, ChevronRight, HeartCrack } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'abjad' | 'suku-kata' | 'kalimat';
}

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export function QuizComponent({ questions, onComplete, onCancel }: QuizComponentProps) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [lastSelected, setLastSelected] = React.useState<string | null>(null);
  const [showWrongFeedback, setShowWrongFeedback] = React.useState(false);
  const { speak } = useTTS();
  
  const decreaseEnergy = useGameStore(state => state.decreaseEnergy);
  const energy = useGameStore(state => state.energy);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (answers[currentQuestion.id]) return; // prevent re-answering
    setLastSelected(option);
  };

  const handleNext = () => {
    if (!lastSelected) return;
    
    const isCorrect = lastSelected === currentQuestion.correctAnswer;
    
    if (!isCorrect) {
      decreaseEnergy();
      if (energy - 1 <= 0) {
        speak('Yaah, nyawa kamu habis. Istirahat dulu ya!');
        setTimeout(() => {
          router.push('/main/home');
        }, 3000);
        return;
      } else {
        speak('Yah kurang tepat, kita coba lagi!');
        setShowWrongFeedback(true);
        setTimeout(() => {
          setShowWrongFeedback(false);
          setLastSelected(null);
        }, 2000);
        return;
      }
    }
    
    speak('Pintar!');
    
    const newAnswers = { ...answers, [currentQuestion.id]: lastSelected };
    setAnswers(newAnswers);
    setLastSelected(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach(q => {
        if (newAnswers[q.id] === q.correctAnswer) correctCount++;
      });
      const score = Math.round((correctCount / questions.length) * 100);
      onComplete(score);
    }
  };

  const playQuestion = () => {
    speak(`Manakah tulisan ${currentQuestion.question}?`);
  };

  React.useEffect(() => {
    playQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  const progress = ((currentIdx + 1) / questions.length) * 100;

  if (energy <= 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6 text-center">
        <HeartCrack size={80} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="font-heading font-black text-4xl uppercase mb-2">Kehabisan Nyawa!</h1>
        <p className="font-sans text-xl font-bold text-foreground/60">Tunggu nyawamu pulih untuk bermain lagi.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background">
      {/* Progress Header */}
      <header className="p-6 flex items-center gap-4 shrink-0">
        <button onClick={onCancel} className="p-2 hover:bg-muted  rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="flex-1 h-3 bg-slate-200 rounded-full neo-border overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-yellow-400"
            />
        </div>
        <span className="font-heading font-black text-foreground text-sm uppercase">
            {currentIdx + 1}/{questions.length}
        </span>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col p-6 max-w-xl mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
            <div className="text-center space-y-6">
                <button 
                  onClick={playQuestion}
                  className="w-24 h-24 bg-card rounded-full neo-border neo-shadow flex items-center justify-center mx-auto hover:bg-yellow-50 transition-all active:scale-95 group"
                >
                   <Volume2 size={40} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                </button>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground  uppercase tracking-tight">
                    KETUK HURUF <span className="text-yellow-500 underline underline-offset-4">{currentQuestion.question}</span>
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full px-4">
                {currentQuestion.options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className={`aspect-square rounded-[2rem] neo-border flex items-center justify-center text-6xl font-black font-heading transition-all ${
                            lastSelected === opt 
                            ? 'bg-yellow-400 neo-shadow-lg scale-105 z-10' 
                            : 'bg-card hover:bg-muted '
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>

        <AnimatePresence>
            {showWrongFeedback && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    col className="shrink-0 flex items-center justify-center gap-2 text-red-500 font-heading font-black text-xl md:text-2xl uppercase py-2"
                >
                    <X size={32} /> KURANG TEPAT! COBA LAGI!
                </motion.div>
            )}
        </AnimatePresence>

        <footer className="shrink-0 pt-6">
            <Button 
                variant="neo"
                disabled={!lastSelected}
                onClick={handleNext}
                className={`w-full py-8 text-xl group ${!lastSelected ? 'opacity-50 grayscale' : 'bg-green-400 '}`}
            >
                {currentIdx === questions.length - 1 ? 'SELESAI' : 'LANJUT'}
                <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </footer>
      </main>
    </div>
  );
}
