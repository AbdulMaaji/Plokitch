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
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
  { label: "Vendors", icon: Store, href: "/dashboard/vendors" },
  { label: "Riders", icon: Bike, href: "/dashboard/riders" },
  { label: "Dispatch", icon: Zap, href: "/dashboard/dispatch" },
  { label: "Payments", icon: CreditCard, href: "/dashboard/payments" },
  { label: "Customers", icon: Users, href: "/dashboard/customers" },
  { label: "Complaints", icon: MessageSquareWarning, href: "/dashboard/complaints" },
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-navy flex flex-col border-r border-divider fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-8 pb-12">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-bold text-[24px] text-white">PLO</span>
          <span className="font-bold text-[24px] text-action">KITCH</span>
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
                "flex items-center gap-3 px-8 py-3.5 transition-all duration-150",
                isActive 
                  ? "bg-beige border-l-[3px] border-action text-navy" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-colors",
                  isActive ? "text-action" : "text-white/60"
                )} 
              />
              <span className={cn(
                "text-nav font-semibold",
                isActive ? "text-navy" : "text-white/60"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Platform Node</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-[13px] font-semibold text-white/90">v2.0.4 - Production</p>
        </div>
      </div>
    </div>
  )
}
