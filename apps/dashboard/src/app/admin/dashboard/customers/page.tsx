import { CustomerHeader } from "@/components/customers/CustomerHeader"
import { CustomerTable } from "@/components/customers/CustomerTable"
import { api } from "@/lib/api"

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { query?: string; segment?: string }
}) {
  const customers = await api.customers.list(searchParams);
  const stats = await api.customers.getStats();

  const totalCustomers = stats.total;
  const activeCount = stats.active24h;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <CustomerHeader customers={customers} />

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Total Customers</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{totalCustomers.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Active (24h)</p>
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
