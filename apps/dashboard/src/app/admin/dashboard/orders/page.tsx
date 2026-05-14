import * as React from "react"
import { OrderTable } from "@/components/orders/OrderTable"
import { api } from "@/lib/api"

export default async function OrdersPage() {
  const orders = await api.orders.list();

  // Calculate quick stats
  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const completedToday = orders.filter(o => o.status === 'completed').length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Orders Management</h1>
          <p className="text-[15px] font-medium text-subtle/80">Monitor live dispatch flow and handle operational escalations.</p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Active Orders</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{activeOrders}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Completed Today</p>
          <h3 className="text-[28px] font-bold text-green-600 mt-1">{completedToday}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Avg. Prep Time</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">18m</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Delayed</p>
          <h3 className="text-[28px] font-bold text-red-600 mt-1">4</h3>
        </div>
      </div>

      {/* Table Section */}
      <OrderTable initialData={orders} />
    </div>
  )
}
