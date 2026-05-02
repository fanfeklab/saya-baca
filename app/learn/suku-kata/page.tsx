'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const VOWELS = "AIUEO".split("");

import { QuizModal } from '@/components/organisms/QuizModal';

export default function SukuKataPage() {
  const { speak } = useTTS();
  const router = useRouter();
  const [activeConsonant, setActiveConsonant] = React.useState("B");
  const [selectedSyllable, setSelectedSyllable] = React.useState<string | null>(null);
  const [showQuiz, setShowQuiz] = React.useState(false);

  const generateSyllableQuestions = React.useCallback(() => {
    const questions = [];
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line react-hooks/purity
      const randomConsonant = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
      // eslint-disable-next-line react-hooks/purity
      const randomVowel = VOWELS[Math.floor(Math.random() * VOWELS.length)];
      const correct = randomConsonant + randomVowel.toLowerCase();
      
      const others: string[] = [];
      while(others.length < 3) {
        // eslint-disable-next-line react-hooks/purity
        const c = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
        // eslint-disable-next-line react-hooks/purity
        const v = VOWELS[Math.floor(Math.random() * VOWELS.length)];
        const s = c + v.toLowerCase();
        if (s !== correct && !others.includes(s)) others.push(s);
      }

      questions.push({
        id: `qs-${i}`,
        question: correct,
        correctAnswer: correct,
        // eslint-disable-next-line react-hooks/purity
        options: [...others, correct].sort(() => 0.5 - Math.random()),
        type: 'syllable' as const
      });
    }
    return questions;
  }, []);

  const syllables = VOWELS.map(v => activeConsonant + v.toLowerCase());

  const handleSyllableClick = (syllable: string) => {
    setSelectedSyllable(syllable);
    speak(syllable);
  };

  const nextConsonant = () => {
    const idx = CONSONANTS.indexOf(activeConsonant);
    setActiveConsonant(CONSONANTS[(idx + 1) % CONSONANTS.length]);
    setSelectedSyllable(null);
  };

  const prevConsonant = () => {
    const idx = CONSONANTS.indexOf(activeConsonant);
    setActiveConsonant(CONSONANTS[(idx - 1 + CONSONANTS.length) % CONSONANTS.length]);
    setSelectedSyllable(null);
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
              <h1 className="font-heading text-3xl font-black text-neoblack uppercase">Suku Kata</h1>
              <p className="font-sans text-sm font-bold text-neoblack/60 italic">Belajar gabungan huruf yuk!</p>
            </div>
          </div>
          <Button 
            variant="default" 
            className="rounded-full bg-blue-400 text-white font-black h-12"
            onClick={() => setShowQuiz(true)}
          >
            MULAI QUIZ
          </Button>
        </header>

        {showQuiz && (
          <QuizModal 
            questions={generateSyllableQuestions()}
            moduleId="syllable"
            onClose={() => setShowQuiz(false)}
            onComplete={() => {
              setShowQuiz(false);
            }}
          />
        )}

        {/* Consonant Selector */}
        <div className="flex items-center justify-between bg-white neo-border neo-shadow p-4 rounded-3xl">
          <Button variant="outline" size="icon" onClick={prevConsonant} className="rounded-full">
            <ChevronLeft />
          </Button>
          <div className="text-center">
             <span className="text-4xl font-black font-heading text-neoblack">{activeConsonant}</span>
             <p className="text-[10px] font-black text-neoblack/40 uppercase">Konsonan</p>
          </div>
          <Button variant="outline" size="icon" onClick={nextConsonant} className="rounded-full">
            <ChevronRight />
          </Button>
        </div>

        {/* Syllable Display */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConsonant}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-5 gap-4"
            >
              {syllables.map((syllable) => (
                <motion.button
                  key={syllable}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSyllableClick(syllable)}
                  className={cn(
                    "h-24 sm:h-32 rounded-3xl neo-border neo-shadow flex flex-col items-center justify-center transition-all",
                    selectedSyllable === syllable ? "bg-blue-400 text-white" : "bg-white text-neoblack"
                  )}
                >
                  <span className="text-4xl font-black font-heading lowercase">{syllable}</span>
                  {selectedSyllable === syllable && (
                    <motion.div layoutId="speaker" className="mt-1">
                      <Volume2 size={16} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Practice Card */}
        {selectedSyllable && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-8 bg-yellow-400 neo-border neo-shadow-lg rounded-[2.5rem] text-center space-y-4"
          >
            <h2 className="text-6xl font-black font-heading text-neoblack lowercase">{selectedSyllable}</h2>
            <p className="font-heading text-xl font-black text-neoblack/60 uppercase">Hebat! Teruskan belajar!</p>
            <Button 
              variant="neo" 
              className="bg-white"
              onClick={() => speak(`Ini adalah suku kata ${selectedSyllable}`)}
            >
              DENGARKAN LAGI
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
