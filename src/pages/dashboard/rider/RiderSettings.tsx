import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Bike, 
  MapPin, 
  Bell, 
  Shield, 
  LogOut,
  Camera,
  Save,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Locate, Map as MapIcon, Navigation2 } from "lucide-react";

const RiderSettings = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Profile Information");

  const handleSave = () => {
    toast.success("Rider profile secured", {
      description: "Your vehicle details and delivery preferences are now live.",
    });
  };

  const navItems = [
    { icon: User, label: "Profile Information" },
    { icon: Bike, label: "Vehicle Documents" },
    { icon: MapPin, label: "Service Areas" },
    { icon: Shield, label: "Security & Login" },
  ];

  return (
    <DashboardLayout role="rider">
      <div className="space-y-8 max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold/10">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Rider Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your vehicle and delivery preferences</p>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gold hover:bg-gold-light text-background font-black tracking-[0.2em] px-10 h-12 shadow-lg shadow-gold/20"
          >
            <Save size={18} className="mr-2" />
            SAVE PROFILE
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-dark-surface border-gold/10 overflow-hidden">
              <div className="h-32 bg-gold/5 relative">
                <div className="absolute top-4 right-4 text-white">
                  <Badge variant="outline" className="border-gold/20 text-gold bg-dark-deep/60 py-1 font-black text-[9px] tracking-widest uppercase">Verified Rider</Badge>
                </div>
              </div>
              <CardContent className="px-6 pb-8 -mt-12 text-center">
                <div className="relative inline-block mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-dark-deep bg-dark-surface overflow-hidden">
                    <img src={session?.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user.email}`} alt="Rider Profile" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold text-background flex items-center justify-center border-2 border-dark-deep shadow-xl hover:scale-110 transition-transform">
                    <Camera size={14} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{session?.user.name || "UNNAMED RIDER"}</h3>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">Rating: 5.0 ⭐</p>
                <div className="mt-8 flex flex-col gap-2 text-white">
                   {navItems.map((item) => (
                    <Button 
                      key={item.label} 
                      variant="ghost" 
                      onClick={() => setActiveTab(item.label)}
                      className={`w-full justify-start gap-4 h-12 font-bold uppercase tracking-widest text-[10px] transition-all ${
                        activeTab === item.label 
                          ? 'text-gold bg-gold/5 border border-gold/10' 
                          : 'text-muted-foreground hover:text-gold hover:bg-gold/5 border border-transparent'
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/5 font-black uppercase tracking-widest text-xs h-12 flex gap-3">
              <LogOut size={16} />
              Deactivate Account
            </Button>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {activeTab === "Vehicle Documents" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="bg-dark-surface border-gold/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Vehicle Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gold uppercase tracking-widest">Primary Vehicle</Label>
                        <Input placeholder="e.g. Toyota Corolla" className="bg-dark-deep border-gold/10 focus:border-gold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-gold uppercase tracking-widest">License Plate</Label>
                        <Input placeholder="Enter Plate Number" className="bg-dark-deep border-gold/10 focus:border-gold" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-emerald-500">
                        <CheckCircle2 size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Insurance Valid (Exp: 2027)</span>
                      </div>
                      <Button variant="ghost" className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">VIEW PDF</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-surface border-gold/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Operation Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Night Shifts</h4>
                        <p className="text-[10px] text-muted-foreground font-medium pr-8">Enable orders past 11:00 PM (1.5x Premium Rate Applied)</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Long Distance</h4>
                        <p className="text-[10px] text-muted-foreground font-medium pr-8">Enable deliveries outside the central city radius</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-gold" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : activeTab === "Service Areas" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 text-white">
                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Base Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <p className="text-xs text-muted-foreground">Your base location determines which orders priority you receive. Set this to your starting point.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-gold uppercase tracking-widest">Base Address</Label>
                          <Input placeholder="Home or Hub Address" className="bg-dark-deep border-gold/10 focus:border-gold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gold uppercase tracking-widest">City</Label>
                            <Input placeholder="Gombe" className="bg-dark-deep border-gold/10 focus:border-gold" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-gold uppercase tracking-widest">State</Label>
                            <Input placeholder="Gombe" className="bg-dark-deep border-gold/10 focus:border-gold" />
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => toast.info("Syncing GPS", { description: "Updating your service anchor to current position..." })}
                          className="w-full h-12 border-gold/20 text-gold text-[10px] font-black tracking-widest flex gap-2"
                        >
                          <Locate size={14} />
                          GET CURRENT LOCATION
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="aspect-video rounded-2xl bg-dark-deep border border-gold/10 flex flex-col items-center justify-center text-gold/20 relative overflow-hidden">
                           <MapIcon size={32} className="mb-2" />
                           <span className="text-[8px] font-black uppercase tracking-widest">Map Preview Area</span>
                        </div>
                        <div className="p-4 rounded-xl bg-gold/5 border border-gold/10 grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                              <p className="text-[9px] text-gold font-black uppercase tracking-widest">Lat</p>
                              <p className="text-xs font-bold text-white font-mono">10.2897</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] text-gold font-black uppercase tracking-widest">Lng</p>
                              <p className="text-xs font-bold text-white font-mono">11.1673</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider">Delivery Radius Control</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <div>
                             <h4 className="text-sm font-bold text-white uppercase tracking-widest">Maximum Travel Radius</h4>
                             <p className="text-[10px] text-muted-foreground">Limit orders to a specific distance from base</p>
                          </div>
                          <Badge variant="outline" className="border-gold text-gold font-black">25 KM</Badge>
                       </div>
                       <Input type="range" min="5" max="100" defaultValue="25" className="h-2 bg-dark-deep accent-gold cursor-pointer" />
                    </div>

                    <div className="pt-6 border-t border-gold/5 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Navigation2 size={18} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">Dynamic Route Optimization</p>
                          <p className="text-[9px] text-muted-foreground">Enabled • Using Gombe Logistic Mesh</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-dark-surface border-gold/10 p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/20 mb-6">
                  <Shield size={32} />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">{activeTab}</h3>
                <p className="text-xs text-muted-foreground max-w-[250px] mx-auto">This synchronization module is currently being calibrated for optimal route efficiency.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderSettings;
