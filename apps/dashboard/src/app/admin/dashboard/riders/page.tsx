import * as React from "react"
import { Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RiderTable } from "@/components/riders/RiderTable"
import { api } from "@/lib/api"

export default async function RidersPage() {
  const riders = await api.riders.list();

  // Calculate quick metrics
  const onlineCount = riders.filter(r => r.is_available).length;
  const verifiedCount = riders.filter(r => r.is_verified).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Rider Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Monitor fleet activity and dispatch efficiency.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm">
          <Bike size={18} /> REGISTER RIDER
        </Button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Online Now</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">{onlineCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Verified Fleet</p>
          <h3 className="text-[28px] font-bold text-blue-600 mt-1">{verifiedCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Avg. Delivery</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">24m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Active Alerts</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">0</h3>
        </div>
      </div>

      {/* Table Section */}
      <RiderTable initialData={riders} />
    </div>
  )
}
