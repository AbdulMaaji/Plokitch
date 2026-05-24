import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
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
  WifiOff,
  X,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";
import { useTrackRider } from "@/hooks/useRealtimeLocation";
import type { LatLng } from "@/components/Map/OrderTrackingMap";

import { useParams, useNavigate } from "react-router-dom";
import { useOrderLocation, GOMBE_CENTER } from "@/hooks/useOrderLocation";

const LiveTrack = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: orderLoc, isLoading } = useOrderLocation(orderId);
  const { riderPosition, isConnected } = useTrackRider(orderId);

  const currentRiderPos: LatLng = riderPosition
    ? { lat: riderPosition.lat, lng: riderPosition.lng }
    : orderLoc?.rider || GOMBE_CENTER;

  const currentKitchenPos: LatLng = orderLoc?.kitchen || GOMBE_CENTER;
  const currentDeliveryPos: LatLng = orderLoc?.delivery || { lat: GOMBE_CENTER.lat - 0.01, lng: GOMBE_CENTER.lng - 0.01 };

  if (!orderId && !isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-[3px]">
        <div className="w-full max-w-lg bg-dark-surface/95 border border-gold/15 rounded-[2.5rem] p-8 text-center space-y-6 text-white shadow-2xl">
          <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center border border-gold/10 mx-auto">
            <Navigation size={32} className="text-gold/30" />
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest">No Active Order</h2>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-sm mx-auto">
            You don't have any orders being tracked right now. Browse our spatial kitchens to place your first gourmet order!
          </p>
          <Button 
            onClick={() => navigate("/customer/discover")} 
            className="bg-gold text-background font-black px-8 rounded-xl h-11 text-xs tracking-widest uppercase"
          >
            EXPLORE MAP
          </Button>
        </div>
      </div>
    );
  }

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

  const shortOrderId = orderId ? orderId.split('-').pop() : "Order";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-[3px] overflow-hidden">
      <div className="w-full max-w-6xl bg-dark-surface/95 border border-gold/15 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.85)] text-white relative max-h-[90vh] overflow-hidden space-y-10">
        
        {/* Floating Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/customer/discover")}
          className="absolute top-6 right-6 rounded-full border border-white/5 hover:border-gold/30 text-muted-foreground hover:text-white"
        >
          <X size={18} />
        </Button>

        {/* Live Track Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pr-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-heading font-black text-white">Live Track</h1>
            <p className="text-muted-foreground font-body text-xs">
              Order #{shortOrderId} • Active Delivery
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${isConnected ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest h-fit flex items-center gap-1.5 rounded-full`}>
              {isConnected ? <Wifi size={12} className="animate-pulse" /> : <WifiOff size={12} />}
              {isConnected ? "Live Tracking" : "Offline"}
            </Badge>
            <Badge className="bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest h-fit rounded-full">
              Arriving in 12 mins
            </Badge>
          </div>
        </header>

        {/* Dynamic content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-dark-deep border border-gold/10 overflow-hidden relative min-h-[360px] rounded-[2rem]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-deep">
                <p className="text-gold font-bold animate-pulse uppercase tracking-widest text-[10px]">Locating Order coordinates...</p>
              </div>
            ) : (
              <OrderTrackingMap
                className="w-full h-full min-h-[360px]"
                kitchenLocation={currentKitchenPos}
                riderLocation={currentRiderPos}
                deliveryLocation={currentDeliveryPos}
                showLabels={true}
                showRoute={true}
              />
            )}

            <div className="absolute bottom-6 left-6 p-4 bg-dark-deep/90 backdrop-blur-md border border-gold/20 rounded-2xl flex items-center gap-4 max-w-xs z-[600]">
              <div className="w-12 h-12 rounded-full bg-dark-surface border border-gold/10 overflow-hidden shrink-0">
                <img 
                  src={orderLoc?.riderInfo?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${orderLoc?.riderInfo?.name || 'Rider'}`} 
                  alt="Rider" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] text-gold font-black uppercase tracking-widest leading-none mb-1">Your Courier</p>
                <h3 className="text-sm font-bold text-white truncate">{orderLoc?.riderInfo?.name || "Assigning Rider..."}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20">
                    <Phone size={14} />
                  </Button>
                  <Button size="icon" className="h-8 w-8 rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20">
                    <MessageSquare size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-6">
            <Card className="bg-dark-deep/45 border-gold/10 p-6 rounded-[2rem] space-y-6">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest border-b border-gold/5 pb-3">Progress</CardTitle>
              <div className="space-y-6 text-xs">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative">
                    {idx !== steps.length - 1 && (
                      <div className={`absolute left-4 top-8 w-0.5 h-8 ${step.status === 'complete' ? 'bg-gold' : 'bg-gold/10'}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      step.status === 'complete' ? 'bg-gold border-gold text-background shadow-lg shadow-gold/10 scale-105' :
                      step.status === 'active' ? 'bg-gold/10 border-gold text-gold animate-pulse' :
                      'bg-dark-deep border-gold/10 text-muted-foreground'
                    }`}>
                      <step.icon size={14} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${step.status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}>{step.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-dark-deep/45 border-gold/10 p-6 rounded-[2rem] space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-widest leading-none">Order Details</h4>
              <div className="space-y-3 text-xs">
                {orderLoc?.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span className="text-white font-bold">₦{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gold/5 flex justify-between items-center">
                  <span className="text-gold font-black uppercase tracking-widest text-[10px]">Total Paid</span>
                  <span className="text-xl font-black text-white font-heading">₦{orderLoc?.totalAmount || '0'}</span>
                </div>
              </div>
              <Button variant="ghost" className="w-full h-10 border border-white/5 hover:border-gold/30 rounded-xl text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mt-2">
                Order Receipt
                <ExternalLink size={12} />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrack;
