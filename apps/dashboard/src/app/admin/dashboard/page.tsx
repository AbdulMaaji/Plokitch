import * as React from "react"
import { 
  TrendingUp, 
  ShoppingBag, 
  Bike, 
  AlertCircle,
  Calendar,
  ChevronDown
} from "lucide-react"
import { AnalyticsCard } from "@/components/ui/analytics-card"
import { ActivityFeed } from "@/components/ui/activity-feed"
import { RevenueChart } from "@/components/ui/revenue-chart"
import { DonutChartCard } from "@/components/ui/donut-chart-card"
import { ExecutiveTimeline } from "@/components/ui/executive-timeline"
import { api } from "@/lib/api"

export default async function DashboardPage() {
  const stats = await api.analytics.getOverviewStats();
  const activity = await api.analytics.getRecentActivity(8);
  const chartData = await api.analytics.getChartData();
  const dispatchPerformance = await api.analytics.getDispatchPerformance();
  const lifecycleAverages = await api.analytics.getLifecycleAverages();

  // Calculate aggregated totals for the chart footer
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const completionRate = dispatchPerformance.onTimePercentage;

  return (
    <div className="flex flex-col gap-8">
      {/* Header with Date Picker */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[32px] font-heading font-bold text-navy tracking-tight">Executive Overview</h1>
          <p className="text-[15px] font-medium text-subtle/80">Real-time operational health and platform performance metrics.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-divider rounded-lg shadow-sm hover:bg-beige/50 transition-all">
            <Calendar size={18} className="text-subtle" />
            <span className="text-[13px] font-bold text-navy">Today</span>
            <ChevronDown size={14} className="text-subtle" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold text-subtle uppercase tracking-widest">Auto refresh: 30s</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Daily Revenue" 
          value={`₦${stats.revenue.current.toLocaleString()}`} 
          icon={TrendingUp} 
          trend={{ value: stats.revenue.trend, isUp: true }}
          comparisonValue={`₦${stats.revenue.previous.toLocaleString()}`}
          data={stats.revenue.sparkline}
        />
        <AnalyticsCard 
          title="Active Orders" 
          value={stats.activeOrders.current.toString()} 
          icon={ShoppingBag} 
          trend={{ value: stats.activeOrders.trend, isUp: true }}
          comparisonValue={stats.activeOrders.previous.toString()}
          data={stats.activeOrders.sparkline}
        />
        <AnalyticsCard 
          title="Riders Online" 
          value={stats.ridersOnline.current.toString()} 
          icon={Bike} 
          trend={{ value: stats.ridersOnline.trend, isUp: true }}
          comparisonValue={stats.ridersOnline.previous.toString()}
          data={stats.ridersOnline.sparkline}
        />
        <AnalyticsCard 
          title="Failed Deliveries" 
          value={stats.failedDeliveries.current.toString()} 
          icon={AlertCircle} 
          trend={{ value: stats.failedDeliveries.trend, isUp: false }}
          comparisonValue={stats.failedDeliveries.previous.toString()}
          data={stats.failedDeliveries.sparkline}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Revenue Chart */}
        <div className="lg:col-span-8">
          <div className="bg-white p-10 rounded-card border border-divider shadow-card h-full">
            <RevenueChart 
              className="w-full h-full" 
              data={chartData}
              totals={{
                revenue: totalRevenue,
                orders: totalOrders,
                avgOrderValue,
                completionRate
              }}
            />
          </div>
        </div>

        {/* Right Column: Live Updates */}
        <div className="lg:col-span-4">
          <div className="bg-white p-10 rounded-card border border-divider shadow-card h-full">
            <ActivityFeed items={activity as any} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <DonutChartCard 
            className="h-full"
            title="Dispatch Performance"
            subtitle="Today"
            percentage={dispatchPerformance.onTimePercentage}
            percentageLabel="On-time Delivery"
            data={[
              { name: "Completed", value: dispatchPerformance.completed, color: "#22c55e" },
              { name: "Failed", value: dispatchPerformance.failed, color: "#ef4444" },
            ]}
            metrics={dispatchPerformance.metrics}
          />
        </div>
        <div className="lg:col-span-3">
          <DonutChartCard 
            className="h-full"
            title="Vendor Health"
            subtitle="This week"
            percentage={stats.vendorHealth.percentage}
            percentageLabel="Healthy Vendors"
            data={[
              { name: "Healthy", value: stats.vendorHealth.active, color: "#22c55e" },
              { name: "Warning", value: stats.vendorHealth.suspended + stats.vendorHealth.pending, color: "#eab308" },
            ]}
            metrics={[
              { label: "Active", value: stats.vendorHealth.active, color: "bg-green-500" },
              { label: "Suspended", value: stats.vendorHealth.suspended, color: "bg-red-500" },
              { label: "Pending", value: stats.vendorHealth.pending, color: "bg-orange-500" },
            ]}
          />
        </div>
        <div className="lg:col-span-6">
          <ExecutiveTimeline className="h-full" data={lifecycleAverages} />
        </div>
      </div>
    </div>
  )
}
