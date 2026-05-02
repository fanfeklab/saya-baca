'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { ArrowLeft, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useProgress } from '@/hooks/useProgress';

interface SentenceTrial {
  id: string;
  image: string;
  template: string[]; // ['[ ]', 'sedang', '[ ]']
  correctWords: string[]; // ['Kucing', 'Makan']
  options: string[];
}

const TRIALS: SentenceTrial[] = [
  {
    id: 's1',
    image: '🐱',
    template: ['[ ]', 'sedang', '[ ]'],
    correctWords: ['KUCING', 'MAKAN'],
    options: ['KUCING', 'MAKAN', 'TIDUR', 'ANJING']
  },
  {
    id: 's2',
    image: '⚽',
    template: ['BIMA', 'main', '[ ]'],
    correctWords: ['BOLA'],
    options: ['BOLA', 'AIR', 'BUKU', 'PISANG']
  },
  {
    id: 's3',
    image: '🍎',
    template: ['SAYA', 'makan', '[ ]'],
    correctWords: ['APEL'],
    options: ['APEL', 'JERUK', 'BOLEH', 'ADA']
  }
];

export default function KalimatPage() {
  const { speak } = useTTS();
  const router = useRouter();
  const { completeWord } = useProgress();
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const current = TRIALS[currentIdx];

  const handleOptionClick = (word: string) => {
    if (answers.length < current.correctWords.length) {
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
      setTimeout(() => {
        if (currentIdx < TRIALS.length - 1) {
          setCurrentIdx(c => c + 1);
          setAnswers([]);
          setShowFeedback(false);
        } else {
          setIsFinished(true);
          completeWord('sentence', 50);
        }
      }, 2000);
    } else {
      speak("Coba lagi, susunannya belum tepat.");
      setTimeout(() => setAnswers([]), 1000);
    }
  };

  const playSentence = () => {
    let ansIdx = 0;
    const fullText = current.template.map(part => {
      if (part === '[ ]') {
        const ans = answers[ansIdx] || 'kosong';
        ansIdx++;
        return ans;
      }
      return part;
    }).join(' ');
    speak(fullText);
  };

  if (isFinished) {
    return (
      <main className="min-h-screen bg-warm-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white neo-border neo-shadow-lg rounded-[2.5rem] p-8 text-center space-y-6 w-full max-w-sm"
        >
          <div className="text-6xl">🏆</div>
          <h2 className="font-heading text-3xl font-black uppercase">Hebat Banget!</h2>
          <p className="font-sans font-bold text-neoblack/60 italic">Kamu sudah bisa menyusun kalimat!</p>
          <Button variant="neo" className="w-full h-14" onClick={() => router.push('/home')}>
            SELESAI
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-24 pb-12 px-6 max-w-xl mx-auto bg-warm-cream">
      <TopBar />
      
      <div className="space-y-8">
        <header className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-black text-neoblack uppercase">Merakit Kalimat</h1>
            <p className="font-sans text-sm font-bold text-neoblack/60 italic">Lengkapi kalimat di bawah ini!</p>
          </div>
        </header>

        <Card className="p-8 neo-border neo-shadow bg-white rounded-[2.5rem] flex flex-col items-center gap-6">
          <div className="text-8xl animate-pulse">{current.image}</div>
          
          <div className="flex flex-wrap justify-center gap-2 text-2xl font-black font-heading uppercase text-neoblack">
            {current.template.map((part, idx) => {
               if (part === '[ ]') {
                 const slotIdx = current.template.slice(0, idx).filter(p => p === '[ ]').length;
                 const answer = answers[slotIdx];
                 return (
                   <div key={idx} className={cn(
                     "min-w-[100px] h-12 border-b-4 border-neoblack flex items-center justify-center transition-all",
                     answer ? "text-yellow-500 scale-110" : "text-neoblack/20"
                   )}>
                     {answer || '...'}
                   </div>
                 );
               }
               return <span key={idx}>{part}</span>;
            })}
          </div>

          <Button variant="outline" size="icon" className="rounded-full" onClick={playSentence}>
             <Play className="fill-current" />
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
           {current.options.map((word) => (
             <motion.button
               key={word}
               whileTap={{ scale: 0.9 }}
               onClick={() => handleOptionClick(word)}
               className="h-16 rounded-2xl bg-white neo-border neo-shadow font-heading font-black text-xl hover:bg-yellow-50 active:bg-yellow-400 transition-colors uppercase"
             >
               {word}
             </motion.button>
           ))}
        </div>

        {showFeedback && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-2 text-green-500 font-heading font-black text-2xl uppercase"
          >
            <CheckCircle2 size={32} /> LUAR BIASA!
          </motion.div>
        )}
      </div>
    </main>
  );
}
