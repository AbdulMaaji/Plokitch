import { 
  Bike, 
  Clock3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Check, 
  PackageCheck,
  LayoutDashboard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { OrderCard } from "@/components/ui/order-card"
import { FoodCard } from "@/components/ui/food-card"
import { StatCard } from "@/components/ui/stat-card"
import { RevenueChart } from "@/components/ui/revenue-chart"
import { OrderTimeline } from "@/components/ui/order-timeline"

export default function Home() {
  return (
    <main className="max-w-[1280px] mx-auto p-8 flex flex-col gap-12">
      {/* Brand Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold text-[32px] text-navy">PLO</span>
          <span className="font-bold text-[32px] text-action">KITCH</span>
        </div>
        <button className="bg-navy text-white px-5 py-2.5 rounded-button text-nav font-semibold flex items-center gap-2">
          LIVE ORDERS <ShoppingBag size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value="$12,845.00" 
          icon={TrendingUp} 
          change="+12.5%" 
          trend="up" 
        />
        <StatCard 
          label="Active Orders" 
          value="48" 
          icon={ShoppingBag} 
          change="+4" 
          trend="up" 
        />
        <StatCard 
          label="Total Customers" 
          value="1,240" 
          icon={Users} 
          change="+18%" 
          trend="up" 
        />
        <StatCard 
          label="Avg. Delivery Time" 
          value="24 min" 
          icon={Clock3} 
          change="-2 min" 
          trend="up" 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Orders & Charts */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white p-6 rounded-card shadow-card border border-divider">
            <RevenueChart />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-h2 font-bold text-navy">Active Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrderCard 
                id="7821" 
                restaurantName="The Burger Joint" 
                status="Out for Delivery" 
                customerName="James Wilson" 
                eta="12 mins" 
                amount="$24.50"
                riderName="David K."
              />
              <OrderCard 
                id="7822" 
                restaurantName="Pizza Palace" 
                status="Preparing Order" 
                customerName="Sarah Chen" 
                eta="25 mins" 
                amount="$42.00"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Timeline & Menu */}
        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 rounded-card shadow-card border border-divider">
            <h3 className="text-body font-bold text-navy mb-6">Order #7821 Timeline</h3>
            <OrderTimeline steps={[
              { title: "Order Confirmed", time: "10:30 AM", status: 'completed', icon: Check },
              { title: "Preparing Food", time: "10:45 AM", status: 'completed', icon: Clock3 },
              { title: "Out for Delivery", time: "11:05 AM", status: 'current', icon: Bike },
              { title: "Delivered", time: "Pending", status: 'upcoming', icon: PackageCheck },
            ]} />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-body font-bold text-navy">Trending Now</h3>
            <FoodCard 
              name="Double Smash Burger" 
              description="Two wagyu beef patties, aged cheddar, caramelized onions, and house sauce."
              price="$16.00"
              category="Bestseller"
            />
          </div>
        </div>
      </div>

      {/* Buttons & Forms Section */}
      <section className="bg-white p-8 rounded-card border border-divider flex flex-col gap-8">
        <h3 className="text-h3 font-bold text-navy">Foundation Components</h3>
        
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="max-w-md flex flex-col gap-4">
          <Input placeholder="Enter email address..." />
          <div className="flex gap-2">
            <Badge variant="default">New</Badge>
            <Badge variant="action">Featured</Badge>
            <Badge variant="secondary">Archived</Badge>
          </div>
        </div>
      </section>
    </main>
  )
}
