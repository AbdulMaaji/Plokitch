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
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderTrackingMap from "@/components/Map/OrderTrackingMap";

const LiveTrack = () => {
  const steps = [
    { title: "Order Confirmed", status: "complete", time: "12:30 PM", icon: CheckCircle2 },
    { title: "Chef Preparing", status: "complete", time: "12:45 PM", icon: ChefHat },
    { title: "Rider En-route", status: "active", time: "1:05 PM (Estimated)", icon: Bike },
    { title: "Delivered", status: "pending", time: "-", icon: MapPin },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-heading font-black text-white">Live Track</h1>
            <p className="text-muted-foreground font-body">Order #ORD-9921 • Delivery from Chef Andre L'Aube</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-6 py-2 text-sm font-black uppercase tracking-widest h-fit">
            Arriving in 12 mins
          </Badge>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 overflow-hidden relative min-h-[500px] rounded-[2.5rem]">
            <OrderTrackingMap className="rounded-[2.5rem]" />

            <div className="absolute bottom-10 left-10 p-6 bg-dark-deep/80 backdrop-blur-xl border border-gold/20 rounded-2xl flex items-center gap-6 max-w-sm">
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
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Truffle Salmon Glaze x2</span>
                  <span className="text-white font-bold">₦90,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Artisan Bread Pack</span>
                  <span className="text-white font-bold">₦12,000</span>
                </div>
                <div className="pt-4 border-t border-gold/5 flex justify-between items-center">
                  <span className="text-gold font-black uppercase tracking-widest text-xs">Total</span>
                  <span className="text-2xl font-black text-white font-heading">₦112,500</span>
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
