"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  ExternalLink, 
  MessageSquareWarning, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  BarChart3,
  TrendingUp,
  History,
  Search,
  Filter,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock Data for Complaints
const COMPLAINTS = [
  {
    id: "CMP-8821",
    user: "Sarah Johnson",
    subject: "Missing Items in Order",
    priority: "HIGH",
    status: "OPEN",
    category: "Order Issue",
    timestamp: "2 hours ago",
  },
  {
    id: "CMP-8822",
    user: "Pizza Palace",
    subject: "Rider Dispute - Late Arrival",
    priority: "MEDIUM",
    status: "IN_REVIEW",
    category: "Rider Issue",
    timestamp: "4 hours ago",
  },
  {
    id: "CMP-8823",
    user: "Michael Chen",
    subject: "Refund Not Processed",
    priority: "CRITICAL",
    status: "ESCALATED",
    category: "Payment Issue",
    timestamp: "1 day ago",
  },
  {
    id: "CMP-8824",
    user: "Sushi Bar",
    subject: "Address Correction",
    priority: "LOW",
    status: "RESOLVED",
    category: "Vendor Issue",
    timestamp: "2 days ago",
  }
]

type Complaint = typeof COMPLAINTS[0]

export default function ComplaintsPage() {
  const columns: ColumnDef<Complaint>[] = [
    {
      accessorKey: "id",
      header: "TICKET ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "user",
      header: "USER",
      cell: ({ row }) => <span className="font-medium text-navy">{row.getValue("user")}</span>,
    },
    {
      accessorKey: "subject",
      header: "SUBJECT",
      cell: ({ row }) => <span className="text-body font-medium text-navy">{row.getValue("subject")}</span>,
    },
    {
      accessorKey: "priority",
      header: "PRIORITY",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <div className={cn(
            "flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider",
            priority === "CRITICAL" ? "text-red-600" :
            priority === "HIGH" ? "text-orange-600" :
            priority === "MEDIUM" ? "text-blue-600" :
            "text-subtle"
          )}>
            <AlertTriangle size={12} />
            {priority}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit uppercase",
            status === "RESOLVED" ? "bg-green-50 text-green-600" :
            status === "ESCALATED" ? "bg-red-50 text-red-600" :
            status === "IN_REVIEW" ? "bg-blue-50 text-blue-600" :
            "bg-beige text-navy/40"
          )}>
            {status.replace('_', ' ')}
          </div>
        )
      },
    },
    {
      accessorKey: "timestamp",
      header: "TIMESTAMP",
      cell: ({ row }) => <span className="text-caption font-medium text-subtle">{row.getValue("timestamp")}</span>,
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
              <ExternalLink size={14} /> Open Ticket
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              Assign to Agent
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-green-600">
              <ShieldCheck size={14} /> Resolve Ticket
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
          <h1 className="text-h1 font-bold text-navy">Complaint Operations</h1>
          <p className="text-body text-subtle">Centralized intelligence for operational disputes and resolution performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <History size={18} /> RESOLUTION LOGS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <MessageSquareWarning size={18} /> NEW ESCALATION
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Open Tickets</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">42</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Escalated Cases</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">08</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Resolution Success</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">94.2%</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Response</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">4.5m</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Complaints Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar placeholder="Search by ID, user, or subject..." className="max-w-md w-full" />
            <FilterDropdown 
              placeholder="Priority Level" 
              options={[
                { label: "All Priorities", value: "all" },
                { label: "Critical", value: "CRITICAL" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
              ]} 
            />
          </div>
          <DataTable columns={columns} data={COMPLAINTS} />
        </div>

        {/* Operational Analytics Panel */}
        <div className="flex flex-col gap-6">
          {/* Complaint Resolution Health Card */}
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-wider mb-4">Resolution Health</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-subtle uppercase">Success Rate</span>
                <span className="text-body font-bold text-green-600">92%</span>
              </div>
              <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[92%]" />
              </div>
              <p className="text-[10px] text-subtle mt-1 leading-relaxed">
                Platform successfully resolved 9.2 out of 10 complaints without second-level escalation this month.
              </p>
            </div>
          </div>

          {/* Complaint Categories Card */}
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-wider mb-4">Complaint Categories</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Late Deliveries", val: "45%", color: "bg-orange-500" },
                { label: "Food Quality", val: "22%", color: "bg-red-500" },
                { label: "Missing Items", val: "18%", color: "bg-navy" },
                { label: "Rider Disputes", val: "15%", color: "bg-subtle" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
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
              <h3 className="text-caption font-bold text-white uppercase tracking-wider">Trust Score</h3>
              <p className="text-[11px] text-white/60 mt-1">Operational quality index</p>
              <div className="flex items-center gap-3 mt-4">
                <ShieldCheck className="text-action" size={24} />
                <span className="text-h2 font-bold text-white">4.8/5</span>
              </div>
            </div>
            <TrendingUp size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
