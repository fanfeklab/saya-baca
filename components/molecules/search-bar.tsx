import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, onChange, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
        <Input
          ref={ref}
          type="search"
          className="pl-11 pr-4 py-2 w-full rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border-white/50 dark:border-white/10 focus-visible:ring-indigo-500 transition-all font-medium"
          placeholder="Search..."
          onChange={(e) => {
            onChange?.(e)
            onSearch?.(e.target.value)
          }}
          {...props}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"
