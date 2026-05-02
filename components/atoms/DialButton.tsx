'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DialButtonProps {
  value: string | number;
  label?: string;
  onClick: (val: string) => void;
  className?: string;
}

export function DialButton({ value, label, onClick, className }: DialButtonProps) {
  return (
    <button
      onClick={() => onClick(value.toString())}
      className={cn(
        "w-full aspect-square bg-card neo-border neo-shadow flex flex-col items-center justify-center transition-all hover:bg-yellow-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-2xl",
        className
      )}
      id={`dial-btn-${value}`}
    >
      <span className="text-2xl sm:text-3xl font-black text-foreground font-heading leading-tight">{value}</span>
      {label && <span className="text-[8px] sm:text-[10px] font-black text-foreground/40 uppercase tracking-tighter sm:tracking-widest">{label}</span>}
    </button>
  );
}
