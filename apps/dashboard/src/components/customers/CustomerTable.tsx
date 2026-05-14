"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  ShoppingBag, 
  History,
  Mail,
  Ban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CustomerTableProps {
  initialData: any[]
}

export function CustomerTable({ initialData }: CustomerTableProps) {
  const [data, setData] = React.useState(initialData);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "CUSTOMER ID",
      cell: ({ row }) => <span className="font-bold text-navy uppercase">{row.getValue("id").toString().slice(0, 8)}</span>,
    },
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("name")}</span>
          <span className="text-[11px] text-subtle">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "STATUS",
      cell: ({ row }) => {
        const isActive = row.getValue("is_active") as boolean
        return <StatusBadge status={isActive ? "ACTIVE" : "INACTIVE"} />
      },
    },
    {
      accessorKey: "created_at",
      header: "JOINED",
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
              <History size={14} /> View Activity
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Mail size={14} /> Email Customer
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
              <Ban size={14} /> Flag Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchBar placeholder="Search by name, email, or ID..." className="max-w-md w-full" />
        <div className="flex gap-3">
          <FilterDropdown 
            placeholder="Account Status" 
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ]} 
          />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
