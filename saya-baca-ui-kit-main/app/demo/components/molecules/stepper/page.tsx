"use client";

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Stepper } from '@/components/molecules/stepper';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function StepperDemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Mulai", "Belajar", "Ujian", "Selesai"];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Stepper</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Indikator proses atau tahapan yang menunjukkan progress pengguna dalam menyelesaikan multi-step form atau misi.
        </NeoText>
      </div>

      <ComponentPreview
        title="Interactive Stepper"
        description="Progress bar berjenjang dengan indikator visual untuk langkah yang telah selesai."
        code={`<Stepper 
  steps={["Mulai", "Belajar", "Ujian", "Selesai"]} 
  currentStep={1} 
/>`}
      >
        <div className="flex flex-col gap-12 w-full max-w-2xl bg-card p-12 rounded-3xl border-4 border-border shadow-neo">
          <Stepper steps={steps} currentStep={currentStep} />
          
          <div className="flex justify-between w-full mt-4">
            <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline" className="w-32">
              Kembali
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length - 1} variant="default" className="w-32">
              Lanjut
            </Button>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
