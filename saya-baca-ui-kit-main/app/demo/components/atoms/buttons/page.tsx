import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/atoms/icon-button';
import { ConfettiBurst } from '@/components/atoms/confetti-burst';
import { AudioButton } from '@/components/atoms/audio-button';
import { Home, Settings, Play, ArrowRight, Loader2, Save } from 'lucide-react';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';

export default function ButtonsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Button</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Displays a button or a component that looks like a button with neo-brutalism design.
        </NeoText>
      </div>

      <ComponentPreview
        title="Primary"
        description="The primary button used for main actions."
        code={`import { Button } from "@/components/ui/button"\n\nexport function ButtonDemo() {\n  return <Button>Contoh Button</Button>\n}`}
      >
        <Button>Contoh Button</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Variasi button yang tersedia untuk berbagai konteks aksi."
        code={`<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="success">Success</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Ukuran button dari kecil hingga besar."
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Home className="h-4 w-4" /></Button>`}
      >
        <div className="flex flex-wrap items-end gap-4 justify-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Home className="h-4 w-4" /></Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icon"
        description="Button dengan icon Lucide untuk memberikan konteks visual."
        code={`import { ArrowRight, Save } from "lucide-react"\n
<Button>
  Simpan <Save className="ml-2 h-4 w-4" />
</Button>
<Button variant="outline">
  <ArrowRight className="mr-2 h-4 w-4" /> Selanjutnya
</Button>`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-center">
           <Button>
             Simpan <Save className="ml-2 h-4 w-4" />
           </Button>
           <Button variant="outline">
             <ArrowRight className="mr-2 h-4 w-4" /> Selanjutnya
           </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading State"
        description="Menampilkan indikator loading saat aksi sedang diproses."
        code={`import { Loader2 } from "lucide-react"\n
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Harap tunggu
</Button>`}
      >
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Harap tunggu
        </Button>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Special Interactive Buttons</NeoText>
      </div>

      <ComponentPreview
        title="Audio Button"
        description="Button yang memutar suara ketika ditekan. Sangat berguna untuk aplikasi edukasi/game."
        code={`import { AudioButton } from "@/components/atoms/audio-button"\nimport { Play } from "lucide-react"\n
<AudioButton variant="success" soundSrc="/sounds/pop.mp3">
  <Play className="mr-2 h-4 w-4 fill-current" />
  Mainkan Suara
</AudioButton>`}
      >
        <AudioButton variant="success" soundSrc="/sounds/pop.mp3">
          <Play className="mr-2 pr-1 h-4 w-4 fill-current" />
          Mainkan Suara
        </AudioButton>
      </ComponentPreview>

      <ComponentPreview
        title="Confetti Burst"
        description="Membungkus button dengan efek perayaan (confetti) saat di-klik."
        code={`import { ConfettiBurst } from "@/components/atoms/confetti-burst"\n
<ConfettiBurst>
  <Button variant="accent">Selesaikan Misi 🎉</Button>
</ConfettiBurst>`}
      >
        <ConfettiBurst>
          <Button variant="accent">Selesaikan Misi 🎉</Button>
        </ConfettiBurst>
      </ComponentPreview>

      <ComponentPreview
        title="Button Group"
        description="Grup aksi yang saling berhubungan."
        code={`<div className="inline-flex rounded-xl shadow-neo border-2 border-border overflow-hidden">
  <Button className="rounded-none border-0 border-r-2 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">
    Kiri
  </Button>
  <Button className="rounded-none border-0 border-r-2 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">
    Tengah
  </Button>
  <Button className="rounded-none border-0 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">
    Kanan
  </Button>
</div>`}
      >
        <div className="inline-flex rounded-xl shadow-neo border-2 border-border overflow-hidden">
          <Button variant="outline" className="rounded-none border-0 border-r-2 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">Kiri</Button>
          <Button variant="outline" className="rounded-none border-0 border-r-2 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">Tengah</Button>
          <Button variant="outline" className="rounded-none border-0 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 active:bg-muted">Kanan</Button>
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference</NeoText>
        <PropsTable props={[
          { name: "variant", type: "enum", default: "\"default\"", description: "The style variant of the button: default, secondary, destructive, outline, ghost, link, accent, success" },
          { name: "size", type: "enum", default: "\"default\"", description: "The size of the button: default, sm, lg, icon" },
          { name: "asChild", type: "boolean", default: "false", description: "Whether to render as the child element (merging props)" },
          { name: "soundSrc", type: "string", default: "\"/sounds/pop.mp3\"", description: "For AudioButton: The URL path to the audio file" },
        ]} />
      </div>
    </div>
  );
}
