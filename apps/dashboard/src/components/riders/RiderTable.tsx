"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, ShieldAlert, CheckCircle2, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
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

interface RiderTableProps {
  initialData: any[]
}

export function RiderTable({ initialData }: RiderTableProps) {
  const [data, setData] = React.useState(initialData)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    let filtered = [...initialData]

    if (statusFilter !== "all") {
      if (statusFilter === "ONLINE") {
        filtered = filtered.filter(r => r.is_available)
      } else if (statusFilter === "OFFLINE") {
        filtered = filtered.filter(r => !r.is_available)
      }
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      filtered = filtered.filter(r => 
        (r.user?.name || '').toLowerCase().includes(query) ||
        (r.user?.phone || '').toLowerCase().includes(query) ||
        (r.vehicle_type || '').toLowerCase().includes(query)
      )
    }

    setData(filtered)
  }, [searchTerm, statusFilter, initialData])

  const columns: ColumnDef<any>[] = [
    // ... same columns (omitted)
    {
      accessorKey: "user.name",
      header: "RIDER NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.original.user?.name || 'Unknown Rider'}</span>
          <span className="text-[11px] text-subtle">{row.original.user?.phone || 'No phone'}</span>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "RATING",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-action fill-action" />
          <span className="font-bold text-navy">{row.getValue("rating") || '0.0'}</span>
        </div>
      ),
    },
    {
      accessorKey: "total_deliveries",
      header: "TOTAL DELIVERIES",
      cell: ({ row }) => <span className="font-semibold text-navy">{row.getValue("total_deliveries")}</span>,
    },
    {
      accessorKey: "is_available",
      header: "STATUS",
      cell: ({ row }) => {
        const isAvailable = row.getValue("is_available") as boolean
        const isVerified = row.original.is_verified as boolean
        
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit uppercase",
            isAvailable ? "bg-green-50 text-green-600" : "bg-beige text-subtle"
          )}>
            {isAvailable ? "ONLINE" : "OFFLINE"}
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchBar 
          placeholder="Search by name, ID, or phone..." 
          className="max-w-md w-full" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterDropdown 
          placeholder="Fleet Status" 
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={[
            { label: "All Riders", value: "all" },
            { label: "Online", value: "ONLINE" },
            { label: "Offline", value: "OFFLINE" },
          ]} 
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
