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
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto pb-24 relative">
      <div className="flex items-center gap-4 bg-white neo-border p-3 rounded-2xl sticky top-4 z-40">
        <Link href="/main">
          <Button variant="outline" size="icon" className="w-10 h-10 neo-shadow-active">
            <MoveLeft className="w-5 h-5 text-primary" />
          </Button>
        </Link>
        <Typography variant="h4" className="font-black uppercase tracking-widest flex-1 text-center pr-10">
           Peringkat
        </Typography>
      </div>

      <div className="flex justify-center items-end gap-2 mt-4 mb-8 h-40 px-2 flex-nowrap">
         {/* Rank 2 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center w-1/3">
            <Avatar size="lg" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[1].avatar}`} className="mb-[-15px] relative z-10 w-12 h-12 shadow-none" />
            <div className="w-full bg-slate-200 neo-border border-b-0 h-16 rounded-t-xl flex flex-col justify-end items-center pb-1">
               <Typography variant="h3" className="font-black text-slate-500">2</Typography>
            </div>
            <Typography className="font-black mt-1 text-[10px] text-center truncate w-full uppercase">{leaderboardData[1].name}</Typography>
            <Typography className="text-[10px] font-bold text-slate-500">{leaderboardData[1].points}</Typography>
         </motion.div>

         {/* Rank 1 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="flex flex-col items-center w-1/3">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-500 mb-1 relative z-20" />
            <Avatar size="xl" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[0].avatar}`} className="mb-[-20px] neo-border border-amber-400 relative z-10 w-16 h-16 shadow-none" />
            <div className="w-full bg-amber-400 neo-border border-b-0 h-24 rounded-t-xl flex flex-col justify-end items-center pb-1">
               <Typography variant="h1" className="font-black text-amber-900">1</Typography>
            </div>
            <Typography className="font-black mt-1 text-xs text-center truncate w-full uppercase">{leaderboardData[0].name}</Typography>
            <Typography className="text-[10px] font-black text-amber-600">{leaderboardData[0].points}</Typography>
         </motion.div>

         {/* Rank 3 */}
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center w-1/3">
            <Avatar size="lg" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${leaderboardData[2].avatar}`} className="mb-[-15px] relative z-10 w-12 h-12 shadow-none" />
            <div className="w-full bg-orange-200 neo-border border-b-0 h-12 rounded-t-xl flex flex-col justify-end items-center pb-1">
               <Typography variant="h3" className="font-black text-orange-600">3</Typography>
            </div>
            <Typography className="font-black mt-1 text-[10px] text-center truncate w-full uppercase">{leaderboardData[2].name}</Typography>
            <Typography className="text-[10px] font-bold text-orange-600">{leaderboardData[2].points}</Typography>
         </motion.div>
      </div>

      <div className="flex flex-col gap-3">
         {leaderboardData.slice(3).map((user, index) => (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }} key={user.id}>
               <div className="p-3 bg-white neo-border neo-shadow-hover flex items-center gap-4 rounded-xl">
                  <div className="flex flex-col items-center justify-center w-6 shrink-0">
                     <Typography className="font-black text-slate-400 text-xs w-full text-center">{user.rank}</Typography>
                     {user.change === 'up' && <ChevronUp className="w-3 h-3 text-emerald-500 stroke-[4px]" />}
                     {user.change === 'down' && <ChevronDown className="w-3 h-3 text-rose-500 stroke-[4px]" />}
                  </div>
                  <Avatar size="sm" src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.avatar}`} className="shrink-0 w-8 h-8 rounded-lg" />
                  <Typography className="font-black uppercase text-xs flex-1 truncate">{user.name}</Typography>
                  <Typography className="font-black text-primary text-xs tracking-tighter">{user.points} XP</Typography>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  )
}
