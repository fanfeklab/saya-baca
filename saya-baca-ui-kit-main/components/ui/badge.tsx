import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-border shadow-[2px_2px_0_0_#000000] px-3 py-0.5 text-sm font-bold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5 text-white",
        secondary: "bg-secondary text-secondary-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        accent: "bg-accent text-accent-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        success: "bg-success text-success-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        outline: "bg-background text-foreground hover:bg-muted hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        ghost: "border-transparent shadow-none hover:bg-muted hover:text-muted-foreground",
        link: "border-transparent shadow-none hover:shadow-none text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
