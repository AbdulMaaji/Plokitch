import * as React from "react"
import { LucideIcon, ShoppingBag, Bike, Store, AlertCircle, Clock, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  icon?: LucideIcon
  type: 'order' | 'rider' | 'vendor' | 'alert' | 'system' | 'payout'
  status?: 'success' | 'warning' | 'error' | 'info'
}

const TYPE_CONFIG: Record<ActivityItem['type'], { icon: LucideIcon; color: string; bgColor: string }> = {
  order: { icon: ShoppingBag, color: "text-amber-600", bgColor: "bg-amber-50" },
  rider: { icon: Bike, color: "text-blue-600", bgColor: "bg-blue-50" },
  vendor: { icon: Store, color: "text-purple-600", bgColor: "bg-purple-50" },
  alert: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50" },
  system: { icon: ShieldCheck, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  payout: { icon: CreditCard, color: "text-indigo-600", bgColor: "bg-indigo-50" },
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[18px] font-heading font-bold text-navy">Live Operational Updates</h3>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Live</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        {items.map((item, index) => {
          // Fallback for mapping the new categories to UI types
          const uiType = (item.type as string).toLowerCase().includes('order') ? 'order' :
                         (item.type as string).toLowerCase().includes('rider') ? 'rider' :
                         (item.type as string).toLowerCase().includes('vendor') ? 'vendor' :
                         (item.type as string).toLowerCase().includes('payout') ? 'payout' : 'system';
          
          const config = TYPE_CONFIG[uiType as ActivityItem['type']] || { icon: Clock, color: "text-navy", bgColor: "bg-beige" };
          const Icon = item.icon || config.icon;
          
          return (
            <div key={item.id} className="flex gap-4 group">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border border-divider shadow-sm transition-transform group-hover:scale-110",
                config.bgColor,
                config.color
              )}>
                <Icon size={18} />
              </div>

              <div className="flex justify-between items-start flex-1 min-w-0">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[13px] font-bold text-navy truncate leading-tight">{item.title}</h4>
                  <p className="text-[12px] text-subtle font-medium leading-tight">{item.description}</p>
                </div>
                <span className="text-[11px] text-subtle/60 font-medium whitespace-nowrap ml-4">{item.timestamp}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-4 border-t border-divider">
        <Link href="/admin/dashboard/activity" className="text-[12px] font-bold text-navy hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest mx-auto justify-center">
          View all activity <span className="text-primary">→</span>
        </Link>
      </div>
    </div>
  )
}
