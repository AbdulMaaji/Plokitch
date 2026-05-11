import * as React from "react"
import { AlertTriangle, Clock, ShieldAlert, Activity } from "lucide-react"
import { SeverityBadge, Severity } from "./AIInsightCard"
import { cn } from "@/lib/utils"

interface RiskEvent {
  id: string
  timestamp: string
  severity: Severity
  category: string
  description: string
  recommendation: string
}

export const RiskDetectionFeed = () => {
  const risks: RiskEvent[] = [
    {
      id: "1",
      timestamp: "12:45 PM",
      severity: "HIGH",
      category: "Payments",
      description: "Anomaly detected: 14 failed payment attempts in 2 mins from Lekki Zone.",
      recommendation: "Investigate gateway node PB-04 and cross-reference IP clusters."
    },
    {
      id: "2",
      timestamp: "12:30 PM",
      severity: "MODERATE",
      category: "Dispatch",
      description: "Cluster of late pickups detected in Downtown area (Avg delay +12m).",
      recommendation: "Activate surge dispatch multipliers for Downtown zone."
    },
    {
      id: "3",
      timestamp: "12:15 PM",
      severity: "CRITICAL",
      category: "Security",
      description: "Suspicious login pattern detected for Vendor 'The Sushi Bar'.",
      recommendation: "Enforce MFA re-verification and freeze payout temporary."
    }
  ]

  return (
    <div className="bg-white rounded-card border border-divider shadow-card flex flex-col h-full">
      <div className="p-5 border-b border-divider flex items-center justify-between bg-beige/10">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-navy" />
          <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Live Risk Stream</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-subtle uppercase">Monitoring Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="flex flex-col gap-6">
          {risks.map((risk, i) => (
            <div key={risk.id} className="flex gap-4 relative">
              {i !== risks.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-[-24px] w-[1px] bg-divider" />
              )}
              <div className={cn(
                "w-3.5 h-3.5 rounded-full mt-1.5 z-10 border-2 border-white",
                risk.severity === "CRITICAL" ? "bg-red-500" : 
                risk.severity === "HIGH" ? "bg-orange-500" : "bg-blue-500"
              )} />
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-[12px] font-bold text-navy">{risk.category}</p>
                    <span className="text-[10px] text-subtle font-bold flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {risk.timestamp}
                    </span>
                  </div>
                  <SeverityBadge severity={risk.severity} className="px-2 py-0.5" />
                </div>
                <div className="bg-beige/20 p-3 rounded-lg border border-divider/50">
                  <p className="text-[11px] text-navy leading-relaxed font-medium">{risk.description}</p>
                  <p className="text-[10px] text-subtle mt-2 italic">
                    <span className="font-bold text-action uppercase not-italic mr-1">AI Recommendation:</span>
                    {risk.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-divider bg-beige/5">
        <button className="w-full py-2 text-[10px] font-bold text-navy uppercase tracking-widest hover:bg-navy hover:text-white transition-all rounded-button border border-divider">
          View Audit Logs
        </button>
      </div>
    </div>
  )
}
