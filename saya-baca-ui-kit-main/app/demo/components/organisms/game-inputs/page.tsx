"use client";

import { useState } from 'react';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Delete, Check } from 'lucide-react';

export default function GameInputsDemoPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numpad = ['1','2','3','4','5','6','7','8','9','X','0','V'];
  const [typedKeyword, setTypedKeyword] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Game Inputs</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen input khusus untuk permainan atau evaluasi, seperti keyboard, numpad, pilihan ganda, dan flashcard.
        </NeoText>
      </div>

      <ComponentPreview
        title="Quiz Options (Multiple Choice)"
        description="Tombol pilihan ganda (A/B/C/D) dengan state validasi benar/salah."
        code={`<div className="grid grid-cols-2 gap-4">
  <Button variant="outline" className="h-auto p-4 justify-start">
    <div className="bg-muted text-foreground w-10 h-10 flex items-center justify-center rounded-xl mr-4 font-black">A</div>
    <span className="font-bold text-lg text-left whitespace-normal">Pilihan Jawaban</span>
  </Button>
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <NeoText variant="h3">Apa ibukota negara Indonesia?</NeoText>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'A', text: 'Bandung', isCorrect: false },
              { id: 'B', text: 'Jakarta', isCorrect: true },
              { id: 'C', text: 'Surabaya', isCorrect: false },
              { id: 'D', text: 'Medan', isCorrect: false },
            ].map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const showCorrect = isRevealed && opt.isCorrect;
              const showWrong = isRevealed && isSelected && !opt.isCorrect;
              
              let variant: 'default' | 'outline' | 'success' | 'destructive' = 'outline';
              if (showCorrect) variant = 'success';
              else if (showWrong) variant = 'destructive';
              else if (isSelected) variant = 'default';

              return (
                <Button 
                  key={opt.id}
                  variant={variant} 
                  className={`h-auto p-3 justify-start rounded-2xl border-4 shadow-neo-sm ${isRevealed ? 'pointer-events-none' : ''}`}
                  onClick={() => setSelectedAnswer(opt.id)}
                >
                  <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-xl mr-4 font-black text-xl border-2 border-border ${variant === 'outline' ? 'bg-muted text-foreground' : 'bg-white/20 text-white'}`}>
                    {opt.id}
                  </div>
                  <span className="font-bold text-lg text-left whitespace-normal leading-tight">{opt.text}</span>
                </Button>
              )
            })}
          </div>
          
          <Button 
            disabled={!selectedAnswer || isRevealed} 
            size="lg" 
            className="w-full mt-4 text-xl h-16 rounded-2xl"
            onClick={() => setIsRevealed(true)}
          >
            {isRevealed ? 'Selesai' : 'Periksa Jawaban'}
          </Button>

          {isRevealed && (
            <Button variant="link" onClick={() => { setIsRevealed(false); setSelectedAnswer(null); }}>Ulangi Simulasi</Button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Alphabet Keyboard"
        description="Keyboard huruf khusus (A-Z) untuk input permainan kata bergaya bento."
        code={`<div className="flex flex-wrap justify-center gap-2">
  {alphabet.map((char) => (
    <Button key={char} variant="outline" className="w-12 h-14 text-xl font-black rounded-xl">
      {char}
    </Button>
  ))}
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-2xl items-center p-8 bg-muted rounded-3xl border-4 border-border shadow-neo">
          <div className="flex gap-2 mb-4 min-h-16 px-4 py-2 bg-card rounded-2xl border-4 border-border shadow-neo-sm min-w-[200px] items-center justify-center">
            <span className="text-3xl font-black tracking-widest">{typedKeyword || '_ _ _'}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {alphabet.map((char) => (
              <Button 
                key={char} 
                variant="outline" 
                className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl font-black rounded-xl border-r-2 border-b-4 border-border bg-card shadow-none hover:-translate-y-1 hover:shadow-neo active:translate-y-1 active:border-b-2 active:shadow-none transition-all px-0"
                onClick={() => setTypedKeyword(prev => (prev + char).substring(0, 10))}
              >
                {char}
              </Button>
            ))}
            <Button 
              variant="destructive" 
              className="w-16 h-12 sm:h-14 rounded-xl border-b-4 shadow-none hover:-translate-y-1 hover:shadow-neo active:translate-y-1 active:border-b-2 active:shadow-none transition-all px-0"
              onClick={() => setTypedKeyword(prev => prev.slice(0, -1))}
            >
              <Delete className="size-6" />
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Playful Numpad"
        description="Keyboard angka besar untuk aplikasi berhitung anak-anak."
        code={`<div className="grid grid-cols-3 gap-3">
  {numpad.map((num) => (
    <Button key={num} variant="secondary" className="h-16 text-2xl font-black rounded-2xl">
      {num}
    </Button>
  ))}
</div>`}
      >
         <div className="w-full max-w-xs p-6 bg-border rounded-3xl shadow-neo">
          <div className="grid grid-cols-3 gap-3">
            {numpad.map((char, i) => (
              <Button 
                key={i} 
                variant={char === 'V' ? 'success' : char === 'X' ? 'destructive' : 'secondary'} 
                className="h-16 sm:h-20 text-3xl font-black rounded-2xl border-b-4 shadow-none hover:-translate-y-1 hover:shadow-neo active:translate-y-1 active:border-b-2 active:shadow-none transition-all px-0"
                onClick={() => {}}
              >
                {char === 'V' ? <Check className="size-8" strokeWidth={4} /> : char === 'X' ? <Delete className="size-8" strokeWidth={4} /> : char}
              </Button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Interactive Flashcard"
        description="Kartu bolak-balik untuk belajar kosa kata atau fakta."
        code={`<div 
  className="relative w-64 h-80 perspective-1000 cursor-pointer" 
  onClick={() => setIsFlipped(!isFlipped)}
>
  <div className={\`w-full h-full duration-500 preserve-3d \${isFlipped ? 'rotate-y-180' : ''}\`}>
    <div className="absolute inset-0 backface-hidden bg-card ...">Depan</div>
    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-accent ...">Belakang</div>
  </div>
</div>`}
      >
        {/* Custom inline styles for 3d transform since CSS might not have these specific utilities out of the box in tailwind without plugins */}
        <style dangerouslySetInnerHTML={{__html: `
          .perspective-1000 { transform-style: preserve-3d; perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}} />
        
        <div className="flex flex-col items-center gap-6">
          <div 
            className="relative w-[300px] h-[400px] perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`w-full h-full transition-transform duration-700 preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front side */}
              <Card className="absolute inset-0 backface-hidden border-4 border-border rounded-3xl shadow-neo flex flex-col items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-6">
                  <div className="text-8xl">🦁</div>
                  <NeoText variant="h2" className="mt-4">Lion</NeoText>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-auto bg-muted px-4 py-2 rounded-full border-2 border-border shadow-neo-sm">Klik untuk membalik</span>
                </CardContent>
              </Card>

              {/* Back side */}
              <Card className="absolute inset-0 backface-hidden rotate-y-180 border-4 border-border rounded-3xl shadow-neo flex flex-col items-center justify-center bg-accent text-accent-foreground">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-6">
                  <NeoText variant="title">Singa</NeoText>
                  <NeoText variant="body" className="font-medium text-lg leading-snug opacity-90">
                    Hewan kucing besar yang dikenal sebagai &apos;Raja Hutan&apos;, hewan karnivora yang hidup berkelompok.
                  </NeoText>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsFlipped(false)}>Lihat Depan</Button>
            <Button variant="outline" onClick={() => setIsFlipped(true)}>Lihat Belakang</Button>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
