import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    // Generate a unique ID if none is provided to link label and input
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn("space-y-2 w-full", className)}>
        <Label 
          htmlFor={inputId} 
          className={cn(
            "font-bold text-sm",
            error ? "text-destructive" : ""
          )}
        >
          {label}
        </Label>
        
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            error && "border-destructive focus-visible:ring-destructive"
          )}
          {...props}
        />
        
        {helperText && !error && (
          <p id={helperId} className="text-xs text-muted-foreground font-medium">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="text-xs text-destructive font-bold">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
