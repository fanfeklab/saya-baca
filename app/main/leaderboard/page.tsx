"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { Avatar } from "@/components/atoms/avatar"
import { Button } from "@/components/atoms/button"
import { Trophy, ChevronUp, ChevronDown, MoveLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

const leaderboardData = [
  { id: 1, name: "Budi", points: 2450, rank: 1, avatar: "Budi", change: "up" },
  { id: 2, name: "Siti", points: 2120, rank: 2, avatar: "Siti", change: "same" },
  { id: 3, name: "Andi", points: 1980, rank: 3, avatar: "Jack", change: "down" },
  { id: 4, name: "Rina", points: 1850, rank: 4, avatar: "Luna", change: "up" },
  { id: 5, name: "Deni", points: 1720, rank: 5, avatar: "Felix", change: "up" },
  { id: 6, name: "Tika", points: 1650, rank: 6, avatar: "Tika", change: "down" },
  { id: 7, name: "Doni", points: 1540, rank: 7, avatar: "Doni", change: "same" },
]

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-24 relative">
      <div className="flex items-center gap-4 bg-white/40 dark:bg-black/20 backdrop-blur-xl p-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm sticky top-4 z-40">
        <Link href="/main">
          <Button variant="glass" size="icon" className="w-10 h-10 rounded-full">
            <MoveLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </Button>
        </Link>
        <Typography variant="h3" className="font-bold flex-1 text-center pr-10 text-indigo-900 dark:text-indigo-100">
           Papan Peringkat
        </Typography>
      </div>

      <div className="flex justify-center items-end gap-2 md:gap-4 mt-8 mb-8 h-48 px-2">
         {/* Rank 2 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center w-1/3 max-w-[120px]">
            <Avatar size="lg" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[1].avatar}`} className="mb-[-20px] ring-4 ring-slate-200 dark:ring-slate-700 shadow-lg relative z-10 w-16 h-16 md:w-20 md:h-20" />
            <div className="w-full bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-800 dark:to-slate-700 h-24 rounded-t-2xl flex flex-col justify-end items-center pb-2 shadow-inner border-t-2 border-slate-100 dark:border-slate-600">
               <Typography variant="h2" className="font-black text-slate-500 dark:text-slate-400">2</Typography>
            </div>
            <Typography variant="p" className="font-bold mt-2 text-center truncate w-full">{leaderboardData[1].name}</Typography>
            <Typography variant="muted" className="text-xs font-bold">{leaderboardData[1].points} XP</Typography>
         </motion.div>

         {/* Rank 1 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="flex flex-col items-center w-1/3 max-w-[140px]">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-500 mb-2 relative z-20" />
            <Avatar size="lg" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[0].avatar}`} className="mb-[-24px] ring-4 ring-amber-400 shadow-xl relative z-10 w-20 h-20 md:w-24 md:h-24 bg-white" />
            <div className="w-full bg-gradient-to-t from-amber-400 to-amber-300 dark:from-amber-600 dark:to-amber-500 h-32 rounded-t-2xl flex flex-col justify-end items-center pb-2 shadow-inner border-t-2 border-amber-200 dark:border-amber-400">
               <Typography variant="h1" className="font-black text-amber-700 dark:text-amber-200">1</Typography>
            </div>
            <Typography variant="p" className="font-bold mt-2 text-center truncate w-full">{leaderboardData[0].name}</Typography>
            <Typography variant="muted" className="text-xs font-bold text-amber-600 dark:text-amber-500">{leaderboardData[0].points} XP</Typography>
         </motion.div>

         {/* Rank 3 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center w-1/3 max-w-[120px]">
            <Avatar size="lg" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[2].avatar}`} className="mb-[-16px] ring-4 ring-orange-200 dark:ring-orange-900 shadow-lg relative z-10 w-14 h-14 md:w-16 md:h-16 bg-white" />
            <div className="w-full bg-gradient-to-t from-orange-300 to-orange-200 dark:from-orange-800 dark:to-orange-700 h-20 rounded-t-2xl flex flex-col justify-end items-center pb-2 shadow-inner border-t-2 border-orange-100 dark:border-orange-600">
               <Typography variant="h3" className="font-black text-orange-600 dark:text-orange-400">3</Typography>
            </div>
            <Typography variant="p" className="font-bold mt-2 text-center truncate w-full">{leaderboardData[2].name}</Typography>
            <Typography variant="muted" className="text-xs font-bold text-orange-600 dark:text-orange-500">{leaderboardData[2].points} XP</Typography>
         </motion.div>
      </div>

      <div className="flex flex-col gap-3">
         {leaderboardData.slice(3).map((user, index) => (
            <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.1 * index }} key={user.id}>
               <GlassCard className="p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-6 shrink-0">
                     <Typography variant="h4" className="font-bold text-slate-400 w-full text-center">{user.rank}</Typography>
                     {user.change === 'up' && <ChevronUp className="w-4 h-4 text-emerald-500" />}
                     {user.change === 'down' && <ChevronDown className="w-4 h-4 text-rose-500" />}
                     {user.change === 'same' && <div className="w-2 h-0.5 bg-slate-300 dark:bg-slate-700 my-1.5" />}
                  </div>
                  <Avatar size="sm" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.avatar}`} className="shrink-0 bg-white dark:bg-slate-800" />
                  <Typography variant="p" className="font-bold flex-1">{user.name}</Typography>
                  <Typography variant="large" className="font-black text-indigo-600 dark:text-indigo-400">{user.points} XP</Typography>
               </GlassCard>
            </motion.div>
         ))}
      </div>
    </div>
  )
}
