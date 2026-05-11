import * as React from "react"
import { Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { cn } from "@/lib/utils"

interface FilterDropdownProps {
  placeholder: string
  options: { label: string; value: string }[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function FilterDropdown({
  placeholder,
  options,
  value,
  onValueChange,
  className,
}: FilterDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-[180px] h-12 bg-white", className)}>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-subtle" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
