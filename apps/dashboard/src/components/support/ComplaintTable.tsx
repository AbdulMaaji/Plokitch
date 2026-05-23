"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
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

interface ComplaintTableProps {
  initialData: any[]
}

export function ComplaintTable({ initialData }: ComplaintTableProps) {
  const [data, setData] = React.useState(initialData);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "TICKET ID",
      cell: ({ row }) => <span className="font-bold text-navy uppercase">{String(row.getValue("id") || "").slice(0, 8)}</span>,
    },
    {
      accessorKey: "customer.name",
      header: "USER",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.original.customer?.name || 'Anonymous'}</span>
          <span className="text-[11px] text-subtle">{row.original.customer?.email}</span>
        </div>
      ),
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
            priority === "urgent" ? "text-red-600" :
            priority === "high" ? "text-orange-600" :
            priority === "medium" ? "text-blue-600" :
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
            status === "resolved" ? "bg-green-50 text-green-600" :
            status === "in-progress" ? "bg-blue-50 text-blue-600" :
            status === "open" ? "bg-orange-50 text-orange-600" :
            "bg-beige text-navy/40"
          )}>
            {status}
          </div>
        )
      },
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchBar placeholder="Search by ID, user, or subject..." className="max-w-md w-full" />
        <FilterDropdown 
          placeholder="Priority Level" 
          options={[
            { label: "All Priorities", value: "all" },
            { label: "Urgent", value: "urgent" },
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]} 
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
