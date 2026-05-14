"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  History, 
  User, 
  Settings, 
  Lock, 
  CreditCard, 
  Store, 
  Bike, 
  Download,
  Zap,
  ShieldCheck,
  Search,
  Filter,
  Activity,
  Terminal,
  ExternalLink,
  ShoppingBag,
  Clock,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { cn } from "@/lib/utils"
import { getActivityFeedAction, getActivityMetricsAction } from "@/app/actions/activity-actions"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ICON_MAP: Record<string, any> = {
  'ORDER_EVENT': ShoppingBag,
  'VENDOR_EVENT': Store,
  'RIDER_EVENT': Bike,
  'PAYMENT_EVENT': CreditCard,
  'CUSTOMER_EVENT': User,
  'ADMIN_EVENT': ShieldCheck,
  'SYSTEM_EVENT': Zap,
  'SECURITY_EVENT': Lock,
}

export default function ActivityPage() {
  const [logs, setLogs] = React.useState<any[]>([])
  const [metrics, setMetrics] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isLive, setIsLive] = React.useState(true)
  const [lastRefreshed, setLastRefreshed] = React.useState(new Date())
  
  // Filter States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [eventType, setEventType] = React.useState("all")
  const [severity, setSeverity] = React.useState("all")

  const fetchData = React.useCallback(async () => {
    try {
      const [newLogs, newMetrics] = await Promise.all([
        getActivityFeedAction({ 
          query: searchQuery, 
          type: eventType, 
          severity: severity 
        }),
        getActivityMetricsAction()
      ])
      setLogs(newLogs)
      setMetrics(newMetrics)
      setLastRefreshed(new Date())
    } catch (error) {
      console.error("Failed to fetch activity data", error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, eventType, severity])

  React.useEffect(() => {
    fetchData()
    let interval: any
    if (isLive) {
      interval = setInterval(fetchData, 15000)
    }
    return () => clearInterval(interval)
  }, [isLive, fetchData])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "timestamp",
      header: "TIMESTAMP",
      cell: ({ row }) => {
        const date = new Date(row.getValue("timestamp"))
        return (
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-navy">{date.toLocaleTimeString()}</span>
            <span className="text-[9px] text-subtle uppercase">{formatDistanceToNow(date, { addSuffix: true })}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "actor",
      header: "ACTOR",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
            <User size={12} className="text-navy" />
          </div>
          <span className="font-bold text-navy text-caption">{row.getValue("actor")}</span>
        </div>
      ),
    },
    {
      accessorKey: "event",
      header: "EVENT",
      cell: ({ row }) => {
        const Icon = ICON_MAP[row.original.type] || Activity
        return (
          <div className="flex items-center gap-2">
            <Icon size={14} className="text-subtle" />
            <span className="font-bold text-navy text-[10px] uppercase tracking-wider">{row.getValue("event")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "details",
      header: "DETAILS",
      cell: ({ row }) => <span className="text-caption text-subtle max-w-[300px] truncate block">{row.getValue("details")}</span>,
    },
    {
      accessorKey: "severity",
      header: "SEVERITY",
      cell: ({ row }) => {
        const severity = row.getValue("severity") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest w-fit uppercase",
            severity === "HIGH" ? "bg-red-50 text-red-600 border border-red-100" :
            severity === "MEDIUM" ? "bg-orange-50 text-orange-600 border border-orange-100" :
            "bg-blue-50 text-blue-600 border border-blue-100"
          )}>
            {severity}
          </div>
        )
      },
    },
    {
      accessorKey: "ip",
      header: "SOURCE",
      cell: ({ row }) => <span className="text-[10px] font-mono text-subtle">{row.getValue("ip")}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-[10px] font-bold text-subtle uppercase tracking-widest px-2 py-1.5">Intelligence Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-divider" />
            {row.original.type === 'ORDER_EVENT' && (
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2.5">
                <History size={14} className="text-primary" />
                <span className="font-semibold text-navy">View Order Timeline</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2.5">
              <ExternalLink size={14} /> 
              <span className="font-semibold text-navy">View Raw JSON</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2.5">
              <ShieldCheck size={14} />
              <span className="font-semibold text-navy">Investigate Actor</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Activity Audit</h1>
          <p className="text-[15px] font-medium text-subtle/80">Centralized operational intelligence and platform audit stream.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-11 px-6 border-divider">
            <Download size={18} /> DOWNLOAD CSV
          </Button>
          <Button 
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "flex items-center gap-2 h-11 px-6 shadow-sm transition-all",
              isLive ? "bg-green-600 hover:bg-green-700 text-white" : "bg-navy hover:bg-navy/90 text-white"
            )}
          >
            {isLive ? <RefreshCw size={18} className="animate-spin" /> : <Activity size={18} />}
            {isLive ? "LIVE STREAM ON" : "LIVE STREAM OFF"}
          </Button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card">
          <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Total Events (24h)</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{metrics?.totalEvents || "---"}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card">
          <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Admin Actions</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{metrics?.adminActions || "---"}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card">
          <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">High Severity</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">{metrics?.highSeverity || "0"}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card">
          <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Platform Uptime</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{metrics?.platformUptime || "99.9%"}</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar 
            placeholder="Search by actor, event, or keyword..." 
            className="max-w-md w-full h-11" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-3">
            <FilterDropdown 
              placeholder="Event Type" 
              value={eventType}
              onValueChange={setEventType}
              options={[
                { label: "All Events", value: "all" },
                { label: "Orders", value: "ORDER_EVENT" },
                { label: "Vendors", value: "VENDOR_EVENT" },
                { label: "Security", value: "SECURITY_EVENT" },
              ]} 
            />
            <FilterDropdown 
              placeholder="Severity" 
              value={severity}
              onValueChange={setSeverity}
              options={[
                { label: "All Severities", value: "all" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
              ]} 
            />
          </div>
        </div>
        <DataTable columns={columns} data={logs} />
      </div>

      {/* Terminal View */}
      <div className="bg-navy rounded-[24px] border border-white/10 shadow-2xl p-8 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Terminal size={120} className="text-white" />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-orange-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Intelligence Stream</h3>
          </div>
          <span className="text-[10px] font-mono text-white/30">Last Sync: {lastRefreshed.toLocaleTimeString()}</span>
        </div>
        <div className="font-mono text-[12px] flex flex-col gap-3">
          {logs.slice(0, 5).map((log, i) => (
            <p key={log.id} className={cn(
              "flex gap-4",
              log.severity === "HIGH" ? "text-red-400" : 
              log.severity === "MEDIUM" ? "text-orange-400" : "text-green-400"
            )}>
              <span className="text-white/20">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className="font-bold opacity-80">{log.event}:</span>
              <span className="opacity-60">{log.details}</span>
            </p>
          ))}
          <p className="text-white/20 italic animate-pulse mt-2 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin" />
            Listening for operational events...
          </p>
        </div>
      </div>
    </div>
  )
}
