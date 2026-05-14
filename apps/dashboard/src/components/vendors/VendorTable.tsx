"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, ShieldCheck, Star } from "lucide-react"
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
import { toast } from "sonner"

interface VendorTableProps {
  initialData: any[]
}

export function VendorTable({ initialData }: VendorTableProps) {
  const [data, setData] = React.useState(initialData)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    let filtered = [...initialData]

    if (statusFilter !== "all") {
      if (statusFilter === "ACTIVE") {
        filtered = filtered.filter(v => v.is_active)
      } else if (statusFilter === "SUSPENDED") {
        filtered = filtered.filter(v => !v.is_active)
      }
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      filtered = filtered.filter(v => 
        v.business_name.toLowerCase().includes(query) ||
        (v.user?.email || '').toLowerCase().includes(query) ||
        (v.cuisine_type || '').toLowerCase().includes(query)
      )
    }

    setData(filtered)
  }, [searchTerm, statusFilter, initialData])

  const columns: ColumnDef<any>[] = [
    // ... same columns (omitted for brevity)
    {
      accessorKey: "business_name",
      header: "VENDOR NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("business_name")}</span>
          <span className="text-[11px] text-subtle lowercase">{row.original.user?.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "cuisine_type",
      header: "CATEGORY",
      cell: ({ row }) => <Badge variant="outline" className="text-navy font-bold">{row.getValue("cuisine_type") || 'Uncategorized'}</Badge>,
    },
    {
      accessorKey: "rating",
      header: "PERFORMANCE",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-action fill-action" />
          <span className="font-bold text-navy">{row.getValue("rating")}</span>
        </div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "STATUS",
      cell: ({ row }) => {
        const isActive = row.getValue("is_active") as boolean
        const isVerified = row.original.is_verified as boolean
        
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit",
            isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {isActive ? (isVerified ? "ACTIVE" : "VERIFIED") : "SUSPENDED"}
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
              <DropdownMenuLabel className="text-[10px] uppercase text-subtle">Vendor Controls</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ExternalLink size={14} /> View Analytics
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ShieldCheck size={14} /> Verify Vendor
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                Suspend Account
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
          placeholder="Search vendors..." 
          className="max-w-md w-full" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterDropdown 
          placeholder="Select Status" 
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Active", value: "ACTIVE" },
            { label: "Suspended", value: "SUSPENDED" },
          ]} 
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
