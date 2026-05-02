"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Home, Search, Trophy, User } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const defaultTabs = [
  { id: 'home', icon: Home, label: 'Beranda', href: '/main' },
  { id: 'leaderboard', icon: Trophy, label: 'Ranking', href: '/main/leaderboard' },
  { id: 'profile', icon: User, label: 'Profil', href: '/parent/children' },
]

export function BottomNavigation({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[340px] px-4", className)} {...props}>
      <div className="flex items-center justify-around p-2 bg-white neo-border neo-shadow rounded-2xl">
        {defaultTabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-14 transition-all duration-200 active:scale-90",
                isActive ? "text-primary" : "text-slate-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-x-0 inset-y-0 bg-indigo-50 neo-border border-b-4 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon 
                className={cn(
                  "w-6 h-6 transition-transform duration-200",
                  isActive ? "scale-110 mb-0.5" : "scale-100"
                )} 
              />
              {isActive && (
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {tab.label}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
