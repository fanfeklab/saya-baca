"use client";

import { useState } from 'react';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Button } from '@/components/ui/button';
import { Type, Volume2, Lightbulb, Minus, Plus, Settings2 } from 'lucide-react';


export default function EduToolsDemoPage() {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [isUppercase, setIsUppercase] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Edu Tools</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen kontrol alat belajar seperti pengaturan teks, Text-to-Speech (TTS), dan Hint.
        </NeoText>
      </div>

      <ComponentPreview
        title="Text Control Toolbar"
        description="Toolbar untuk mengatur ukuran teks, jenis font, dan kapitalisasi untuk aksesibilitas belajar."
        code={`<div className="flex items-center gap-2 bg-card p-2 rounded-2xl border-4 border-border shadow-neo">
  {/* Font Size controls */}
  {/* Font Family Dropdown */}
  {/* Case Toggle */}
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 bg-card p-3 rounded-3xl border-4 border-border shadow-neo-sm">
            <div className="flex items-center gap-2 border-r-4 border-border pr-3">
              <Button size="icon" variant="outline" onClick={() => setFontSize(f => Math.max(12, f - 2))} className="rounded-xl size-10">
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center font-bold">{fontSize}</span>
              <Button size="icon" variant="outline" onClick={() => setFontSize(f => Math.min(32, f + 2))} className="rounded-xl size-10">
                <Plus className="size-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="rounded-xl px-4 gap-2 border-r-4 border-border mr-1"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Type className="size-4" />
                Font Style
              </Button>
              
              {showDropdown && (
                <div className="absolute top-full mt-2 left-0 border-4 border-border shadow-neo rounded-2xl bg-card p-2 font-bold min-w-[200px] z-50">
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Pilih Font</div>
                  <div className="h-1 bg-border my-1 rounded-full" />
                  <div 
                    onClick={() => { setFontFamily('font-sans'); setShowDropdown(false); }} 
                    className="rounded-xl cursor-pointer hover:bg-muted font-sans font-medium px-2 py-1.5 text-sm"
                  >
                    Standard (Sans)
                  </div>
                  <div 
                    onClick={() => { setFontFamily('font-mono'); setShowDropdown(false); }} 
                    className="rounded-xl cursor-pointer hover:bg-muted font-mono px-2 py-1.5 text-sm"
                  >
                    Monospace
                  </div>
                </div>
              )}
            </div>

            <Button 
              variant={isUppercase ? "default" : "outline"} 
              className="rounded-xl px-4 font-bold"
              onClick={() => setIsUppercase(!isUppercase)}
            >
              Aa / AA
            </Button>
          </div>

          <div className="p-8 bg-muted rounded-3xl border-4 border-border border-dashed">
            <p 
              className={`transition-all ${fontFamily}`}
              style={{ 
                fontSize: `${fontSize}px`,
                textTransform: isUppercase ? 'uppercase' : 'none'
              }}
            >
              Budi pergi ke pasar membeli buah apel dan jeruk segar. Budi sangat senang karena bisa membantu ibunya.
            </p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Voice & Hint Controls"
        description="Tombol interaktif untuk fitur Text-to-Speech (TTS) dan Petunjuk (Hint)."
        code={`<Button variant="accent" className="rounded-full size-16">
  <Volume2 className="size-8" />
</Button>`}
      >
        <div className="flex items-center gap-6 p-8 bg-card rounded-3xl border-4 border-border shadow-neo">
          <div className="flex flex-col items-center gap-2">
            <Button 
              variant={isPlaying ? "destructive" : "accent"} 
              size="icon" 
              className={`rounded-full size-20 border-4 border-border ${isPlaying ? 'animate-pulse' : 'shadow-neo'}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Volume2 className="size-10" />
            </Button>
            <span className="font-bold text-sm text-muted-foreground">{isPlaying ? 'Berhenti' : 'Dengarkan'}</span>
          </div>

          <div className="h-16 w-1 bg-border rounded-full mx-4"></div>

          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="warning" 
                size="icon" 
                className="rounded-2xl size-14 border-4 border-border shadow-neo"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb className={`size-7 ${showHint ? 'fill-current' : ''}`} />
              </Button>
              <span className="font-bold">Minta Bantuan</span>
            </div>
            
            {showHint && (
              <div className="bg-[#ffdfbf] text-amber-900 px-6 py-3 rounded-2xl rounded-tl-none border-4 border-amber-900/20 font-bold max-w-xs animate-in slide-in-from-left-4 fade-in">
                Clue: Buah ini warnanya merah dan rasanya manis!
              </div>
            )}
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
