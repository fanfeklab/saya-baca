"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";

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
    <div className="flex flex-col p-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full shadow-[2px_2px_0_0_#000000]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <NeoText variant="title">Mari Menyanyi</NeoText>
        </div>
        <div className="font-bold text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full border-2 border-secondary">
          ⭐ Bintang Kecil
        </div>
      </div>

      {/* Main Game Area */}
      <Card className="mt-4 bg-background border-4 text-center overflow-hidden">
        <div className="bg-secondary/10 p-6 border-b-4 border-border flex justify-center">
           <IllustrationHolder variant="secondary" size="lg" emoji="🌟" className="animate-bounce" />
        </div>
        <CardContent className="p-8 pb-12 flex flex-col items-center gap-6">
          
          <div className="space-y-4 w-full text-center">
            {LYRICS.map((line, idx) => (
              <div 
                key={idx}
                className={`text-xl md:text-3xl font-bold transition-all duration-300 ${
                  idx === currentLine && isPlaying
                    ? "text-secondary scale-110" 
                    : idx < currentLine && isPlaying
                      ? "text-muted-foreground"
                      : "text-foreground"
                }`}
              >
                {line}
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Controls */}
      <div className="fixed bottom-24 left-0 right-0 px-4 max-w-lg mx-auto z-40 flex gap-4">
         <Button 
            variant="secondary" 
            className="flex-1 text-lg h-16 rounded-2xl border-4 shadow-[4px_4px_0_0_#000000]" 
            onClick={() => {
              if(!isPlaying) setCurrentLine(0);
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? "Jeda Lagu" : "Putar Lagu"}
          </Button>

          <Button 
            variant="outline" 
            size="icon"
            className="w-16 h-16 rounded-2xl border-4 shadow-[4px_4px_0_0_#000000]" 
          >
            <Mic className="w-6 h-6 text-primary" />
          </Button>
      </div>

    </div>
  );
}
