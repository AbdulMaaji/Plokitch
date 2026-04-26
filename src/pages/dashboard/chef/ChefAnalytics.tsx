import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  CircleDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChefData } from "@/hooks/useChefData";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ChefAnalytics = () => {
  const { activeOrders, loading } = useChefData();

  const analytics = useMemo(() => {
    if (!activeOrders || activeOrders.length === 0) {
      return {
        revenue: 0,
        totalOrders: 0,
        popularItems: [],
        revenueHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Mock flat history
      };
    }

    const totalOrders = activeOrders.length;
    const revenue = activeOrders.reduce((acc, order) => acc + Number(order.totalAmount || 0), 0);

    const itemCounts: Record<string, { orders: number, revenue: number }> = {};
    activeOrders.forEach(order => {
      order.items.forEach((item: any) => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = { orders: 0, revenue: 0 };
        }
        itemCounts[item.name].orders += item.quantity;
        itemCounts[item.name].revenue += (item.price * item.quantity);
      });
    });

    const popularItems = Object.entries(itemCounts)
      .map(([name, data]) => ({
        name,
        orders: data.orders,
        revenue: `₦${data.revenue.toLocaleString()}`
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 4);

    // Mocking revenue history based on total revenue for visual effect
    const base = revenue / 12;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueHistory = months.map(month => ({
      name: month,
      revenue: Math.round(Math.max(100, Math.random() * 5000))
    }));

    return {
      revenue,
      totalOrders,
      popularItems,
      revenueHistory
    };
  }, [activeOrders]);

  const stats = [
    { title: "Revenue", value: `₦${analytics.revenue.toLocaleString()}`, trend: "+12.5%", pos: true, icon: CircleDollarSign },
    { title: "Total Orders", value: analytics.totalOrders.toString(), trend: "+5.2%", pos: true, icon: ShoppingBag },
    { title: "Customer Return", value: "68%", trend: "-2.1%", pos: false, icon: Users },
    { title: "Avg. Prep Time", value: "18m", trend: "-4m", pos: true, icon: Clock },
  ];

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Kitchen Insights</h1>
            <p className="text-muted-foreground mt-1">Detailed performance and revenue analytics</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 font-bold uppercase tracking-widest px-6 h-12">
              Last 30 Days
            </Button>
            <Button className="bg-white text-background hover:bg-gold font-bold uppercase tracking-widest px-6 h-12">
              DOWNLOAD PDF
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-dark-surface border-gold/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/10 text-gold">
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.pos ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.pos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 h-80 relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Revenue Stream</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.revenueHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₦${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255, 215, 0, 0.05)' }}
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#FFD700', fontWeight: 'bold' }}
                    formatter={(value) => [`₦${value}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#FFD700" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-gold/10">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Popular Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analytics.popularItems.length > 0 ? analytics.popularItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{item.orders} orders</p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-gold">{item.revenue}</p>
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No orders yet to calculate popular items.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefAnalytics;
