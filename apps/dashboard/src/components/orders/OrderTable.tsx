"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, MapPin, CheckCircle2, XCircle } from "lucide-react"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface OrderTableProps {
  initialData: any[]
}

export function OrderTable({ initialData }: OrderTableProps) {
  const [data, setData] = React.useState(initialData);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => (
        <span className="font-bold text-navy uppercase">#{row.getValue("id").toString().slice(0, 8)}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: "CUSTOMER",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.original.customer?.name || 'Guest'}</span>
          <span className="text-[11px] text-subtle">{row.original.customer?.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "VENDOR",
      cell: ({ row }) => (
        <span className="font-semibold text-navy">{row.original.vendor?.business_name || 'Unknown'}</span>
      ),
    },
    {
      accessorKey: "total_amount",
      header: "AMOUNT",
      cell: ({ row }) => <span className="font-bold text-navy">₦{row.getValue("total_amount")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={cn(
            "text-[10px] font-bold tracking-wider",
            status === "completed" ? "bg-green-100 text-green-700 hover:bg-green-100" :
            status === "pending" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
            status === "cancelled" ? "bg-red-100 text-red-700 hover:bg-red-100" :
            "bg-blue-100 text-blue-700 hover:bg-blue-100"
          )}>
            {status.toUpperCase()}
          </Badge>
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
              <DropdownMenuLabel className="text-[10px] uppercase text-subtle">Operations</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <ExternalLink size={14} /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <MapPin size={14} /> Track Delivery
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-green-600">
                <CheckCircle2 size={14} /> Mark Completed
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                <XCircle size={14} /> Cancel Order
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
        <SearchBar placeholder="Search orders..." className="max-w-md w-full" />
        <FilterDropdown 
          placeholder="Filter Status" 
          options={[
            { label: "All Orders", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Preparing", value: "preparing" },
            { label: "Delivering", value: "delivering" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ]} 
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
