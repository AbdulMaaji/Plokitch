import * as React from "react"
import { Bike, CheckCircle2, Clock, XCircle } from "lucide-react"

export const RiderStatusCard = () => {
  const riders = [
    { name: "Ahmed Musa", status: "Active", orders: 2, battery: "84%" },
    { name: "Blessing Okoro", status: "Active", orders: 1, battery: "62%" },
    { name: "John David", status: "Away", orders: 0, battery: "45%" },
    { name: "Sarah Chen", status: "Active", orders: 3, battery: "91%" },
  ]

  return (
    <div className="bg-white rounded-card border border-divider shadow-card flex flex-col">
      <div className="p-4 border-b border-divider flex justify-between items-center bg-beige/10">
        <div className="flex items-center gap-2">
          <Bike size={18} className="text-navy" />
          <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Top Riders</h3>
        </div>
        <button className="text-[10px] font-bold text-action uppercase hover:underline">View All</button>
      </div>
      <div className="flex flex-col">
        {riders.map((rider, i) => (
          <div key={i} className="p-4 flex items-center justify-between border-b border-divider last:border-0 hover:bg-beige/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold text-[10px]">
                {rider.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-caption font-bold text-navy">{rider.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${rider.status === "Active" ? "bg-green-500" : "bg-orange-500"}`} />
                  <span className="text-[10px] text-subtle">{rider.status} • {rider.orders} orders</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-navy">{rider.battery}</p>
              <p className="text-[9px] text-subtle uppercase">Battery</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
