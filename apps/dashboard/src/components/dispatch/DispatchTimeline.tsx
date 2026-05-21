import * as React from "react"
import { Clock, CheckCircle2, AlertCircle, ShoppingBag, Package } from "lucide-react"

type TimelineEvent = {
  id: string
  title: string
  description: string
  timestamp: string
  type: string
  status: string
}

const iconMap: Record<string, React.ElementType> = {
  order: ShoppingBag,
  vendor: Package,
  rider: ShoppingBag,
  alert: AlertCircle,
  system: CheckCircle2,
}

const colorMap: Record<string, string> = {
  order: "text-blue-500",
  vendor: "text-purple-500",
  rider: "text-green-500",
  alert: "text-orange-500",
  system: "text-green-500",
  error: "text-red-500",
}

function formatTime(ts: string) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ts
  }
}

export const DispatchTimeline = ({ events }: { events?: TimelineEvent[] }) => {
  const displayEvents = events && events.length > 0 ? events.slice(0, 5) : []

  if (displayEvents.length === 0) {
    return (
      <div className="bg-white rounded-card border border-divider shadow-card flex flex-col">
        <div className="p-4 border-b border-divider flex items-center gap-2 bg-beige/10">
          <Clock size={18} className="text-navy" />
          <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Dispatch Timeline</h3>
        </div>
        <div className="p-5 flex items-center justify-center h-32 text-subtle text-caption">
          No recent activity
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-card border border-divider shadow-card flex flex-col">
      <div className="p-4 border-b border-divider flex items-center gap-2 bg-beige/10">
        <Clock size={18} className="text-navy" />
        <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Dispatch Timeline</h3>
      </div>
      <div className="p-5 flex flex-col gap-6">
        {displayEvents.map((event, i) => {
          const Icon = iconMap[event.type] || CheckCircle2
          const color = event.status === "error" ? colorMap.error : (colorMap[event.type] || colorMap.system)
          return (
            <div key={event.id} className="flex gap-4 relative">
              {i !== displayEvents.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-divider" />
              )}
              <div className={`mt-1 z-10 bg-white`}>
                <Icon size={22} className={color} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-subtle uppercase">{formatTime(event.timestamp)}</p>
                <p className="text-caption font-bold text-navy mt-0.5">{event.title}</p>
                <p className="text-[11px] text-subtle mt-1 leading-relaxed">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
