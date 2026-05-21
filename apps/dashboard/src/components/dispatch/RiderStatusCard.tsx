import * as React from "react"
import { Bike } from "lucide-react"

type Rider = {
  id: string
  is_available: boolean
  is_verified: boolean
  total_deliveries: number
  rating: string
  vehicle_type: string
  user?: { name: string; email: string; phone: string } | null
}

export const RiderStatusCard = ({ riders }: { riders?: Rider[] }) => {
  const displayRiders = (riders || []).slice(0, 4)

  return (
    <div className="bg-white rounded-card border border-divider shadow-card flex flex-col">
      <div className="p-4 border-b border-divider flex justify-between items-center bg-beige/10">
        <div className="flex items-center gap-2">
          <Bike size={18} className="text-navy" />
          <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Active Riders</h3>
        </div>
        <span className="text-[10px] font-bold text-subtle uppercase">
          {displayRiders.filter(r => r.is_available).length} Online
        </span>
      </div>
      <div className="flex flex-col">
        {displayRiders.length === 0 ? (
          <div className="p-6 text-center text-subtle text-caption">No riders found</div>
        ) : (
          displayRiders.map((rider, i) => {
            const name = rider.user?.name || "Unknown Rider"
            const initials = name.split(" ").map(n => n[0]).join("").toUpperCase()
            const status = rider.is_available ? "Active" : "Offline"
            return (
              <div
                key={rider.id}
                className="p-4 flex items-center justify-between border-b border-divider last:border-0 hover:bg-beige/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold text-[10px]">
                    {initials}
                  </div>
                  <div>
                    <p className="text-caption font-bold text-navy">{name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${rider.is_available ? "bg-green-500" : "bg-subtle"}`} />
                      <span className="text-[10px] text-subtle">
                        {status} • {rider.vehicle_type || "Bike"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-navy">★ {parseFloat(rider.rating || "0").toFixed(1)}</p>
                  <p className="text-[9px] text-subtle uppercase">{rider.total_deliveries || 0} Trips</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
