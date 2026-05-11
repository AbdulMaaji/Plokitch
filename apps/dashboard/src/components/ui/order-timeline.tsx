import * as React from "react"
import { Check, Clock, Bike, PackageCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineStep {
  title: string
  time: string
  status: 'completed' | 'current' | 'upcoming'
  icon: any
}

interface OrderTimelineProps {
  steps: TimelineStep[]
  className?: string
}

const OrderTimeline = ({ steps, className }: OrderTimelineProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4 relative">
          {/* Vertical Line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-[15px] top-[30px] bottom-[-24px] w-[2px] bg-divider" />
          )}
          
          {/* Icon Circle */}
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10",
            step.status === 'completed' ? "bg-green-100 text-green-600" : 
            step.status === 'current' ? "bg-action text-white" : "bg-beige text-subtle"
          )}>
            <step.icon size={16} />
          </div>

          {/* Content */}
          <div className="flex flex-col pt-0.5">
            <h4 className={cn(
              "text-caption font-bold",
              step.status === 'upcoming' ? "text-subtle" : "text-navy"
            )}>
              {step.title}
            </h4>
            <p className="text-[11px] text-subtle font-medium">{step.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export { OrderTimeline }
