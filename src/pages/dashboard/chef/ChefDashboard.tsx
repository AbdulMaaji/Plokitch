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
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import { useChefData } from "@/hooks/useChefData";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChefDashboard = () => {
  const { myVendor, activeOrders, loading, refreshData, session } = useChefData();

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    let nextStatus: string;
    
    switch (currentStatus) {
      case 'pending':
        nextStatus = 'confirmed';
        break;
      case 'confirmed':
        nextStatus = 'preparing';
        break;
      case 'preparing':
        nextStatus = 'ready';
        break;
      default:
        return; // Other statuses are handled by riders/system
    }

    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order ${nextStatus.toUpperCase()}`, {
          description: `Order successfully transitioned to ${nextStatus}.`
        });
        refreshData();
      }
    } catch (error) {
      toast.error("Status Update Failed");
    }
  };

  const revenue = activeOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);
  
  const stats = [
    { title: "Daily Revenue", value: `₦${revenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
    { title: "Active Orders", value: activeOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length.toString(), icon: ShoppingBag, color: "text-gold" },
  ];

  if (loading) {
    return (
      <DashboardLayout role="chef">
        <div className="h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!myVendor) {
    return (
      <DashboardLayout role="chef">
        <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center border border-gold/10">
            <ShoppingBag size={40} className="text-gold/20" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">No Kitchen Active</h2>
          <p className="text-muted-foreground max-w-sm">You haven't set up your kitchen identity yet. Go to settings to start your artisan journey.</p>
          <Button className="bg-gold text-background font-black px-10 rounded-xl h-12">OPEN SETTINGS</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="chef">
      <div className="space-y-6 md:space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">Kitchen Orders</h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
              Your kitchen ({myVendor.businessName}) is live in {myVendor.location?.city}
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
              {activeOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').map((order) => (
                <Card key={order.id} className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all group overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className={`w-1.5 self-stretch ${
                      order.status === 'pending' ? 'bg-amber-500' : 'bg-gold'
                    }`} />
                    
                    <CardContent className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 text-gold shrink-0">
                          <ShoppingBag size={22} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-gold uppercase tracking-widest">ORD-{order.id.slice(0, 4)}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white">
                            {order.items.map((i: any) => `${i.name} x${i.quantity}`).join(", ")}
                          </h3>
                          <p className="text-xs text-muted-foreground font-medium">Customer: {order.customer?.name}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-center md:items-end flex-1 md:flex-none">
                          <Badge variant="outline" className={`
                            px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-2
                            ${order.status === 'preparing' ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : ''}
                            ${order.status === 'ready' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : ''}
                            ${order.status === 'pending' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' : ''}
                          `}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button 
                            onClick={() => handleUpdateStatus(order.id, order.status)}
                            className="flex-1 md:flex-none bg-gold hover:bg-gold-light text-background font-black h-10 px-6"
                          >
                            MARK {order.status === 'pending' ? 'PREPARING' : order.status === 'preparing' ? 'READY' : 'PICKED UP'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
              {activeOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length === 0 && (
                <div className="py-20 text-center border border-dashed border-gold/10 rounded-3xl">
                  <p className="text-muted-foreground font-body">No pending kitchen tasks. Take a breath.</p>
                </div>
              )}
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

          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 p-0 overflow-hidden relative group min-h-[300px]">
            <div className="absolute top-6 left-6 z-10">
              <Badge className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 text-gold font-black px-4 py-1.5 uppercase tracking-widest text-[10px]">
                Active Delivery Tracking
              </Badge>
            </div>
            <OrderTrackingMap showLabels={false} className="h-full w-full min-h-[300px]" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-dark-surface via-dark-surface/40 to-transparent flex items-end justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Current Assignment</p>
                <h4 className="text-lg font-bold text-white">Search Rider...</h4>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 font-black uppercase tracking-widest">
                8 mins away
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefDashboard;
