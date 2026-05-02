"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { Avatar } from "@/components/atoms/avatar"
import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { XPProgressBar } from "@/components/molecules/xp-progress-bar"
import { Settings, Plus, Edit2, Play, Flame } from "lucide-react"

export default function ChildrenProfilePage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <Typography variant="h2" className="font-bold mb-2">Profil Anak</Typography>
            <Typography variant="muted">Kelola profil, level pembelajaran, dan pengaturan akun anak.</Typography>
         </div>
         <Button className="shrink-0 gap-2 shadow-sm rounded-xl"><Plus size={18} /> Tambah Anak</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Child Card 1 */}
        <GlassCard className="p-0 overflow-hidden relative group border-2 border-indigo-100 dark:border-indigo-900/50">
           {/* Cover BG */}
           <div className="h-32 bg-gradient-to-r from-indigo-500 to-fuchsia-500 w-full relative">
              <div className="absolute top-4 right-4 flex gap-2">
                 <button className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/40 transition">
                    <Settings size={16} />
                 </button>
                 <button className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/40 transition">
                    <Edit2 size={16} />
                 </button>
              </div>
           </div>
           
           <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end mb-4">
                 <div className="-mt-12 relative">
                    <Avatar size="lg" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Budi" className="w-24 h-24 ring-4 ring-white dark:ring-slate-900 shadow-xl bg-white dark:bg-slate-900" />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white text-xs font-black w-8 h-8 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">L4</div>
                 </div>
                 
                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 rounded-lg shadow-sm font-bold border border-rose-200 dark:border-rose-900/50">
                    <Flame size={16} fill="currentColor" /> 7 Hari Beruntun
                 </div>
              </div>

              <div>
                 <Typography variant="h3" className="font-bold flex items-center gap-2">
                    Budi <Badge variant="success" className="text-[10px]">Aktif</Badge>
                 </Typography>
                 <Typography variant="muted" className="text-sm mt-1">Usia 5 Tahun • Mode Kesulitan Normal</Typography>
              </div>

              <div className="mt-6 mb-6">
                 <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600 dark:text-slate-400">450 XP</span>
                    <span className="text-indigo-600 dark:text-indigo-400">Target 1000 XP</span>
                 </div>
                 <XPProgressBar value={450} max={1000} showPoints={false} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <Button variant="outline" className="w-full justify-center">Lihat Laporan</Button>
                 <Button className="w-full justify-center gap-2 px-0"><Play size={16} /> Main Sekarang</Button>
              </div>
           </div>
        </GlassCard>

        {/* Child Card 2 */}
        <GlassCard className="p-0 overflow-hidden relative group opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
           {/* Cover BG */}
           <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500 w-full relative">
              <div className="absolute top-4 right-4 flex gap-2">
                 <button className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-md transition">
                    <Settings size={16} />
                 </button>
                 <button className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-md transition">
                    <Edit2 size={16} />
                 </button>
              </div>
           </div>
           
           <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end mb-4">
                 <div className="-mt-12 relative">
                    <Avatar size="lg" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Siti" className="w-24 h-24 ring-4 ring-white dark:ring-slate-900 shadow-xl bg-white dark:bg-slate-900" />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-black w-8 h-8 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">L1</div>
                 </div>
              </div>

              <div>
                 <Typography variant="h3" className="font-bold flex items-center gap-2">
                    Siti <Badge variant="secondary" className="text-[10px]">Tidur</Badge>
                 </Typography>
                 <Typography variant="muted" className="text-sm mt-1">Usia 4 Tahun • Mode Kesulitan Mudah</Typography>
              </div>

              <div className="mt-6 mb-6">
                 <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600 dark:text-slate-400">120 XP</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Target 500 XP</span>
                 </div>
                 <XPProgressBar value={120} max={500} showPoints={false} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <Button variant="outline" className="w-full justify-center">Lihat Laporan</Button>
                 <Button variant="secondary" className="w-full justify-center gap-2 px-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 border-transparent"><Play size={16} /> Main Sekarang</Button>
              </div>
           </div>
        </GlassCard>
      </div>

    </div>
  )
}
