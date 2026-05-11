"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  ShieldAlert,
  BarChart3,
  Search,
  Filter,
  Headphones,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { StatusBadge } from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"

// Mock Data for Support Tickets
const TICKETS = [
  {
    id: "TKT-1024",
    subject: "Unable to apply promo code",
    customer: "Tunde Ednut",
    priority: "MEDIUM",
    status: "OPEN",
    agent: "Sarah Miller",
    elapsed: "14m"
  },
  {
    id: "TKT-1025",
    subject: "Rider missing for Order #8492",
    customer: "Sarah James",
    priority: "HIGH",
    status: "ESCALATED",
    agent: "John David",
    elapsed: "2m"
  },
  {
    id: "TKT-1026",
    subject: "Account verification delay",
    customer: "Chidi Oke",
    priority: "LOW",
    status: "PENDING",
    agent: "Unassigned",
    elapsed: "1h 20m"
  },
  {
    id: "TKT-1027",
    subject: "Refund request follow-up",
    customer: "Aminu Kano",
    priority: "HIGH",
    status: "OPEN",
    agent: "Sarah Miller",
    elapsed: "45m"
  }
]

type Ticket = typeof TICKETS[0]

export default function SupportPage() {
  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "id",
      header: "TICKET ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "subject",
      header: "SUBJECT",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("subject")}</span>
          <span className="text-[11px] text-subtle">{row.original.customer}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "PRIORITY",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold w-fit",
            priority === "HIGH" ? "text-red-600 bg-red-50" :
            priority === "MEDIUM" ? "text-orange-600 bg-orange-50" :
            "text-blue-600 bg-blue-50"
          )}>
            <AlertCircle size={12} />
            {priority}
          </div>
        )
      },
    },
    {
      accessorKey: "agent",
      header: "AGENT",
      cell: ({ row }) => {
        const agent = row.getValue("agent") as string
        return (
          <div className="flex items-center gap-2">
            <User size={14} className="text-subtle" />
            <span className={cn(
              "font-bold text-caption",
              agent === "Unassigned" ? "text-red-500" : "text-navy"
            )}>{agent}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as any
        return <StatusBadge status={status} />
      },
    },
    {
      accessorKey: "elapsed",
      header: "WAIT TIME",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-subtle">
          <Clock size={14} />
          <span className="text-caption font-bold">{row.getValue("elapsed")}</span>
        </div>
      ),
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
              Assign to Me
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              Mark as Resolved
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
              Escalate Ticket
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
          <h1 className="text-h1 font-bold text-navy">Support Operations</h1>
          <p className="text-body text-subtle">Monitor internal support tickets, agent performance, and resolution metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Users size={18} /> AGENT STATUS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <ShieldAlert size={18} /> PRIORITY QUEUES
          </Button>
        </div>
      </div>

      {/* Support Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Open Tickets</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">42</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. First Response</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">4.5m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Resolution Rate</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">94%</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Escalated Cases</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">08</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar placeholder="Search tickets, customers, or agents..." className="max-w-md w-full" />
            <div className="flex gap-3">
              <FilterDropdown 
                placeholder="Priority" 
                options={[
                  { label: "All Priorities", value: "all" },
                  { label: "High", value: "HIGH" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "Low", value: "LOW" },
                ]} 
              />
              <FilterDropdown 
                placeholder="Status" 
                options={[
                  { label: "All Status", value: "all" },
                  { label: "Open", value: "OPEN" },
                  { label: "Escalated", value: "ESCALATED" },
                  { label: "Resolved", value: "RESOLVED" },
                ]} 
              />
            </div>
          </div>
          <DataTable columns={columns} data={TICKETS} />
        </div>

        {/* Support Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-wider mb-4">Active Agents</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Sarah Miller", status: "Available", tickets: 4, color: "bg-green-500" },
                { name: "John David", status: "In Call", tickets: 2, color: "bg-orange-500" },
                { name: "Emily Chen", status: "Available", tickets: 1, color: "bg-green-500" },
                { name: "Michael Obi", status: "Offline", tickets: 0, color: "bg-subtle" },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">
                        {agent.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className={cn("absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full border-2 border-white", agent.color)} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-navy">{agent.name}</p>
                      <p className="text-[10px] text-subtle">{agent.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-caption font-bold text-navy">{agent.tickets}</p>
                    <p className="text-[9px] text-subtle uppercase">Tickets</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy p-6 rounded-card shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-caption font-bold text-white uppercase tracking-wider">Target SLA</h3>
              <p className="text-[11px] text-white/60 mt-1">First Response &lt; 5m</p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-h3 font-bold text-white">98%</span>
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Compliance</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-h3 font-bold text-action">2.1m</span>
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Average</span>
                </div>
              </div>
            </div>
            <Headphones size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
          </div>
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
