import { useState, useEffect, useRef } from "react";
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
  Camera,
  Locate, 
  Map as MapIcon, 
  Globe, 
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useChefData } from "@/hooks/useChefData";
import { uploadImage } from "@/lib/upload";
import { ChangePasswordDialog } from "@/components/auth/ChangePasswordDialog";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChefSettings = () => {
  const { myVendor, session, refreshData, loading } = useChefData();
  const { location: geo, getLocation } = useGeolocation();
  const [activeTab, setActiveTab] = useState("Kitchen Identity");
  const [isUploading, setIsUploading] = useState(false);

  // Refs for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const kitchenInputRef = useRef<HTMLInputElement>(null);

  // Local Form States
  const [personalForm, setPersonalForm] = useState({
    name: "",
    phone: "",
    image: "",
  });

  const [vendorForm, setVendorForm] = useState({
    businessName: "",
    cuisineType: "",
    description: "",
    imageUrl: "",
    isActive: false,
    location: { address: "", city: "Gombe", state: "Gombe", lat: 10.2897, lng: 11.1673 },
  });

  // Sync data when loaded
  useEffect(() => {
    if (session?.user) {
      setPersonalForm({
        name: session.user.name || "",
        phone: session.user.phone || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  useEffect(() => {
    if (myVendor) {
      setVendorForm({
        businessName: myVendor.businessName || "",
        cuisineType: myVendor.cuisineType || "",
        description: myVendor.description || "",
        imageUrl: myVendor.imageUrl || "",
        isActive: myVendor.isActive || false,
        location: myVendor.location || { address: "", city: "Gombe", state: "Gombe", lat: 10.2897, lng: 11.1673 },
      });
    }
  }, [myVendor]);

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file, "avatars");
      setPersonalForm(prev => ({ ...prev, image: url }));
      toast.success("Profile photo prepared. Save to commit changes.");
    } catch (error) {
      toast.error("Photo upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleKitchenImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file, "kitchens");
      setVendorForm(prev => ({ ...prev, imageUrl: url }));
      toast.success("Kitchen cover prepared. Save to commit changes.");
    } catch (error) {
      toast.error("Kitchen photo failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePersonalSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify(personalForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated");
        refreshData();
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleVendorCreate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify(vendorForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Kitchen Profile Created! You are now live.");
        refreshData();
      } else {
        toast.error(data.error || "Creation Failed");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  const handleVendorSave = async () => {
    if (!myVendor) return handleVendorCreate();
    try {
      const res = await fetch(`${API_URL}/api/vendors/${myVendor.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify(vendorForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Kitchen Profile Updated");
        refreshData();
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleSave = () => {
    if (activeTab === "Personal Profile") {
      handlePersonalSave();
    } else {
      handleVendorSave();
    }
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
            disabled={isUploading}
            className="bg-gold hover:bg-gold-light text-background font-black tracking-[0.2em] px-10 h-12 shadow-lg shadow-gold/20"
          >
            {isUploading ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
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
                        {vendorForm.imageUrl ? (
                          <img src={vendorForm.imageUrl} className="w-full h-full object-cover" alt="Kitchen" />
                        ) : (
                          <Store className="text-gold/20 w-12 h-12" />
                        )}
                        <label 
                          onClick={() => kitchenInputRef.current?.click()}
                          className="absolute inset-0 bg-dark-deep/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Camera className="text-white w-6 h-6" />
                          <input 
                            ref={kitchenInputRef}
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleKitchenImageUpload} 
                          />
                        </label>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-white uppercase tracking-widest">Kitchen Cover Photo</p>
                        <p className="text-xs text-muted-foreground">Minimalist high-res images of your workspace perform best. Max 5MB.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => kitchenInputRef.current?.click()}
                          className="h-9 border-gold/20 text-gold text-[10px] font-black tracking-widest"
                        >
                          UPLOAD NEW PHOTO
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Kitchen Name</Label>
                        <Input 
                          value={vendorForm.businessName}
                          onChange={(e) => setVendorForm({...vendorForm, businessName: e.target.value})}
                          className="bg-dark-deep border-gold/10 focus:border-gold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Cuisine Speciality</Label>
                        <Input 
                          value={vendorForm.cuisineType}
                          onChange={(e) => setVendorForm({...vendorForm, cuisineType: e.target.value})}
                          className="bg-dark-deep border-gold/10 focus:border-gold" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-xs font-black text-gold uppercase tracking-widest">Kitchen Bio</Label>
                        <Textarea 
                          value={vendorForm.description}
                          onChange={(e) => setVendorForm({...vendorForm, description: e.target.value})}
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
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-gold/5 border border-gold/10">
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-widest">Publicly Visible</p>
                        <p className="text-xs text-muted-foreground">Switch ON to show your kitchen and dishes in the artisan catalog</p>
                      </div>
                      <Switch 
                        checked={vendorForm.isActive} 
                        onCheckedChange={(val) => setVendorForm({...vendorForm, isActive: val})} 
                        className="data-[state=checked]:bg-gold" 
                      />
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
                            <Input 
                              value={vendorForm.location.address}
                              onChange={(e) => setVendorForm({...vendorForm, location: {...vendorForm.location, address: e.target.value}})}
                              placeholder="123 Culina Street" 
                              className="bg-dark-deep border-gold/10 focus:border-gold" 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-black text-gold uppercase tracking-widest">City</Label>
                              <Input value={vendorForm.location.city} readOnly className="bg-dark-deep border-gold/10 focus:border-gold" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-black text-gold uppercase tracking-widest">State</Label>
                              <Input value={vendorForm.location.state} readOnly className="bg-dark-deep border-gold/10 focus:border-gold" />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gold/5 flex gap-4">
                           <Button 
                            variant="outline" 
                            onClick={async () => {
                              toast.info("Geolocation initialized", { description: "Fetching your kitchen's precise coordinates..." });
                              const pos = await getLocation();
                              if (pos) {
                                setVendorForm({
                                  ...vendorForm,
                                  location: {
                                    ...vendorForm.location,
                                    lat: pos.lat,
                                    lng: pos.lng
                                  }
                                });
                              }
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
                          <p className="text-sm font-bold text-white font-mono">{vendorForm.location.lat}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] text-gold font-black uppercase tracking-widest">Longitude</p>
                          <p className="text-sm font-bold text-white font-mono">{vendorForm.location.lng}</p>
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
            ) : activeTab === "Security" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="bg-dark-surface border-gold/10">
                   <CardHeader>
                      <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Security & Authentication</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-dark-deep border border-gold/10">
                         <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Account Password</h4>
                            <p className="text-xs text-muted-foreground">Update your password to keep your account secure.</p>
                         </div>
                         <ChangePasswordDialog>
                            <Button className="bg-gold text-background font-black tracking-widest uppercase hover:bg-gold-light">
                              Change Password
                            </Button>
                         </ChangePasswordDialog>
                      </div>
                   </CardContent>
                </Card>
              </div>
            ) : activeTab === "Personal Profile" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="bg-dark-surface border-gold/10">
                   <CardHeader>
                      <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Personal Profile</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-8">
                      <div className="flex items-center gap-8">
                         <div className="relative group">
                            <div className="w-24 h-24 rounded-full border-4 border-gold/20 bg-dark-deep overflow-hidden flex items-center justify-center">
                               {personalForm.image ? (
                                  <img src={personalForm.image} className="w-full h-full object-cover" alt="Profile" />
                               ) : (
                                  <User size={40} className="text-gold/20" />
                               )}
                            </div>
                            <label 
                              onClick={() => profileInputRef.current?.click()}
                              className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                               <Camera size={20} className="text-white" />
                               <input 
                                ref={profileInputRef}
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleProfileImageUpload} 
                               />
                            </label>
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Profile Identity</h4>
                            <p className="text-xs text-muted-foreground">This helps customers and riders recognize you.</p>
                            <Button 
                              variant="ghost" 
                              onClick={() => profileInputRef.current?.click()}
                              className="h-8 text-[10px] font-black text-gold hover:bg-gold/5"
                            >
                              CHANGE PHOTO
                            </Button>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-xs font-black text-gold uppercase tracking-widest">Full Name</Label>
                            <Input 
                              value={personalForm.name}
                              onChange={(e) => setPersonalForm({...personalForm, name: e.target.value})}
                              className="bg-dark-deep border-gold/10 focus:border-gold" 
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-xs font-black text-gold uppercase tracking-widest">Phone Number</Label>
                            <Input 
                              value={personalForm.phone}
                              onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                              className="bg-dark-deep border-gold/10 focus:border-gold" 
                            />
                         </div>
                      </div>
                   </CardContent>
                </Card>
              </div>
            ) : activeTab === "Payout Methods" ? (
              <Card className="bg-dark-surface border-gold/10 p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/20 mb-6">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">{activeTab}</h3>
                <p className="text-xs text-muted-foreground max-w-[250px] mx-auto">Our financial infrastructure is being optimized for faster, real-time settlements.</p>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefSettings;
