import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-border shadow-neo font-bold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg active:translate-y-1 active:translate-x-1 active:shadow-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        success: "bg-success text-success-foreground",
        outline: "bg-background text-foreground hover:bg-muted",
        ghost: "border-transparent shadow-none hover:bg-muted hover:text-foreground hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-neo-sm active:translate-y-0 active:translate-x-0 active:shadow-none",
        destructive: "bg-destructive text-destructive-foreground",
        link: "border-transparent shadow-none hover:shadow-none text-primary underline-offset-4 hover:underline hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-12 px-6 text-base gap-2",
        sm: "h-9 px-4 text-sm gap-1.5 rounded-lg shadow-neo-sm hover:shadow-neo",
        lg: "h-14 px-8 text-lg gap-3",
        icon: "size-12",
        "icon-sm": "size-9 rounded-lg shadow-neo-sm hover:shadow-neo",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
