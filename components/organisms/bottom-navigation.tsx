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
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4", className)} {...props}>
      <div className="flex items-center justify-around p-2 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        {defaultTabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-14 rounded-full transition-all duration-200 active:scale-90",
                isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
              )}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-x-1 inset-y-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </AnimatePresence>
              <Icon 
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive ? "scale-110 mb-0.5" : "scale-100"
                )} 
              />
              <span className={cn(
                "text-[10px] font-bold transition-all",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 h-0 overflow-hidden"
              )}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
