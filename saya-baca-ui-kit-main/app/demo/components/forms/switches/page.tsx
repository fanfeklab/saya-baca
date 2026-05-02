'use client';

import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';

export default function SwitchesDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Switches & Checkboxes</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen toggle untuk status on/off dan checkbox untuk pilihan boolean lainnya.
        </NeoText>
      </div>

      <ComponentPreview
        title="Switch (Toggle)"
        description="Digunakan untuk mengaktifkan atau menonaktifkan pengaturan secara instan."
        code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="sound" />
  <Label htmlFor="sound">Sound Effects</Label>
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-sm p-6 border-2 border-border shadow-neo rounded-xl bg-card">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-demo" className="text-base cursor-pointer">Efek Suara</Label>
            <Switch id="sound-demo" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bgm" className="text-base cursor-pointer">Musik Latar</Label>
            <Switch id="bgm" />
          </div>
          <div className="flex items-center justify-between opacity-50">
            <Label htmlFor="anim" className="text-base">Animasi (Terkunci)</Label>
            <Switch id="anim" disabled />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Checkbox"
        description="Digunakan dalam form untuk persetujuan atau seleksi jamak."
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Saya menyetujui syarat & ketentuan.</Label>
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-md p-6 border-2 border-border rounded-xl bg-card">
          <div className="flex items-center space-x-3">
            <Checkbox id="terms" defaultChecked />
            <div className="grid leading-none pt-0.5">
              <Label htmlFor="terms" className="text-base cursor-pointer">Saya setuju dengan S&K yang berlaku.</Label>
              <span className="text-xs text-muted-foreground mt-1">Harus disetujui untuk melanjutkan pendaftaran.</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
             <Checkbox id="newsletter" />
             <Label htmlFor="newsletter" className="text-base cursor-pointer">Berlangganan laporan via Email</Label>
          </div>
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference</NeoText>
        <PropsTable props={[
          { name: "checked", type: "boolean", default: "false", description: "The controlled checked state" },
          { name: "onCheckedChange", type: "(checked: boolean) => void", default: "-", description: "Event handler when checked state changes" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled" },
          { name: "defaultChecked", type: "boolean", default: "false", description: "The initial checked state if uncontrolled" }
        ]} />
      </div>
    </div>
  );
}
