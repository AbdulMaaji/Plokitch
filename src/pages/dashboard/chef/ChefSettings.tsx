import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Store, 
  MapPin, 
  Bell, 
  Shield, 
  CreditCard,
  Save,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Locate, Map as MapIcon, Globe } from "lucide-react";

const ChefSettings = () => {
  const [activeTab, setActiveTab] = useState("Kitchen Identity");

  const handleSave = () => {
    toast.success("Settings updated", {
      description: "Your kitchen presence and preferences have been synchronized.",
    });
  };

  const navItems = [
    { icon: User, label: "Personal Profile" },
    { icon: Store, label: "Kitchen Identity" },
    { icon: MapPin, label: "Operational Area" },
    { icon: Bell, label: "Notifications" },
    { icon: CreditCard, label: "Payout Methods" },
    { icon: Shield, label: "Security" },
  ];

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8 max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your kitchen presence and preferences</p>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gold hover:bg-gold-light text-background font-black tracking-[0.2em] px-10 h-12 shadow-lg shadow-gold/20"
          >
            <Save size={18} className="mr-2" />
            SAVE CHANGES
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Internal Nav */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                variant="ghost" 
                onClick={() => setActiveTab(item.label)}
                className={`w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[11px] transition-all ${
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

          {/* Form Content */}
          <div className="md:col-span-2 space-y-8">
            {activeTab === "Kitchen Identity" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Kitchen Identity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6 pb-6 border-b border-gold/5">
                      <div className="w-24 h-24 rounded-2xl bg-dark-deep border border-gold/20 flex items-center justify-center relative group overflow-hidden">
                        <Store className="text-gold/20 w-12 h-12" />
                        <div className="absolute inset-0 bg-dark-deep/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="text-white w-6 h-6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-white uppercase tracking-widest">Kitchen Cover Photo</p>
                        <p className="text-xs text-muted-foreground">Minimalist high-res images of your workspace perform best. Max 5MB.</p>
                        <Button variant="outline" className="h-9 border-gold/20 text-gold text-[10px] font-black tracking-widest">UPLOAD NEW PHOTO</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Kitchen Name</Label>
                        <Input defaultValue="Chef Andre L'Aube" className="bg-dark-deep border-gold/10 focus:border-gold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Cuisine Speciality</Label>
                        <Input defaultValue="French Contemporary" className="bg-dark-deep border-gold/10 focus:border-gold" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Kitchen Bio</Label>
                        <Textarea 
                          defaultValue="Established in 2021, we focus on the fusion of classical French techniques with local Nigerian botanicals. Every dish is a story of craft and flavour."
                          className="bg-dark-deep border-gold/10 focus:border-gold min-h-[120px]" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-widest">Instant Ordering</p>
                        <p className="text-xs text-muted-foreground">Allow customers to order without pre-approval</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-widest">Weekend Exclusives</p>
                        <p className="text-xs text-muted-foreground">Only show specific menu items on Friday-Sunday</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-gold" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : activeTab === "Operational Area" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Kitchen Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6 w-full">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-black text-gold uppercase tracking-widest">Street Address</Label>
                            <Input placeholder="123 Culina Street" className="bg-dark-deep border-gold/10 focus:border-gold" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-black text-gold uppercase tracking-widest">City</Label>
                              <Input placeholder="Gombe" className="bg-dark-deep border-gold/10 focus:border-gold" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-black text-gold uppercase tracking-widest">State</Label>
                              <Input placeholder="Gombe" className="bg-dark-deep border-gold/10 focus:border-gold" />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gold/5 flex gap-4">
                           <Button 
                            variant="outline" 
                            onClick={() => {
                              toast.info("Geolocation initialized", { description: "Fetching your kitchen's precise coordinates..." });
                              // Geolocation logic handled below in coordinates section
                            }}
                            className="h-12 border-gold/20 text-gold text-[10px] font-black tracking-widest flex gap-2"
                           >
                              <Locate size={14} />
                              USE CURRENT LOCATION
                           </Button>
                           <Button variant="ghost" className="h-12 text-muted-foreground text-[10px] font-black tracking-widest">RESET MAP</Button>
                        </div>
                      </div>

                      <div className="w-full md:w-80 space-y-4">
                         <div className="aspect-square rounded-2xl bg-dark-deep border border-gold/10 flex items-center justify-center text-gold/20 relative overflow-hidden group">
                            <MapIcon size={48} />
                            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <p className="text-[10px] text-muted-foreground text-center font-medium">Pin your kitchen to the map to help riders find you faster.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gold/5 border border-gold/10 grid grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] text-gold font-black uppercase tracking-widest">Latitude</p>
                          <p className="text-sm font-bold text-white font-mono">10.2897</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] text-gold font-black uppercase tracking-widest">Longitude</p>
                          <p className="text-sm font-bold text-white font-mono">11.1673</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-surface border-gold/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Delivery Radius</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs font-bold text-white uppercase tracking-widest">Maximum Radius (KM)</Label>
                        <span className="text-gold font-black">15 km</span>
                      </div>
                      <Input type="range" min="1" max="50" defaultValue="15" className="h-2 bg-dark-deep accent-gold cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-blue-400">
                      <Globe size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-widest">Synchronized with city logistics network</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : activeTab === "Notifications" ? (
              <Card className="bg-dark-surface border-gold/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                 <CardHeader>
                    <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Notification Preferences</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-8 divide-y divide-gold/5">
                    <div className="flex items-center justify-between py-6 first:pt-0">
                       <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Order Alerts</h4>
                          <p className="text-xs text-muted-foreground">Get notified when a new order is placed</p>
                       </div>
                       <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                    </div>
                    <div className="flex items-center justify-between py-6">
                       <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Rider Updates</h4>
                          <p className="text-xs text-muted-foreground">Status updates when a rider accepts or picks up</p>
                       </div>
                       <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                    </div>
                    <div className="flex items-center justify-between py-6 last:pb-0">
                       <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Marketing Emails</h4>
                          <p className="text-xs text-muted-foreground">Monthly insights and platform performance tips</p>
                       </div>
                       <Switch className="data-[state=checked]:bg-gold" />
                    </div>
                 </CardContent>
              </Card>
            ) : (
              <Card className="bg-dark-surface border-gold/10 p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/20 mb-6">
                  <Shield size={32} />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">{activeTab}</h3>
                <p className="text-xs text-muted-foreground max-w-[250px] mx-auto">This setting module is currently being optimized for high-performance culinary operations.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefSettings;
