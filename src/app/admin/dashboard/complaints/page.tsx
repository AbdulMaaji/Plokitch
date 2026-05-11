"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, MessageSquareWarning, ShieldCheck, Clock, AlertTriangle } from "lucide-react"
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
          <h1 className="text-h1 font-bold text-navy">Support Operations</h1>
          <p className="text-body text-subtle">Manage customer complaints and vendor disputes.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
          <MessageSquareWarning size={18} /> NEW ESCALATION
        </Button>
      </div>

      {/* Support Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Open Tickets</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">42</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Escalated</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">8</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Resolution</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">4.2h</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Customer CSAT</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">92%</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
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
    </div>
  )
}
