import * as React from "react"
import { 
  UserCheck,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomerTable } from "@/components/customers/CustomerTable"
import { api } from "@/lib/api"

export default async function CustomersPage() {
  const customers = await api.customers.list();

  // Calculate quick insights
  const totalCustomers = customers.length;
  const activeCount = customers.filter(c => c.is_active).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Customer Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Manage platform users, monitor spending patterns, and handle account flags.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-11 px-6 border-divider">
            <Download size={18} /> EXPORT DATA
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm">
            <UserCheck size={18} /> USER SEGMENTS
          </Button>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Total Customers</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{totalCustomers.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Active Accounts</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">{activeCount.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Avg. LTV</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">₦482.00</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Flagged</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">0</h3>
        </div>
      </div>

      {/* Table Section */}
      <CustomerTable initialData={customers} />
    </div>
  )
}
