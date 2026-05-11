import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bike, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation,
  Phone,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import { GOMBE_CENTER } from "@/hooks/useOrderLocation";
import type { LatLng } from "@/components/Map/OrderTrackingMap";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ActiveDeliveries = () => {
  const navigate = useNavigate();
  const [activeDeliveries, setActiveDeliveries] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchDeliveries = async () => {
      if (!session?.session?.token) return;
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: { 'Authorization': `Bearer ${session.session.token}` }
        });
        const data = await res.json();
        if (data.success) {
          const all = data.data;
          setActiveDeliveries(all.filter((o: any) => ["picking", "delivering"].includes(o.status)).map((o: any) => ({
            id: `DEL-${o.id.slice(0, 4)}`,
            realId: o.id,
            chef: o.vendor?.businessName || "Artisan Kitchen",
            customer: o.customer?.name || "Customer",
            pickup: o.vendor?.location?.address || "Gombe",
            dropoff: o.deliveryAddress?.street || "Gombe",
            status: o.status === 'picking' ? "At Kitchen" : "On the way",
            time: "15 mins est.",
            urgent: false
          })));
          
          setHistory(all.filter((o: any) => o.status === 'completed').map((o: any) => ({
             id: `DEL-${o.id.slice(0, 4)}`,
             customer: o.customer?.name || "Customer",
             date: new Date(o.deliveredAt || o.updatedAt).toLocaleString(),
             status: "Completed",
             payout: `₦${(Number(o.totalAmount) * 0.1).toFixed(2)}` // Simulated 10% delivery fee
          })));
        }
      } catch (error) {
        toast.error("Failed to fetch deliveries");
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, [session]);

  return (
    <DashboardLayout role="rider">
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-heading font-black text-white">Deliveries</h1>
          <p className="text-muted-foreground mt-1">Manage your active assignments and history</p>
        </header>

        {/* Active Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-gold uppercase tracking-[0.3em]">Currently Active</h2>
          {activeDeliveries.length > 0 ? (
            activeDeliveries.map((delivery) => (
              <Card key={delivery.id} className="bg-dark-surface border-gold/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8">
                  <div className="flex flex-col xl:flex-row gap-8">
                    {/* Delivery Details */}
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex-1 space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                              <Bike size={28} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-gold uppercase tracking-widest">{delivery.id}</p>
                              <h3 className="text-2xl font-bold text-white">{delivery.status}</h3>
                              <Badge className="bg-emerald-500/10 text-emerald-500 border-none mt-1 animate-pulse">{delivery.time}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gold/20" />
                            <div className="flex gap-4 relative">
                              <div className="w-3.5 h-3.5 rounded-full bg-gold border-2 border-background z-10 mt-1" />
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Pickup Location</p>
                                <p className="text-sm font-bold text-white">{delivery.chef}</p>
                                <p className="text-xs text-muted-foreground">{delivery.pickup}</p>
                              </div>
                            </div>
                            <div className="flex gap-4 relative">
                              <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-background z-10 mt-1" />
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Dropoff Location</p>
                                <p className="text-sm font-bold text-white">{delivery.customer}</p>
                                <p className="text-xs text-muted-foreground">{delivery.dropoff}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-3">
                          <Button 
                            onClick={() => navigate("/dashboard/rider")}
                            className="h-14 lg:w-48 bg-gold hover:bg-gold-light text-background font-black uppercase tracking-widest flex gap-2"
                          >
                            <Navigation size={18} />
                            OPEN MAPS
                          </Button>
                          <div className="flex gap-3">
                            <Button variant="outline" size="icon" className="h-14 w-14 border-gold/20 text-gold hover:bg-gold/5">
                              <Phone size={20} />
                            </Button>
                            <Button variant="outline" size="icon" className="h-14 w-14 border-gold/20 text-gold hover:bg-gold/5">
                              <MessageSquare size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mini Map Preview */}
                    <div className="xl:w-80 h-48 xl:h-auto rounded-2xl overflow-hidden border border-gold/10">
                      <OrderTrackingMap
                        kitchenLocation={GOMBE_CENTER}
                        riderLocation={{ lat: GOMBE_CENTER.lat - 0.005, lng: GOMBE_CENTER.lng - 0.003 }}
                        deliveryLocation={{ lat: GOMBE_CENTER.lat - 0.01, lng: GOMBE_CENTER.lng - 0.01 }}
                        showLabels={false}
                        showRoute={true}
                        className="h-full min-h-[192px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-dark-surface border-gold/10 p-12 text-center">
              <p className="text-muted-foreground uppercase tracking-[0.2em] font-bold">No active deliveries</p>
              <Button variant="ghost" className="text-gold mt-4 font-black">BROWSE AVAILABLE JOBS</Button>
            </Card>
          )}
        </div>

        {/* History Section */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-black text-gold uppercase tracking-[0.3em]">Completed Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((order) => (
              <Card key={order.id} className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{order.customer}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{order.id}</p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-gold">{order.payout}</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{order.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveDeliveries;
