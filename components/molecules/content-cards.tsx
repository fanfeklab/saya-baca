'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NeoText } from '@/components/atoms/neo-text';
import { AudioButton } from '@/components/atoms/audio-button';
import { IllustrationHolder } from '@/components/atoms/illustration-holder';
import { ConfettiBurst } from '@/components/atoms/confetti-burst';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface MissionCardProps {
  title: string;
  description?: string;
  progress: number;
  total: number;
  onAction?: () => void;
  className?: string;
}

export function MissionCard({ title, description, progress, total, onAction, className }: MissionCardProps) {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <Card className={cn("bg-card border-4 border-black shadow-neo overflow-visible rounded-3xl", className)}>
      <CardHeader className="pb-3 px-6 pt-6">
        <NeoText variant="subtitle" stroke className="text-2xl uppercase tracking-tighter italic">{title}</NeoText>
        {description && <CardDescription className="text-foreground/80 font-black text-[10px] uppercase tracking-widest mt-1 opacity-60 leading-tight">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-6">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <NeoText variant="body" className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Progres Misi</NeoText>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-black border-2 border-black shadow-neo-sm">
              {progress}/{total} MODUL
            </div>
          </div>
          <Progress value={percentage} className="h-5 border-4 border-black shadow-neo-sm bg-background rounded-full overflow-hidden" indicatorClassName="bg-primary" />
        </div>
        <ConfettiBurst>
          <Button variant="default" className="w-full text-xl h-16 shadow-neo active:shadow-none transition-all uppercase tracking-widest font-black border-4 border-black text-black rounded-2xl" onClick={onAction}>
            Lanjutkan Belajar
          </Button>
        </ConfettiBurst>
      </CardContent>
    </Card>
  );
}

export interface StoryCardProps {
  title: string;
  description: string;
  emoji?: string;
  onRead?: () => void;
  onListen?: () => void;
  className?: string;
}

export function StoryCard({ title, description, emoji, onRead, onListen, className }: StoryCardProps) {
  return (
    <Card 
      onClick={onRead}
      className={cn("bg-background flex flex-row items-center cursor-pointer hover:-translate-y-1 hover:shadow-neo p-4 gap-5 transition-all w-full border-4 border-black shadow-neo-sm rounded-3xl translate-y-0 translate-x-0 active:translate-y-1 active:translate-x-1 active:shadow-none", className)}
    >
      <div className="shrink-0">
        <IllustrationHolder variant="secondary" size="lg" emoji={emoji || "📚"} className="rounded-2xl border-4 border-black shadow-neo-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <NeoText variant="body" className="font-black text-lg block mb-0.5 leading-tight truncate uppercase tracking-tight italic">{title}</NeoText>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-3 truncate">{description}</p>
        <div className="flex gap-2">
          {onListen && (
            <AudioButton 
              variant="secondary" 
              size="sm" 
              className="w-fit text-[10px] font-black uppercase h-10 px-6 border-4 border-black shadow-neo-sm active:shadow-none translate-y-0 active:translate-y-1 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                onListen();
              }}
            >
              Dengar Cerita
            </AudioButton>
          )}
        </div>
      </div>
    </Card>
  );
}

export interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: { value: number; label: string; positive?: boolean };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("p-6 bg-white border-2 border-black shadow-neo-sm relative overflow-hidden group", className)}>
      <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500">
        {Icon && <Icon className="w-16 h-16" />}
      </div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <NeoText variant="body" className="text-xs font-black uppercase tracking-tighter text-muted-foreground">{title}</NeoText>
        {Icon && <Icon className="w-5 h-5 text-primary" strokeWidth={3} />}
      </div>
      <div className="flex flex-col gap-1 relative z-10">
        <NeoText variant="subtitle" stroke className="text-4xl leading-none">{value}</NeoText>
        {trend && (
          <div className="flex items-center gap-2 mt-3">
            <Badge variant={trend.positive ? "success" : "destructive"} className="px-2 py-0.5 h-6 text-[10px] font-black uppercase tracking-tighter border-2 border-black shadow-neo-sm">
              {trend.positive ? '+' : ''}{trend.value}%
            </Badge>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{trend.label}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
