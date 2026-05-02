import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';

export default function FeedbackDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Feedback & Loaders</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk memberikan umpan balik kepada pengguna, seperti loading state dan progress dari suatu aktivitas.
        </NeoText>
      </div>

      <ComponentPreview
        title="Skeleton Loader"
        description="Digunakan sebagai placeholder konten saat data sedang dimuat (loading)."
        code={`import { Skeleton } from "@/components/ui/skeleton"\n
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}
      >
        <div className="flex items-center space-x-4 w-full max-w-md p-4 border-2 border-border rounded-xl bg-card">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Progress Bar"
        description="Menampilkan indikator proses atau progres dari nilai 0 hingga 100."
        code={`import { Progress } from "@/components/ui/progress"\n
<Progress value={60} className="w-[60%]" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
             <div className="flex justify-between text-sm font-bold">
               <span>Pencapaian Misi</span>
               <span>60%</span>
             </div>
             <Progress value={60} />
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-sm font-bold">
               <span className="text-destructive">Darah Boss</span>
               <span className="text-destructive">25%</span>
             </div>
             <Progress value={25} className="bg-destructive/20 [&>div]:bg-destructive" />
          </div>
        </div>
      </ComponentPreview>

      <div className="pt-8">
        <NeoText variant="subtitle">Props Reference - Progress</NeoText>
        <PropsTable props={[
          { name: "value", type: "number", default: "0", description: "The progress value from 0 to 100" },
          { name: "className", type: "string", default: "undefined", description: "Additional CSS classes to apply" }
        ]} />
      </div>
    </div>
  );
}
