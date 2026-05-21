"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import {
  MoreHorizontal,
  Bike,
  Zap,
  Clock,
  AlertCircle,
  Navigation2,
  History,
  Loader2,
  RefreshCw,
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
import { cn } from "@/lib/utils"
import { DeliveryMapPlaceholder } from "@/components/dispatch/DeliveryMapPlaceholder"
import { RiderStatusCard } from "@/components/dispatch/RiderStatusCard"
import { DispatchTimeline } from "@/components/dispatch/DispatchTimeline"
import {
  getDispatchOrdersAction,
  getDispatchStatsAction,
  getActiveRidersAction,
  cancelOrderAction,
  getDispatchTimelineAction,
} from "@/app/actions/dispatch-actions"
import { toast } from "sonner"

type Order = {
  id: string
  status: string
  total_amount: string
  created_at: string
  updated_at: string
  estimated_delivery?: string
  customer?: { name: string; email: string } | null
  vendor?: { business_name: string } | null
  rider?: { name: string } | null
}

type DispatchStats = {
  liveDeliveries: number
  activeRiders: number
  totalRiders: number
  avgPickupTime: number
  delayedOrders: number
}

function formatElapsed(dateStr: string): string {
  const created = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - created.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m`
  const diffHours = Math.floor(diffMins / 60)
  return `${diffHours}h ${diffMins % 60}m`
}

function isDelayed(order: Order): boolean {
  if (!order.estimated_delivery) {
    // Heuristic: if order is older than 60 min and not completed
    const ageMs = new Date().getTime() - new Date(order.created_at).getTime()
    return ageMs > 60 * 60 * 1000
  }
  return new Date(order.estimated_delivery) < new Date()
}

function getDispatchStatus(order: Order): string {
  if (isDelayed(order)) return "DELAYED"
  if (!order.rider) return "PENDING"
  if (order.status === "delivering" || order.status === "picking") return "LIVE"
  return order.status.toUpperCase()
}

export default function DispatchPage() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [stats, setStats] = React.useState<DispatchStats | null>(null)
  const [riders, setRiders] = React.useState<any[]>([])
  const [timelineEvents, setTimelineEvents] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [actionLoading, setActionLoading] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [zoneFilter, setZoneFilter] = React.useState("all")

  const loadData = React.useCallback(async () => {
    setRefreshing(true)
    try {
      const [ordersRes, statsRes, ridersRes, timelineRes] = await Promise.all([
        getDispatchOrdersAction(),
        getDispatchStatsAction(),
        getActiveRidersAction(),
        getDispatchTimelineAction(),
      ])
      if (ordersRes.success) setOrders(ordersRes.data as Order[])
      if (statsRes.success && statsRes.data) setStats(statsRes.data as DispatchStats)
      if (ridersRes.success) setRiders(ridersRes.data as any[])
      if (timelineRes.success) setTimelineEvents(timelineRes.data as any[])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  React.useEffect(() => {
    loadData()
    // Auto-refresh every 30 seconds for live dispatch view
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [loadData])

  const handleCancelOrder = async (orderId: string) => {
    setActionLoading(orderId)
    const res = await cancelOrderAction(orderId)
    if (res.success) {
      toast.success('Order cancelled successfully.')
      await loadData()
    } else {
      toast.error(res.error || "Action failed")
    }
    setActionLoading(null)
  }

  const filteredOrders = React.useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = !searchQuery ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.vendor?.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.rider?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [orders, searchQuery])

  // Logistics health derived from real stats
  const riderUtilization = stats && stats.activeRiders > 0 && stats.totalRiders > 0
    ? Math.round((stats.activeRiders / Math.max(stats.totalRiders, 1)) * 100)
    : 0
  const onTimeDelivery = stats && stats.liveDeliveries > 0
    ? Math.round(((stats.liveDeliveries - stats.delayedOrders) / stats.liveDeliveries) * 100)
    : 0

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => (
        <span className="font-bold text-navy font-mono text-[11px]">
          #{row.getValue<string>("id").slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      id: "customer",
      header: "CUSTOMER",
      cell: ({ row }) => (
        <span className="text-navy">{row.original.customer?.name || "—"}</span>
      ),
    },
    {
      id: "restaurant",
      header: "RESTAURANT",
      cell: ({ row }) => (
        <span className="font-medium text-navy">{row.original.vendor?.business_name || "—"}</span>
      ),
    },
    {
      id: "rider",
      header: "RIDER",
      cell: ({ row }) => {
        const riderName = row.original.rider?.name
        return (
          <div className="flex items-center gap-2">
            <Bike size={14} className={riderName ? "text-subtle" : "text-red-500"} />
            <span className={cn(
              "font-bold text-caption uppercase",
              riderName ? "text-navy" : "text-red-600"
            )}>
              {riderName || "Unassigned"}
            </span>
          </div>
        )
      },
    },
    {
      id: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const dispatchStatus = getDispatchStatus(row.original)
        return <StatusBadge status={dispatchStatus as any} />
      },
    },
    {
      id: "elapsed",
      header: "ELAPSED",
      cell: ({ row }) => {
        const elapsed = formatElapsed(row.original.created_at)
        const warning = isDelayed(row.original)
        return (
          <div className="flex items-center gap-1.5">
            <Clock size={14} className={warning ? "text-red-500" : "text-subtle"} />
            <span className={cn("font-bold text-caption", warning ? "text-red-600" : "text-navy")}>
              {elapsed}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
        const isLoading = actionLoading === order.id
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <MoreHorizontal size={16} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Navigation2 size={14} /> Track Rider
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toast.info(`Go to Riders page to assign a new rider to order #${order.id.slice(0, 8).toUpperCase()}`)}
              >
                <AlertCircle size={14} /> Reassign Rider
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleCancelOrder(order.id)}
                disabled={order.status === 'cancelled'}
              >
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-navy/30" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Dispatch Control</h1>
          <p className="text-body text-subtle">Monitor live rider logistics and manage active delivery cycles.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={loadData}
            disabled={refreshing}
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            REFRESH
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <Zap size={18} /> AUTO-DISPATCH
          </Button>
        </div>
      </div>

      {/* Dispatch Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Live Deliveries</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-[28px] font-bold text-navy">{stats?.liveDeliveries ?? 0}</h3>
            <span className="text-[11px] font-bold text-green-600 mb-1.5 flex items-center gap-0.5">
              <Zap size={10} fill="currentColor" /> ACTIVE
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Active Riders</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats?.activeRiders ?? 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Pickup Time</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats?.avgPickupTime ?? "—"}m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Delayed Orders</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">{stats?.delayedOrders ?? 0}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Dispatch Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <SearchBar
                placeholder="Search orders, riders..."
                className="max-w-md w-full"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
              <FilterDropdown
                placeholder="Status Filter"
                value={zoneFilter}
                onValueChange={setZoneFilter}
                options={[
                  { label: "All Orders", value: "all" },
                  { label: "Live", value: "delivering" },
                  { label: "Pending", value: "pending" },
                  { label: "Picking Up", value: "picking" },
                ]}
              />
            </div>
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-subtle gap-2">
                <Bike size={32} className="opacity-20" />
                <p className="text-caption font-bold uppercase tracking-wider">No active dispatches</p>
                <p className="text-[12px]">All orders have been delivered or there are no active orders.</p>
              </div>
            ) : (
              <DataTable columns={columns} data={filteredOrders} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiderStatusCard riders={riders} />
            <div className="bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4">
              <h3 className="text-body font-bold text-navy uppercase tracking-wider text-caption">Logistics Health</h3>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">Rider Utilization</span>
                    <span className="text-navy">{riderUtilization}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full bg-navy" style={{ width: `${riderUtilization}%` }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">On-Time Delivery</span>
                    <span className="text-navy">{onTimeDelivery}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full bg-action" style={{ width: `${onTimeDelivery}%` }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-subtle uppercase">Active Orders</span>
                    <span className="text-navy">{stats?.liveDeliveries ?? 0}</span>
                  </div>
                  <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${Math.min(((stats?.liveDeliveries ?? 0) / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="flex flex-col gap-8">
          <DeliveryMapPlaceholder />
          <DispatchTimeline events={timelineEvents} />
        </div>
      </div>
    </div>
  )
}
