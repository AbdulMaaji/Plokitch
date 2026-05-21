import * as React from "react"
import { AlertCircle, CheckCircle2, Info, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"

interface SeverityBadgeProps {
  severity: Severity
  className?: string
}

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const config: Record<string, { color: string; icon: React.ElementType }> = {
    LOW: { color: "text-blue-600 bg-blue-50", icon: Info },
    MODERATE: { color: "text-green-600 bg-green-50", icon: CheckCircle2 },
    HIGH: { color: "text-orange-600 bg-orange-50", icon: AlertCircle },
    CRITICAL: { color: "text-red-600 bg-red-50", icon: ShieldAlert },
    // common API variants — map them to canonical keys
    INFO: { color: "text-blue-600 bg-blue-50", icon: Info },
    MEDIUM: { color: "text-orange-600 bg-orange-50", icon: AlertCircle },
    WARNING: { color: "text-orange-600 bg-orange-50", icon: AlertCircle },
  }

  // Normalise to uppercase; fall back to LOW so the component never crashes
  const normalised = (severity ?? "LOW").toString().toUpperCase()
  const { color, icon: Icon } = config[normalised] ?? config["LOW"]

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase w-fit", color, className)}>
      <Icon size={12} strokeWidth={2.5} />
      {severity}
    </div>
  )
}

interface AIInsightCardProps {
  title: string
  description: string
  timestamp: string
  severity: Severity
  trend?: string
}

export const AIInsightCard = ({ title, description, timestamp, severity, trend }: AIInsightCardProps) => {
  return (
    <div className="bg-white p-5 rounded-card border border-divider shadow-sm hover:border-navy/20 transition-all flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <SeverityBadge severity={severity} />
        <span className="text-[10px] font-bold text-subtle uppercase">{timestamp}</span>
      </div>
      <div>
        <h4 className="text-caption font-bold text-navy leading-tight">{title}</h4>
        <p className="text-[11px] text-subtle mt-1 leading-relaxed">{description}</p>
      </div>
      {trend && (
        <div className="pt-3 border-t border-divider mt-auto">
          <span className="text-[10px] font-bold text-navy flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-action" />
            {trend}
          </span>
        </div>
      )}
    </div>
  )
}
