import * as React from "react"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: string
    isUp: boolean
    isNeutral?: boolean
  }
  className?: string
}

export function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: AnalyticsCardProps) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-beige">
          <Icon size={20} className="text-navy" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-caption font-bold",
            trend.isNeutral ? "text-subtle" : trend.isUp ? "text-green-600" : "text-destructive"
          )}>
            {trend.isNeutral ? <Minus size={14} /> : trend.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <p className="text-caption font-bold text-subtle uppercase tracking-wider">{title}</p>
        <h3 className="text-[28px] font-bold text-navy mt-1 leading-tight">{value}</h3>
        {description && (
          <p className="text-caption text-subtle mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
