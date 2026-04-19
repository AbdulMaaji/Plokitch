import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bike, 
  ChefHat, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare,
  Navigation,
  ExternalLink,
  Wifi,
  WifiOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import { useTrackRider } from "@/hooks/useRealtimeLocation";
import type { LatLng } from "@/components/Map/OrderTrackingMap";

import { useParams } from "react-router-dom";
import { useOrderLocation, GOMBE_CENTER } from "@/hooks/useOrderLocation";

// We keep a demo ID just for fallback if hitting /track without an ID
// But ideally, the user should be routed to /track/:orderId
const DEMO_ORDER_ID = "demo-order-9921";

const LiveTrack = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const activeOrderId = orderId || DEMO_ORDER_ID;

  const { data: orderLoc, isLoading } = useOrderLocation(activeOrderId);
  const { riderPosition, isConnected } = useTrackRider(activeOrderId);

  const currentRiderPos: LatLng = riderPosition
    ? { lat: riderPosition.lat, lng: riderPosition.lng }
    : orderLoc?.rider || GOMBE_CENTER;

  const currentKitchenPos: LatLng = orderLoc?.kitchen || GOMBE_CENTER;
  const currentDeliveryPos: LatLng = orderLoc?.delivery || { lat: GOMBE_CENTER.lat - 0.01, lng: GOMBE_CENTER.lng - 0.01 };

  const getStatusStep = (status: string) => {
    const statusMap: Record<string, number> = {
      pending: 0,
      confirmed: 1,
      preparing: 1,
      ready: 2,
      picking: 3,
      delivering: 3,
      completed: 4,
    };
    return statusMap[status] || 0;
  };

  const currentStepIndex = getStatusStep(orderLoc?.status || "pending");

  const steps = [
    { title: "Order Confirmed", status: currentStepIndex >= 1 ? "complete" : "pending", time: "Confirmed", icon: CheckCircle2 },
    { title: "Chef Preparing", status: currentStepIndex === 1 ? "active" : currentStepIndex > 1 ? "complete" : "pending", time: "In Kitchen", icon: ChefHat },
    { title: "Rider En-route", status: currentStepIndex === 3 ? "active" : currentStepIndex > 3 ? "complete" : "pending", time: "On the way", icon: Bike },
    { title: "Delivered", status: currentStepIndex >= 4 ? "complete" : "pending", time: "Enjoy!", icon: MapPin },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-heading font-black text-white">Live Track</h1>
            <p className="text-muted-foreground font-body">Order #{activeOrderId.split('-').pop()} • Delivery</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${isConnected ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border px-4 py-2 text-xs font-black uppercase tracking-widest h-fit flex items-center gap-2`}>
              {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
              {isConnected ? "Live" : "Offline"}
            </Badge>
            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-6 py-2 text-sm font-black uppercase tracking-widest h-fit">
              Arriving in 12 mins
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 overflow-hidden relative min-h-[500px] rounded-[2.5rem]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-deep">
                <p className="text-gold font-bold animate-pulse uppercase tracking-widest text-xs">Locating Order...</p>
              </div>
            ) : (
              <OrderTrackingMap
                className="w-full h-full min-h-[500px]"
                kitchenLocation={currentKitchenPos}
                riderLocation={currentRiderPos}
                deliveryLocation={currentDeliveryPos}
                showLabels={true}
                showRoute={true}
              />
            )}

            <div className="absolute bottom-10 left-10 p-6 bg-dark-deep/80 backdrop-blur-xl border border-gold/20 rounded-2xl flex items-center gap-6 max-w-sm z-[600]">
              <div className="w-16 h-16 rounded-full bg-dark-surface border border-gold/10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rider" alt="Rider" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gold font-black uppercase tracking-widest mb-1">Your Rider</p>
                <h3 className="text-xl font-bold text-white">Dominic T.</h3>
                <div className="flex items-center gap-4 mt-3">
                  <Button size="icon" className="h-10 w-10 rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20">
                    <Phone size={18} />
                  </Button>
                  <Button size="icon" className="h-10 w-10 rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20">
                    <MessageSquare size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline Section */}
          <div className="space-y-6">
            <Card className="bg-dark-surface border-gold/10 p-8 rounded-[2rem]">
              <CardTitle className="text-xl font-heading font-black text-white mb-8 border-b border-gold/5 pb-4">Progress</CardTitle>
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start relative">
                    {idx !== steps.length - 1 && (
                      <div className={`absolute left-6 top-10 w-0.5 h-10 ${step.status === 'complete' ? 'bg-gold' : 'bg-gold/10'}`} />
                    )}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      step.status === 'complete' ? 'bg-gold border-gold text-background shadow-lg shadow-gold/20 scale-110' :
                      step.status === 'active' ? 'bg-gold/10 border-gold text-gold animate-pulse' :
                      'bg-dark-deep border-gold/10 text-muted-foreground'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${step.status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}>{step.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-dark-surface border-gold/10 p-6 rounded-[2rem]">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Order Details</h4>
              <div className="space-y-4">
                {orderLoc?.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span className="text-white font-bold">₦{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-gold/5 flex justify-between items-center">
                  <span className="text-gold font-black uppercase tracking-widest text-xs">Total</span>
                  <span className="text-2xl font-black text-white font-heading">₦{orderLoc?.totalAmount || '0'}</span>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-6 text-gold font-bold hover:bg-gold/5 flex items-center justify-center gap-2">
                Order Receipt
                <ExternalLink size={14} />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveTrack;
