import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminAnalytics = () => {
  const platformStats = [
    { title: "Gross GMV", value: "₦1.24M", trend: "+24.5%", pos: true, icon: TrendingUp },
    { title: "Active Users", value: "12,402", trend: "+12.1%", pos: true, icon: Users },
    { title: "Growth Rate", value: "18.5%", trend: "+5.2%", pos: true, icon: Zap },
    { title: "Acquisition Cost", value: "₦4.20", trend: "-1.10", pos: true, icon: Target },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
              <PieChartIcon size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black text-white">Global Analytics</h1>
              <p className="text-muted-foreground mt-1">Real-time platform growth and financial metrics</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 font-bold uppercase tracking-widest px-8 h-12">
              QUARTERLY REPORT
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-dark-surface border-gold/10 h-96 relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Revenue Map (Gombe Clusters)</CardTitle>
              <Globe size={20} className="text-gold opacity-50" />
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center">
              <div className="relative w-full h-48 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gold/5 rounded-full blur-3xl animate-pulse" />
                 <div className="grid grid-cols-3 gap-8 relative z-10 w-full">
                    {[
                      { area: "Gombe Central", growth: "45%", orders: "1.2k" },
                      { area: "GRA North", growth: "32%", orders: "892" },
                      { area: "Bauchi Road", growth: "28%", orders: "754" },
                    ].map((cluster) => (
                      <div key={cluster.area} className="text-center group-hover:scale-105 transition-transform">
                        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 relative">
                           <Activity size={24} className="text-gold" />
                           <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold text-background text-[10px] font-black rounded-full flex items-center justify-center">{cluster.growth}</div>
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{cluster.area}</h4>
                        <p className="text-[10px] text-muted-foreground font-bold">{cluster.orders} txs</p>
                      </div>
                    ))}
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-gold/10 h-96 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Top Performing Kitchens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Chef Andre L'Aube", revenue: "₦142,500", rating: "4.98", trend: "+12%" },
                { name: "Sienna's Organic", revenue: "₦98,200", rating: "4.85", trend: "+15%" },
                { name: "The Truffle House", revenue: "₦85,400", rating: "5.00", trend: "+5%" },
                { name: "Fusion Hub", revenue: "₦72,100", rating: "4.72", trend: "+8%" },
              ].map((kitchen, idx) => (
                <div key={kitchen.name} className="flex items-center justify-between p-4 rounded-xl bg-dark-deep/40 border border-gold/5 hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-gold opacity-50">0{idx + 1}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{kitchen.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{kitchen.rating} Rating</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{kitchen.revenue}</p>
                    <p className="text-[10px] text-emerald-500 font-bold">{kitchen.trend}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
