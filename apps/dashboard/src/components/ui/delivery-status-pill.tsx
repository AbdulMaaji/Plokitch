import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeliveryStatusPillProps {
  icon: LucideIcon
  label: string
  className?: string
}

const DeliveryStatusPill = ({ icon: Icon, label, className }: DeliveryStatusPillProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-beige border border-divider text-caption font-medium text-navy",
      className
    )}>
      <Icon size={14} strokeWidth={1.8} />
      {label}
    </div>
  )
}

export { DeliveryStatusPill }
