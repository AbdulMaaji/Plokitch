import * as React from "react"
import { LucideIcon, ShoppingBag, Bike, Store, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  icon?: LucideIcon
  type: 'order' | 'rider' | 'vendor' | 'alert'
}

const TYPE_ICONS: Record<ActivityItem['type'], LucideIcon> = {
  order: ShoppingBag,
  rider: Bike,
  vendor: Store,
  alert: AlertCircle
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-body font-bold text-navy">Live Operational Status</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] font-bold text-green-600 uppercase">Live Updates</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const Icon = item.icon || TYPE_ICONS[item.type] || Clock;
          
          return (
            <div key={item.id} className="flex gap-4 relative group">
              {index !== items.length - 1 && (
                <div className="absolute left-[15px] top-[32px] bottom-[-24px] w-[1px] bg-divider" />
              )}
              
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 z-10 border border-divider shadow-sm",
                item.type === 'alert' ? "bg-red-50 text-red-600 border-red-100" : "bg-white text-navy"
              )}>
                <Icon size={16} />
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-caption font-bold text-navy">{item.title}</h4>
                  <span className="text-[10px] text-subtle font-medium">{item.timestamp}</span>
                </div>
                <p className="text-[13px] text-subtle leading-tight">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
