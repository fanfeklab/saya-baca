"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { ThemeToggle } from "@/components/atoms/theme-toggle"
import { Typography } from "@/components/atoms/typography"

export function Topbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-indigo-500/10 dark:border-indigo-500/20 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/30">
            <Typography variant="h4" className="text-white">Sb</Typography>
          </div>
          <Typography variant="h3" className="font-display font-bold text-indigo-950 dark:text-indigo-50">Saya Baca</Typography>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link href="#fitur" className="text-sm font-medium text-slate-600 hover:text-indigo-500 dark:text-slate-300 transition-colors">Fitur</Link>
          <Link href="#metode" className="text-sm font-medium text-slate-600 hover:text-indigo-500 dark:text-slate-300 transition-colors">Metode</Link>
          <Link href="#testimoni" className="text-sm font-medium text-slate-600 hover:text-indigo-500 dark:text-slate-300 transition-colors">Testimoni</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="default" className="rounded-full px-6 shadow-indigo-500/20 shadow-lg hidden sm:flex">
              Mulai Belajar
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
