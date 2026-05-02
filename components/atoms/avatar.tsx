"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Image from "next/image"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-2xl neo-border bg-white shadow-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-16 w-16 text-base",
        xl: "h-24 w-24 text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

function Avatar({ className, size, src, alt, fallback, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false)

  return (
    <div className={cn(avatarVariants({ size, className }))} {...props}>
      {src && !error ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          fill
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-indigo-100 font-medium text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
          {fallback || alt?.charAt(0).toUpperCase() || "?"}
        </div>
      )}
    </div>
  )
}

export { Avatar, avatarVariants }
