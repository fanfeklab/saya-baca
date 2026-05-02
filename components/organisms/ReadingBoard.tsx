'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTTS } from '@/hooks/useTTS';

export interface ReadingItem {
  id: string;
  text: string;
  speechText?: string;
}

export interface ReadingPageData {
  title: string;
  lines: ReadingItem[][];
}

interface ReadingBoardProps {
  pages: ReadingPageData[];
  onFinish?: () => void;
  className?: string;
}

export function ReadingBoard({ pages, onFinish, className }: ReadingBoardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { speak } = useTTS();

  const totalPages = pages.length;
  const currentData = pages[currentPage];

  const handleItemClick = (item: ReadingItem) => {
    setSelectedId(item.id);
    speak(item.speechText || item.text);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
      setSelectedId(null);
    } else {
      onFinish?.();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      setSelectedId(null);
    }
  };

  if (!currentData) return null;

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-6 bg-card p-4 rounded-2xl neo-border shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <h2 className="font-heading font-black text-xl uppercase">{currentData.title}</h2>
        <Volume2 className="text-foreground/40" />
      </div>

      <div className="space-y-4 mb-8 min-h-[40vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex flex-col gap-6"
          >
            {currentData.lines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap items-center justify-center gap-3">
                {line.map((item, itemIdx) => (
                  <motion.button
                    key={`${lineIdx}-${item.id}-${itemIdx}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "px-4 py-2 rounded-xl border-2 border-foreground font-heading text-3xl font-black transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-yellow-100",
                      selectedId === item.id ? "bg-yellow-400" : "bg-white"
                    )}
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl neo-border shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          disabled={currentPage === 0}
          className={cn("font-bold text-lg", currentPage === 0 ? "invisible" : "")}
        >
          <ChevronLeft className="mr-2" /> KEMBALI
        </Button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2.5 h-2.5 rounded-full border-2 border-foreground transition-colors",
                currentPage === i ? "bg-foreground" : "bg-transparent"
              )} 
            />
          ))}
        </div>

        <Button 
          variant="neo" 
          onClick={handleNext}
          className="font-bold text-lg bg-yellow-400"
        >
          {currentPage === totalPages - 1 ? "SELESAI" : "LANJUT"}
          {currentPage < totalPages - 1 && <ChevronRight className="ml-2" />}
        </Button>
      </div>
    </div>
  );
}
