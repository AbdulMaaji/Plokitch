"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data for Orders
const ORDERS = [
  {
    id: "ORD-9283",
    customer: "Sarah Johnson",
    vendor: "Pizza Palace",
    rider: "John Doe",
    amount: "$42.50",
    status: "LIVE",
    timestamp: "2026-05-11 14:22",
  },
  {
    id: "ORD-9284",
    customer: "Michael Chen",
    vendor: "Sushi Bar",
    rider: "Sarah Smith",
    amount: "$68.20",
    status: "COMPLETED",
    timestamp: "2026-05-11 13:45",
  },
  {
    id: "ORD-9285",
    customer: "Emma Wilson",
    vendor: "Burger Hub",
    rider: "Mike Ross",
    amount: "$24.00",
    status: "DELAYED",
    timestamp: "2026-05-11 14:05",
  },
  {
    id: "ORD-9286",
    customer: "James Bond",
    vendor: "Golden Dragon",
    rider: "Unassigned",
    amount: "$112.00",
    status: "CANCELLED",
    timestamp: "2026-05-11 14:30",
  },
  {
    id: "ORD-9287",
    customer: "Alice Cooper",
    vendor: "Taco Bell",
    rider: "Ben Ten",
    amount: "$15.50",
    status: "LIVE",
    timestamp: "2026-05-11 14:35",
  }
]

type Order = typeof ORDERS[0]

export default function OrdersPage() {
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customer",
      header: "CUSTOMER",
    },
    {
      accessorKey: "vendor",
      header: "VENDOR",
    },
    {
      accessorKey: "rider",
      header: "RIDER",
      cell: ({ row }) => (
        <span className={row.getValue("rider") === "Unassigned" ? "text-destructive font-medium" : "text-navy"}>
          {row.getValue("rider")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <StatusBadge 
          status={row.getValue("status") as any} 
          className="uppercase text-[10px] tracking-wider" 
        />
      ),
    },
    {
      accessorKey: "timestamp",
      header: "TIMESTAMP",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-[10px] uppercase text-subtle">Actions</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ExternalLink size={14} /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                Manage Dispatch
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Order Management</h1>
          <p className="text-[15px] font-medium text-subtle/80">Monitor and manage all platform orders in real-time.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white font-heading font-semibold text-[13px] tracking-wide px-6 py-6 shadow-sm">
          <Download size={18} className="mr-2" /> EXPORT CSV
        </Button>
      </div>

      <div className="bg-white p-8 rounded-card border border-divider shadow-sm flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="flex flex-col md:flex-row gap-6 flex-1 w-full">
          <div className="flex-1 max-w-md">
            <p className="text-[11px] font-bold text-subtle/60 uppercase tracking-widest mb-2 px-1">Search Orders</p>
            <SearchBar placeholder="Search by ID, customer..." className="h-12 rounded-xl" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-subtle/60 uppercase tracking-widest mb-2 px-1">Status</p>
            <FilterDropdown 
              placeholder="Filter by Status" 
              options={[
                { label: "All Statuses", value: "all" },
                { label: "Live Orders", value: "LIVE" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Delayed", value: "DELAYED" },
                { label: "Cancelled", value: "CANCELLED" },
              ]} 
              className="h-12 rounded-xl"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-subtle/60 uppercase tracking-widest mb-2 px-1">Vendor</p>
            <FilterDropdown 
              placeholder="Select Vendor" 
              options={[
                { label: "All Vendors", value: "all" },
                { label: "Pizza Palace", value: "pizza" },
                { label: "Sushi Bar", value: "sushi" },
              ]} 
              className="h-12 rounded-xl"
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2 h-12 px-8 font-heading font-semibold text-[13px] tracking-wide border-divider hover:bg-muted/30 rounded-xl">
          <Filter size={18} /> MORE FILTERS
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={ORDERS} />
    </div>
  )
}
