"use client";

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function SlidersDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Slider</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Input untuk memilih nilai dari rentang yang telah ditentukan. Cocok untuk pengaturan volume, tingkat kesulitan, atau rating.
        </NeoText>
      </div>

      <ComponentPreview
        title="Basic Slider"
        description="Slider tunggal untuk memilih satu nilai dari range angka."
        code={`import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[33]} max={100} step={1} />`}
      >
        <div className="flex flex-col gap-8 w-full max-w-sm p-6 border-4 border-border shadow-neo rounded-2xl bg-card">
          <div className="space-y-4">
             <Label>Volume Musik</Label>
             <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-4">
             <Label>Tingkat Kesulitan</Label>
             <Slider defaultValue={[2]} max={5} step={1} className="w-full" />
             <div className="flex justify-between text-xs font-bold text-muted-foreground px-1">
                <span>Mudah</span>
                <span>Normal</span>
                <span>Sulit</span>
             </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
