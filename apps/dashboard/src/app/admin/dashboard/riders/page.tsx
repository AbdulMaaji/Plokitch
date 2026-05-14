import { RiderTable } from "@/components/riders/RiderTable"
import { RiderHeader } from "@/components/riders/RiderHeader"
import { api } from "@/lib/api"

export default async function RidersPage() {
  const riders = await api.riders.list();
  const stats = await api.riders.getStats();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <RiderHeader />

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Online Now</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">{stats.online}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Verified Fleet</p>
          <h3 className="text-[28px] font-bold text-blue-600 mt-1">{stats.verified}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Avg. Delivery</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats.avgDelivery}m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Active Alerts</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">{stats.alerts}</h3>
        </div>
      </div>

      {/* Table Section */}
      <RiderTable initialData={riders} />
    </div>
  )
}
