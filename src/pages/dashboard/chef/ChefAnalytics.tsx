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

const ChefAnalytics = () => {
  const stats = [
    { title: "Revenue", value: "$4,285.00", trend: "+12.5%", pos: true, icon: CircleDollarSign },
    { title: "Total Orders", value: "124", trend: "+5.2%", pos: true, icon: ShoppingBag },
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
            <CardContent>
              {/* Mock Chart Area */}
              <div className="absolute inset-x-0 bottom-0 top-24 px-6 flex items-end gap-2 pb-6">
                {[40, 60, 45, 80, 55, 90, 70, 85, 60, 95, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gold/10 hover:bg-gold/40 transition-all rounded-t-lg group relative" style={{ height: `${h}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-background text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h * 10}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-gold/10">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Popular Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Truffle Salmon", orders: 48, revenue: "$2,160" },
                { name: "Wild Risotto", orders: 32, revenue: "$1,024" },
                { name: "Lava Cake", orders: 24, revenue: "$432" },
                { name: "Artisan Bread", orders: 20, revenue: "$240" },
              ].map((item) => (
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
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefAnalytics;
