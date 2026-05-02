'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/atoms/card';

interface ModuleCardProps {
  title: string;
  desc: string;
  color: string;
  progress: number;
  locked?: boolean;
  onClick?: () => void;
}

export function ModuleCard({ 
  title, 
  desc, 
  color, 
  progress, 
  locked = false, 
  onClick 
}: ModuleCardProps) {
  return (
    <Card
      onClick={!locked ? onClick : undefined}
      className={cn(
        "relative cursor-pointer transition-all active:scale-[0.98] neo-border neo-shadow-lg rounded-[2.5rem] overflow-hidden",
        color,
        locked && "opacity-80 grayscale cursor-not-allowed"
      )}
      id={`module-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {locked && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
          <div className="bg-white/90 p-3 rounded-full neo-border">
             <span className="text-neoblack font-bold text-xs uppercase text-center block">Terkunci</span>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-2xl md:text-3xl font-black text-neoblack dark:text-neoblack uppercase tracking-tight">{title}</CardTitle>
        <CardDescription className="font-sans text-xs md:text-sm font-bold text-neoblack/60 dark:text-neoblack/60 italic leading-tight">{desc}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2 mt-2">
        <div className="flex justify-between items-end">
           <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase text-neoblack/40">Skor Terbaik</span>
             <span className="text-xl font-heading font-black text-neoblack">{progress}%</span>
           </div>
           <div className="w-24 h-2 bg-white/40 rounded-full overflow-hidden border-2 border-neoblack/10">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-neoblack"
             />
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
