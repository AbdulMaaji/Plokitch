import * as React from "react"
import { Clock, CheckCircle2, AlertCircle, ShoppingBag } from "lucide-react"

export const DispatchTimeline = () => {
  const events = [
    { time: "12:45 PM", title: "Bulk Assignment", desc: "12 orders assigned to Downtown Zone.", icon: ShoppingBag, color: "text-blue-500" },
    { time: "12:30 PM", title: "Weather Alert", desc: "Heavy rain in Lekki. Delay expected.", icon: AlertCircle, color: "text-orange-500" },
    { time: "12:15 PM", title: "System Check", desc: "Dispatch algorithm optimized.", icon: CheckCircle2, color: "text-green-500" },
  ]

  return (
    <div className="bg-white rounded-card border border-divider shadow-card flex flex-col">
      <div className="p-4 border-b border-divider flex items-center gap-2 bg-beige/10">
        <Clock size={18} className="text-navy" />
        <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Dispatch Timeline</h3>
      </div>
      <div className="p-5 flex flex-col gap-6">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 relative">
            {i !== events.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-divider" />
            )}
            <div className={`mt-1 z-10 bg-white`}>
              <event.icon size={22} className={event.color} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-subtle uppercase">{event.time}</p>
              <p className="text-caption font-bold text-navy mt-0.5">{event.title}</p>
              <p className="text-[11px] text-subtle mt-1 leading-relaxed">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
