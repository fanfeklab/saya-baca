"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    BarChart, 
    Bar,
    AreaChart,
    Area
} from "recharts";
import { Award, Target, Trophy, Clock, TrendingUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

const weeklyData = [
  { name: "Sen", score: 65, time: 30 },
  { name: "Sel", score: 70, time: 45 },
  { name: "Rab", score: 85, time: 60 },
  { name: "Kam", score: 75, time: 40 },
  { name: "Jum", score: 90, time: 55 },
  { name: "Sab", score: 95, time: 70 },
  { name: "Min", score: 92, time: 65 },
];

export default function ReportsPage() {
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <NeoText variant="title" stroke className="text-4xl md:text-5xl italic uppercase leading-none">LAPORAN BELAJAR</NeoText>
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">
                Statistik Detail untuk {currentProfile?.name || "Si Kecil"}
            </NeoText>
         </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "Akurasi", value: "85%", icon: Target, variant: "primary", trend: "+5%" },
            { label: "Total Waktu", value: "6j 15m", icon: Clock, variant: "secondary", trend: "+1j 30m" },
            { label: "Materi", value: "12", icon: Trophy, variant: "accent", trend: "Suku Kata" },
            { label: "Piala", value: "3", icon: Award, variant: "success", trend: "Bagus!" },
        ].map((item, i) => (
             <Card key={i} className={cn("border-4 border-black shadow-neo bg-card p-6 overflow-hidden relative group")}>
                <div className={cn("absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity")}>
                    <item.icon className="size-16" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className={cn("p-2 border-2 border-black shadow-neo-sm rotate-3", 
                        item.variant === 'primary' ? 'bg-primary' : item.variant === 'secondary' ? 'bg-secondary' : item.variant === 'accent' ? 'bg-accent' : 'bg-success'
                    )}>
                        <item.icon className={cn("size-5", ['primary','secondary'].includes(item.variant) ? 'text-white' : 'text-black')} />
                    </div>
                    <NeoText variant="body" className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</NeoText>
                </div>
                <NeoText variant="title" stroke className="text-4xl leading-none">{item.value}</NeoText>
                <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="size-3 text-success" />
                    <span className="text-[9px] font-black uppercase tracking-tighter text-success">{item.trend}</span>
                </div>
             </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-black shadow-neo-lg bg-card overflow-hidden">
            <CardHeader className="border-b-4 border-black px-6 py-4">
                <CardTitle>
                    <NeoText variant="subtitle" stroke className="text-xl uppercase italic">Pemahaman Mingguan</NeoText>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted/20" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: 'currentColor' }} className="text-muted-foreground" />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: 'currentColor' }} domain={[0, 100]} className="text-muted-foreground" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '3px solid #000',
                                borderRadius: '12px',
                                fontWeight: 900
                            }} 
                        />
                        <Area type="monotone" dataKey="score" stroke="#000" strokeWidth={4} fill="hsla(var(--primary), 0.3)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-neo-lg bg-card overflow-hidden">
            <CardHeader className="border-b-4 border-black px-6 py-4">
                <CardTitle>
                    <NeoText variant="subtitle" stroke className="text-xl uppercase italic">Waktu Belajar (Menit)</NeoText>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted/20" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: 'currentColor' }} className="text-muted-foreground" />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: 'currentColor' }} className="text-muted-foreground" />
                        <Tooltip
                            cursor={{fill: 'rgba(0,0,0,0.05)'}}
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '3px solid #000', 
                                borderRadius: '12px',
                                fontWeight: 900
                            }} 
                        />
                        <Bar dataKey="time" fill="#FDE047" stroke="#000" strokeWidth={3} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
