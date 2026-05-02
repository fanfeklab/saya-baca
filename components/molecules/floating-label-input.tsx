import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId()
    
    return (
      <div className={cn("relative group", className)}>
        <Input
          id={inputId}
          ref={ref}
          className="block px-4 pb-2.5 pt-6 w-full text-base bg-white/50 dark:bg-slate-900/50 backdrop-blur-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 border-white/40 dark:border-white/10 shadow-inner peer"
          placeholder=" "
          {...props}
        />
        <Label
          htmlFor={inputId}
          className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
        >
          {label}
        </Label>
      </div>
    )
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"
