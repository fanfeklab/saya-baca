'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTTS } from '@/hooks/useTTS';

export interface GridItem {
  id: string;
  text: string;
  speechText?: string;
  [key: string]: any;
}

interface PaginatedGridProps<T extends GridItem> {
  items: T[];
  rows?: number;
  cols?: number;
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
  onItemClick?: (item: T) => void;
  selectedId?: string | null;
  className?: string;
}

export function PaginatedGrid<T extends GridItem>({
  items,
  rows = 3,
  cols = 3,
  renderItem,
  onItemClick,
  selectedId,
  className
}: PaginatedGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const { speak } = useTTS();
  const itemsPerPage = rows * cols;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const currentItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleItemClick = (item: T, index: number) => {
    // Determine priority of sound text
    const textToSpeak = item.speechText || item.text;
    speak(textToSpeak);
    onItemClick?.(item);
    
    // Auto next logic: if clicking the last item of the current page, and there's a next page
    if (index === currentItems.length - 1 && currentPage < totalPages - 1) {
      setTimeout(() => {
        setCurrentPage(p => p + 1);
      }, 1500); // Wait 1.5s for audio/TTS to play before page turns
    }
  };

  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <div 
        className="w-full grid gap-4 mb-10" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        <AnimatePresence mode="popLayout">
          {currentItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              onClick={() => handleItemClick(item, i)}
              className={cn(
                "aspect-square rounded-[2rem] neo-border flex items-center justify-center font-heading transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                selectedId === item.id ? "bg-yellow-400" : "bg-white hover:bg-yellow-50"
              )}
            >
              {renderItem ? renderItem(item, selectedId === item.id) : (
                <span className="text-4xl md:text-5xl font-black">{item.text}</span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-full neo-border shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="rounded-full"
          >
            <ChevronLeft size={28} />
          </Button>
          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-3 h-3 rounded-full border-2 border-neoblack transition-colors",
                  currentPage === i ? "bg-neoblack" : "bg-transparent"
                )} 
              />
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="rounded-full"
          >
            <ChevronRight size={28} />
          </Button>
        </div>
      )}
    </div>
  );
}
