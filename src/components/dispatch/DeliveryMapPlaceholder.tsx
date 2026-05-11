import * as React from "react"
import { MapPin, Users, Activity } from "lucide-react"

export const DeliveryMapPlaceholder = () => {
  return (
    <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
      <div className="p-4 border-b border-divider flex justify-between items-center bg-beige/10">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-action" />
          <h3 className="text-caption font-bold text-navy uppercase tracking-wider">Live Delivery Heatmap</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-subtle uppercase">Live Sync</span>
        </div>
      </div>
      <div className="h-[300px] relative bg-slate-50 flex items-center justify-center">
        {/* Placeholder for actual map integration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(#001a40 0.5px, transparent 0.5px)", 
               backgroundSize: "20px 20px" 
             }} 
        />
        <div className="flex flex-col items-center gap-3 text-center px-8">
          <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center">
            <Activity className="text-navy/20" size={24} />
          </div>
          <div>
            <p className="text-caption font-bold text-navy">Map Interface Offline</p>
            <p className="text-[11px] text-subtle mt-1">Geographic distribution of active deliveries across the city.</p>
          </div>
        </div>
        
        {/* Mock Map Markers */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-action rounded-full shadow-lg ring-4 ring-action/20" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-action rounded-full shadow-lg ring-4 ring-action/20" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-action rounded-full shadow-lg ring-4 ring-action/20" />
      </div>
      <div className="p-4 grid grid-cols-3 gap-4 border-t border-divider">
        <div className="text-center">
          <p className="text-[10px] font-bold text-subtle uppercase">North</p>
          <p className="text-body font-bold text-navy">124</p>
        </div>
        <div className="text-center border-x border-divider">
          <p className="text-[10px] font-bold text-subtle uppercase">Central</p>
          <p className="text-body font-bold text-navy">452</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-subtle uppercase">South</p>
          <p className="text-body font-bold text-navy">189</p>
        </div>
      </div>
    </div>
  )
}
