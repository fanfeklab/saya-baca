import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { ThemeToggle } from "@/components/atoms/theme-toggle"
import { Avatar } from "@/components/atoms/avatar"
import Link from "next/link"
import { LayoutDashboard, Users, BarChart3, Settings, BookOpen, LogOut } from "lucide-react"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex selection:bg-indigo-100 selection:text-indigo-900">
      {/* Premium subtle background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-300/20 dark:bg-slate-800/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-200/20 dark:bg-indigo-900/20 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-black/20 backdrop-blur-3xl sticky top-0 h-screen z-40">
        <div className="p-6">
          <Link href="/parent" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Typography variant="h4" className="text-white text-sm">Sb</Typography>
            </div>
            <Typography variant="h4" className="font-bold">Portal Orang Tua</Typography>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <SidebarItem href="/parent" icon={<LayoutDashboard size={20} />} label="Ikhtisar" active />
          <SidebarItem href="/parent/children" icon={<Users size={20} />} label="Profil Anak" />
          <SidebarItem href="/parent/reports" icon={<BarChart3 size={20} />} label="Laporan Belajar" />
          <SidebarItem href="/parent/curriculum" icon={<BookOpen size={20} />} label="Kurikulum" />
          <SidebarItem href="/parent/settings" icon={<Settings size={20} />} label="Pengaturan" />
        </nav>

        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
            <Avatar size="sm" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Bunda" />
            <div className="flex-1 min-w-0">
              <Typography variant="p" className="text-sm font-semibold truncate">Bunda Ani</Typography>
              <Typography variant="muted" className="text-xs truncate">Bunda dari Budi</Typography>
            </div>
          </div>
          <button className="flex items-center gap-3 w-full mt-2 p-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors font-medium">
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-black/20 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="md:hidden">
            {/* Mobile menu trigger would go here */}
            <Typography variant="h4" className="font-bold">Portal</Typography>
          </div>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
          : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  )
}
