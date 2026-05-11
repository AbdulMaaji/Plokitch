"use client"

import * as React from "react"
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MoreHorizontal, 
  Filter, 
  Settings,
  Circle,
  CreditCard,
  Store,
  Bike,
  MessageSquareWarning,
  ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { cn } from "@/lib/utils"

// Mock Notifications Data
const NOTIFICATIONS = [
  {
    id: "1",
    type: "CRITICAL",
    category: "system",
    title: "Database Latency Spike",
    description: "Average response time exceeded 500ms in the last 5 minutes. Investigating node-02.",
    timestamp: "10:30 AM",
    date: "Today",
    isRead: false,
    icon: ShieldAlert,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    id: "2",
    type: "ALERT",
    category: "complaint",
    title: "Urgent Refund Escalation",
    description: "Customer #8492 has escalated a refund request for Order #TRX-9921.",
    timestamp: "9:45 AM",
    date: "Today",
    isRead: false,
    icon: MessageSquareWarning,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    id: "3",
    type: "INFO",
    category: "payment",
    title: "Weekly Payouts Processed",
    description: "Batch payout for 142 vendors has been successfully initialized.",
    timestamp: "8:00 AM",
    date: "Today",
    isRead: true,
    icon: CreditCard,
    color: "text-navy",
    bg: "bg-navy/5"
  },
  {
    id: "4",
    type: "ALERT",
    category: "vendor",
    title: "New Vendor Application",
    description: "The Gourmet Kitchen has submitted their operational documents for review.",
    timestamp: "Yesterday, 4:20 PM",
    date: "Earlier",
    isRead: true,
    icon: Store,
    color: "text-navy",
    bg: "bg-navy/5"
  },
  {
    id: "5",
    type: "INFO",
    category: "rider",
    title: "Rider Supply Warning",
    description: "Low rider availability detected in Surulere zone for upcoming peak hours.",
    timestamp: "Yesterday, 2:15 PM",
    date: "Earlier",
    isRead: true,
    icon: Bike,
    color: "text-navy",
    bg: "bg-navy/5"
  }
]

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState("all")

  const categories = [
    { label: "All Alerts", value: "all", count: 12 },
    { label: "System", value: "system", count: 2 },
    { label: "Payments", value: "payment", count: 4 },
    { label: "Vendors", value: "vendor", count: 3 },
    { label: "Riders", value: "rider", count: 2 },
    { label: "Complaints", value: "complaint", count: 1 },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold text-navy">Notification Center</h1>
          <p className="text-body text-subtle">Manage internal operational alerts and system escalations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <CheckCircle2 size={18} /> MARK ALL AS READ
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
            <Settings size={18} /> SETTINGS
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Unread Alerts</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">08</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Critical Escalations</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">02</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-sm">
          <p className="text-caption font-bold text-subtle uppercase tracking-wider">Avg. Resolution Time</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">18m</h3>
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
                  )}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-navy p-6 rounded-card shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-caption font-bold text-white uppercase tracking-wider">System Status</h3>
              <p className="text-[11px] text-white/60 mt-1">All services operational</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
            <div className="flex flex-col gap-4">
              <h4 className="text-caption font-bold text-subtle uppercase tracking-widest border-b border-divider pb-2">Today</h4>
              <div className="flex flex-col gap-3">
                {NOTIFICATIONS.filter(n => n.date === "Today").map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "group p-5 rounded-card border border-divider bg-white hover:border-navy/20 transition-all shadow-sm flex gap-4",
                      !notification.isRead && "border-l-4 border-l-action"
                    )}
                  >
                    <div className={cn("p-3 rounded-full h-fit", notification.bg)}>
                      <notification.icon className={notification.color} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-body font-bold text-navy">{notification.title}</h3>
                            {!notification.isRead && <Circle size={8} fill="#ff6b00" className="text-action" />}
                          </div>
                          <p className="text-[13px] text-subtle mt-1 leading-relaxed max-w-2xl">{notification.description}</p>
                        </div>
                        <span className="text-caption font-bold text-subtle whitespace-nowrap">{notification.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[11px] font-bold text-action uppercase hover:underline">Mark as Read</button>
                        <button className="text-[11px] font-bold text-navy uppercase hover:underline">View Details</button>
                        <button className="text-[11px] font-bold text-subtle uppercase hover:underline">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earlier Section */}
            <div className="flex flex-col gap-4">
              <h4 className="text-caption font-bold text-subtle uppercase tracking-widest border-b border-divider pb-2">Earlier</h4>
              <div className="flex flex-col gap-3">
                {NOTIFICATIONS.filter(n => n.date === "Earlier").map((notification) => (
                  <div 
                    key={notification.id}
                    className="p-5 rounded-card border border-divider bg-white opacity-70 hover:opacity-100 transition-all shadow-sm flex gap-4"
                  >
                    <div className={cn("p-3 rounded-full h-fit", notification.bg)}>
                      <notification.icon className={notification.color} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-body font-bold text-navy">{notification.title}</h3>
                          <p className="text-[13px] text-subtle mt-1 leading-relaxed">{notification.description}</p>
                        </div>
                        <span className="text-caption font-bold text-subtle whitespace-nowrap">{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full py-6 text-caption font-bold text-navy tracking-widest uppercase border-dashed">
            Load More Notifications
          </Button>
        </div>
      </div>
    </div>
  )
}
