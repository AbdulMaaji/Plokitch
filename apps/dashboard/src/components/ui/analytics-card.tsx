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
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/10">
          <Icon size={18} className="text-primary" />
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
      <div>
        <p className="text-[11px] font-bold text-subtle/70 uppercase tracking-[0.15em] mb-1">{title}</p>
        <h3 className="text-[30px] font-heading font-semibold text-navy leading-tight tracking-tight">{value}</h3>
        {description && (
          <p className="text-[12px] font-medium text-subtle/80 mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
