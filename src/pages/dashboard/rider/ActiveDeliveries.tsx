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

const ActiveDeliveries = () => {
  const navigate = useNavigate();
  const activeDeliveries = [
    { 
      id: "DEL-410", 
      chef: "Chef Andre L'Aube", 
      customer: "Sophia Chen", 
      pickup: "Sector A, Gombe", 
      dropoff: "GRA Extension, Gombe", 
      status: "On the way", 
      time: "12 mins left",
      urgent: true
    },
  ];

  const history = [
    { id: "DEL-409", customer: "Elena R.", date: "Today, 1:45 PM", status: "Completed", payout: "$8.50" },
    { id: "DEL-408", customer: "Marcus W.", date: "Today, 11:30 AM", status: "Completed", payout: "$12.20" },
    { id: "DEL-407", customer: "Aisha K.", date: "Yesterday", status: "Completed", payout: "$9.00" },
  ];

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
