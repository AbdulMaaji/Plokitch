import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bike, 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  ChevronDown,
  LayoutGrid,
  Activity,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RiderDashboard = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  
  const availableOrders = [
    { id: "DEL-410", chef: "Chef Andre", pickup: "Greenwich Village", dropoff: "SoHo", distance: "1.2 mi", payout: "$8.50" },
    { id: "DEL-411", chef: "Elena's Kitchen", pickup: "Upper East Side", dropoff: "Central Park", distance: "0.8 mi", payout: "$6.20" },
    { id: "DEL-412", chef: "Sushi Koji", pickup: "Chelsea", dropoff: "Hell's Kitchen", distance: "2.4 mi", payout: "$12.40" },
    { id: "DEL-413", chef: "Gombe Delights", pickup: "Main Market", dropoff: "Kaltungo Ave", distance: "3.1 mi", payout: "$15.00" },
  ];

  return (
    <DashboardLayout role="rider">
      <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] relative overflow-hidden rounded-[2rem] border border-gold/10 bg-dark-deep">
        {/* Full-screen Map Integration */}
        <div className="absolute inset-0 z-0">
          <OrderTrackingMap showLabels={false} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-transparent opacity-80" />
        </div>

        {/* Top Overlay Controls */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Badge className="w-fit bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 backdrop-blur-md px-3 py-1 font-black tracking-widest uppercase text-[10px]">
              Active in Gombe Central
            </Badge>
            <div className="flex items-center gap-2 bg-dark-surface/80 backdrop-blur-xl border border-gold/10 p-3 rounded-2xl shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                <Bike size={20} />
              </div>
              <div className="mr-4">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Earnings Today</p>
                <p className="text-lg font-bold text-white">$142.80</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-14 bg-gold hover:bg-gold-light text-background font-black px-6 rounded-2xl shadow-2xl shadow-gold/20 flex gap-2">
                  <Navigation size={18} />
                  AVAILABLE ORDERS
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dark-surface border-gold/10 text-white w-[350px] p-2 mt-2 mr-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <div className="p-3 border-b border-gold/5 mb-2">
                  <p className="text-xs font-black text-gold uppercase tracking-[0.2em]">Nearby Deliveries</p>
                </div>
                <div className="max-h-[400px] overflow-y-auto space-y-2 p-1 custom-scrollbar">
                  {availableOrders.map((order) => (
                    <DropdownMenuItem key={order.id} className="focus:bg-gold/10 rounded-xl p-4 border border-transparent hover:border-gold/20 transition-all cursor-pointer block">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-black text-white">{order.chef}</span>
                        <span className="font-bold text-gold">{order.payout}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3 uppercase tracking-wider font-bold">
                        <MapPin size={10} className="text-gold" />
                        {order.pickup}
                        <ChevronDown size={10} className="-rotate-90" />
                        {order.dropoff}
                      </div>
                      <Button className="w-full h-8 bg-gold hover:bg-gold-light text-background font-black text-[10px] uppercase tracking-widest rounded-lg">
                        VIEW ROUTE
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-dark-surface/80 backdrop-blur-md border border-gold/10 text-white shadow-2xl">
              <Maximize2 size={24} />
            </Button>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20 md:max-w-md">
          <Card className="bg-dark-surface/90 backdrop-blur-xl border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[2rem] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Rider Status: Online</span>
                </div>
                <Button variant="ghost" className="h-8 px-4 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full">
                  Go Offline
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-dark-deep/50 border border-gold/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Success Rate</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">99%</span>
                    <Activity size={16} className="text-emerald-500 mb-1" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-dark-deep/50 border border-gold/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Time on Road</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">4.2h</span>
                    <Clock size={16} className="text-gold mb-1" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Demand Spike</h4>
                  <p className="text-[10px] text-gold/80 font-bold uppercase">Main Market Area • 1.5x Multiplier</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-background">
                  <TrendingUpIcon size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const TrendingUpIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default RiderDashboard;
