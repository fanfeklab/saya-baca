import * as React from "react"
import { BottomNavigation } from "@/components/organisms/bottom-navigation"
import { ThemeToggle } from "@/components/atoms/theme-toggle"

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-svh w-screen flex flex-col relative selection:bg-indigo-100 selection:text-indigo-900 bg-background overflow-hidden">
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-end z-50 pointer-events-none">
        <div className="pointer-events-auto bg-white neo-border p-1 rounded-xl">
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 w-full pb-28 pt-8 px-4 max-w-sm mx-auto overflow-y-auto scrollbar-hide">
        {children}
      </main>

      <BottomNavigation />
    </div>
  )
}
