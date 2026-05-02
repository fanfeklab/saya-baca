"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Lock, 
  BarChart3, 
  Clock,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";

const ACTIVITY_DATA = [
  { day: "Sen", score: 40 },
  { day: "Sel", score: 30 },
  { day: "Rab", score: 65 },
  { day: "Kam", score: 45 },
  { day: "Jum", score: 90 },
  { day: "Sab", score: 70 },
  { day: "Min", score: 55 },
];

export default function ParentDashboardPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  const profiles = useStore(useAppStore, (state) => state.profiles) || [];

  return (
    <div className="max-w-6xl mx-auto w-full">
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-1">
                <NeoText variant="title" stroke className="text-4xl md:text-5xl italic uppercase leading-none">STATISTIK BELAJAR</NeoText>
                <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Pantau Perkembangan Jagoan Kecilmu</NeoText>
            </div>
            <div className="flex items-center gap-4">
                 <div className="bg-success text-black p-3 rounded-2xl border-2 border-black shadow-neo-sm flex items-center gap-2">
                    <TrendingUp className="size-5" />
                    <span className="font-black text-xs uppercase tracking-tighter">Performa Meningkat</span>
                 </div>
            </div>
         </header>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Stats Graph */}
            <Card className="lg:col-span-8 border-4 border-black shadow-neo-lg bg-card overflow-hidden">
                <CardHeader className="border-b-4 border-black px-8 py-6">
                    <CardTitle className="flex items-center justify-between">
                        <NeoText variant="subtitle" stroke className="uppercase italic">Waktu Bermain (Menit)</NeoText>
                        <BarChart3 className="size-6 opacity-30" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ACTIVITY_DATA}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FB7185" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#FB7185" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted/20" />
                            <XAxis 
                                dataKey="day" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: "currentColor", fontWeight: 800, fontSize: 12 }}
                                className="text-muted-foreground"
                            />
                            <YAxis hide />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'hsl(var(--card))', 
                                    border: '3px solid #000', 
                                    borderRadius: '12px',
                                    fontWeight: 900
                                }} 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="score" 
                                stroke="#000" 
                                strokeWidth={4} 
                                fillOpacity={1} 
                                fill="url(#colorScore)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Side Stats */}
            <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Profile Card */}
                <Card className="border-4 border-black shadow-neo flex flex-col items-center p-8 gap-4 bg-primary text-black">
                    <Avatar className="size-24 border-4 border-black shadow-neo-sm bg-white">
                        <AvatarImage src={`https://api.dicebear.com/7.x/${currentProfile?.avatarStyle || 'adventurer'}/svg?seed=${currentProfile?.avatar || 'Felix'}`} />
                        <AvatarFallback>BD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <NeoText variant="subtitle" stroke className="text-2xl text-white uppercase italic">{currentProfile?.name || "Pilih Anak"}</NeoText>
                        <NeoText variant="body" className="font-black uppercase tracking-widest text-[10px] text-white/80">Aktif Terakhir: Baru Saja</NeoText>
                    </div>
                    <Button 
                        variant="outline" 
                        className="w-full mt-2 bg-white text-black border-2 border-black shadow-neo-sm hover:shadow-neo transition-all font-black uppercase text-xs"
                        onClick={() => router.push('/parent/children')}
                    >
                        Pilih Profil Lain
                    </Button>
                </Card>

                {/* Score Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-accent border-4 border-black shadow-neo p-4 flex flex-col items-center justify-center text-center gap-1">
                        <NeoText variant="title" stroke className="text-4xl">{currentProfile?.stars || 0}</NeoText>
                        <NeoText variant="body" className="font-black uppercase text-[8px] opacity-60">Bintang</NeoText>
                    </div>
                    <div className="bg-secondary border-4 border-black shadow-neo p-4 flex flex-col items-center justify-center text-center gap-1 text-white">
                        <NeoText variant="title" stroke className="text-4xl">{currentProfile?.completedMissions.length || 0}</NeoText>
                        <NeoText variant="body" className="font-black uppercase text-[8px] opacity-80">Misi Selesai</NeoText>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                     <div className="size-8 bg-accent border-2 border-black shadow-neo-sm flex items-center justify-center">
                        <TrendingUp className="size-4" />
                     </div>
                     <NeoText variant="subtitle" stroke className="text-2xl italic uppercase">Kebutuhan Latihan</NeoText>
                </div>
                <div className="space-y-4">
                    {[
                        { title: "Membaca Huruf Vokal", status: "Perlu Latihan", progress: 60, variant: "accent" },
                        { title: "Berhitung 1 sampai 10", status: "Hampir Master", progress: 90, variant: "success" },
                        { title: "Mengenal Warna", status: "Selesai", progress: 100, variant: "primary" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-card border-2 border-black p-4 rounded-2xl shadow-neo-sm">
                            <div className={cn("size-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0", 
                                item.variant === 'accent' ? 'bg-accent' : item.variant === 'success' ? 'bg-success' : 'bg-primary'
                            )}>
                                <Clock className={cn("size-6", item.variant === 'primary' ? 'text-white' : 'text-black')} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <NeoText variant="body" className="font-black uppercase text-sm">{item.title}</NeoText>
                                <div className="w-full h-3 bg-muted rounded-full border-2 border-black overflow-hidden">
                                    <div className="h-full bg-primary border-r-2 border-black" style={{ width: `${item.progress}%` }} />
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <span className={cn("text-[10px] font-black uppercase px-2 py-1 border-2 border-black rounded-lg", 
                                     item.variant === 'accent' ? 'bg-accent/20 text-accent-foreground' : item.variant === 'success' ? 'bg-success/20 text-success-foreground' : 'bg-primary/20 text-primary-foreground'
                                )}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                     <div className="size-8 bg-secondary border-2 border-black shadow-neo-sm flex items-center justify-center">
                        <BarChart3 className="size-4 text-white" />
                     </div>
                     <NeoText variant="subtitle" stroke className="text-2xl italic uppercase">Aktivitas Terakhir</NeoText>
                </div>
                <Card className="border-4 border-black shadow-neo-lg divide-y-4 divide-black overflow-hidden bg-card">
                    {[
                        { icon: BarChart3, time: "10:30", desc: "Selesaikan Level 5 Membaca", reward: "+10 ⭐" },
                        { icon: TrendingUp, time: "09:45", desc: "Mulai Tantangan Baru: Mewarnai", reward: "" },
                        { icon: Lock, time: "Kemarin", desc: "Membuka Badge: Bintang Angka", reward: "🏆" },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 hover:bg-muted/10 transition-colors">
                            <div className="size-10 bg-background border-2 border-black shadow-neo-sm rotate-3 flex items-center justify-center shrink-0">
                                <log.icon className="size-5" />
                            </div>
                            <div className="flex-1">
                                <NeoText variant="body" className="font-black text-sm uppercase">{log.desc}</NeoText>
                                <NeoText variant="body" className="text-[10px] opacity-40 uppercase tracking-widest leading-none mt-1">{log.time}</NeoText>
                            </div>
                            {log.reward && (
                                <div className="font-black text-primary text-xl drop-shadow-sm">{log.reward}</div>
                            )}
                        </div>
                    ))}
                    <Button variant="ghost" className="w-full rounded-none h-14 font-black uppercase text-[10px] tracking-widest group border-t-2 border-black">
                        Lihat Seluruh Log <ArrowRight className="ml-2 size-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </Card>
            </div>
         </div>
    </div>
  );
}
