import * as React from "react"
import { AlertTriangle, Clock, ShieldAlert, Activity } from "lucide-react"
import { SeverityBadge, Severity } from "./AIInsightCard"
import { cn } from "@/lib/utils"

interface RiskDetectionFeedProps {
  insights?: any[]
}

export const RiskDetectionFeed = ({ insights = [] }: RiskDetectionFeedProps) => {
  return (
    <div className="bg-white rounded-[32px] border border-divider shadow-card flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-divider flex items-center justify-between bg-beige/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
            <Activity size={18} className="text-navy" />
          </div>
          <h3 className="text-[13px] font-black text-navy uppercase tracking-[0.1em]">Live Risk Stream</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="flex flex-col gap-8">
          {insights.length > 0 ? insights.map((risk, i) => (
            <div key={i} className="flex gap-4 relative">
              {i !== insights.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-[-32px] w-[1px] bg-divider/50" />
              )}
              <div className={cn(
                "w-3.5 h-3.5 rounded-full mt-1.5 z-10 border-2 border-white shadow-sm",
                risk.severity === "CRITICAL" ? "bg-red-500" : 
                risk.severity === "HIGH" ? "bg-orange-500" : "bg-blue-500"
              )} />
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-[12px] font-black text-navy uppercase tracking-wider">{risk.category || 'SYSTEM'}</p>
                    <span className="text-[10px] text-subtle font-bold flex items-center gap-1 mt-1 opacity-70">
                      <Clock size={10} /> {risk.timestamp}
                    </span>
                  </div>
                  <SeverityBadge severity={risk.severity} className="px-2 py-0.5" />
                </div>
                <div className="bg-beige/10 p-4 rounded-2xl border border-divider/40 hover:bg-beige/20 transition-colors">
                  <p className="text-[11px] text-navy leading-relaxed font-semibold">{risk.description}</p>
                  <div className="mt-3 pt-3 border-t border-divider/30">
                    <p className="text-[10px] text-subtle italic leading-relaxed">
                      <span className="font-black text-action uppercase not-italic mr-1.5 text-[9px] tracking-widest">AI STRATEGY:</span>
                      {risk.trend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center py-12 opacity-30">
              <Activity size={32} />
              <p className="text-[10px] font-black uppercase mt-4 tracking-widest">Monitoring for risks...</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 border-t border-divider bg-beige/5">
        <button className="w-full py-3 text-[10px] font-black text-navy uppercase tracking-[0.2em] hover:bg-navy hover:text-white transition-all rounded-xl border-2 border-navy/10 shadow-sm">
          VIEW FULL AUDIT LOG
        </button>
      </div>
    </div>
  )
}
