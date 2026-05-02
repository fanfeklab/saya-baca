"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { cn } from "@/lib/utils";

const LYRICS = [
  "Bintang kecil",
  "Di langit yang biru",
  "Amat banyak",
  "Menghias angkasa",
];

export default function MenyanyiGamePage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentLine, setCurrentLine] = React.useState(0);

  // Fake karaoke logic
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLine((prev) => {
          if (prev < LYRICS.length - 1) return prev + 1;
          setIsPlaying(false);
          return 0; // reset
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon-sm" 
          onClick={() => router.back()}
          className="rounded-xl shadow-neo-sm hover:shadow-neo active:shadow-none border-2 border-black bg-background"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <NeoText variant="subtitle" stroke className="text-2xl uppercase tracking-tighter italic">Mari Menyanyi</NeoText>
        </div>
        <div className="font-bold text-[10px] bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full border-2 border-secondary uppercase tracking-widest">
          ⭐ Bintang Kecil
        </div>
      </div>

      {/* Main Game Area */}
      <Card className="mt-4 bg-background border-2 border-black shadow-neo-lg text-center overflow-hidden">
        <div className="bg-secondary/10 p-10 border-b-2 border-black flex justify-center">
           <IllustrationHolder variant="secondary" size="lg" emoji="🌟" className={cn("animate-bounce border-2", isPlaying && "animate-[bounce_1s_infinite]")} />
        </div>
        <CardContent className="p-10 pb-16 flex flex-col items-center gap-8">
          
          <div className="space-y-6 w-full text-center">
            {LYRICS.map((line, idx) => (
              <NeoText 
                key={idx}
                variant={idx === currentLine && isPlaying ? "subtitle" : "body"}
                className={cn(
                  "transition-all duration-300 uppercase tracking-tighter font-black",
                  idx === currentLine && isPlaying
                    ? "text-secondary scale-110 drop-shadow-sm" 
                    : idx < currentLine && isPlaying
                      ? "opacity-30"
                      : "opacity-100"
                )}
              >
                {line}
              </NeoText>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Controls */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-2xl mx-auto z-40 flex gap-4 pointer-events-none">
         <Button 
            variant="secondary" 
            className="flex-1 text-xl h-20 rounded-2xl border-2 border-black shadow-neo-lg hover:shadow-neo active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase font-black tracking-widest pointer-events-auto" 
            onClick={() => {
              if(!isPlaying) setCurrentLine(0);
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <Pause className="w-8 h-8 mr-3" /> : <Play className="w-8 h-8 mr-3 fill-current" />}
            {isPlaying ? "Jeda" : "Mulai"}
          </Button>

          <Button 
            variant="outline" 
            size="icon"
            className="w-20 h-20 rounded-2xl border-2 border-black shadow-neo-lg hover:shadow-neo active:shadow-none active:translate-y-1 active:translate-x-1 transition-all pointer-events-auto bg-background" 
          >
            <Mic className="w-8 h-8 text-primary" strokeWidth={3} />
          </Button>
      </div>

    </div>
  );
}
