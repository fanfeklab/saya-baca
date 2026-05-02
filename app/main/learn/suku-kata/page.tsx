'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/organisms/TopBar';
import { Button } from '@/components/atoms/button';
import { ArrowLeft } from 'lucide-react';
import { ReadingBoard, ReadingPageData, ReadingItem } from '@/components/organisms/ReadingBoard';
import { useSearchParams } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { QuizResultView } from '@/components/organisms/QuizResultView';
import { QuizComponent } from '@/components/organisms/QuizComponent';
import { useTTS } from '@/hooks/useTTS';
import { SYLLABLES_POOL } from '@/lib/constants';
import { useGameStore } from '@/store/useGameStore';

// Helper to generate a line of syllables
let idCount = 0;
const genLine = (syllables: string[]): ReadingItem[] => {
  return syllables.map(s => ({ id: `id-${idCount++}`, text: s.toUpperCase() }));
};

// Generate pages
const PAGES_DATA: ReadingPageData[] = [
  {
    title: "Mengenal Huruf Vokal",
    lines: [
      genLine(["A", "I", "U", "E", "O"]),
      genLine(["A", "A", "I", "I", "U"]),
      genLine(["E", "E", "O", "O", "A"]),
    ]
  },
  {
    title: "Membaca BA-CA",
    lines: [
      genLine(["BA", "BI", "BU", "BE", "BO"]),
      genLine(["CA", "CI", "CU", "CE", "CO"]),
      genLine(["BA", "CA", "BU", "KU"]),
      genLine(["BA", "BA", "CA", "CA"]),
    ]
  },
  {
    title: "Membaca DA-DA",
    lines: [
      genLine(["DA", "DI", "DU", "DE", "DO"]),
      genLine(["GA", "GI", "GU", "GE", "GO"]),
      genLine(["DA", "SI", "GA", "JI"]),
      genLine(["GU", "A", "DA", "I"]),
    ]
  }
];

function SukuKataPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { markLearningFinished, saveQuizResult } = useProgress();
  const { speak } = useTTS();

  const modeParam = searchParams.get('mode') as 'learn' | 'quiz' | null;
  const initialMode = modeParam || 'learn';

  const [view, setView] = React.useState<'learn' | 'quiz' | 'result'>(initialMode);
  const [quizScore, setQuizScore] = React.useState(0);
  const [xpGained, setXpGained] = React.useState(0);
  const [coinsEarned, setCoinsEarned] = React.useState(0);
  const addCoins = useGameStore(state => state.addCoins);
  const addGlobalExp = useGameStore(state => state.addGlobalExp);

  const generateSyllableQuestions = React.useCallback(() => {
    const questions = [];
    for (let i = 0; i < 5; i++) {
        const correct = SYLLABLES_POOL[Math.floor(Math.random() * SYLLABLES_POOL.length)];
        const others = SYLLABLES_POOL.filter(a => a !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
        questions.push({
          id: `qs-${i}`,
          question: correct,
          correctAnswer: correct,
          options: [...others, correct].sort(() => 0.5 - Math.random()),
          type: 'suku-kata' as const
        });
    }
    return questions;
  }, []);

  const handleFinishLearning = async () => {
    await markLearningFinished('syllable');
    addGlobalExp(50);
    addCoins(10);
    speak("Hebat! Materi suku kata selesai. Mari kita uji kemampuanmu!");
    router.push('/main/home');
  };

  const handleQuizComplete = async (score: number) => {
    const { xpEarned, coinsEarned: cEarned } = await saveQuizResult('syllable', score);
    setQuizScore(score);
    setXpGained(xpEarned);
    setCoinsEarned(cEarned);
    addGlobalExp(xpEarned);
    addCoins(cEarned);
    setView('result');
  };

  if (view === 'quiz') {
    return (
      <QuizComponent 
        questions={generateSyllableQuestions()}
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
        coinsEarned={coinsEarned}
        onRetry={() => setView('quiz')}
        onFinish={() => router.push('/main/home')}
      />
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
            <h1 className="font-heading text-xl md:text-2xl font-black text-foreground uppercase truncate">Mengenal Vokal</h1>
            <p className="font-sans text-[10px] font-bold text-foreground/60  italic leading-none">Ketuk tulisan untuk mendengar</p>
          </div>
        </header>

        <div className="flex-1 min-h-0 bg-card rounded-[2.5rem] neo-border neo-shadow p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
           <ReadingBoard 
              pages={PAGES_DATA} 
              onFinish={handleFinishLearning}
              className="h-full"
           />
        </div>
      </div>
    </main>
  );
}

export default function SukuKataPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen relative z-10  items-center justify-center font-heading font-black">MEMUAT...</div>}>
      <SukuKataPageContent />
    </React.Suspense>
  );
}

