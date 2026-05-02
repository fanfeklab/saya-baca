import { Badge } from '@/components/ui/badge';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';

export default function BadgesDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Badge</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Displays a small badge or label, typically used to indicate status, categories, or notifications.
        </NeoText>
      </div>

      <ComponentPreview
        title="Variants"
        description="Berbagai variasi badge berdasarkan fungsi dan status."
        code={`<Badge variant="default">Level 1</Badge>
<Badge variant="secondary">Baru</Badge>
<Badge variant="accent">Premium</Badge>
<Badge variant="success">Selesai</Badge>
<Badge variant="destructive">Gagal</Badge>
<Badge variant="outline">Guest</Badge>`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Badge variant="default">Level 1</Badge>
          <Badge variant="secondary">Baru</Badge>
          <Badge variant="accent">Premium</Badge>
          <Badge variant="success">Selesai</Badge>
          <Badge variant="destructive">Gagal</Badge>
          <Badge variant="outline">Guest</Badge>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Usage in Cards"
        description="Contoh penggunaan badge di dalam komponen lain."
        code={`<div className="flex items-center gap-2 p-3 border-2 rounded-xl bg-card shadow-neo">
  <span className="font-bold">Matematika Dasar</span>
  <Badge variant="success">Selesai</Badge>
</div>
<div className="flex items-center gap-2 p-3 border-2 rounded-xl bg-card shadow-neo">
  <span className="font-bold">Membaca</span>
  <Badge variant="accent">3/5</Badge>
</div>`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2 p-3 border-2 rounded-xl bg-card shadow-neo">
            <span className="font-bold">Matematika Dasar</span>
            <Badge variant="success">Selesai</Badge>
          </div>
          <div className="flex items-center gap-2 p-3 border-2 rounded-xl bg-card shadow-neo">
            <span className="font-bold">Membaca</span>
            <Badge variant="accent">Misi 3/5</Badge>
          </div>
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference</NeoText>
        <PropsTable props={[
          { name: "variant", type: "enum", default: "\"default\"", description: "The style variant of the badge: default, secondary, destructive, outline, accent, success" },
          { name: "className", type: "string", default: "undefined", description: "Additional CSS classes to apply" }
        ]} />
      </div>
    </div>
  );
}
