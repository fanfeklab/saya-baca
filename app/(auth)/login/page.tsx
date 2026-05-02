"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Typography } from "@/components/atoms/typography"
import { LoginCard } from "@/components/organisms/login-card"
import { Topbar } from "@/components/organisms/topbar"
import { PageTransitionWrapper } from "@/components/organisms/page-transition-wrapper"

export default function LoginPage() {
  return (
    <PageTransitionWrapper className="min-h-screen flex flex-col">
      <Topbar />
      
      {/* Background Decorative */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-500/20 to-fuchsia-500/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-[80px] rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 mt-16">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <LoginCard 
            onLogin={(email) => console.log('Login attempt with', email)}
            onGoogleLogin={() => console.log('Google login attempt')}
            onGuestLogin={() => console.log('Guest login attempt')}
          />
          <div className="mt-8 text-center">
            <Typography variant="muted" className="text-sm">
              Dengan masuk, kamu menyetujui <Link href="#" className="underline hover:text-indigo-500">Syarat & Ketentuan</Link> dan <Link href="#" className="underline hover:text-indigo-500">Kebijakan Privasi</Link> kami.
            </Typography>
          </div>
        </motion.div>
      </div>
    </PageTransitionWrapper>
  )
}
