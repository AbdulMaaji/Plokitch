"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, CreditCard, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react"
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

// Mock Data for Payments
const PAYMENTS = [
  {
    id: "TRX-4492",
    entity: "Sushi Bar",
    type: "PAYOUT",
    amount: "$1,240.00",
    status: "SUCCESSFUL",
    method: "Bank Transfer",
    timestamp: "2026-05-11 10:30",
  },
  {
    id: "TRX-4493",
    entity: "John Doe (Rider)",
    type: "PAYOUT",
    amount: "$150.00",
    status: "PENDING",
    method: "Wallet",
    timestamp: "2026-05-11 11:15",
  },
  {
    id: "TRX-4494",
    entity: "Sarah Johnson",
    type: "REFUND",
    amount: "$42.50",
    status: "SUCCESSFUL",
    method: "Credit Card",
    timestamp: "2026-05-11 11:45",
  },
  {
    id: "TRX-4495",
    entity: "Pizza Palace",
    type: "PAYOUT",
    amount: "$2,100.00",
    status: "FAILED",
    method: "Bank Transfer",
    timestamp: "2026-05-11 12:00",
  }
]

type Payment = typeof PAYMENTS[0]

export default function PaymentsPage() {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "TRANSACTION ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "entity",
      header: "ENTITY",
    },
    {
      accessorKey: "type",
      header: "TYPE",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <div className="flex items-center gap-2">
            {type === "PAYOUT" ? (
              <ArrowUpRight size={14} className="text-orange-600" />
            ) : (
              <ArrowDownLeft size={14} className="text-blue-600" />
            )}
            <span className="font-bold text-navy text-caption uppercase">{type}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("amount")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit uppercase",
            status === "SUCCESSFUL" ? "bg-green-50 text-green-600" :
            status === "PENDING" ? "bg-orange-50 text-orange-600" :
            "bg-red-50 text-red-600"
          )}>
            {status}
          </div>
        )
      },
    },
    {
      accessorKey: "method",
      header: "METHOD",
      cell: ({ row }) => <span className="text-caption font-medium text-subtle">{row.getValue("method")}</span>,
    },
    {
      accessorKey: "timestamp",
      header: "DATE",
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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Payment Operations</h1>
          <p className="text-body text-subtle">Manage platform payouts, refunds, and financial health.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet size={18} /> SETTLEMENTS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <CreditCard size={18} /> INITIATE PAYOUT
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Net Platform Revenue</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">$158,240.00</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Pending Payouts</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">$12,400.00</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Refund Rate</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">1.2%</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar placeholder="Search by ID or entity..." className="max-w-md w-full" />
          <FilterDropdown 
            placeholder="Transaction Type" 
            options={[
              { label: "All Types", value: "all" },
              { label: "Payouts", value: "PAYOUT" },
              { label: "Refunds", value: "REFUND" },
            ]} 
          />
        </div>
        <DataTable columns={columns} data={PAYMENTS} />
      </div>
    </div>
  )
}
