import * as React from "react"
import { LucideIcon, Zap, CheckCircle2, Clock, XCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type StatusType = "LIVE" | "COMPLETED" | "DELAYED" | "CANCELLED" | "PENDING" | "ACTIVE" | "INACTIVE" | "RESOLVED"

interface StatusBadgeProps {
  status?: StatusType
  icon?: LucideIcon
  label?: string
  className?: string
  iconColor?: string
}

const STATUS_CONFIG: Record<StatusType, { icon: LucideIcon, label: string, color: string }> = {
  LIVE: { icon: Zap, label: "Live", color: "#ff6b00" },
  COMPLETED: { icon: CheckCircle2, label: "Completed", color: "#22c55e" },
  DELAYED: { icon: Clock, label: "Delayed", color: "#ef4444" },
  CANCELLED: { icon: XCircle, label: "Cancelled", color: "#64748b" },
  PENDING: { icon: Clock, label: "Pending", color: "#f59e0b" },
  ACTIVE: { icon: CheckCircle2, label: "Active", color: "#22c55e" },
  INACTIVE: { icon: XCircle, label: "Inactive", color: "#94a3b8" },
  RESOLVED: { icon: CheckCircle2, label: "Resolved", color: "#22c55e" },
}

const StatusBadge = ({ 
  status, 
  icon: customIcon, 
  label: customLabel, 
  className, 
  iconColor 
}: StatusBadgeProps) => {
  const config = status ? STATUS_CONFIG[status] : null
  const Icon = customIcon || config?.icon || AlertTriangle
  const label = customLabel || config?.label || status || "Unknown"
  const color = iconColor || config?.color || "#ff6b00"

  return (
    <div 
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 glass-morphism rounded-[20px] w-fit",
        className
      )}
    >
      <Icon size={14} style={{ color }} strokeWidth={2} />
      <span className="text-[11px] font-semibold text-navy whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

export { StatusBadge }
