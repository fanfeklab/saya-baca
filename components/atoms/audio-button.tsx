'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTTS } from "@/hooks/use-tts"

interface AudioButtonProps extends React.ComponentProps<typeof Button> {
  soundSrc?: string
  speakText?: string
}

export const AudioButton = React.forwardRef<HTMLButtonElement, AudioButtonProps>(
  ({ soundSrc = "/sounds/pop.mp3", speakText, onClick, ...props }, ref) => {
    const { speak } = useTTS()
    
    const playSound = React.useCallback(() => {
      if (speakText) {
        speak(speakText)
      } else {
        try {
          const audio = new Audio(soundSrc)
          audio.play().catch(e => console.warn("Audio play failed:", e))
        } catch (error) {
          console.warn("Audio not supported or missing")
        }
      }
    }, [soundSrc, speakText, speak])

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
