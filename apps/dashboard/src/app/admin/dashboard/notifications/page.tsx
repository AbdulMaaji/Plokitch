"use client"

import * as React from "react"
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Circle,
  CreditCard,
  Store,
  Bike,
  MessageSquareWarning,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  getNotificationsAction,
  getNotificationStatsAction,
  markAllNotificationsReadAction,
  dismissNotificationAction,
} from "@/app/actions/notification-actions"

type Notification = {
  id: string
  type: "CRITICAL" | "ALERT" | "INFO"
  category: string
  title: string
  description: string
  timestamp: string
  isRead: boolean
  priority?: string
}

type NotificationStats = {
  unread: number
  critical: number
  categoryCounts: Record<string, number>
}

const categoryIconMap: Record<string, React.ElementType> = {
  system: ShieldAlert,
  complaint: MessageSquareWarning,
  payment: CreditCard,
  vendor: Store,
  rider: Bike,
  order: AlertCircle,
}

const typeColorMap: Record<string, { color: string; bg: string }> = {
  CRITICAL: { color: "text-red-600", bg: "bg-red-50" },
  ALERT: { color: "text-orange-600", bg: "bg-orange-50" },
  INFO: { color: "text-navy", bg: "bg-navy/5" },
}

function formatTimestamp(ts: string): string {
  const date = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  return date.toLocaleDateString()
}

