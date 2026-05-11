"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  ExternalLink, 
  User, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  History,
  Download,
  Filter,
  Search,
  Mail,
  Ban,
  UserCheck
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock Data for Customers
const CUSTOMERS = [
  {
    id: "CUST-1024",
    name: "Tunde Ednut",
    email: "tunde@kingednut.com",
    orders: 42,
    spend: "$1,240.50",
    lastActive: "2 hours ago",
    status: "ACTIVE",
    flagged: false
  },
  {
    id: "CUST-1025",
    name: "Sarah James",
    email: "sarah.j@gmail.com",
    orders: 12,
    spend: "$450.20",
    lastActive: "5 mins ago",
    status: "ACTIVE",
    flagged: false
  },
  {
    id: "CUST-1026",
    name: "Chidi Oke",
    email: "chidi.oke@outlook.com",
    orders: 84,
    spend: "$3,100.00",
    lastActive: "1 day ago",
    status: "ACTIVE",
    flagged: true
  },
  {
    id: "CUST-1027",
    name: "Aminu Kano",
    email: "akano@north.ng",
    orders: 3,
    spend: "$45.00",
    lastActive: "1 week ago",
    status: "INACTIVE",
    flagged: false
  },
  {
    id: "CUST-1028",
    name: "Yinka Ayefele",
    email: "yinka@music.com",
    orders: 28,
    spend: "$890.75",
    lastActive: "12 hours ago",
    status: "ACTIVE",
    flagged: false
  }
]

type Customer = typeof CUSTOMERS[0]

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "id",
      header: "CUSTOMER ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
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
      accessorKey: "orders",
      header: "ORDERS",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <ShoppingBag size={14} className="text-subtle" />
          <span className="font-bold text-navy">{row.getValue("orders")}</span>
        </div>
      ),
    },
    {
      accessorKey: "spend",
      header: "TOTAL SPEND",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("spend")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as any
        return <StatusBadge status={status} />
      },
    },
    {
      accessorKey: "flagged",
      header: "FLAGS",
      cell: ({ row }) => {
        const flagged = row.getValue("flagged") as boolean
        if (!flagged) return <span className="text-[11px] text-subtle">—</span>
        return (
          <div className="flex items-center gap-1 text-red-600">
            <AlertTriangle size={14} />
            <span className="text-[10px] font-bold uppercase">Flagged</span>
          </div>
        )
      },
    },
    {
      accessorKey: "lastActive",
      header: "LAST ACTIVE",
      cell: ({ row }) => <span className="text-caption font-medium text-subtle">{row.getValue("lastActive")}</span>,
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
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setSelectedCustomer(row.original)}
            >
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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Customer Operations</h1>
          <p className="text-body text-subtle">Manage platform users, monitor spending patterns, and handle account flags.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={18} /> EXPORT DATA
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <UserCheck size={18} /> USER SEGMENTS
          </Button>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Total Customers</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">24,850</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Active Today</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">1,242</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Lifetime Value</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">$482.00</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Flagged Accounts</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">42</h3>
        </div>
      </div>

      {/* Table Section */}
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
                { label: "Banned", value: "BANNED" },
              ]} 
            />
            <FilterDropdown 
              placeholder="Sort By" 
              options={[
                { label: "Highest Spend", value: "spend" },
                { label: "Most Orders", value: "orders" },
                { label: "Recently Active", value: "active" },
              ]} 
            />
          </div>
        </div>
        <DataTable columns={columns} data={CUSTOMERS} />
      </div>

      {/* Activity Drawer Placeholder (Simple Modal-like overlay for this demo) */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/20 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-divider flex justify-between items-center bg-beige/10">
              <div>
                <h3 className="text-h3 font-bold text-navy">{selectedCustomer.name}</h3>
                <p className="text-caption text-subtle mt-1">Activity Log & History</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                <MoreHorizontal className="rotate-90" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-beige/30 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-subtle uppercase">Refund History</p>
                  <p className="text-body font-bold text-navy mt-1">2 Refunds</p>
                </div>
                <div className="bg-beige/30 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-subtle uppercase">Complaints</p>
                  <p className="text-body font-bold text-red-600 mt-1">1 Open</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-caption font-bold text-navy uppercase tracking-widest border-b border-divider pb-2">Recent Activity</h4>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                      <ShoppingBag size={14} className="text-navy" />
                    </div>
                    <div>
                      <p className="text-caption font-bold text-navy">Order Placed #ORD-8492</p>
                      <p className="text-[11px] text-subtle mt-1">2 hours ago • Pizza Palace • $42.50</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <AlertTriangle size={14} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-caption font-bold text-red-600">Account Flagged</p>
                      <p className="text-[11px] text-subtle mt-1">1 day ago • Reason: Suspicious refund pattern</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                      <DollarSign size={14} className="text-navy" />
                    </div>
                    <div>
                      <p className="text-caption font-bold text-navy">Wallet Credited</p>
                      <p className="text-[11px] text-subtle mt-1">3 days ago • $10.00 • Promotional Credit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-divider flex gap-3">
              <Button className="flex-1 bg-navy text-white">MANAGE ACCOUNT</Button>
              <Button variant="outline" className="flex-1 text-red-600 border-red-100 hover:bg-red-50">SUSPEND</Button>
            </div>
          </div>
          <div className="flex-1 cursor-pointer" onClick={() => setSelectedCustomer(null)} />
        </div>
      )}
    </div>
  )
}
