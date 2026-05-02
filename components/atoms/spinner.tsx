import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SpinnerProps extends React.ComponentProps<typeof Loader2> {
  size?: number | string
}

function Spinner({ className, size = 24, ...props }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-indigo-500", className)}
      {...props}
    />
  )
}

export { Spinner }
