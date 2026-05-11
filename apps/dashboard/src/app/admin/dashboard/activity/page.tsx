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
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { cn } from "@/lib/utils"

// Mock Data for Activity Logs
const ACTIVITY_LOGS = [
  {
    id: "LOG-9921",
    timestamp: "2026-05-11 12:45:02",
    actor: "Admin (Abdul)",
    event: "VENDOR_VERIFIED",
    details: "Verified 'The Sushi Bar' documents.",
    severity: "INFO",
    ip: "192.168.1.42",
    icon: Store
  },
  {
    id: "LOG-9922",
    timestamp: "2026-05-11 12:40:15",
    actor: "System",
    event: "AUTO_DISPATCH_ON",
    details: "Algorithm switched to high-demand mode.",
    severity: "INFO",
    ip: "Internal",
    icon: Zap
  },
  {
    id: "LOG-9923",
    timestamp: "2026-05-11 12:35:48",
    actor: "Admin (Sarah)",
    event: "REFUND_APPROVED",
    details: "Approved $42.50 for Order #8492.",
    severity: "MEDIUM",
    ip: "102.44.12.8",
    icon: CreditCard
  },
  {
    id: "LOG-9924",
    timestamp: "2026-05-11 12:30:11",
    actor: "Admin (System)",
    event: "SECURITY_AUTH_FAILED",
    details: "3 failed login attempts for user 'moderator_01'.",
    severity: "HIGH",
    ip: "45.12.84.192",
    icon: Lock
  },
  {
    id: "LOG-9925",
    timestamp: "2026-05-11 12:15:22",
    actor: "Rider (Ahmed)",
    event: "RIDER_GPS_OFFLINE",
    details: "Connection lost for 4 minutes in Downtown.",
    severity: "LOW",
    ip: "Mobile (LTE)",
    icon: Bike
  }
]

type ActivityLog = typeof ACTIVITY_LOGS[0]

export default function ActivityPage() {
  const columns: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: "timestamp",
      header: "TIMESTAMP",
      cell: ({ row }) => <span className="text-caption font-medium text-subtle">{row.getValue("timestamp")}</span>,
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
        const Icon = row.original.icon
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
      cell: ({ row }) => <span className="text-caption text-subtle max-w-[250px] truncate block">{row.getValue("details")}</span>,
    },
    {
      accessorKey: "severity",
      header: "SEVERITY",
      cell: ({ row }) => {
        const severity = row.getValue("severity") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest w-fit uppercase",
            severity === "HIGH" ? "bg-red-50 text-red-600" :
            severity === "MEDIUM" ? "bg-orange-50 text-orange-600" :
            "bg-blue-50 text-blue-600"
          )}>
            {severity}
          </div>
        )
      },
    },
    {
      accessorKey: "ip",
      header: "IP ADDRESS",
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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <ExternalLink size={14} /> View Raw JSON
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              Investigate Actor
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
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Activity Audit</h1>
          <p className="text-body text-subtle">Complete audit trail of platform administrative and operational events.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={18} /> DOWNLOAD CSV
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <Activity size={18} /> LIVE STREAM OFF
          </Button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Total Events (24h)</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">1,842</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Admin Actions</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">124</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">High Severity</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">08</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Unique Actors</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">452</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar placeholder="Search by actor, event, or keyword..." className="max-w-md w-full" />
          <div className="flex gap-3">
            <FilterDropdown 
              placeholder="Event Type" 
              options={[
                { label: "All Events", value: "all" },
                { label: "Admin Actions", value: "admin" },
                { label: "System Events", value: "system" },
                { label: "Security Logs", value: "security" },
              ]} 
            />
            <FilterDropdown 
              placeholder="Severity" 
              options={[
                { label: "All Severities", value: "all" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
              ]} 
            />
          </div>
        </div>
        <DataTable columns={columns} data={ACTIVITY_LOGS} />
      </div>

      {/* Terminal View Placeholder */}
      <div className="bg-navy rounded-card border border-white/10 shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={16} className="text-white/40" />
          <h3 className="text-caption font-bold text-white/40 uppercase tracking-widest">Real-time Stream</h3>
        </div>
        <div className="font-mono text-[11px] flex flex-col gap-2">
          <p className="text-green-400 opacity-80">[12:45:02] INFO: VENDOR_VERIFIED - Actor: admin_abdul - Target: sushi_bar_01</p>
          <p className="text-blue-400 opacity-80">[12:40:15] INFO: AUTO_DISPATCH_ON - Actor: system - Region: downtown</p>
          <p className="text-orange-400 opacity-80">[12:35:48] WARN: REFUND_APPROVED - Actor: admin_sarah - Amount: 42.50</p>
          <p className="text-red-400 animate-pulse">[12:30:11] ERROR: SECURITY_AUTH_FAILED - Actor: moderator_01 - Action: login</p>
          <p className="text-white/20 italic">Waiting for new events...</p>
        </div>
      </div>
    </div>
  )
}

// Helper components for the table
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
