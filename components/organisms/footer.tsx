import * as React from "react"
import Link from "next/link"
import { Typography } from "@/components/atoms/typography"

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Typography variant="h4" className="text-white text-sm">Sb</Typography>
            </div>
            <Typography variant="h4" className="font-bold">Saya Baca</Typography>
          </Link>
          <Typography variant="muted" className="max-w-xs mb-6">
            Platform edukasi interaktif untuk membantu anak belajar membaca dengan metode yang menyenangkan dan gamifikasi.
          </Typography>
        </div>
        
        <div>
          <Typography variant="large" className="mb-4">Perusahaan</Typography>
          <ul className="space-y-3">
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">Tentang Kami</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">Karir</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <Typography variant="large" className="mb-4">Bantuan</Typography>
          <ul className="space-y-3">
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">FAQ</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-indigo-500 transition-colors">Kebijakan Privasi</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
        <Typography variant="muted" className="text-sm">
          © {new Date().getFullYear()} Saya Baca. All rights reserved.
        </Typography>
      </div>
    </footer>
  )
}
