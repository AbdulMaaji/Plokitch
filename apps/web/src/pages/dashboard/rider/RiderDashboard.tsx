import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bike, 
  MapPin, 
  Navigation, 
  Clock, 
  ChevronDown,
  Activity,
  Maximize2,
  Locate,
  Wifi,
  WifiOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useBroadcastLocation } from "@/hooks/useRealtimeLocation";
import { useOrderLocation, GOMBE_CENTER } from "@/hooks/useOrderLocation";
import type { LatLng } from "@/components/Map/OrderTrackingMap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const RiderDashboard = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Check if rider has a profile; if not, create one
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["rider-profile"],
    queryFn: async () => {
      if (!session?.session?.token) return null;
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/riders/me`, {
        headers: { "Authorization": `Bearer ${session.session.token}` }
      });
      if (res.status === 404) return null;
      const json = await res.json();
      return json.data;
    },
    enabled: !!session?.session?.token,
  });

  const initProfile = useMutation({
    mutationFn: async () => {
      if (!session?.session?.token) throw new Error("Not authenticated");
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/riders`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.session.token}`
        },
        body: JSON.stringify({ vehicleType: "Bicycle" }), // Default
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rider-profile"] });
    }
  });

  useEffect(() => {
    if (!isProfileLoading && session && !profile && !initProfile.isPending) {
      console.log("No rider profile found, initializing...");
      initProfile.mutate();
    }
  }, [profile, isProfileLoading, session, initProfile]);
  
  const { data: myOrders } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!session?.session?.token) return [];
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/orders`, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.session.token}`
          }
        });
        const json = await res.json();
        return json.data || [];
      } catch (error) {
        console.error("Failed to fetch my orders:", error);
        return [];
      }
    }
  });

  const activeOrder = useMemo(() => {
    // If we have any order that's being picked up or delivered, that's our focus
    const ongoing = myOrders?.find(o => o.status === "picking" || o.status === "delivering");
    if (ongoing) return ongoing;
    return null;
  }, [myOrders]);

  useEffect(() => {
    if (activeOrder) {
      setActiveOrderId(activeOrder.id);
    }
  }, [activeOrder]);

  const { data: orderLoc } = useOrderLocation(activeOrderId);
  
  // Fetch available orders (Ready for pickup)
  const { data: availableOrders, isLoading: isLoadingAvailable } = useQuery({
    queryKey: ["available-orders"],
    queryFn: async () => {
      if (!session?.session?.token) return [];
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/orders/available`, {
          headers: {
            "Authorization": `Bearer ${session.session.token}`
          }
        });
        const json = await res.json();
        return json.data || [];
      } catch (error) {
        console.error("Failed to fetch available orders:", error);
        return [];
      }
    },
    refetchInterval: 10000,
  });

  // Mutation to accept an order
  const acceptOrder = useMutation({
    mutationFn: async (orderId: string) => {
      if (!session?.session?.token) throw new Error("Not authenticated");
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.session.token}`
        },
        body: JSON.stringify({ 
          status: "picking",
          riderId: session?.user?.id 
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to accept order");
      return json.data;
    },
    onSuccess: () => {
      toast.success("Order accepted! Head to the kitchen.");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["available-orders"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  // Mutation to broadcast status updates (picking -> delivering -> completed)
  const updateStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      if (!session?.session?.token) throw new Error("Not authenticated");
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.session.token}`
        },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update status");
      return json.data;
    },
    onSuccess: (data) => {
      console.log("Status updated successfully:", data);
      toast.success(`Order set to ${data.status.toUpperCase()}`, {
        description: data.status === 'delivering' ? "Customer notified. Start your travel." : "Payment released. Great job!"
      });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      if (data.status === 'completed') {
        setActiveOrderId(null);
      }
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  // Live GPS tracking
  const { lat, lng, heading, speed, error, isTracking, startTracking, stopTracking } = useGeolocation({
    enableHighAccuracy: true,
    autoStart: true,
  });

  // Broadcast position to customers
  const { broadcastPosition } = useBroadcastLocation({
    orderId: activeOrderId || "no-order",
  });

  // Broadcast GPS position whenever it updates
  useEffect(() => {
    if (lat !== null && lng !== null && activeOrderId) {
      broadcastPosition({ lat, lng, heading, speed });
    }
  }, [lat, lng, heading, speed, broadcastPosition, activeOrderId]);

  // Current rider position for the map
  const riderPos: LatLng | null = lat !== null && lng !== null
    ? { lat, lng }
    : null;

  return (
    <DashboardLayout role="rider">
      <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] relative overflow-hidden rounded-[2rem] border border-gold/10 bg-dark-deep">
        {/* Full-screen Map Integration */}
        <div className="absolute inset-0 z-0">
          <OrderTrackingMap
            showLabels={true}
            showRoute={true}
            className="h-full w-full"
            kitchenLocation={orderLoc?.kitchen || GOMBE_CENTER}
            riderLocation={riderPos}
            deliveryLocation={orderLoc?.delivery || { lat: GOMBE_CENTER.lat - 0.01, lng: GOMBE_CENTER.lng - 0.01 }}
            center={riderPos}
          />
        </div>

        {/* Top Overlay Controls */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            {/* GPS Status Indicator */}
            <Badge className={`w-fit ${isTracking ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : error ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} border backdrop-blur-md px-3 py-1 font-black tracking-widest uppercase text-[10px] flex items-center gap-2`}>
              {isTracking ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isTracking ? "GPS Active" : error ? "GPS Error" : "GPS Off"}
            </Badge>

            {error && (
              <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-xl px-3 py-2 max-w-xs">
                <p className="text-[10px] text-red-400 font-bold">{error}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={startTracking}
                  className="text-gold text-[10px] h-6 px-2 mt-1 hover:bg-gold/10"
                >
                  Retry
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2 bg-dark-surface/80 backdrop-blur-xl border border-gold/10 p-3 rounded-2xl shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                <Bike size={20} />
              </div>
              <div className="mr-4">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Earnings Today</p>
                <p className="text-lg font-bold text-white">₦142.80</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Recenter on current position */}
            {riderPos && (
              <Button 
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-2xl bg-dark-surface/80 backdrop-blur-md border border-gold/10 text-gold shadow-2xl hover:bg-gold/10"
                onClick={() => {/* Map will recenter via center prop */}}
              >
                <Locate size={22} />
              </Button>
            )}

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
                  {availableOrders && availableOrders.length > 0 ? (
                    availableOrders.map((order) => (
                      <div key={order.id} className="focus:bg-gold/10 rounded-xl p-4 border border-gold/5 hover:border-gold/20 transition-all block bg-dark-deep/30">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-black text-white">{order.vendor?.name || "Ready Order"}</span>
                          <span className="font-bold text-gold">${order.totalAmount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3 uppercase tracking-wider font-bold">
                          <MapPin size={10} className="text-gold" />
                          <span className="truncate max-w-[100px]">{order.vendor?.address || "Kitchen"}</span>
                          <ChevronDown size={10} className="-rotate-90" />
                          <span className="truncate max-w-[100px]">{order.deliveryAddress?.street || "Customer"}</span>
                        </div>
                        <Button 
                          onClick={() => acceptOrder.mutate(order.id)}
                          disabled={acceptOrder.isPending || !!activeOrder}
                          className="w-full h-8 bg-gold hover:bg-gold-light text-background font-black text-[10px] uppercase tracking-widest rounded-lg"
                        >
                          {acceptOrder.isPending ? "ACCEPTING..." : activeOrder ? "FINISH CURRENT FIRST" : "ACCEPT ORDER"}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">No orders available right now</p>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-dark-surface/80 backdrop-blur-md border border-gold/10 text-white shadow-2xl">
              <Maximize2 size={24} />
            </Button>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row gap-6 items-end">
          {/* Status/Analytics Card */}
          <Card className="bg-dark-surface/90 backdrop-blur-xl border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[2rem] overflow-hidden w-full md:max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isTracking ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs font-black text-white uppercase tracking-widest">
                    Rider Status: {isTracking ? "Online" : "Offline"}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={isTracking ? stopTracking : startTracking}
                  className={`h-8 px-4 text-xs font-bold rounded-full ${
                    isTracking 
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                      : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                  }`}
                >
                  {isTracking ? "Go Offline" : "Go Online"}
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

              {riderPos && (
                <div className="mt-4 p-3 rounded-xl bg-dark-deep/50 border border-gold/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Current Coordinates</p>
                  <p className="text-xs text-white/60 font-mono">
                    {riderPos.lat.toFixed(6)}, {riderPos.lng.toFixed(6)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Floating Active Order Card */}
          <AnimatePresence>
            {activeOrder && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="flex-1 w-full"
              >
                <Card className="bg-gold border-none shadow-2xl rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-background/10 backdrop-blur-md flex items-center justify-center text-background border border-background/10">
                          <Navigation size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-background/60">Active Delivery</p>
                          <h4 className="text-lg font-black text-background uppercase truncate max-w-[200px]">
                            {activeOrder.status === 'picking' ? `Pickup: ${activeOrder.vendor?.businessName}` : `Dropoff: ${activeOrder.customer?.name}`}
                          </h4>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg"
                        disabled={updateStatus.isPending}
                        onClick={() => updateStatus.mutate({ 
                          orderId: activeOrder.id, 
                          status: activeOrder.status === 'picking' ? 'delivering' : 'completed' 
                        })}
                        className="bg-background text-gold hover:bg-background/90 font-black h-14 px-8 rounded-2xl shadow-xl uppercase tracking-widest"
                      >
                        {updateStatus.isPending ? "Updating..." : activeOrder.status === 'picking' ? "MARK PICKED UP" : "MARK DELIVERED"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
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
