import * as React from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VendorTable } from "@/components/vendors/VendorTable"
import { api } from "@/lib/api"

export default async function VendorsPage() {
  const vendors = await api.vendors.list();
  
  // Calculate quick stats
  const totalVendors = vendors.length;
  const pendingVendors = vendors.filter(v => !v.is_verified).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Vendor Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Approve new vendors and manage platform kitchen performance.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm">
          <UserPlus size={18} /> ADD NEW VENDOR
        </Button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Total Vendors</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{totalVendors}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Pending Verification</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">{pendingVendors}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-wider">Platform Health</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">98.2%</h3>
        </div>
      </div>

      {/* Table Section */}
      <VendorTable initialData={vendors} />
    </div>
  )
}
