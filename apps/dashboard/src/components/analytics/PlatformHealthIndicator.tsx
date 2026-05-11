import * as React from "react"
import { cn } from "@/lib/utils"

interface PlatformHealthIndicatorProps {
  label: string
  value: number
  status: "OPTIMAL" | "STABLE" | "DEGRADED" | "CRITICAL"
  className?: string
}

export const PlatformHealthIndicator = ({ label, value, status, className }: PlatformHealthIndicatorProps) => {
  const statusColors = {
    OPTIMAL: "bg-green-500",
    STABLE: "bg-navy",
    DEGRADED: "bg-orange-500",
    CRITICAL: "bg-red-500",
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className="text-subtle uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-navy">{value}%</span>
          <span className={cn("px-1.5 py-0.5 rounded-full text-[8px] text-white uppercase tracking-widest", statusColors[status])}>
            {status}
          </span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-500", statusColors[status])} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  )
}
