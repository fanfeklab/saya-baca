"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { NeoText } from "@/components/atoms/neo-text";
import { Button } from "@/components/ui/button";
import { Clock, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function StudyTimerGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const settings = useStore(useAppStore, (state) => state.settings);
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = React.useState(false);
  const [isWarning, setIsWarning] = React.useState(false);

  // Initialize time if not set
  if (settings?.studyTimer && settings.studyTimer > 0 && timeLeft === null && !isTimeUp) {
    setTimeLeft(settings.studyTimer * 60);
  }

  React.useEffect(() => {
    if (!settings?.studyTimer || settings.studyTimer === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          setIsTimeUp(true);
          clearInterval(interval);
          return 0;
        }
        
        // Warning at 5 minutes
        if (prev <= 300) {
            setIsWarning(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings?.studyTimer]);

  if (isTimeUp) {
    return (
      <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 fade-in duration-500">
           <div className="relative mx-auto size-32 text-primary">
              <Clock className="size-full animate-bounce" />
              <Lock className="absolute -bottom-2 -right-2 size-12 text-black bg-accent rounded-full p-2 border-4 border-black" />
           </div>

           <div className="space-y-2">
              <NeoText variant="title" stroke className="text-4xl uppercase italic leading-none">WAKTU HABIS!</NeoText>
              <NeoText variant="body" className="font-black uppercase tracking-widest text-xs opacity-60">Waktunya istirahat sejenak ya kawan!</NeoText>
           </div>

           <div className="p-6 bg-card border-4 border-black shadow-neo rounded-3xl space-y-4">
              <NeoText variant="body" className="text-sm font-bold">Minta orang tua untuk memberikan waktu tambahan jika ingin lanjut bermain.</NeoText>
              <Button 
                onClick={() => router.push('/select-profile')}
                className="w-full h-14 border-2 border-black font-black uppercase shadow-neo hover:shadow-none transition-all flex gap-2"
              >
                <ArrowLeft className="size-4" /> Kembali Ke Menu
              </Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isWarning && timeLeft !== null && timeLeft > 0 && (
         <div className="fixed top-24 right-6 z-[60] animate-in slide-in-from-right-8 duration-500 pointer-events-none">
            <div className="flex items-center gap-3 bg-accent border-2 border-black px-4 py-2 rounded-2xl shadow-neo-sm rotate-2">
                <Clock className="size-4 animate-pulse" />
                <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest">
                    {Math.ceil(timeLeft / 60)} MENIT LAGI
                </NeoText>
            </div>
         </div>
      )}
      {children}
    </>
  );
}
