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
        "relative cursor-pointer transition-all active:scale-[0.98]",
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
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-1">
        <div className="flex justify-between text-[10px] sm:text-xs font-black uppercase text-neoblack/60">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 sm:h-4 bg-white/40 rounded-full overflow-hidden neo-border border-black/20">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-neoblack"
          />
        </div>
      </CardContent>
    </Card>
  );
}
