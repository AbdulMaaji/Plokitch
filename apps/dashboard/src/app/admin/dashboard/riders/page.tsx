"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, Bike, ShieldAlert, CheckCircle2, MapPin } from "lucide-react"
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

// Mock Data for Riders
const RIDERS = [
  {
    id: "RID-502",
    name: "John Doe",
    phone: "+234 802 345 6789",
    completionRate: "98%",
    status: "ONLINE",
    currentLocation: "Central District",
    totalDeliveries: 1240,
  },
  {
    id: "RID-505",
    name: "Sarah Smith",
    phone: "+234 803 111 2222",
    completionRate: "94%",
    status: "IN_DELIVERY",
    currentLocation: "Ikeja Axis",
    totalDeliveries: 850,
  },
  {
    id: "RID-509",
    name: "Mike Ross",
    phone: "+234 805 777 8888",
    completionRate: "82%",
    status: "OFFLINE",
    currentLocation: "N/A",
    totalDeliveries: 2100,
  },
  {
    id: "RID-512",
    name: "Ben Ten",
    phone: "+234 809 000 9999",
    completionRate: "99%",
    status: "SUSPENDED",
    currentLocation: "N/A",
    totalDeliveries: 50,
  }
]

type Rider = typeof RIDERS[0]

export default function RidersPage() {
  const columns: ColumnDef<Rider>[] = [
    {
      accessorKey: "name",
      header: "RIDER NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("name")}</span>
          <span className="text-[11px] text-subtle lowercase">{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: "completionRate",
      header: "COMPLETION RATE",
      cell: ({ row }) => {
        const rate = parseInt(row.getValue("completionRate"))
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-beige rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full",
                  rate > 90 ? "bg-green-500" : rate > 80 ? "bg-action" : "bg-red-500"
                )} 
                style={{ width: `${rate}%` }} 
              />
            </div>
            <span className="font-bold text-navy text-caption">{rate}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: "totalDeliveries",
      header: "TOTAL DELIVERIES",
      cell: ({ row }) => <span className="font-semibold text-navy">{row.getValue("totalDeliveries")}</span>,
    },
    {
      accessorKey: "currentLocation",
      header: "LIVE LOCATION",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-subtle">
          <MapPin size={14} />
          <span className="text-caption font-medium">{row.getValue("currentLocation")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit uppercase",
            status === "ONLINE" ? "bg-green-50 text-green-600" :
            status === "IN_DELIVERY" ? "bg-blue-50 text-blue-600" :
            status === "OFFLINE" ? "bg-beige text-subtle" :
            "bg-red-50 text-red-600"
          )}>
            {status.replace('_', ' ')}
          </div>
        )
      },
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
              <DropdownMenuLabel className="text-[10px] uppercase text-subtle">Rider Actions</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ExternalLink size={14} /> View Tracking
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <CheckCircle2 size={14} /> Verify Documents
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                <ShieldAlert size={14} /> Suspend Rider
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
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Rider Operations</h1>
          <p className="text-body text-subtle">Monitor fleet activity and dispatch efficiency.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
          <Bike size={18} /> REGISTER RIDER
        </Button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Online Now</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">452</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">In-Transit</p>
          <h3 className="text-[28px] font-bold text-blue-600 mt-1">128</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Delivery</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">24m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Alerts</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">3</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar placeholder="Search by name, ID, or phone..." className="max-w-md w-full" />
          <FilterDropdown 
            placeholder="Fleet Status" 
            options={[
              { label: "All Riders", value: "all" },
              { label: "Online", value: "ONLINE" },
              { label: "In Delivery", value: "IN_DELIVERY" },
              { label: "Suspended", value: "SUSPENDED" },
            ]} 
          />
        </div>
        <DataTable columns={columns} data={RIDERS} />
      </div>
    </div>
  )
}
