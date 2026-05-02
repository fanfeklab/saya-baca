"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eraser, Trash2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfettiBurst } from "@/components/atoms/confetti-burst";
import { IllustrationHolder } from "@/components/atoms/illustration-holder";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#000000"];

export default function MewarnaiGamePage() {
  const router = useRouter();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState(COLORS[0]);
  const [size, setSize] = React.useState(10);
  const [isWon, setIsWon] = React.useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e); // allow dot drawing
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath(); // reset path
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  React.useEffect(() => {
    // Initial setup to prevent touch scrolling while drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    return () => canvas.removeEventListener('touchmove', preventScroll);
  }, []);

  if (isWon) {
    return (
      <div className="flex flex-col p-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28 min-h-[70vh] items-center justify-center text-center">
        <ConfettiBurst>
          <IllustrationHolder variant="primary" size="xl" emoji="🎨" className="mx-auto mb-6" />
        </ConfettiBurst>
        <NeoText variant="title" className="text-3xl text-primary">Karya yang Indah!</NeoText>
        <NeoText variant="body" className="mb-6">Gambarmu sangat bagus hari ini.</NeoText>
        
        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1" onClick={() => { setIsWon(false); clearCanvas(); }}>
            Gambar Lagi
          </Button>
          <Button variant="default" className="flex-1" onClick={() => router.push("/home")}>
            Selesai
          </Button>
        </div>
      </div>
    );
  }

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
          <NeoText variant="title">Mari Menggambar</NeoText>
        </div>
        <Button size="icon" variant="default" onClick={() => setIsWon(true)} className="rounded-full shadow-[2px_2px_0_0_#000000]">
           <Check className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Game Area */}
      <Card className="bg-background border-4 text-center overflow-hidden">
        <div className="bg-muted p-2 border-b-4 border-border flex justify-around">
           {COLORS.map(c => (
             <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 border-black ${color === c ? 'ring-4 ring-primary scale-110 shadow-[2px_2px_0_0_#000000]' : ''}`}
                style={{ backgroundColor: c }}
             />
           ))}
           <button
              onClick={() => setColor("#FFFFFF")}
              className={`w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center ${color === "#FFFFFF" ? 'ring-4 ring-primary scale-110 shadow-[2px_2px_0_0_#000000]' : ''}`}
           >
             <Eraser className="w-4 h-4" />
           </button>
           <button
              onClick={clearCanvas}
              className="w-8 h-8 rounded-full border-2 border-black bg-destructive text-white flex items-center justify-center hover:scale-110 transition-transform"
           >
             <Trash2 className="w-4 h-4" />
           </button>
        </div>
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
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
      </Card>

    </div>
  );
}
