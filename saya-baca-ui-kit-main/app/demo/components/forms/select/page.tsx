'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';

export default function SelectDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Select</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen dropdown/select yang bisa digunakan untuk memilih satu nilai dari daftar pilihan.
        </NeoText>
      </div>

      <ComponentPreview
        title="Basic Custom Select"
        description="Select standar."
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Pilih Kelas" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="tk-a">TK A</SelectItem>
    <SelectItem value="tk-b">TK B</SelectItem>
    <SelectItem value="paud">PAUD</SelectItem>
  </SelectContent>
</Select>`}
      >
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Pilih Kelas Anak" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tk-a">TK A (Matahari)</SelectItem>
            <SelectItem value="tk-b">TK B (Bintang)</SelectItem>
            <SelectItem value="paud">PAUD (Bulan)</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        title="Grouped Select"
        description="Pilihan yang dikelompokkan dengan label."
        code={`<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Pilih Avatar" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Hewan Lucu</SelectLabel>
      <SelectItem value="cat">Kucing (Mio)</SelectItem>
      <SelectItem value="dog">Anjing (Puppy)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Pahlawan Super</SelectLabel>
      <SelectItem value="hero1">Gatotkaca</SelectItem>
      <SelectItem value="hero2">Srikandi</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
      >
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Pilih Avatar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hewan Lucu</SelectLabel>
              <SelectItem value="cat">Kucing (Mio)</SelectItem>
              <SelectItem value="dog">Anjing (Puppy)</SelectItem>
              <SelectItem value="rabbit">Kelinci (Bunbun)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Pahlawan Super</SelectLabel>
              <SelectItem value="hero1">Gatotkaca</SelectItem>
              <SelectItem value="hero2">Srikandi</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference</NeoText>
        <PropsTable props={[
          { name: "value", type: "string", default: "-", description: "The controlled value of the select" },
          { name: "onValueChange", type: "(value: string) => void", default: "-", description: "Event handler when value changes" },
          { name: "defaultValue", type: "string", default: "-", description: "The default value" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the select is disabled" }
        ]} />
      </div>
    </div>
  );
}
