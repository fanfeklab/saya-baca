"use client"

import { Topbar } from "@/components/organisms/topbar"
import { HeroSection } from "@/components/organisms/hero-section"
import { Footer } from "@/components/organisms/footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Topbar />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

