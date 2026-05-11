import * as React from "react"
import { Sparkles, ArrowRight, Zap, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export type Department = "Dispatch" | "Support" | "Vendor" | "Rider" | "Payments" | "Experience"

interface AIRecommendationCardProps {
  priority: "CRITICAL" | "HIGH" | "MEDIUM"
  department: Department
  title: string
  impact: string
  className?: string
}

export const AIRecommendationCard = ({ 
  priority, 
  department, 
  title, 
  impact,
  className 
}: AIRecommendationCardProps) => {
  const priorityColors = {
    CRITICAL: "text-red-600 bg-red-50 border-red-100",
    HIGH: "text-orange-600 bg-orange-50 border-orange-100",
    MEDIUM: "text-blue-600 bg-blue-50 border-blue-100",
  }

  return (
    <div className={cn(
      "bg-white p-6 rounded-card border border-divider shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group",
      className
    )}>
      <div className="flex justify-between items-center">
        <div className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border", priorityColors[priority])}>
          {priority} Priority
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-subtle uppercase tracking-wider">
          <Target size={12} /> {department}
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-body font-bold text-navy leading-tight group-hover:text-action transition-colors">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-3 text-[11px] text-subtle">
          <TrendingUp size={14} className="text-green-600 shrink-0" />
          <span>Expected impact: <span className="font-bold text-navy">{impact}</span></span>
        </div>
      </div>

      <button className="flex items-center justify-between w-full p-3 rounded-lg bg-navy/5 text-[11px] font-bold text-navy uppercase tracking-widest hover:bg-navy hover:text-white transition-all group/btn">
        <span>Enable Optimization</span>
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}