function isToday(ts: string): boolean {
  return new Date(ts).toDateString() === new Date().toDateString()
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [stats, setStats] = React.useState<NotificationStats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [filter, setFilter] = React.useState("all")
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set())

  const loadData = React.useCallback(async () => {
    setRefreshing(true)
    try {
      const [notifRes, statsRes] = await Promise.all([
        getNotificationsAction({ category: filter }),
        getNotificationStatsAction(),
      ])
      if (notifRes.success) setNotifications(notifRes.data as Notification[])
      if (statsRes.success && statsRes.data) setStats(statsRes.data as NotificationStats)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [filter])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleMarkAllRead = async () => {
    const res = await markAllNotificationsReadAction()
    if (res.success) {
      toast.success("All notifications marked as read.")
      await loadData()
    } else {
      toast.error("Failed to mark notifications as read.")
    }
  }

  const handleDismiss = async (id: string) => {
    setDismissed(prev => new Set(prev).add(id))
    await dismissNotificationAction(id)
  }

  const handleMarkAsRead = async (id: string) => {
    await dismissNotificationAction(id)
    toast.success("Marked as read.")
    await loadData()
  }

  const visibleNotifications = notifications.filter(n => !dismissed.has(n.id))
  const todayNotifications = visibleNotifications.filter(n => isToday(n.timestamp))
  const earlierNotifications = visibleNotifications.filter(n => !isToday(n.timestamp))

  const categories = [
    { label: "All Alerts", value: "all", count: stats?.categoryCounts?.all ?? 0 },
    { label: "System", value: "system", count: stats?.categoryCounts?.system ?? 0 },
    { label: "Complaints", value: "complaint", count: stats?.categoryCounts?.complaint ?? 0 },
    { label: "Orders", value: "order", count: stats?.categoryCounts?.order ?? 0 },
    { label: "Vendors", value: "vendor", count: stats?.categoryCounts?.vendor ?? 0 },
    { label: "Riders", value: "rider", count: stats?.categoryCounts?.rider ?? 0 },
  ]

  const NotificationCard = ({
    notification,
    isEarlier = false,
  }: {
    notification: Notification
    isEarlier?: boolean
  }) => {
    const Icon = categoryIconMap[notification.category] || Bell
    const colors = typeColorMap[notification.type] || typeColorMap.INFO

    return (
      <div
        className={cn(
          "group p-5 rounded-card border border-divider bg-white hover:border-navy/20 transition-all shadow-sm flex gap-4",
          !notification.isRead && !isEarlier && "border-l-4 border-l-action",
          isEarlier && "opacity-70 hover:opacity-100"
        )}
      >
        <div className={cn("p-3 rounded-full h-fit", colors.bg)}>
          <Icon className={colors.color} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-body font-bold text-navy truncate">{notification.title}</h3>
                {!notification.isRead && !isEarlier && (
                  <Circle size={8} fill="#ff6b00" className="text-action flex-shrink-0" />
                )}
              </div>
              <p className="text-[13px] text-subtle mt-1 leading-relaxed line-clamp-2">
                {notification.description}
              </p>
            </div>
            <span className="text-caption font-bold text-subtle whitespace-nowrap flex-shrink-0">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          {!isEarlier && (
            <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="text-[11px] font-bold text-action uppercase hover:underline"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                Mark as Read
              </button>
              <button
                className="text-[11px] font-bold text-navy uppercase hover:underline"
                onClick={() => toast.info("Open the relevant section to view full details.")}
              >
                View Details
              </button>
              <button
                className="text-[11px] font-bold text-subtle uppercase hover:underline"
                onClick={() => handleDismiss(notification.id)}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

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
          <h1 className="text-h1 font-bold text-navy">Notification Center</h1>
          <p className="text-body text-subtle">Manage internal operational alerts and system escalations.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleMarkAllRead}
            disabled={refreshing}
          >
            <CheckCircle2 size={18} /> MARK ALL AS READ
          </Button>
          <Button
            className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2"
            onClick={loadData}
            disabled={refreshing}
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            REFRESH
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Unread Alerts</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">
            {String(stats?.unread ?? 0).padStart(2, "0")}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Critical Escalations</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">
            {String(stats?.critical ?? 0).padStart(2, "0")}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Total Notifications</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">
            {visibleNotifications.length}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-wider mb-4">Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-caption font-bold transition-all",
                    filter === cat.value
                      ? "bg-navy text-white shadow-md"
                      : "text-subtle hover:bg-beige hover:text-navy"
                  )}
                >
                  <span>{cat.label}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px]",
                    filter === cat.value ? "bg-white/20" : "bg-navy/5"
                  )}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-navy p-6 rounded-card shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-caption font-bold text-white uppercase tracking-wider">System Status</h3>
              <p className="text-[11px] text-white/60 mt-1">
                {stats?.critical && stats.critical > 0
                  ? `${stats.critical} critical issue${stats.critical > 1 ? "s" : ""} detected`
                  : "All services operational"
                }
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  stats?.critical && stats.critical > 0
                    ? "bg-red-500 animate-pulse"
                    : "bg-green-500 animate-pulse"
                )} />
                <span className="text-[10px] font-bold text-white uppercase">Platform Live</span>
              </div>
            </div>
            <ShieldAlert size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {/* Today Section */}
            {todayNotifications.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-caption font-bold text-subtle uppercase tracking-widest border-b border-divider pb-2">
                  Today
                </h4>
                <div className="flex flex-col gap-3">
                  {todayNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier Section */}
            {earlierNotifications.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-caption font-bold text-subtle uppercase tracking-widest border-b border-divider pb-2">
                  Earlier
                </h4>
                <div className="flex flex-col gap-3">
                  {earlierNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} isEarlier />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {visibleNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-subtle gap-2">
                <Bell size={32} className="opacity-20" />
                <p className="text-caption font-bold uppercase tracking-wider">No notifications</p>
                <p className="text-[12px]">
                  {filter !== "all"
                    ? "No notifications for this category."
                    : "You're all caught up. No active alerts."}
                </p>
              </div>
            )}
          </div>

          {visibleNotifications.length > 0 && (
            <Button
              variant="outline"
              className="w-full py-6 text-caption font-bold text-navy tracking-widest uppercase border-dashed"
              onClick={loadData}
              disabled={refreshing}
            >
              {refreshing ? <Loader2 size={16} className="animate-spin" /> : "Refresh Notifications"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
