'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { useTTS } from '@/hooks/useTTS';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle2, XCircle, Volume2, Trophy } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'syllable' | 'abjad' | 'word';
}

interface QuizModalProps {
  questions: QuizQuestion[];
  moduleId: string; // Added moduleId to track which module is being completed
  onComplete?: (totalXp: number) => void;
  onClose: () => void;
}

export function QuizModal({ questions, moduleId, onComplete, onClose }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [finished, setFinished] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const { speak } = useTTS();
  const { completeWord } = useProgress();

  const current = questions[currentIdx];

  const handleOptionClick = async (option: string) => {
    if (selected) return;
    setSelected(option);
    const correct = option === current.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      speak("Benar! Hebat!");
    } else {
      speak(`Hampir! Jawabannya adalah ${current.correctAnswer}`);
    }

    setTimeout(async () => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const finalXp = score * 10;
        setFinished(true);
        // AC-201/AC-202: Record progress and XP gain
        await completeWord(moduleId, finalXp);
        onComplete?.(finalXp);
      }
    }, 2000);
  };

  const playQuestion = () => {
    speak(current.question);
  };

  if (finished) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm bg-white neo-border neo-shadow-lg rounded-[2.5rem] p-8 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-yellow-400 rounded-full neo-border mx-auto flex items-center justify-center">
            <Trophy size={40} className="text-neoblack" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-black text-neoblack">BERHASIL!</h2>
            <p className="font-sans font-bold text-neoblack/60">Kamu dapat {score * 10} XP hari ini.</p>
          </div>
          <Button variant="neo" className="w-full h-14" onClick={onClose}>
            KEMBALI KE MENU
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-warm-cream neo-border neo-shadow-lg rounded-[2.5rem] p-6 space-y-8 overflow-hidden"
      >
        <header className="flex items-center justify-between">
          <span className="font-heading font-black text-neoblack/40 uppercase">Soal {currentIdx + 1} / {questions.length}</span>
          <Button variant="ghost" className="font-black text-red-500" onClick={onClose}>KELUAR</Button>
        </header>

        <div className="text-center space-y-6">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={playQuestion}
            className="w-24 h-24 rounded-full neo-border neo-shadow bg-yellow-400 group active:scale-95"
          >
            <Volume2 size={40} className="group-hover:scale-110 transition-transform" />
          </Button>
          <h3 className="font-heading text-2xl font-black text-neoblack uppercase underline decoration-yellow-400 decoration-4">
            Manakah Suara Ini?
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {current.options.map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.95 }}
              disabled={!!selected}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "h-20 rounded-2xl neo-border neo-shadow text-3xl font-black font-heading flex items-center justify-center transition-all",
                selected === option 
                  ? (isCorrect ? "bg-green-400 text-white" : "bg-red-400 text-white")
                  : "bg-white text-neoblack hover:bg-yellow-50"
              )}
            >
              {option}
              {selected === option && isCorrect && <CheckCircle2 className="ml-2" />}
              {selected === option && !isCorrect && <XCircle className="ml-2" />}
            </motion.button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-3 h-3 rounded-full border-2 border-neoblack transition-all",
                i === currentIdx ? "bg-yellow-400 w-6" : (i < currentIdx ? "bg-neoblack" : "bg-white")
              )} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { cn } from "@/lib/utils";
