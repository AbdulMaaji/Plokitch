import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  CreditCard, 
  Bell,
  Settings,
  MoreVertical,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CustomerProfile = () => {
  const orderHistory = [
    { id: "ORD-9921", chef: "Chef Andre L'Aube", date: "April 15, 2024", total: "$112.50", status: "Delivered" },
    { id: "ORD-9882", chef: "Sienna's Organic", date: "April 10, 2024", total: "$45.00", status: "Delivered" },
    { id: "ORD-9750", chef: "The Truffle House", date: "March 28, 2024", total: "$89.20", status: "Delivered" },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="space-y-10 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-gold/20 bg-dark-surface overflow-hidden shadow-2xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=sophia" alt="Sophia's Profile" />
              </div>
              <div>
                <h1 className="text-4xl font-heading font-black text-white">Sophia Chen</h1>
                <p className="text-muted-foreground font-body text-sm mt-1">Gombe Central • Elite Foodie Status</p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-gold text-background border-none font-bold text-[10px]">GOLD MEMBER</Badge>
                  <Badge className="bg-white/5 text-white border-white/10 font-bold text-[10px]">12 ORDERS</Badge>
                </div>
              </div>
           </div>
           <div className="flex gap-4">
              <Button variant="outline" className="h-12 border-gold/20 text-gold hover:bg-gold/5 font-black uppercase tracking-widest px-8">
                EDIT PROFILE
              </Button>
              <Button size="icon" variant="ghost" className="h-12 w-12 text-muted-foreground border border-white/5 hover:text-white">
                <Settings size={20} />
              </Button>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Recent Orders */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-heading font-black text-white uppercase tracking-wider flex items-center gap-3">
                   <ShoppingBag size={20} className="text-gold" />
                   Recent Orders
                 </h2>
                 <Button variant="ghost" className="text-gold font-bold text-xs uppercase tracking-widest">VIEW ALL</Button>
              </div>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <Card key={order.id} className="bg-dark-surface border-white/5 hover:border-gold/20 transition-all group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-dark-deep border border-white/5 flex items-center justify-center text-gold">
                              <ShoppingBag size={20} />
                           </div>
                           <div>
                              <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{order.chef}</h4>
                              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{order.date} • {order.id}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-lg font-black text-white">{order.total}</p>
                              <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 text-[9px] uppercase font-black">{order.status}</Badge>
                           </div>
                           <Button size="icon" variant="ghost" className="h-10 w-10 text-muted-foreground hover:text-white">
                              <ChevronRight size={20} />
                           </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Saved Cuisines / Preferences */}
            <div className="space-y-6">
               <h2 className="text-xl font-heading font-black text-white uppercase tracking-wider flex items-center gap-3">
                 <Heart size={20} className="text-red-500" />
                 Kitchen Selection
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['French', 'Japanese', 'Vegan', 'Fusion'].map((cuisine) => (
                    <div key={cuisine} className="p-6 rounded-2xl bg-dark-surface border border-white/5 text-center hover:border-gold/30 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/10 mx-auto mb-3 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all">
                        <ShoppingBag size={16} />
                      </div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">{cuisine}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-dark-surface border-white/5 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black text-white uppercase tracking-[0.2em]">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                 {[
                  { icon: MapPin, label: "Delivery Addresses" },
                  { icon: CreditCard, label: "Payment Methods" },
                  { icon: Bell, label: "Notification Settings" },
                  { icon: User, label: "Support & Help" },
                ].map((item) => (
                  <Button 
                    key={item.label} 
                    variant="ghost" 
                    className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Button>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5">
                  <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-red-500 hover:bg-red-500/5 font-black uppercase tracking-widest text-[10px]">
                    <LogOut size={18} />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gold p-8 rounded-[2rem] text-background">
               <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-2">Upgrade to Prime</h4>
               <p className="text-xs font-medium leading-relaxed mb-6">Unlocking free delivery from all elite kitchens for only $9.99/mo.</p>
               <Button className="w-full bg-background text-white hover:bg-dark-deep font-black uppercase tracking-widest h-12">
                 UPGRADE NOW
               </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
