"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { Avatar } from "@/components/atoms/avatar"
import { Award, Clock, BookOpen, TrendingUp, AlertCircle, ChevronRight } from "lucide-react"

export default function ParentDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Typography variant="h2" className="font-bold mb-2">Ikhtisar Perkembangan</Typography>
        <Typography variant="muted">Pantau aktivitas belajar dan pencapaian anak Anda hari ini.</Typography>
      </div>

      {/* Child Selector & Quick Stats - Bento Grid Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Active Child Profile Card */}
        <GlassCard className="md:col-span-1 border-2 border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 to-white/50 dark:from-indigo-950/20 dark:to-slate-900/50 p-6 flex flex-col items-center justify-center text-center">
          <Avatar size="lg" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Budi" className="w-20 h-20 mb-4 ring-4 ring-white dark:ring-slate-800 shadow-xl" />
          <Typography variant="h3" className="font-bold">Budi</Typography>
          <Typography variant="muted" className="text-sm mb-4">5 Tahun • Level 4</Typography>
          <button className="text-xs font-semibold px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            Ganti Profil Anak
          </button>
        </GlassCard>

        {/* Quick Stats Bento */}
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBento 
            title="Waktu Belajar" 
            value="45 Mnt" 
            trend="+10% dari kemarin" 
            icon={<Clock className="text-blue-500" />} 
            bg="bg-blue-50 dark:bg-blue-950/30"
          />
          <StatBento 
            title="Buku Selesai" 
            value="3" 
            trend="Target mingguan: 5" 
            icon={<BookOpen className="text-emerald-500" />} 
            bg="bg-emerald-50 dark:bg-emerald-950/30"
          />
          <StatBento 
            title="Suku Kata Baru" 
            value="12" 
            trend="100% akurasi" 
            icon={<TrendingUp className="text-amber-500" />} 
            bg="bg-amber-50 dark:bg-amber-950/30"
          />
          <StatBento 
            title="Piala Didapat" 
            value="2" 
            trend="Level up sebentar lagi" 
            icon={<Award className="text-fuchsia-500" />} 
            bg="bg-fuchsia-50 dark:bg-fuchsia-950/30"
          />
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="h4" className="font-bold">Aktivitas Terakhir</Typography>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Lihat Semua</button>
          </div>
          
          <div className="flex flex-col gap-4">
            <ActivityItem 
              time="Hari ini, 14:30" 
              title="Selesai membaca buku 'Petualangan Kucing Merah'" 
              type="book"
              score="100/100"
            />
            <ActivityItem 
              time="Hari ini, 14:15" 
              title="Mini Game: Mencocokkan Suku Kata (Ma, Mi, Mu, Me, Mo)" 
              type="game"
              score="Bintang 3"
            />
            <ActivityItem 
              time="Kemarin, 09:00" 
              title="Kuis Mingguan: Mengenal Hewan" 
              type="quiz"
              score="85/100"
            />
          </div>
        </div>

        {/* AI Recommendations / Alerts */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="h4" className="font-bold">Rekomendasi AI</Typography>
          </div>
          
          <GlassCard variant="heavy" className="border-t-4 border-t-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex gap-3 items-start mb-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <Typography variant="p" className="font-semibold text-slate-800 dark:text-slate-200">Perlu Pengulangan</Typography>
                <Typography variant="muted" className="text-sm">
                  Budi tampak kesulitan dengan kombinasi huruf <strong>"Ny"</strong> dan <strong>"Ng"</strong> pada sesi kuis terakhir.
                </Typography>
              </div>
            </div>
            <button className="w-full py-2 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
              Jadwalkan Latihan <ChevronRight size={16} />
            </button>
          </GlassCard>

          <GlassCard className="bg-indigo-50/50 dark:bg-indigo-950/20 border-t-4 border-t-indigo-400">
            <Typography variant="p" className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Saran Buku Minggu Ini</Typography>
            <div className="flex gap-3 mb-4">
              <div className="w-16 h-20 bg-indigo-200 dark:bg-indigo-800 rounded shadow-sm shrink-0 flex items-center justify-center text-2xl">🐢</div>
              <div>
                <Typography variant="p" className="text-sm font-bold">Kura-kura yang Berani</Typography>
                <Typography variant="muted" className="text-xs">Fokus: Akhiran konsonan (n, r, s)</Typography>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium shadow shadow-indigo-500/20 hover:bg-indigo-600 transition">
              Tambahkan ke Daftar Baca Budi
            </button>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}

function StatBento({ title, value, trend, icon, bg }: { title: string, value: string, trend: string, icon: React.ReactNode, bg: string }) {
  return (
    <GlassCard className={`p-5 flex flex-col justify-between ${bg} border border-black/5 dark:border-white/5`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
          {icon}
        </div>
      </div>
      <div>
        <Typography variant="h3" className="font-bold tracking-tight mb-1">{value}</Typography>
        <Typography variant="muted" className="text-xs font-semibold uppercase tracking-wider">{title}</Typography>
        <Typography variant="muted" className="text-[10px] mt-2 opacity-80">{trend}</Typography>
      </div>
    </GlassCard>
  )
}

function ActivityItem({ time, title, type, score }: { time: string, title: string, type: 'book' | 'game' | 'quiz', score: string }) {
  const getIcon = () => {
    switch (type) {
      case 'book': return <BookOpen className="text-indigo-500 w-4 h-4" />
      case 'game': return <div className="text-fuchsia-500 w-4 h-4 flex items-center justify-center">🎮</div>
      case 'quiz': return <div className="text-amber-500 w-4 h-4 flex items-center justify-center">📝</div>
    }
  }

  return (
    <GlassCard className="p-4 flex items-start gap-4 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
      <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm shrink-0 border border-slate-100 dark:border-slate-800">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <Typography variant="p" className="font-semibold text-sm mb-1">{title}</Typography>
        <div className="flex items-center gap-3">
          <Typography variant="muted" className="text-xs">{time}</Typography>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <Typography variant="muted" className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{score}</Typography>
        </div>
      </div>
    </GlassCard>
  )
}
