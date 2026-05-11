import * as React from "react"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  change,
  trend = 'neutral',
  className
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white p-5 rounded-card shadow-card border border-divider flex flex-col gap-4",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-lg bg-beige">
          <Icon size={20} className="text-navy" />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-caption font-semibold",
            trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-subtle"
          )}>
            {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingDown size={14} /> : null}
            {change}
          </div>
        )}
      </div>

      <div>
        <p className="text-caption font-medium text-subtle uppercase tracking-wider">{label}</p>
        <h3 className="text-h2 font-bold text-navy mt-1">{value}</h3>
      </div>
    </div>
  )
}

export { StatCard }
