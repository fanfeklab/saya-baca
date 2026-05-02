'use client';

import { Input } from '@/components/ui/input';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';
import { Mail, Search, User } from 'lucide-react';

export default function InputsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Text Inputs</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen input standar untuk mengumpulkan data teks dari pengguna.
        </NeoText>
      </div>

      <ComponentPreview
        title="Default Input"
        description="Input teks biasa."
        code={`import { Input } from "@/components/ui/input"\n\n<Input type="text" placeholder="Ketik disini..." />`}
      >
        <div className="w-full max-w-sm">
          <Input type="text" placeholder="Ketik disini..." />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label & Error State (Manual)"
        description="Input dengan pesan error manual. Dianjurkan menggunakan FormField untuk integrasi form."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <label htmlFor="email" className="text-sm font-bold">Email</label>
  <Input id="email" type="email" placeholder="Email" className="border-destructive focus-visible:ring-destructive" />
  <p className="text-sm text-destructive font-semibold mt-1">Email tidak valid.</p>
</div>`}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email" className="text-sm font-bold">Email</label>
          <Input id="email" type="email" placeholder="Email" className="border-destructive focus-visible:ring-destructive" />
          <p className="text-sm text-destructive font-semibold mt-1">Email tidak valid.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Input Variants"
        description="Beberapa variasi input berdasarkan tipe data."
        code={`<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Umur" />
<Input type="file" />
<Input disabled placeholder="Disabled" />`}
      >
        <div className="w-full max-w-sm space-y-4">
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Umur" />
          <Input type="file" className="cursor-pointer" />
          <Input disabled placeholder="Disabled input" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Input with Icon (Composition)"
        description="Bungkus input di dalam div relative untuk menambahkan ikon."
        code={`<div className="relative w-full max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
  <Input placeholder="Cari teman..." className="pl-10" />
</div>`}
      >
        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Cari modul..." className="pl-10" />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Username" className="pl-10" />
          </div>
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference</NeoText>
        <PropsTable props={[
          { name: "type", type: "string", default: "\"text\"", description: "The type of the input (text, email, password, etc)" },
          { name: "placeholder", type: "string", default: "-", description: "The placeholder text" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled" }
        ]} />
      </div>
    </div>
  );
}
