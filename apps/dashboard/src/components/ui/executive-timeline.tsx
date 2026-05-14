import * as React from "react"
import { cn } from "@/lib/utils"
import { Package, ShoppingBag, CheckCircle2, ChefHat, Bike, MapPin } from "lucide-react"

interface ExecutiveTimelineProps {
  data?: {
    totalAvg: number
    steps: { label: string; time: string }[]
  }
  className?: string
}

const STEP_ICONS: Record<string, any> = {
  "Added to Inventory": Package,
  "Order Placed": ShoppingBag,
  "Confirmed": CheckCircle2,
  "Preparing": ChefHat,
  "Dispatched": Bike,
  "Delivered": MapPin,
}

export function ExecutiveTimeline({ data, className }: ExecutiveTimelineProps) {
  const steps = data?.steps || []
  const totalAvgHours = Math.floor((data?.totalAvg || 0) / 60)
  const totalAvgMins = (data?.totalAvg || 0) % 60

  return (
    <div className={cn("bg-white p-10 rounded-card border border-divider shadow-card flex flex-col justify-between h-full", className)}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="text-[16px] font-heading font-bold text-navy">Order Lifecycle Timeline (Avg. Times)</h3>
        </div>

        <div className="relative flex justify-between items-start pt-4 px-4">
          {/* Horizontal Line */}
          <div className="absolute top-[35px] left-[10%] right-[10%] h-[1.5px] bg-divider z-0" />
          
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[step.label] || CheckCircle2
            return (
              <div key={index} className="flex flex-col items-center gap-3 z-10 w-full relative">
                <div className="p-2.5 rounded-xl bg-beige border border-divider group-hover:bg-primary/10 transition-colors">
                  <Icon size={18} className="text-navy" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-navy whitespace-nowrap uppercase tracking-tight">{step.label}</span>
                  <span className="text-[11px] font-medium text-subtle">{step.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-divider text-center">
        <span className="text-[13px] font-bold text-navy uppercase tracking-widest">
          Total Avg. Time: <span className="text-primary ml-1">
            {totalAvgHours > 0 ? `${totalAvgHours}h ` : ""}{totalAvgMins}m
          </span>
        </span>
      </div>
    </div>
  )
}
