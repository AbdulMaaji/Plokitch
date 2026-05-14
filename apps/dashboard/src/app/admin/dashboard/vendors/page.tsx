import { VendorTable } from "@/components/vendors/VendorTable"
import { VendorHeader } from "@/components/vendors/VendorHeader"
import { api } from "@/lib/api"

export default async function VendorsPage() {
  const vendors = await api.vendors.list();
  const stats = await api.vendors.getStats();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <VendorHeader />

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Total Vendors</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Pending Verification</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">{stats.pending}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Platform Health</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{stats.healthPercentage}%</h3>
        </div>
      </div>

      {/* Table Section */}
      <VendorTable initialData={vendors} />
    </div>
  )
}
