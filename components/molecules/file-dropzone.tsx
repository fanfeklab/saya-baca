import * as React from "react"
import { cn } from "@/lib/utils"
import { UploadCloud } from "lucide-react"
import { Typography } from "@/components/atoms/typography"

export interface FileDropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  onFilesDrop?: (files: FileList) => void
}

export function FileDropzone({ className, onFilesDrop, ...props }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && onFilesDrop) {
      onFilesDrop(e.dataTransfer.files)
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col border-2 border-dashed rounded-2xl p-8 items-center justify-center transition-colors relative cursor-pointer group bg-white/30 dark:bg-black/20 backdrop-blur-sm",
        isDragging 
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" 
          : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900/40",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...props}
    >
      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      <UploadCloud className={cn("w-12 h-12 mb-4 transition-colors", isDragging ? "text-indigo-500" : "text-slate-400 group-hover:text-indigo-400")} />
      <Typography variant="large" className="mb-2">Drag and drop files here</Typography>
      <Typography variant="muted">or click to browse from your computer</Typography>
    </div>
  )
}
