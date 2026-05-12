"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Store, 
  Bike, 
  Zap, 
  CreditCard, 
  Users, 
  MessageSquareWarning, 
  Bell, 
  BarChart3, 
  Settings,
  ChevronRight,
  Headphones,
  Terminal,
  Activity as ActivityIcon,
  History as HistoryIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Orders", icon: ShoppingBag, href: "/admin/dashboard/orders" },
  { label: "Vendors", icon: Store, href: "/admin/dashboard/vendors" },
  { label: "Riders", icon: Bike, href: "/admin/dashboard/riders" },
  { label: "Dispatch", icon: Zap, href: "/admin/dashboard/dispatch" },
  { label: "Payments", icon: CreditCard, href: "/admin/dashboard/payments" },
  { label: "Customers", icon: Users, href: "/admin/dashboard/customers" },
  { label: "Complaints", icon: MessageSquareWarning, href: "/admin/dashboard/complaints" },
  { label: "Support", icon: Headphones, href: "/admin/dashboard/support" },
  { label: "Notifications", icon: Bell, href: "/admin/dashboard/notifications" },
  { label: "System", icon: ActivityIcon, href: "/admin/dashboard/system" },
  { label: "Activity", icon: HistoryIcon, href: "/admin/dashboard/activity" },
  { label: "Analytics", icon: BarChart3, href: "/admin/dashboard/analytics" },
  { label: "Settings", icon: Settings, href: "/admin/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-navy flex flex-col border-r border-divider fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-8 pb-12">
        <Link href="/admin/dashboard" className="flex items-center gap-1.5 tracking-tight">
          <span className="font-heading font-bold text-[26px] text-white">PLO</span>
          <span className="font-heading font-bold text-[26px] text-primary">KITCH</span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-0 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-8 py-3.5 transition-all duration-200 relative group",
                isActive 
                  ? "bg-white/5 text-primary" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
              )}
              <item.icon 
                size={18} 
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-white/40 group-hover:text-white"
                )} 
              />
              <span className={cn(
                "text-nav font-medium tracking-wide",
                isActive ? "text-white" : "text-white/50 group-hover:text-white"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-6 border-t border-white/5">
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Platform Node</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
          </div>
          <p className="text-[12px] font-medium text-white/70">v2.0.4 - Production</p>
        </div>
      </div>
    </div>
  )
}
