'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeoText } from "@/components/atoms/neo-text";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GameHeaderProps {
  title: string;
  currentLevel: number;
  totalLevels: number;
  className?: string;
}

export function GameHeader({ title, currentLevel, totalLevels, className }: GameHeaderProps) {
  const router = useRouter();
  const progress = (currentLevel / totalLevels) * 100;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon-sm" 
          onClick={() => router.back()}
          className="rounded-xl shadow-neo-sm hover:shadow-neo active:shadow-none bg-background border-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <NeoText variant="subtitle" stroke className="text-2xl uppercase tracking-tighter leading-none">{title}</NeoText>
        </div>
        <div className="hidden sm:flex flex-col items-end">
           <NeoText variant="body" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Progress Petualangan</NeoText>
           <NeoText variant="body" className="text-xs font-black">{currentLevel} / {totalLevels}</NeoText>
        </div>
      </div>
      
      {/* Mini Progress Bar */}
      <div className="space-y-1">
        <Progress value={progress} className="h-2 rounded-full border-2 border-border bg-background shadow-neo-sm" />
        <div className="flex justify-between sm:hidden">
          <NeoText variant="body" className="text-[10px] font-black uppercase text-muted-foreground">Petualangan</NeoText>
          <NeoText variant="body" className="text-[10px] font-black uppercase">{currentLevel} / {totalLevels}</NeoText>
        </div>
      </div>
    </div>
  );
}
