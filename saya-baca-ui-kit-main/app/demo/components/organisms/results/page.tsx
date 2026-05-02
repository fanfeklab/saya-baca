"use client";

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Trophy, RotateCcw, ArrowRight, Home, Map } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ResultsProgressDemoPage() {
  const mapNodes = [
    { id: 1, type: 'completed', stars: 3, top: '20%', left: '10%' },
    { id: 2, type: 'completed', stars: 2, top: '50%', left: '25%' },
    { id: 3, type: 'current', stars: 0, top: '30%', left: '45%' },
    { id: 4, type: 'locked', stars: 0, top: '60%', left: '60%' },
    { id: 5, type: 'boss', stars: 0, top: '20%', left: '80%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Results & Progress</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk menampilkan pencapaian, ringkasan skor game, navigasi peta level, dan rapor digital.
        </NeoText>
      </div>

      <ComponentPreview
        title="Level Results (3 Stars)"
        description="Layar skor kemenangan bergaya arcade dengan perolehan bintang."
        code={`<div className="flex justify-center gap-2 mb-6">
  <Star className="fill-warning text-warning size-12 -rotate-12" />
  <Star className="fill-warning text-warning size-16 -translate-y-4" />
  <Star className="fill-muted text-muted-foreground size-12 rotate-12" />
</div>`}
      >
        <div className="w-full max-w-sm flex flex-col items-center p-8 bg-[#c0aede] rounded-[40px] border-4 border-border shadow-neo">
          
          <NeoText variant="h2" className="text-white [text-shadow:_3px_3px_0_var(--color-border)] uppercase tracking-widest mb-8">
            LEVEL CLEAR!
          </NeoText>

          <div className="flex justify-center items-end gap-2 mb-8 h-24">
            <div className="animate-in zoom-in spin-in-12 duration-500">
              <Star className="fill-warning text-warning-foreground size-16 drop-shadow-md -rotate-12 transform origin-bottom" strokeWidth={2} />
            </div>
            <div className="animate-in zoom-in spin-in-12 duration-500 delay-150">
              <Star className="fill-warning text-warning-foreground size-24 drop-shadow-lg -translate-y-6" strokeWidth={2} />
            </div>
            <div className="animate-in zoom-in spin-in-12 duration-500 delay-300">
              {/* This one is perceived as 'empty' but still solid neo-brutalist style */}
              <Star className="fill-card text-muted-foreground size-16 drop-shadow-md rotate-12 transform origin-bottom" strokeWidth={2} />
            </div>
          </div>

          <Card className="w-full bg-card rounded-3xl border-4 border-border shadow-neo-sm mb-8">
            <CardContent className="p-6 text-center space-y-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">SKOR AKHIR</p>
                <p className="text-5xl font-black text-primary">8,450</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t-4 border-border">
                 <div>
                   <p className="text-xs font-bold text-muted-foreground">Waktu</p>
                   <p className="text-xl font-black">1m 24s</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-muted-foreground">Akurasi</p>
                   <p className="text-xl font-black">88%</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between w-full gap-4">
            <Button size="icon" variant="accent" className="h-16 w-16 rounded-2xl border-4 shadow-neo hover:-translate-y-1">
              <RotateCcw className="size-8" />
            </Button>
            <Button size="icon" variant="secondary" className="h-16 w-16 rounded-2xl border-4 shadow-neo hover:-translate-y-1">
              <Home className="size-8" />
            </Button>
            <Button size="icon" variant="default" className="h-16 flex-1 rounded-2xl border-4 shadow-neo hover:-translate-y-1 gap-2">
              Lanjut <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Digital Report Card (Rapor)"
        description="Ringkasan kelas atau progress mingguan untuk gamifikasi edukasi."
        code={`<Card className="rounded-3xl border-4 border-border shadow-neo"> ... </Card>`}
      >
        <Card className="w-full max-w-2xl bg-card rounded-3xl border-4 border-border shadow-neo overflow-hidden">
          <div className="bg-[#ffd5dc] p-6 border-b-4 border-border flex items-center gap-4">
            <Avatar className="size-20 border-4 border-border shadow-neo-sm bg-white">
              <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Student&backgroundColor=b6e3f4" />
            </Avatar>
            <div className="flex-1">
              <h3 className="font-black text-2xl uppercase">Budi Santoso</h3>
              <p className="font-bold text-muted-foreground">Siswa • Kelas 4B</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border-4 border-border shadow-neo-sm transform rotate-3">
              <p className="text-xs font-black uppercase text-center">Grade</p>
              <p className="text-4xl font-black text-success">A</p>
            </div>
          </div>
          
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between font-bold">
                <span>Matematika Dasar</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-4 border-2 border-border shadow-neo-sm bg-muted" indicatorClassName="bg-success" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-bold">
                <span>Bahasa Indonesia</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-4 border-2 border-border shadow-neo-sm bg-muted" indicatorClassName="bg-warning" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t-4 border-border">
              <div className="text-center p-4 bg-muted rounded-2xl border-2 border-border">
                <Trophy className="size-8 mx-auto mb-2 text-warning" />
                <p className="font-black text-xl">12</p>
                <p className="text-xs font-bold text-muted-foreground uppercase">Piala</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-2xl border-2 border-border">
                <Star className="size-8 mx-auto mb-2 text-accent-foreground" />
                <p className="font-black text-xl">145</p>
                <p className="text-xs font-bold text-muted-foreground uppercase">Bintang</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview
        title="Level Map Node"
        description="Peta perjalanan level dengan node interaktif berdasarkan status (locked, current, completed)."
        code={`<div className="relative w-full h-80 bg-green-100 ... rounded-3xl">
  {/* Nodes absolute positioned */}
</div>`}
      >
        <div className="w-full max-w-3xl h-80 relative bg-[#b6e3f4] rounded-3xl border-4 border-border shadow-neo overflow-hidden">
          {/* Decorative Background lines simulating a path */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 10% 20% Q 20% 50% 25% 50% T 45% 30% T 60% 60% T 80% 20%" fill="none" stroke="var(--color-border)" strokeWidth="8" strokeDasharray="16 16" className="opacity-50" />
          </svg>

          {mapNodes.map((node) => {
            let bgColor = 'bg-muted';
            let icon = null;
            if (node.type === 'completed') bgColor = 'bg-success';
            if (node.type === 'current') bgColor = 'bg-primary ring-4 ring-primary/30 animate-pulse';
            if (node.type === 'locked') bgColor = 'bg-card text-muted-foreground opacity-80';
            if (node.type === 'boss') bgColor = 'bg-destructive';

            return (
              <div 
                key={node.id} 
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: node.top, left: node.left }}
              >
                <button 
                  className={`size-16 rounded-full border-4 border-border shadow-neo flex items-center justify-center text-xl font-black transition-transform hover:scale-110 ${bgColor} ${node.type === 'locked' ? 'cursor-not-allowed shadow-none' : 'active:translate-y-1 active:shadow-none'}`}
                >
                  {node.type === 'locked' ? '🔒' : node.type === 'boss' ? '👹' : node.id}
                </button>
                {node.type === 'completed' && (
                  <div className="flex mt-2">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className={`size-4 ${i < node.stars ? 'fill-warning text-warning-foreground' : 'fill-muted text-border'}`} />
                    ))}
                  </div>
                )}
                {node.type === 'current' && (
                  <div className="mt-2 text-xs font-black bg-card px-2 py-1 rounded-full border-2 border-border absolute -bottom-8 whitespace-nowrap">
                    KAMU DI SINI
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ComponentPreview>
    </div>
  );
}
