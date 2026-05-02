import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const IconButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, size = "icon", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("rounded-full", className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"
