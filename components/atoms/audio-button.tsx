'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"

interface AudioButtonProps extends React.ComponentProps<typeof Button> {
  soundSrc?: string
}

export const AudioButton = React.forwardRef<HTMLButtonElement, AudioButtonProps>(
  ({ soundSrc = "/sounds/pop.mp3", onClick, ...props }, ref) => {
    const playSound = React.useCallback(() => {
      try {
        const audio = new Audio(soundSrc)
        audio.play().catch(e => console.warn("Audio play failed:", e))
      } catch (error) {
        console.warn("Audio not supported or missing")
      }
    }, [soundSrc])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playSound()
      // @ts-ignore
      onClick?.(e)
    }

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
AudioButton.displayName = "AudioButton"
