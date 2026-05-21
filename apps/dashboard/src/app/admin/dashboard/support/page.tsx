"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  Clock, 
  AlertCircle, 
  User, 
  ShieldAlert,
  Headphones,
  Users,
  Loader2,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { StatusBadge } from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getSupportTicketsAction,
  getSupportStatsAction,
  resolveTicketAction,
  escalateTicketAction,
  updateTicketStatusAction,
} from "@/app/actions/support-actions"
import { toast } from "sonner"

type Ticket = {
  id: string
  subject: string
  description: string
  status: string
  priority: string
  category: string
  created_at: string
  updated_at: string
  customer?: { name: string; email: string } | null
  order?: { status: string } | null
}

type SupportStats = {
  open: number
  escalated: number
  resolved: number
  pending: number
  total: number
  avgResponseMinutes: number
  resolutionRate: number
}

function formatElapsed(dateStr: string): string {
  const created = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - created.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m`
  return `${Math.floor(diffHours / 24)}d`
}

export default function SupportPage() {

  const [tickets, setTickets] = React.useState<Ticket[]>([])
  const [stats, setStats] = React.useState<SupportStats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [actionLoading, setActionLoading] = React.useState<string | null>(null)

  const loadData = React.useCallback(async () => {
    setRefreshing(true)
    try {
      const [ticketsRes, statsRes] = await Promise.all([
        getSupportTicketsAction({ status: statusFilter }),
        getSupportStatsAction(),
      ])
      if (ticketsRes.success) setTickets(ticketsRes.data as Ticket[])
      if (statsRes.success && statsRes.data) setStats(statsRes.data as SupportStats)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [statusFilter])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleResolve = async (ticketId: string) => {
    setActionLoading(ticketId)
    const res = await resolveTicketAction(ticketId)
    if (res.success) {
      toast.success("Ticket resolved — marked as resolved successfully.")
      await loadData()
    } else {
      toast.error(res.error || "Action failed")
    }
    setActionLoading(null)
  }

  const handleEscalate = async (ticketId: string) => {
    setActionLoading(ticketId)
    const res = await escalateTicketAction(ticketId)
    if (res.success) {
      toast.success("Ticket escalated.")
      await loadData()
    } else {
      toast.error(res.error || "Action failed")
    }
    setActionLoading(null)
  }

  const handleAssignToMe = async (ticketId: string) => {
    setActionLoading(ticketId)
    const res = await updateTicketStatusAction(ticketId, 'in-progress')
    if (res.success) {
      toast.success("Ticket assigned — you now own this ticket.")
      await loadData()
    } else {
      toast.error(res.error || "Action failed")
    }
    setActionLoading(null)
  }

  const filteredTickets = React.useMemo(() => {
    return tickets.filter(t => {
      const matchesPriority = priorityFilter === "all" || t.priority.toLowerCase() === priorityFilter.toLowerCase()
      const matchesSearch = !searchQuery ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesPriority && matchesSearch
    })
  }, [tickets, priorityFilter, searchQuery])

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "id",
      header: "TICKET ID",
      cell: ({ row }) => (
        <span className="font-bold text-navy font-mono text-[11px]">
          #{row.getValue<string>("id").slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      accessorKey: "subject",
      header: "SUBJECT",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-navy">{row.getValue("subject")}</span>
          <span className="text-[11px] text-subtle">{row.original.customer?.name || "Unknown Customer"}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "PRIORITY",
      cell: ({ row }) => {
        const priority = (row.getValue("priority") as string).toLowerCase()
        return (
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold w-fit",
            priority === "high" || priority === "urgent" ? "text-red-600 bg-red-50" :
            priority === "medium" ? "text-orange-600 bg-orange-50" :
            "text-blue-600 bg-blue-50"
          )}>
            <AlertCircle size={12} />
            {priority.toUpperCase()}
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: "CATEGORY",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User size={14} className="text-subtle" />
          <span className="font-bold text-caption text-navy capitalize">{row.getValue("category")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = (row.getValue("status") as string).toUpperCase()
        return <StatusBadge status={status as any} />
      },
    },
    {
      accessorKey: "created_at",
      header: "WAIT TIME",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-subtle">
          <Clock size={14} />
          <span className="text-caption font-bold">{formatElapsed(row.getValue("created_at"))}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const ticket = row.original
        const isLoading = actionLoading === ticket.id
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <MoreHorizontal size={16} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleAssignToMe(ticket.id)}
              >
                Assign to Me
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleResolve(ticket.id)}
                disabled={ticket.status === 'resolved'}
              >
                Mark as Resolved
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600"
                onClick={() => handleEscalate(ticket.id)}
                disabled={ticket.status === 'escalated'}
              >
                Escalate Ticket
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
          <h1 className="text-h1 font-bold text-navy">Support Operations</h1>
          <p className="text-body text-subtle">Monitor internal support tickets, agent performance, and resolution metrics.</p>
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
          <Button
            className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2"
            onClick={() => setStatusFilter(statusFilter === "escalated" ? "all" : "escalated")}
          >
            <ShieldAlert size={18} />
            {statusFilter === "escalated" ? "ALL TICKETS" : "PRIORITY QUEUES"}
          </Button>
        </div>
      </div>

      {/* Support Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Open Tickets</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats?.open ?? 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. First Response</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats?.avgResponseMinutes ?? "—"}m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Resolution Rate</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">
            {stats?.total === 0 ? "N/A" : `${stats?.resolutionRate ?? 0}%`}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Escalated Cases</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">
            {String(stats?.escalated ?? 0).padStart(2, "0")}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar
              placeholder="Search tickets, customers..."
              className="max-w-md w-full"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-3">
              <FilterDropdown
                placeholder="Priority"
                value={priorityFilter}
                onValueChange={setPriorityFilter}
                options={[
                  { label: "All Priorities", value: "all" },
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
              />
              <FilterDropdown
                placeholder="Status"
                value={statusFilter}
                onValueChange={setStatusFilter}
                options={[
                  { label: "All Status", value: "all" },
                  { label: "Open", value: "open" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Escalated", value: "escalated" },
                  { label: "Resolved", value: "resolved" },
                ]}
              />
            </div>
          </div>
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-subtle gap-2">
              <Headphones size={32} className="opacity-20" />
              <p className="text-caption font-bold uppercase tracking-wider">No tickets found</p>
              <p className="text-[12px]">
                {stats?.total === 0 ? "No support tickets have been submitted yet." : "Try adjusting your filters."}
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredTickets} />
          )}
        </div>

        {/* Support Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-wider mb-4">Ticket Breakdown</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Open", value: stats?.open ?? 0, color: "bg-blue-500" },
                { label: "In Progress", value: stats?.pending ?? 0, color: "bg-orange-500" },
                { label: "Escalated", value: stats?.escalated ?? 0, color: "bg-red-500" },
                { label: "Resolved", value: stats?.resolved ?? 0, color: "bg-green-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                    <p className="text-[12px] font-bold text-navy">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-caption font-bold text-navy">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy p-6 rounded-card shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-caption font-bold text-white uppercase tracking-wider">Target SLA</h3>
              <p className="text-[11px] text-white/60 mt-1">First Response &lt; 5m</p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-h3 font-bold text-white">
                    {stats?.total === 0 ? "N/A" : `${stats?.resolutionRate ?? 0}%`}
                  </span>
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Compliance</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-h3 font-bold text-action">{stats?.avgResponseMinutes ?? "—"}m</span>
                  <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Average</span>
                </div>
              </div>
            </div>
            <Headphones size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
