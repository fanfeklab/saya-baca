import { NeoText } from '@/components/atoms/neo-text';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Settings, BarChart, ShieldCheck } from 'lucide-react';

export default function ParentDashboardPage() {
  return (
    <div className="flex flex-col p-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <NeoText variant="title" className="text-2xl">Area Orang Tua</NeoText>
      </div>

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Laporan Belajar Minggu Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-bold">
              <span>Membaca</span>
              <span>80%</span>
            </div>
            <Progress value={80} className="h-3" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-bold">
              <span>Berhitung</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-3 [&>div]:bg-success" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-bold">
              <span>Kreativitas</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-3 [&>div]:bg-accent" />
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <NeoText variant="subtitle">Pengaturan Anak</NeoText>
        <div className="grid grid-cols-1 gap-3">
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="font-bold">Batasan Waktu Main</span>
              <span className="text-sm border-2 border-border px-2 py-1 rounded-md font-medium">45 Menit / Hari</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="font-bold">Pin Keamanan</span>
              <Settings className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
