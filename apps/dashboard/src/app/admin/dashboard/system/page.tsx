"use client"

import * as React from "react"
import { 
  Server, 
  Database, 
  CreditCard, 
  Zap, 
  Activity, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreHorizontal,
  RefreshCcw,
  Terminal,
  Cpu,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SystemPage() {
  const services = [
    { name: "API Gateway", status: "HEALTHY", uptime: "99.99%", latency: "42ms", icon: Globe },
    { name: "Core Database", status: "HEALTHY", uptime: "100%", latency: "8ms", icon: Database },
    { name: "Payment Service", status: "DEGRADED", uptime: "98.5%", latency: "240ms", icon: CreditCard },
    { name: "Notification Engine", status: "HEALTHY", uptime: "99.9%", latency: "12ms", icon: Zap },
    { name: "Rider Dispatcher", status: "HEALTHY", uptime: "99.95%", latency: "35ms", icon: Cpu },
    { name: "Auth Provider", status: "HEALTHY", uptime: "100%", latency: "15ms", icon: Server },
  ]

  const incidents = [
    { title: "Payment Gateway Latency", status: "INVESTIGATING", time: "10:30 AM", desc: "Intermittent delays reported for Stripe checkout sessions." },
    { title: "Scheduled Database Backup", status: "COMPLETED", time: "02:00 AM", desc: "Weekly full backup completed successfully." },
    { title: "Minor API Outage", status: "RESOLVED", time: "Yesterday", desc: "Route /v1/riders/tracking was unresponsive for 4 minutes." },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">System Operations</h1>
          <p className="text-body text-subtle">Real-time monitoring of platform infrastructure, services, and operational health.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <History size={18} /> INCIDENT LOGS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <ShieldAlert size={18} /> MAINTENANCE MODE
          </Button>
        </div>
      </div>

      {/* Global Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Overall Health</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-[28px] font-bold text-navy">99.4%</h3>
            <span className="text-[11px] font-bold text-green-600 mb-1.5 flex items-center gap-0.5">
              <CheckCircle2 size={10} /> OPTIMAL
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Active Incidents</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">01</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. API Latency</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">38ms</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Failed Jobs (24h)</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">12</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services Grid */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-caption font-bold text-navy uppercase tracking-widest">Platform Services</h3>
            <button className="text-[10px] font-bold text-action uppercase flex items-center gap-1 hover:underline">
              <RefreshCcw size={10} /> Refresh Status
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-5 rounded-card border border-divider shadow-card hover:border-navy/20 transition-all flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-navy/5 text-navy">
                      <service.icon size={20} />
                    </div>
                    <div>
                      <p className="text-caption font-bold text-navy">{service.name}</p>
                      <p className="text-[10px] text-subtle uppercase tracking-wider">{service.uptime} Uptime</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                    service.status === "HEALTHY" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {service.status}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-divider">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-subtle uppercase font-bold tracking-widest">Latency</span>
                    <span className="text-caption font-bold text-navy">{service.latency}</span>
                  </div>
                  <div className="w-24 h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className={cn("h-full", service.status === "HEALTHY" ? "bg-navy" : "bg-orange-500")} style={{ width: service.status === "HEALTHY" ? "85%" : "40%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="flex flex-col gap-8">
          {/* Incident Feed */}
          <div className="bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4">
            <h3 className="text-caption font-bold text-navy uppercase tracking-widest">Incident Feed</h3>
            <div className="flex flex-col gap-6">
              {incidents.map((incident, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== incidents.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-[-24px] w-[1px] bg-divider" />
                  )}
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full mt-1.5 z-10 border-2 border-white",
                    incident.status === "INVESTIGATING" ? "bg-orange-500" : 
                    incident.status === "COMPLETED" ? "bg-green-500" : "bg-navy"
                  )} />
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-bold text-navy">{incident.title}</p>
                      <span className="text-[10px] text-subtle font-bold">{incident.time}</span>
                    </div>
                    <p className="text-[11px] text-subtle mt-1 leading-relaxed">{incident.desc}</p>
                    <span className={cn(
                      "inline-block mt-2 text-[9px] font-bold uppercase tracking-widest",
                      incident.status === "INVESTIGATING" ? "text-orange-600" : "text-subtle"
                    )}>
                      {incident.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Queue Status */}
          <div className="bg-navy p-6 rounded-card shadow-card flex flex-col gap-4">
            <h3 className="text-caption font-bold text-white uppercase tracking-widest">Queue Processing</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/60">
                  <span>DISPATCH_QUEUE</span>
                  <span className="text-white">Active</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-action w-3/4 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/60">
                  <span>PAYMENT_HOOKS</span>
                  <span className="text-white">Idle</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full opacity-30" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/60">
                  <span>NOTIFICATION_WORKER</span>
                  <span className="text-white">Active</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/2" />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
              <Terminal size={14} className="text-white/40" />
              <span className="text-[10px] font-mono text-white/40">node-cluster-v4-02-prod</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { History } from "lucide-react"
