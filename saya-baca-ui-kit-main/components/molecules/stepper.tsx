import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep, className, ...props }: StepperProps) {
  return (
    <div className={cn("flex items-center w-full justify-between relative", className)} {...props}>
      <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted -translate-y-1/2 rounded-full border-2 border-border shadow-neo-sm z-0"></div>
      <div 
        className="absolute top-1/2 left-0 h-2 bg-primary -translate-y-1/2 rounded-full border-2 border-border z-0 transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      ></div>
      
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center gap-2 z-10 relative">
            <div 
              className={cn(
                "size-10 rounded-full border-4 flex items-center justify-center font-black transition-all duration-300",
                isCompleted ? "bg-success border-border text-success-foreground shadow-neo" : 
                isActive ? "bg-primary border-border text-primary-foreground shadow-neo scale-110" : 
                "bg-card border-border text-muted-foreground shadow-none"
              )}
            >
              {isCompleted ? <Check className="size-5" /> : index + 1}
            </div>
            <span 
              className={cn(
                "text-xs font-black absolute -bottom-6 whitespace-nowrap",
                isCompleted ? "text-success" : 
                isActive ? "text-primary" : 
                "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  );
}
