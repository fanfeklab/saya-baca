"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Award, Target, Trophy, Clock } from "lucide-react"

const weeklyData = [
  { name: "Sen", score: 65, time: 30 },
  { name: "Sel", score: 70, time: 45 },
  { name: "Rab", score: 85, time: 60 },
  { name: "Kam", score: 75, time: 40 },
  { name: "Jum", score: 90, time: 55 },
  { name: "Sab", score: 95, time: 70 },
  { name: "Min", score: 92, time: 65 },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <Typography variant="h2" className="font-bold mb-2">Laporan Belajar Budi</Typography>
        <Typography variant="muted">Lihat statistik dan perkembangan belajar secara detail.</Typography>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4 border-l-4 border-l-indigo-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
               <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <Typography variant="muted" className="text-sm font-semibold uppercase">Akurasi Rata-rata</Typography>
          </div>
          <Typography variant="h2" className="font-black mt-2">85%</Typography>
          <Typography variant="muted" className="text-xs mt-1 text-emerald-500">+5% dari minggu lalu</Typography>
        </GlassCard>

        <GlassCard className="p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
               <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <Typography variant="muted" className="text-sm font-semibold uppercase">Total Waktu</Typography>
          </div>
          <Typography variant="h2" className="font-black mt-2">6j 15m</Typography>
          <Typography variant="muted" className="text-xs mt-1 text-emerald-500">+1j 30m dari minggu lalu</Typography>
        </GlassCard>

        <GlassCard className="p-4 border-l-4 border-l-fuchsia-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-lg">
               <Trophy className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <Typography variant="muted" className="text-sm font-semibold uppercase">Materi Selesai</Typography>
          </div>
          <Typography variant="h2" className="font-black mt-2">12</Typography>
          <Typography variant="muted" className="text-xs mt-1">Suku kata & kalimat</Typography>
        </GlassCard>

        <GlassCard className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
               <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Typography variant="muted" className="text-sm font-semibold uppercase">Piala</Typography>
          </div>
          <Typography variant="h2" className="font-black mt-2">3</Typography>
          <Typography variant="muted" className="text-xs mt-1">Sangat baik minggu ini</Typography>
        </GlassCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="mb-6">
            <Typography variant="large" className="font-bold">Skor Pemahaman Mingguan</Typography>
            <Typography variant="muted" className="text-sm">Nilai rata-rata kuis harian</Typography>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    color: '#000'
                  }} 
                />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-6">
            <Typography variant="large" className="font-bold">Distribusi Waktu Belajar (Menit)</Typography>
            <Typography variant="muted" className="text-sm">Waktu aktif per hari dalam seminggu</Typography>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    color: '#000'
                  }} 
                />
                <Bar dataKey="time" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

    </div>
  )
}
