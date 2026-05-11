import * as React from "react"
import { TrendingUp, TrendingDown, Target, BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"

interface PredictiveMetricCardProps {
  title: string
  prediction: string
  confidence: number
  impact: string
  recommendation: string
  isPositive?: boolean
}

export const PredictiveMetricCard = ({ 
  title, 
  prediction, 
  confidence, 
  impact, 
  recommendation,
  isPositive = true
}: PredictiveMetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-card border border-divider shadow-sm flex flex-col gap-5 relative overflow-hidden group hover:border-navy/20 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-navy/5 text-navy">
            <BrainCircuit size={18} />
          </div>
          <h4 className="text-caption font-bold text-navy uppercase tracking-wider">{title}</h4>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">Confidence</span>
          <span className="text-caption font-bold text-navy">{confidence}%</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          {isPositive ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
          <p className="text-body font-bold text-navy leading-tight">{prediction}</p>
        </div>
        <p className="text-[11px] text-subtle mt-1.5 leading-relaxed">
          <span className="font-bold text-navy">Projected Impact:</span> {impact}
        </p>
      </div>

      <div className="bg-beige/30 p-3 rounded-lg border border-divider/50">
        <div className="flex items-center gap-2 mb-1">
          <Target size={12} className="text-action" />
          <span className="text-[10px] font-bold text-action uppercase">Recommendation</span>
        </div>
        <p className="text-[11px] font-medium text-navy leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Subtle background icon */}
      <Target size={120} className="absolute -right-8 -bottom-8 text-navy/5 -rotate-12 group-hover:text-navy/10 transition-colors" />
    </div>
  )
}
