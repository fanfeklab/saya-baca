'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { X, Play, BrainCircuit, Lock } from 'lucide-react';

interface ModuleOverviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  learningFinished: boolean;
  onStartLearning: () => void;
  onStartQuiz: () => void;
}

export function ModuleOverviewPopup({
  isOpen,
  onClose,
  title,
  description,
  icon,
  isUnlocked,
  learningFinished,
  onStartLearning,
  onStartQuiz
}: ModuleOverviewPopupProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neoblack/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] neo-border neo-shadow-lg p-8 space-y-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-yellow-400 rounded-3xl neo-border neo-shadow flex items-center justify-center mx-auto mb-2 text-4xl">
              {icon}
            </div>
            
            <div className="space-y-2">
              <h2 className="font-heading text-3xl font-black text-neoblack dark:text-foreground uppercase">{title}</h2>
              <p className="font-sans text-neoblack/60 dark:text-foreground/60 font-bold leading-relaxed px-4">
                {description}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <Button 
              variant="neo"
              onClick={onStartLearning}
              className="w-full h-16 bg-yellow-400 group text-lg"
            >
              <Play className="mr-3 fill-current" />
              MULAI BELAJAR
            </Button>
            
            <div className="relative group">
              {!learningFinished && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neoblack text-white text-[10px] font-black py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Selesaikan materi belajar dulu ya!
                </div>
              )}
              <Button 
                variant="outline"
                disabled={!learningFinished}
                onClick={onStartQuiz}
                className={`w-full h-16 rounded-2xl border-4 text-lg ${learningFinished ? 'border-neoblack dark:border-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'opacity-50'}`}
              >
                {learningFinished ? (
                  <BrainCircuit className="mr-3 text-blue-500" />
                ) : (
                  <Lock className="mr-3 text-slate-400" />
                )}
                MULAI LATIHAN SOAL
              </Button>
            </div>
          </div>
          
          <p className="text-center text-[10px] font-black text-neoblack/30 dark:text-foreground/30 uppercase tracking-[0.2em] pt-2">
            Pilih mode petualanganmu
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
