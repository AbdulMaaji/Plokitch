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
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [segmentFilter, setSegmentFilter] = React.useState("all");

  React.useEffect(() => {
    let filtered = [...initialData];

    if (statusFilter !== "all") {
      filtered = filtered.filter(c => c.is_active === (statusFilter === "ACTIVE"));
    }

    if (segmentFilter !== "all") {
      filtered = filtered.filter(c => c.segment === segmentFilter);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q)
      );
    }

    setData(filtered);
  }, [searchTerm, statusFilter, segmentFilter, initialData]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "CUSTOMER",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("name")}</span>
          <span className="text-[11px] text-subtle lowercase">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "segment",
      header: "SEGMENT",
      cell: ({ row }) => {
        const segment = row.getValue("segment") as string;
        const colors: Record<string, string> = {
          VIP: "bg-purple-50 text-purple-600 border-purple-100",
          NEW: "bg-blue-50 text-blue-600 border-blue-100",
          LOYAL: "bg-green-50 text-green-600 border-green-100",
          DORMANT: "bg-gray-50 text-gray-500 border-gray-100",
          AT_RISK: "bg-red-50 text-red-600 border-red-100",
          REGULAR: "bg-navy-50 text-navy border-navy-100",
        };
        return <Badge variant="outline" className={cn("font-bold text-[10px]", colors[segment])}>{segment}</Badge>;
      },
    },
    {
      accessorKey: "totalOrders",
      header: "ORDERS",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("totalOrders")}</span>,
    },
    {
      accessorKey: "ltv",
      header: "TOTAL SPENT (LTV)",
      cell: ({ row }) => <span className="font-bold text-navy">₦{Number(row.getValue("ltv")).toLocaleString()}</span>,
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
        <SearchBar 
          placeholder="Search customers..." 
          className="max-w-md w-full" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-3">
          <FilterDropdown 
            placeholder="Segment" 
            value={segmentFilter}
            onValueChange={setSegmentFilter}
            options={[
              { label: "All Segments", value: "all" },
              { label: "VIP Customers", value: "VIP" },
              { label: "Loyal Customers", value: "LOYAL" },
              { label: "New Users", value: "NEW" },
              { label: "Dormant", value: "DORMANT" },
              { label: "At Risk", value: "AT_RISK" },
            ]} 
          />
          <FilterDropdown 
            placeholder="Status" 
            value={statusFilter}
            onValueChange={setStatusFilter}
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
