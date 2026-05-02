"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eraser, Trash2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";
import { cn } from "@/lib/utils";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FDE047", "#A855F7", "#000000"];

export default function MewarnaiGamePage() {
  const router = useRouter();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState(COLORS[0]);
  const [size, setSize] = React.useState(10);
  const [isWon, setIsWon] = React.useState(false);

  // Resize canvas to fill container
  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = width; // Keep it square
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    return () => canvas.removeEventListener('touchmove', preventScroll);
  }, []);

  if (isWon) {
    return (
      <div className="flex flex-col p-8 gap-8 animate-in fade-in zoom-in duration-700 pb-32 min-h-[80vh] items-center justify-center text-center max-w-md mx-auto">
        <ConfettiBurst>
          <IllustrationHolder variant="primary" size="xl" emoji="🎨" className="mx-auto mb-6 border-4 border-black shadow-neo-lg" />
        </ConfettiBurst>
        <NeoText variant="title" stroke className="text-4xl text-primary uppercase italic">Karya Indah!</NeoText>
        <NeoText variant="body" className="font-medium">Gambarmu sungguh luar biasa. Teruslah berkarya!</NeoText>
        
        <div className="flex flex-col gap-4 w-full mt-8">
          <Button variant="default" className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-neo hover:shadow-neo-lg active:shadow-none transition-all text-black border-2 border-black" onClick={() => { setIsWon(false); setTimeout(clearCanvas, 100); }}>
            Gambar Lagi
          </Button>
          <Button variant="ghost" className="w-full text-foreground/60 font-black uppercase tracking-tight text-xs" onClick={() => router.push("/main/learn")}>
             Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="flex-1 text-center">
          <NeoText variant="subtitle" stroke className="text-2xl uppercase tracking-tighter italic">Mari Menggambar</NeoText>
        </div>
        <Button size="icon-sm" variant="default" onClick={() => setIsWon(true)} className="rounded-xl border-2 border-black shadow-neo-sm text-black">
           <Check className="size-5" />
        </Button>
      </div>

      {/* Main Game Area */}
      <Card className="bg-background border-2 border-black text-center overflow-hidden shadow-neo-lg">
        <div className="bg-muted p-4 border-b-2 border-black flex flex-wrap justify-center gap-3">
           {COLORS.map(c => (
             <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "size-8 rounded-full border-2 border-black transition-all",
                  color === c ? 'ring-4 ring-primary scale-125 shadow-neo-sm' : 'hover:scale-110'
                )}
                style={{ backgroundColor: c }}
             />
           ))}
           <div className="w-px h-8 bg-black/10 mx-1" />
           <button
              onClick={() => setColor("#FFFFFF")}
              className={cn(
                "size-8 rounded-full border-2 border-black bg-white flex items-center justify-center transition-all",
                color === "#FFFFFF" ? 'ring-4 ring-primary scale-125 shadow-neo-sm' : 'hover:scale-110'
              )}
           >
             <Eraser className="w-4 h-4" />
           </button>
           <button
              onClick={clearCanvas}
              className="size-8 rounded-full border-2 border-black bg-destructive text-white flex items-center justify-center hover:scale-125 transition-all shadow-neo-sm active:shadow-none"
           >
             <Trash2 className="w-4 h-4" />
           </button>
        </div>
        <CardContent className="p-0" ref={containerRef}>
          <canvas
            ref={canvasRef}
            className="w-full aspect-square bg-white cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseOut={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
          />
        </CardContent>
        <div className="p-4 bg-muted/30 border-t-2 border-black">
           <NeoText variant="body" className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Sentuh dan Seret untuk Menggambar</NeoText>
        </div>
      </Card>

    </div>
  );
}
