'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { ArrowLeft } from 'lucide-react';
import { QuizModal } from '@/components/organisms/QuizModal';
import { ReadingBoard, ReadingPageData, ReadingItem } from '@/components/organisms/ReadingBoard';

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const VOWELS = "AIUEO".split("");

// Helper to generate a line of syllables
let idCount = 0;
const genLine = (syllables: string[]): ReadingItem[] => {
  return syllables.map(s => ({ id: `id-${idCount++}`, text: s }));
};

// Generate pages
const pages: ReadingPageData[] = [];

// Page 1: Vowels
pages.push({
  title: "Mengenal Huruf Vokal",
  lines: [
    genLine(["A", "I", "U", "E", "O"]),
    genLine(["A", "A", "I", "I", "U"]),
    genLine(["E", "E", "O", "O", "A"]),
    genLine(["A", "I", "U", "E", "O"]),
  ]
});

// Generate consonant pages
CONSONANTS.slice(0, 5).forEach(c => { // Currently generating first 5 to avoid massive array, could be expanded
  const cLower = c.toLowerCase();
  const vList = ["a", "i", "u", "e", "o"];
  
  pages.push({
    title: `Segmen Membaca ${c}`,
    lines: [
      genLine(vList.map(v => cLower + v)), // ba bi bu be bo
      genLine(["a", "a", "a", cLower, cLower, cLower]),
      genLine(vList.slice(0,1).map(v => Array(5).fill(cLower+v)).flat()), // ba ba ba ba ba
      genLine(["a", cLower+"a", "a", cLower+"a", "a", cLower+"a"]),
      genLine([cLower+"a", cLower+"a", "a", cLower+"a", "a", cLower+"a", cLower+"a", "a", cLower+"a"])
    ]
  });
});

export default function SukuKataPage() {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = React.useState(false);

  // Mock quiz generator
  const generateSyllableQuestions = React.useCallback(() => {
    return [
      { id: 'qs-1', question: 'ba', correctAnswer: 'ba', options: ['ba', 'bi', 'bu', 'be'], type: 'syllable' as const },
      { id: 'qs-2', question: 'ca', correctAnswer: 'ca', options: ['ca', 'ci', 'cu', 'ce'], type: 'syllable' as const },
      { id: 'qs-3', question: 'da', correctAnswer: 'da', options: ['da', 'di', 'du', 'de'], type: 'syllable' as const },
    ];
  }, []);

  return (
    <main className="relative min-h-screen pt-24 pb-12 px-6 max-w-xl mx-auto bg-warm-cream">
      <TopBar />
      
      <div className="space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full shrink-0">
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="font-heading text-xl sm:text-3xl font-black text-neoblack uppercase">Suku Kata</h1>
              <p className="font-sans text-xs sm:text-sm font-bold text-neoblack/60 italic">Mari membaca bersama!</p>
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

        <ReadingBoard 
          pages={pages} 
          onFinish={() => setShowQuiz(true)}
        />
      </div>
    </main>
  );
}
