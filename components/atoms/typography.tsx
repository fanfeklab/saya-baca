import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(
  "text-slate-900 dark:text-slate-100",
  {
    variants: {
      variant: {
        h1: "font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight",
        h2: "font-display text-3xl md:text-4xl font-bold tracking-tight",
        h3: "font-display text-2xl md:text-3xl font-bold tracking-tight",
        h4: "font-display text-xl md:text-2xl font-bold tracking-tight",
        p: "leading-relaxed",
        lead: "text-xl text-slate-700 dark:text-slate-300",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-slate-500 dark:text-slate-400",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      textColor: {
        default: "",
        primary: "text-indigo-600 dark:text-indigo-400",
        secondary: "text-fuchsia-600 dark:text-fuchsia-400",
        success: "text-emerald-600 dark:text-emerald-400",
        danger: "text-rose-600 dark:text-rose-400",
        white: "text-white",
      }
    },
    defaultVariants: {
      variant: "p",
      align: "left",
      textColor: "default"
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, textColor, as, ...props }, ref) => {
    // Dynamically choose intrinsic element based on variant or explicit 'as' prop
    let Comp = as || "p"
    if (!as && variant && variant.startsWith("h")) {
      Comp = variant.substring(0, 2) as any
    }

    return (
      <Comp
        ref={ref as any}
        className={cn(typographyVariants({ variant, align, textColor, className }))}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
