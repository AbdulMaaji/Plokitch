"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink, ShieldCheck, UserPlus, Star } from "lucide-react"
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

// Mock Data for Vendors
const VENDORS = [
  {
    id: "VND-102",
    name: "Pizza Palace",
    email: "ops@pizzapalace.com",
    rating: 4.8,
    activeOrders: 12,
    status: "ACTIVE",
    category: "Fast Food",
  },
  {
    id: "VND-105",
    name: "Sushi Bar",
    email: "contact@sushibar.jp",
    rating: 4.9,
    activeOrders: 5,
    status: "PENDING",
    category: "Asian",
  },
  {
    id: "VND-109",
    name: "Burger Hub",
    email: "admin@burgerhub.com",
    rating: 4.5,
    activeOrders: 8,
    status: "ACTIVE",
    category: "Fast Food",
  },
  {
    id: "VND-112",
    name: "The Salad Co",
    email: "hello@saladco.com",
    rating: 4.2,
    activeOrders: 0,
    status: "SUSPENDED",
    category: "Healthy",
  }
]

type Vendor = typeof VENDORS[0]

export default function VendorsPage() {
  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "VENDOR NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("name")}</span>
          <span className="text-[11px] text-subtle lowercase">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "CATEGORY",
      cell: ({ row }) => <Badge variant="outline" className="text-navy font-bold">{row.getValue("category")}</Badge>,
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
      accessorKey: "activeOrders",
      header: "ACTIVE ORDERS",
      cell: ({ row }) => <span className="font-semibold text-navy">{row.getValue("activeOrders")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider w-fit",
            status === "ACTIVE" ? "bg-green-50 text-green-600" :
            status === "PENDING" ? "bg-orange-50 text-orange-600" :
            "bg-red-50 text-red-600"
          )}>
            {status}
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
                <ShieldCheck size={14} /> Approve Payouts
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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Vendor Operations</h1>
          <p className="text-body text-subtle">Approve new vendors and manage platform kitchen performance.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
          <UserPlus size={18} /> ADD NEW VENDOR
        </Button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Total Vendors</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">242</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Pending Verification</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">14</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Revenue Share (MTD)</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">$12,450.00</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar placeholder="Search vendors..." className="max-w-md w-full" />
          <FilterDropdown 
            placeholder="Select Status" 
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Active", value: "ACTIVE" },
              { label: "Pending", value: "PENDING" },
              { label: "Suspended", value: "SUSPENDED" },
            ]} 
          />
        </div>
        <DataTable columns={columns} data={VENDORS} />
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
