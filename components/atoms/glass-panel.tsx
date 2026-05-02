import { cn } from '@/lib/utils';
import React from 'react';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'subtle' | 'standard' | 'heavy' | 'form';
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, variant = 'standard', intensity = 'medium', ...props }, ref) => {
    
    const variantStyles = {
      subtle: 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]',
      standard: 'bg-white/40 dark:bg-black/40 border-white/40 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      heavy: 'bg-white/70 dark:bg-black/70 border-white/60 dark:border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
      form: 'bg-white/50 dark:bg-slate-900/50 border-white/50 dark:border-white/10 shadow-inner',
    };

    const blurStyles = {
      low: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      high: 'backdrop-blur-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-3xl border overflow-hidden',
          variantStyles[variant],
          blurStyles[intensity],
          className
        )}
        {...props}
      >
        {/* Optional gloss reflection for certain variants */}
        {(variant === 'standard' || variant === 'heavy') && (
          <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl overflow-hidden">
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 dark:to-transparent rotate-12 transform translate-y-[-50%]"></div>
          </div>
        )}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
