import * as React from "react"
import { 
  MessageSquareWarning, 
  ShieldCheck, 
  TrendingUp,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComplaintTable } from "@/components/support/ComplaintTable"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

export default async function ComplaintsPage() {
  const complaints = await api.support.list();

  // Calculate KPI Metrics
  const openCount = complaints.filter(c => c.status === 'open').length;
  const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  
  const totalCount = complaints.length;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Complaint Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Centralized intelligence for operational disputes and resolution performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-11 px-6 border-divider">
            <History size={18} /> RESOLUTION LOGS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm">
            <MessageSquareWarning size={18} /> NEW ESCALATION
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Open Tickets</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{openCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">In Progress</p>
          <h3 className="text-[28px] font-bold text-blue-600 mt-1">{inProgressCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Resolution Rate</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">{resolutionRate}%</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Avg. Response</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">4.5m</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Complaints Table */}
        <div className="lg:col-span-2">
          <ComplaintTable initialData={complaints} />
        </div>

        {/* Operational Analytics Panel */}
        <div className="flex flex-col gap-6">
          {/* Complaint Resolution Health Card */}
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-[11px] font-bold text-navy uppercase tracking-widest mb-4">Resolution Health</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-subtle uppercase">Success Rate</span>
                <span className="text-body font-bold text-green-600">{resolutionRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${resolutionRate}%` }} />
              </div>
              <p className="text-[11px] text-subtle/80 leading-relaxed font-medium">
                Platform successfully resolved {resolvedCount} out of {totalCount} complaints.
              </p>
            </div>
          </div>

          {/* Complaint Categories Card */}
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-[11px] font-bold text-navy uppercase tracking-widest mb-4">Complaint Categories</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Late Deliveries", val: "45%", color: "bg-orange-500" },
                { label: "Food Quality", val: "22%", color: "bg-red-500" },
                { label: "Missing Items", val: "18%", color: "bg-navy" },
                { label: "Rider Disputes", val: "15%", color: "bg-subtle" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-subtle">{item.label}</span>
                    <span className="text-navy">{item.val}</span>
                  </div>
                  <div className="w-full h-1 bg-beige rounded-full overflow-hidden">
                    <div className={cn("h-full", item.color)} style={{ width: item.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-navy p-6 rounded-card shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">Trust Score</h3>
              <p className="text-[10px] text-white/60 mt-1">Operational quality index</p>
              <div className="flex items-center gap-3 mt-4">
                <ShieldCheck className="text-action" size={24} />
                <span className="text-2xl font-bold text-white tracking-tight">4.8/5</span>
              </div>
            </div>
            <TrendingUp size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
