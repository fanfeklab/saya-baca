"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Home, Search, Trophy, User } from "lucide-react"

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const defaultTabs = [
  { id: 'home', icon: Home, label: 'Beranda' },
  { id: 'search', icon: Search, label: 'Cari' },
  { id: 'rewards', icon: Trophy, label: 'Hadiah' },
  { id: 'profile', icon: User, label: 'Profil' },
]

export function BottomNavigation({ className, activeTab = 'home', onTabChange, ...props }: BottomNavigationProps) {
  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50", className)} {...props}>
      <GlassDock activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

function GlassDock({ activeTab, onTabChange }: { activeTab: string, onTabChange?: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-[2rem] bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
      {defaultTabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
              isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/5"
            )}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </AnimatePresence>
            <Icon 
              className={cn(
                "w-6 h-6 transition-transform duration-300",
                isActive ? "scale-110 mb-0.5" : "scale-100"
              )} 
            />
            {isActive && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] font-bold"
              >
                {tab.label}
              </motion.span>
            )}
          </button>
        )
      })}
    </div>
  )
}
