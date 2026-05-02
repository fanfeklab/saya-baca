import * as React from "react"
import { BottomNavigation } from "@/components/organisms/bottom-navigation"
import { ThemeToggle } from "@/components/atoms/theme-toggle"

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Immersive background elements specific to child app */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300/10 dark:bg-amber-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <header className="absolute top-0 left-0 right-0 p-6 flex justify-end z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 w-full h-full pb-28 pt-8 px-6 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>

      <BottomNavigation />
    </div>
  )
}
