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

const ChefSettings = () => {
  return (
    <DashboardLayout role="chef">
      <div className="space-y-8 max-w-5xl mx-auto">
        <header className="flex items-center justify-between border-b border-gold/10 pb-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your kitchen presence and preferences</p>
          </div>
          <Button className="bg-gold hover:bg-gold-light text-background font-black tracking-[0.2em] px-10 h-12 shadow-lg shadow-gold/20">
            <Save size={18} className="mr-2" />
            SAVE CHANGES
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Internal Nav - Desktop Only */}
          <div className="hidden md:block space-y-2">
            {[
              { icon: User, label: "Personal Profile" },
              { icon: Store, label: "Kitchen Identity" },
              { icon: MapPin, label: "Operational Area" },
              { icon: Bell, label: "Notifications" },
              { icon: CreditCard, label: "Payout Methods" },
              { icon: Shield, label: "Security" },
            ].map((item, idx) => (
              <Button 
                key={item.label} 
                variant="ghost" 
                className={`w-full justify-start gap-3 h-12 font-bold uppercase tracking-widest text-[11px] ${idx === 1 ? 'text-gold bg-gold/5' : 'text-muted-foreground hover:text-gold hover:bg-gold/5'}`}
              >
                <item.icon size={16} />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Form Content */}
          <div className="md:col-span-2 space-y-8">
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefSettings;
