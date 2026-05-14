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
  sparklineColor?: string
  comparisonValue?: string
  data?: number[] // Dynamic data for the sparkline
  className?: string
}

export function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  sparklineColor = "#d4af37",
  comparisonValue,
  data = [30, 40, 35, 50, 49, 60, 70, 91], // Default fallback
  className,
}: AnalyticsCardProps) {
  // Generate a smooth SVG path from the data points
  const generatePath = (points: number[], width: number, height: number, isClosed: boolean = false) => {
    if (points.length < 2) return ""
    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min || 1
    
    const xStep = width / (points.length - 1)
    const getY = (val: number) => height - ((val - min) / range) * height

    let d = `M 0 ${getY(points[0])}`
    
    for (let i = 1; i < points.length; i++) {
      const x = i * xStep
      const y = getY(points[i])
      // Use cubic bezier for smoothness
      const prevX = (i - 1) * xStep
      const prevY = getY(points[i - 1])
      const cp1X = prevX + (x - prevX) / 2
      const cp2X = prevX + (x - prevX) / 2
      d += ` C ${cp1X} ${prevY}, ${cp2X} ${y}, ${x} ${y}`
    }

    if (isClosed) {
      d += ` V ${height} H 0 Z`
    }
    
    return d
  }

  const pathId = `sparkline-${title.replace(/\s+/g, '-').toLowerCase()}`
  const gradientId = `gradient-${pathId}`

  return (
    <div className={cn(
      "bg-white p-8 rounded-[24px] border border-divider shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-all duration-300",
      className
    )}>
      <div className="flex justify-between items-start z-10">
        <div className="p-3 rounded-2xl bg-[#f8fafc] border border-divider group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/20 transition-all">
          <Icon size={20} className="text-[#060d1d] group-hover:text-[#d4af37] transition-colors" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-black tracking-tight",
            trend.isNeutral ? "bg-[#f1f5f9] text-subtle" : trend.isUp ? "bg-[#f0fdf4] text-green-600" : "bg-[#fef2f2] text-red-600"
          )}>
            {trend.isNeutral ? <Minus size={12} /> : trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}
          </div>
        )}
      </div>
      
      <div className="z-10">
        <p className="text-[11px] font-black text-subtle uppercase tracking-[0.2em] mb-2 opacity-60">{title}</p>
        <h3 className="text-[34px] font-heading font-black text-[#060d1d] leading-none tracking-tight">{value}</h3>
        {comparisonValue && (
          <p className="text-[13px] font-medium text-subtle mt-4">
            vs. yesterday <span className="text-[#060d1d] font-bold ml-1">{comparisonValue}</span>
          </p>
        )}
      </div>

      {/* Dynamic Sparkline with Internal Padding */}
      <div className="absolute bottom-4 left-4 right-4 h-12 opacity-30 pointer-events-none transition-opacity group-hover:opacity-50">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={trend?.isUp ? "#22c55e" : "#ef4444"} stopOpacity="0.5" />
              <stop offset="100%" stopColor={trend?.isUp ? "#22c55e" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={generatePath(data, 100, 40, true)}
            fill={`url(#${gradientId})`}
            className="transition-all duration-1000"
          />
          <path
            d={generatePath(data, 100, 40, false)}
            fill="none"
            stroke={trend?.isUp ? "#22c55e" : "#ef4444"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-1000"
          />
        </svg>
      </div>
    </div>
  )
}
