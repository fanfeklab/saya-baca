import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted border-2 border-border shadow-[2px_2px_0_0_#000000]", className)}
      {...props}
    />
  )
}

export { Skeleton }
