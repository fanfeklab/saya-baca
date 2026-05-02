'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { X, Volume2, CheckCircle2, ChevronRight } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';

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
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [lastSelected, setLastSelected] = React.useState<string | null>(null);
  const { speak } = useTTS();

  const currentQuestion = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (answers[currentQuestion.id]) return; // prevent re-answering
    setLastSelected(option);
  };

  const handleNext = () => {
    if (!lastSelected) return;
    
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
    speak(`Manakah huruf ${currentQuestion.question}?`);
  };

  React.useEffect(() => {
    playQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-warm-cream dark:bg-background z-50 flex flex-col overflow-hidden">
      {/* Progress Header */}
      <header className="p-6 flex items-center gap-4 shrink-0">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full neo-border overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-yellow-400"
            />
        </div>
        <span className="font-heading font-black text-neoblack dark:text-foreground text-sm uppercase">
            {currentIdx + 1}/{questions.length}
        </span>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col p-6 max-w-xl mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
            <div className="text-center space-y-6">
                <button 
                  onClick={playQuestion}
                  className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full neo-border neo-shadow flex items-center justify-center mx-auto hover:bg-yellow-50 transition-all active:scale-95 group"
                >
                   <Volume2 size={40} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                </button>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-neoblack dark:text-foreground uppercase tracking-tight">
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
                            : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>

        <footer className="shrink-0 pt-6">
            <Button 
                variant="neo"
                disabled={!lastSelected}
                onClick={handleNext}
                className={`w-full py-8 text-xl group ${!lastSelected ? 'opacity-50 grayscale' : 'bg-green-400 dark:text-neoblack'}`}
            >
                {currentIdx === questions.length - 1 ? 'SELESAI' : 'LANJUT'}
                <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </footer>
      </main>
    </div>
  );
}
