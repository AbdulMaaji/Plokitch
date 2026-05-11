"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  ExternalLink, 
  Bike, 
  Zap, 
  Clock, 
  AlertCircle, 
  Navigation2, 
  Search,
  Filter,
  History
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

// Import custom dispatch components
import { DeliveryMapPlaceholder } from "@/components/dispatch/DeliveryMapPlaceholder"
import { RiderStatusCard } from "@/components/dispatch/RiderStatusCard"
import { DispatchTimeline } from "@/components/dispatch/DispatchTimeline"

// Mock Data for Dispatch
const DISPATCH_ORDERS = [
  {
    id: "ORD-8492",
    customer: "Tunde Ednut",
    restaurant: "Pizza Palace",
    rider: "Ahmed Musa",
    status: "LIVE",
    elapsed: "12m",
    zone: "Downtown"
  },
  {
    id: "ORD-8493",
    customer: "Sarah James",
    restaurant: "The Sushi Bar",
    rider: "Blessing Okoro",
    status: "LIVE",
    elapsed: "4m",
    zone: "Lekki"
  },
  {
    id: "ORD-8494",
    customer: "Chidi Oke",
    restaurant: "Burger King",
    rider: "John David",
    status: "DELAYED",
    elapsed: "45m",
    zone: "Victoria Island"
  },
  {
    id: "ORD-8495",
    customer: "Aminu Kano",
    restaurant: "Mama Cass",
    rider: "Unassigned",
    status: "PENDING",
    elapsed: "2m",
    zone: "Ikeja"
  },
  {
    id: "ORD-8496",
    customer: "Yinka Ayefele",
    restaurant: "Chicken Republic",
    rider: "Sarah Chen",
    status: "LIVE",
    elapsed: "18m",
    zone: "Surulere"
  }
]

type DispatchOrder = typeof DISPATCH_ORDERS[0]

export default function DispatchPage() {
  const columns: ColumnDef<DispatchOrder>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => <span className="font-bold text-navy">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customer",
      header: "CUSTOMER",
    },
    {
      accessorKey: "restaurant",
      header: "RESTAURANT",
      cell: ({ row }) => <span className="font-medium text-navy">{row.getValue("restaurant")}</span>,
    },
    {
      accessorKey: "rider",
      header: "RIDER",
      cell: ({ row }) => {
        const rider = row.getValue("rider") as string
        return (
          <div className="flex items-center gap-2">
            <Bike size={14} className={rider === "Unassigned" ? "text-red-500" : "text-subtle"} />
            <span className={cn(
              "font-bold text-caption uppercase",
              rider === "Unassigned" ? "text-red-600" : "text-navy"
            )}>{rider}</span>
          </div>
        )
      },
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
      accessorKey: "elapsed",
      header: "ELAPSED",
      cell: ({ row }) => {
        const elapsed = row.getValue("elapsed") as string
        const isWarning = parseInt(elapsed) > 30
        return (
          <div className="flex items-center gap-1.5">
            <Clock size={14} className={isWarning ? "text-red-500" : "text-subtle"} />
            <span className={cn("font-bold text-caption", isWarning ? "text-red-600" : "text-navy")}>
              {elapsed}
            </span>
          </div>
        )
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
              <Navigation2 size={14} /> Track Rider
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <AlertCircle size={14} /> Reassign Rider
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
              Cancel Order
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
          <h1 className="text-h1 font-bold text-navy">Dispatch Control</h1>
          <p className="text-body text-subtle">Monitor live rider logistics and manage active delivery cycles.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <History size={18} /> DISPATCH LOGS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <Zap size={18} /> AUTO-DISPATCH ON
          </Button>
        </div>
      </div>

      {/* Dispatch Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Live Deliveries</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-[28px] font-bold text-navy">142</h3>
            <span className="text-[11px] font-bold text-green-600 mb-1.5 flex items-center gap-0.5">
              <Zap size={10} fill="currentColor" /> ACTIVE
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Active Riders</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">48/52</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Pickup Time</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">4.2m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Delayed Orders</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">12</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Dispatch Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <SearchBar placeholder="Search orders, riders, or zones..." className="max-w-md w-full" />
              <FilterDropdown 
                placeholder="Zone Filter" 
                options={[
                  { label: "All Zones", value: "all" },
                  { label: "Downtown", value: "downtown" },
                  { label: "Lekki", value: "lekki" },
                  { label: "Victoria Island", value: "vi" },
                ]} 
              />
            </div>
            <DataTable columns={columns} data={DISPATCH_ORDERS} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiderStatusCard />
            <div className="bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4">
              <h3 className="text-body font-bold text-navy uppercase tracking-wider text-caption">Logistics Health</h3>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">Rider Utilization</span>
                    <span className="text-navy">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full bg-navy w-[92%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">On-Time Delivery</span>
                    <span className="text-navy">88.5%</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full bg-action w-[88.5%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">Fleet Battery Avg.</span>
                    <span className="text-navy">74%</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[74%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="flex flex-col gap-8">
          <DeliveryMapPlaceholder />
          <DispatchTimeline />
        </div>
      </div>
    </div>
  )
}
