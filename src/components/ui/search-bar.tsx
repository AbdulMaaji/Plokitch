import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder" size={18} />
      <Input 
        className="pl-12 bg-white border-divider" 
        {...props} 
      />
    </div>
  )
}
