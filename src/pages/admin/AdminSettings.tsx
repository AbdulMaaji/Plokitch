import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Settings, 
  Shield, 
  Globe, 
  CreditCard, 
  Mail, 
  Zap,
  Save,
  Bell,
  Sliders,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("General Settings");

  const handleSave = () => {
    toast.success("System configurations deployed successfully", {
      description: "Atmospheric factors and fee structures updated across all nodes.",
    });
  };

  const navItems = [
    { icon: Globe, label: "General Settings" },
    { icon: CreditCard, label: "Fee Structures" },
    { icon: Shield, label: "Access Control" },
    { icon: Mail, label: "Email Notifications" },
    { icon: Zap, label: "System Triggers" },
    { icon: Database, label: "Data Management" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black text-white">Platform Control</h1>
              <p className="text-muted-foreground mt-1">Global system configuration and policy management</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gold hover:bg-gold-light text-background font-black tracking-[0.2em] px-10 h-12 shadow-lg shadow-gold/20"
          >
            <Save size={18} className="mr-2" />
            DEPLOY UPDATES
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                variant="ghost" 
                onClick={() => setActiveTab(item.label)}
                className={`w-full justify-start gap-4 h-12 font-black uppercase tracking-widest text-[10px] transition-all ${
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

          <div className="lg:col-span-3 space-y-8">
            {activeTab === "Fee Structures" ? (
              <Card className="bg-dark-surface border-gold/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders size={18} className="text-gold" />
                    Service Economics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Platform Service Fee (%)</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="15.0" className="bg-dark-deep border-gold/10 focus:border-gold font-bold text-white h-12" />
                        <div className="h-12 w-12 rounded-lg bg-dark-deep border border-gold/10 flex items-center justify-center font-black text-sm text-gold">%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Rider Base Commission (₦)</Label>
                       <div className="flex gap-2">
                        <Input defaultValue="3.50" className="bg-dark-deep border-gold/10 focus:border-gold font-bold text-white h-12" />
                        <div className="h-12 w-12 rounded-lg bg-dark-deep border border-gold/10 flex items-center justify-center font-black text-sm text-gold">₦</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : activeTab === "General Settings" ? (
              <Card className="bg-dark-surface border-gold/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Bell size={18} className="text-gold" />
                    Critical System Toggles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 divide-y divide-gold/5">
                  <div className="flex items-center justify-between py-6 first:pt-0">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Global New Registration</h4>
                      <p className="text-[10px] text-muted-foreground font-medium">Temporarily disable all new chef and rider signups</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                  </div>
                  <div className="flex items-center justify-between py-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Promotional Multiplier</h4>
                      <p className="text-[10px] text-muted-foreground font-medium">Apply 1.2x boost to all Chef earnings for the weekend</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-gold" />
                  </div>
                  <div className="flex items-center justify-between py-6 last:pb-0">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Direct-to-Bank Transfers</h4>
                      <p className="text-[10px] text-muted-foreground font-medium">Enable real-time withdrawal functionality for all verified roles</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-dark-surface border-gold/10 p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/20 mb-6">
                  <Zap size={40} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">{activeTab}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">This configuration module is being prepared for the next system synchronization.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
