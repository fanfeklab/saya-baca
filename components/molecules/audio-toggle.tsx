"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"

export function AudioToggle({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isMuted, setIsMuted] = React.useState(false)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Here we will eventually integrate with Howler.js global mute
    // Howler.mute(!isMuted)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      className={cn("bg-white neo-border neo-shadow neo-shadow-active rounded-xl", className)}
      {...props}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 text-slate-500" />
      ) : (
        <Volume2 className="h-5 w-5 text-indigo-500" />
      )}
      <span className="sr-only">Toggle audio</span>
    </Button>
  )
}
