'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Activity, Users, Star } from 'lucide-react';

export default function DataDisplayDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Data Display</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk mempresentasikan data, tabel, statistik, atau informasi grafik ringkas.
        </NeoText>
      </div>

      <ComponentPreview
        title="Admin Stat Card"
        description="Widget statistik untuk digunakan di dashboard admin/orang tua."
        code={`<Card className="shadow-neo border-2">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Bintang</CardTitle>
    <Star className="h-4 w-4 text-yellow-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">1,240 ★</div>
    <p className="text-xs text-muted-foreground mt-1">
      +24% dari minggu lalu
    </p>
  </CardContent>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
           <Card className="shadow-neo border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Total Pengguna</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">1,024</div>
              <p className="text-xs text-success font-bold mt-1">
                +14 pengguna baru hari ini
              </p>
            </CardContent>
          </Card>

           <Card className="shadow-neo border-2">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Aktivitas Belajar</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
             </CardHeader>
             <CardContent>
              <div className="text-2xl font-bold font-mono">4 JAM</div>
              <p className="text-xs text-muted-foreground mt-1 font-bold">
                Rata-rata minggu ini
              </p>
            </CardContent>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Empty State"
        description="Digunakan jika data tidak ditemukan atau kosong."
        code={`<div className="h-48 border-4 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-4">
  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
    <Search className="w-6 h-6 text-muted-foreground" />
  </div>
  <div>
    <NeoText variant="subtitle">Tidak Ada Data</NeoText>
    <NeoText variant="body" className="text-sm text-muted-foreground">Belum ada statistik yang tercatat hari ini.</NeoText>
  </div>
</div>`}
      >
        <div className="w-full h-48 border-4 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-4 bg-background">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <BarChart className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <NeoText variant="subtitle" className="text-lg">Belum Ada Data</NeoText>
            <NeoText variant="body" className="text-sm text-muted-foreground">Anak belum menyelesaikan pelajaran apapun hari ini.</NeoText>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
