import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const indicatorVariants = cva(
  "rounded-full inline-block relative",
  {
    variants: {
      variant: {
        success: "bg-emerald-500",
        danger: "bg-rose-500",
        warning: "bg-amber-500",
        info: "bg-sky-500",
        primary: "bg-indigo-500",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
      },
      ping: {
        true: "before:absolute before:inset-0 before:rounded-full before:bg-inherit before:animate-ping before:opacity-75",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      ping: false,
    },
  }
)

export interface IndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof indicatorVariants> {}

function Indicator({ className, variant, size, ping, ...props }: IndicatorProps) {
  return (
    <span
      className={cn(indicatorVariants({ variant, size, ping, className }))}
      {...props}
    />
  )
}

export { Indicator, indicatorVariants }
