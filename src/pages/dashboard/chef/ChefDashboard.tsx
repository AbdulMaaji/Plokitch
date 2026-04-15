import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChefDashboard = () => {
  const activeOrders = [
    { id: "ORD-9921", customer: "Sophia Chen", items: "Truffle Salmon Glaze x2", status: "Preparing", time: "10m left", urgency: "high" },
    { id: "ORD-9922", customer: "Marcus Wright", items: "Artisan Sourdough Pizza", status: "Ready", time: "Waiting for Rider", urgency: "medium" },
    { id: "ORD-9923", customer: "Elena Rodriguez", items: "Wild Mushroom Risotto", status: "Pending", time: "Incoming", urgency: "low" },
  ];

  const stats = [
    { title: "Daily Revenue", value: "$428.50", icon: TrendingUp, color: "text-emerald-500" },
    { title: "Orders Today", value: "24", icon: ShoppingBag, color: "text-gold" },
  ];

  return (
    <DashboardLayout role="chef">
      <div className="space-y-6 md:space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">Kitchen Orders</h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Your kitchen is live in Gombe Central
            </p>
          </div>
          <div className="flex gap-2">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-dark-surface border border-gold/10 px-4 py-2 rounded-xl flex items-center gap-3">
                <stat.icon size={16} className={stat.color} />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{stat.title}</p>
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-dark-surface border border-gold/10 p-1 rounded-xl mb-6">
            <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-gold data-[state=active]:text-background transition-all font-bold px-6">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-gold data-[state=active]:text-background transition-all font-bold px-6">Completed</TabsTrigger>
            <TabsTrigger value="scheduled" className="rounded-lg data-[state=active]:bg-gold data-[state=active]:text-background transition-all font-bold px-6">Scheduled</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all group overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Status Indicator Bar */}
                    <div className={`w-1.5 self-stretch ${
                      order.urgency === 'high' ? 'bg-red-500' : 
                      order.urgency === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    
                    <CardContent className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 text-gold shrink-0">
                          <ShoppingBag size={22} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-gold uppercase tracking-widest">{order.id}</span>
                            {order.urgency === 'high' && <AlertCircle size={14} className="text-red-500" />}
                          </div>
                          <h3 className="text-lg font-bold text-white">{order.items}</h3>
                          <p className="text-xs text-muted-foreground font-medium">Customer: {order.customer}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-center md:items-end flex-1 md:flex-none">
                          <Badge variant="outline" className={`
                            px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-2
                            ${order.status === 'Preparing' ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : ''}
                            ${order.status === 'Ready' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : ''}
                            ${order.status === 'Pending' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' : ''}
                          `}>
                            {order.status}
                          </Badge>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock size={12} />
                            {order.time}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button className="flex-1 md:flex-none bg-gold hover:bg-gold-light text-background font-black h-10 px-6">
                            MARK {order.status === 'Preparing' ? 'READY' : 'PICKED UP'}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white">
                            <MoreVertical size={20} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Analytics & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          <Card className="bg-dark-surface border-gold/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-all" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading font-black text-white flex items-center justify-between">
                Performance Score
                <CheckCircle2 size={18} className="text-emerald-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white">98%</span>
                <div className="flex-1 space-y-2">
                  <div className="h-1.5 bg-dark-deep rounded-full overflow-hidden">
                    <div className="h-full bg-gold w-[98%]" />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Elite Kitchen Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-heading font-black text-white mb-2">Grow Your Orders</h3>
              <p className="text-sm text-muted-foreground mb-6">Promote your kitchen to reach 2,500+ more customers in Gombe this weekend.</p>
              <Button className="bg-white text-background hover:bg-gold hover:text-background font-black tracking-widest">BOOST NOW</Button>
            </div>
            <div className="w-32 h-32 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center rotate-3 shrink-0">
              <TrendingUp size={48} className="text-gold" />
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefDashboard;
