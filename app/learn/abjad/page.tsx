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
import { QuizModal } from '@/components/organisms/QuizModal';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const EXAMPLES: Record<string, { word: string, icon: string }> = {
  'A': { word: 'APEL', icon: '🍎' },
  'B': { word: 'BOLA', icon: '⚽' },
  'C': { word: 'CICAK', icon: '🦎' },
  'D': { word: 'DOMBA', icon: '🐑' },
  'E': { word: 'ELANG', icon: '🦅' },
  'F': { word: 'FERI', icon: '⛴️' },
  'G': { word: 'GAJAH', icon: '🐘' },
  'H': { word: 'HARIMAU', icon: '🐅' },
  'I': { word: 'IKAN', icon: '🐟' },
  'J': { word: 'JERUK', icon: '🍊' },
  'K': { word: 'KUCING', icon: '🐱' },
  'L': { word: 'LEBAH', icon: '🐝' },
  'M': { word: 'MATAHARI', icon: '☀️' },
  'N': { word: 'NYAMUK', icon: '🦟' },
  'O': { word: 'OBAT', icon: '💊' },
  'P': { word: 'PISANG', icon: '🍌' },
  'Q': { word: 'QURAN', icon: '📖' },
  'R': { word: 'RUSA', icon: '🦌' },
  'S': { word: 'SAPI', icon: '🐄' },
  'T': { word: 'TELUR', icon: '🥚' },
  'U': { word: 'ULAR', icon: '🐍' },
  'V': { word: 'VAS', icon: '🏺' },
  'W': { word: 'WORTEL', icon: '🥕' },
  'X': { word: 'XYLOFON', icon: '🎹' },
  'Y': { word: 'YOYO', icon: '🪀' },
  'Z': { word: 'ZEBRA', icon: '🦓' },
};

export default function AbjadPage() {
  const { speak } = useTTS();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [showQuiz, setShowQuiz] = React.useState(false);

  const generateAbjadQuestions = React.useCallback(() => {
    const questions = [];
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line react-hooks/purity
      const correct = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      // eslint-disable-next-line react-hooks/purity
      const others = ALPHABET.filter(a => a !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
      questions.push({
        id: `q-${i}`,
        question: correct,
        correctAnswer: correct,
        // eslint-disable-next-line react-hooks/purity
        options: [...others, correct].sort(() => 0.5 - Math.random()),
        type: 'abjad' as const
      });
    }
    return questions;
  }, []);

  const handleLetterClick = (letter: string) => {
    setSelected(letter);
    speak(letter);
    
    // Auto speak example after a short delay
    setTimeout(() => {
      const example = EXAMPLES[letter];
      if (example) {
        speak(`${letter} untuk ${example.word}`);
      }
    }, 1000);
  };

  return (
    <main className="relative min-h-screen pt-24 pb-12 px-6 max-w-xl mx-auto bg-warm-cream">
      <TopBar />
      
      <div className="space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full">
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="font-heading text-3xl font-black text-neoblack uppercase">Mengenal Abjad</h1>
              <p className="font-sans text-sm font-bold text-neoblack/60 italic">Klik huruf untuk mendengar suaranya!</p>
            </div>
          </div>
          <Button 
            variant="default" 
            className="rounded-full bg-yellow-400 font-black h-12"
            onClick={() => setShowQuiz(true)}
          >
            MULAI QUIZ
          </Button>
        </header>

        {showQuiz && (
          <QuizModal 
            questions={generateAbjadQuestions()} 
            moduleId="abjad"
            onClose={() => setShowQuiz(false)}
            onComplete={() => {
              setShowQuiz(false);
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              className="w-full h-48 bg-white neo-border neo-shadow-lg rounded-[2.5rem] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 animate-bounce">
                <Volume2 className="text-yellow-500" />
              </div>
              <div className="text-center">
                <span className="text-8xl font-black text-neoblack font-heading">{selected}</span>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-3xl">{EXAMPLES[selected]?.icon}</span>
                  <span className="text-xl font-heading font-black text-neoblack/40 uppercase tracking-widest leading-none">
                    {EXAMPLES[selected]?.word}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 pb-20">
          {ALPHABET.map((letter) => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLetterClick(letter)}
              className={cn(
                "aspect-square rounded-2xl neo-border neo-shadow flex items-center justify-center text-3xl font-black font-heading transition-colors",
                selected === letter ? "bg-yellow-400" : "bg-white hover:bg-yellow-50"
              )}
            >
              {letter}
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
