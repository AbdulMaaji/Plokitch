import * as React from "react"
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Bike, 
  Zap, 
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react"
import { AnalyticsCard } from "@/components/ui/analytics-card"
import { ActivityFeed } from "@/components/ui/activity-feed"
import { RevenueChart } from "@/components/ui/revenue-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-h1 font-bold text-navy">Executive Overview</h1>
        <p className="text-body text-subtle">Real-time operational health and platform performance metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Daily Revenue" 
          value="$42,850.00" 
          icon={TrendingUp} 
          trend={{ value: "+14.2%", isUp: true }}
          description="vs. same day last week"
        />
        <AnalyticsCard 
          title="Active Orders" 
          value="1,284" 
          icon={ShoppingBag} 
          trend={{ value: "+8%", isUp: true }}
          description="Live dispatch queue"
        />
        <AnalyticsCard 
          title="Riders Online" 
          value="452" 
          icon={Bike} 
          trend={{ value: "Steady", isUp: true, isNeutral: true }}
          description="Average wait: 4 min"
        />
        <AnalyticsCard 
          title="Failed Deliveries" 
          value="12" 
          icon={AlertCircle} 
          trend={{ value: "-2%", isUp: true }}
          description="Resolved: 8/12"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics Area */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white p-8 rounded-card border border-divider shadow-card">
            <RevenueChart className="w-full h-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4">
              <h3 className="text-body font-bold text-navy">Dispatch Performance</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-caption font-medium">
                  <span className="text-subtle">Pickup Efficiency</span>
                  <span className="text-navy">94%</span>
                </div>
                <div className="w-full h-2 bg-beige rounded-full overflow-hidden">
                  <div className="h-full bg-action w-[94%]" />
                </div>
                <div className="flex justify-between items-center text-caption font-medium mt-2">
                  <span className="text-subtle">Delivery Success</span>
                  <span className="text-navy">98.2%</span>
                </div>
                <div className="w-full h-2 bg-beige rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98.2%]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-card border border-divider shadow-card flex flex-col gap-4">
              <h3 className="text-body font-bold text-navy">Vendor Health</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-action border-r-transparent flex items-center justify-center">
                  <span className="text-caption font-bold text-navy">86%</span>
                </div>
                <div>
                  <p className="text-caption font-bold text-navy">Active Vendors</p>
                  <p className="text-[11px] text-subtle">242 verified and online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Feed Column */}
        <div className="bg-white p-8 rounded-card border border-divider shadow-card">
          <ActivityFeed items={[
            {
              id: "1",
              title: "Order #8492 Escalated",
              description: "Customer reported delayed pickup from Pizza Palace.",
              timestamp: "2 min ago",
              icon: AlertCircle,
              type: "alert"
            },
            {
              id: "2",
              title: "New Vendor Verified",
              description: "The Sushi Bar has completed documentation.",
              timestamp: "15 min ago",
              icon: CheckCircle2,
              type: "vendor"
            },
            {
              id: "3",
              title: "Peak Hour Warning",
              description: "High demand detected in Central District.",
              timestamp: "24 min ago",
              icon: Zap,
              type: "alert"
            },
            {
              id: "4",
              title: "Bulk Payout Success",
              description: "Weekly vendor payouts have been processed.",
              timestamp: "1 hour ago",
              icon: CheckCircle2,
              type: "order"
            }
          ]} />
        </div>
      </div>
    </div>
  )
}
