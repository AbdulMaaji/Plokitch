"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react"
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

interface PaymentTableProps {
  initialData: any[]
}

export function PaymentTable({ initialData }: PaymentTableProps) {
  const [data, setData] = React.useState(initialData);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "TRANSACTION ID",
      cell: ({ row }) => <span className="font-bold text-navy uppercase">{String(row.getValue("id") || "").slice(0, 8)}</span>,
    },
    {
      accessorKey: "vendor.business_name",
      header: "ENTITY",
      cell: ({ row }) => <span className="font-semibold text-navy">{row.original.vendor?.business_name || 'N/A'}</span>,
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
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit uppercase",
            status === "completed" ? "bg-green-50 text-green-600" :
            status === "pending" ? "bg-orange-50 text-orange-600" :
            "bg-red-50 text-red-600"
          )}>
            {status}
          </div>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "DATE",
      cell: ({ row }) => <span className="text-caption font-medium text-subtle">{new Date(row.getValue("created_at")).toLocaleDateString()}</span>,
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
              <ExternalLink size={14} /> View Receipt
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              Retry Transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchBar placeholder="Search by ID or entity..." className="max-w-md w-full" />
        <FilterDropdown 
          placeholder="Transaction Status" 
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
            { label: "Cancelled", value: "cancelled" },
          ]} 
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
