'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { Sparkles, Star, Trophy, ArrowRight, RotateCcw, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizResultViewProps {
  score: number;
  xpGained: number;
  coinsEarned?: number;
  onRetry: () => void;
  onFinish: () => void;
}

export function QuizResultView({ score, xpGained, coinsEarned = 0, onRetry, onFinish }: QuizResultViewProps) {
  React.useEffect(() => {
    if (score >= 80) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [score]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-card rounded-[3rem] neo-border neo-shadow-lg p-10 space-y-8 text-center"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto neo-border neo-shadow"
          >
            {score >= 100 ? <Trophy size={48} className="text-foreground" /> : <Star size={48} className="text-foreground" />}
          </motion.div>
          
          <div className="space-y-1">
            <h2 className="font-heading text-4xl font-black text-foreground uppercase italic tracking-tight">
                {score >= 100 ? 'LUAR BIASA!' : score >= 70 ? 'HEBAT!' : 'BAGUS!'}
            </h2>
            <p className="font-sans text-foreground/60  font-bold uppercase tracking-widest text-xs">
                Hasil Latihanmu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted p-4 sm:p-6 rounded-[2rem] neo-border flex-1">
                <p className="text-[10px] font-black text-foreground/40  uppercase mb-1">Skor</p>
                <p className="text-2xl sm:text-4xl font-black font-heading text-foreground  leading-none">{score}</p>
            </div>
            <div className="bg-blue-50 p-4 sm:p-6 rounded-[2rem] neo-border border-blue-500/20 flex-1">
                <p className="text-[10px] font-black text-blue-500/60 uppercase mb-1">+XP</p>
                <div className="flex items-center justify-center gap-1">
                    <Sparkles size={16} className="text-blue-500" />
                    <p className="text-2xl sm:text-4xl font-black font-heading text-blue-500 leading-none">{xpGained}</p>
                </div>
            </div>
            <div className="bg-yellow-50 p-4 sm:p-6 rounded-[2rem] neo-border border-yellow-500/20 flex-1">
                <p className="text-[10px] font-black text-yellow-500/60 uppercase mb-1">+Koin</p>
                <div className="flex items-center justify-center gap-1">
                    <Coins size={16} className="text-yellow-500" />
                    <p className="text-2xl sm:text-4xl font-black font-heading text-yellow-500 leading-none">{coinsEarned}</p>
                </div>
            </div>
        </div>

        <div className="space-y-4 pt-4">
            <Button 
                variant="neo"
                onClick={onFinish}
                className="w-full py-8 text-xl bg-yellow-400 group"
            >
                LANJUTKAN
                <ArrowRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
                variant="ghost" 
                onClick={onRetry}
                className="w-full font-black text-foreground/40 hover:text-foreground  flex items-center justify-center gap-2 group"
            >
                <RotateCcw size={18} className="group-hover:rotate-[-45deg] transition-transform" />
                ULANGI LATIHAN
            </Button>
        </div>

        <p className="text-[10px] font-black text-foreground/20  uppercase tracking-[0.3em]">
            SAYA BACA PETUALANG
        </p>
      </motion.div>
    </div>
  );
}
