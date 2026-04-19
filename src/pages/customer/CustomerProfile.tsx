import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
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
  ChevronRight,
  Camera,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "@/lib/upload";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", image: "" });
  const [newAddress, setNewAddress] = useState({ street: "", city: "Gombe", state: "Gombe", lat: "", lng: "" });
  const [isUploading, setIsUploading] = useState(false);
  
  // Settings persistence state
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [favoriteVendors, setFavoriteVendors] = useState<any[]>([]);
  const [favsLoading, setFavsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setEditForm({ 
        name: user.name || "", 
        phone: user.phone || "",
        image: user.image || ""
      });
      // @ts-ignore
      setNotifications(user.pushNotificationsEnabled ?? true);
      // @ts-ignore
      setMarketing(user.marketingEmailsEnabled ?? false);
      
      if (user.address) {
        try {
          const addr = typeof user.address === 'string' ? JSON.parse(user.address) : user.address;
          setNewAddress(addr);
        } catch (e) {
          console.error("Failed to parse address:", e);
        }
      }
    }
  }, [user]);

  const handleSaveAddress = async () => {
    try {
      setIsSaving(true);
      const { data, error } = await authClient.updateUser({
        // @ts-ignore
        address: JSON.stringify(newAddress)
      });

      if (error) {
        toast.error(error.message || "Failed to save address");
      } else {
        toast.success("Address saved successfully!");
        setIsAddressOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong saving address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file, "avatars");
      setEditForm(prev => ({ ...prev, image: url }));
      toast.success("New avatar prepared. Click save to commit.");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const { data, error } = await authClient.updateUser({
        name: editForm.name,
        // @ts-ignore
        phone: editForm.phone,
        image: editForm.image,
      });
      
      if (error) {
         toast.error(error.message || "Failed to update profile");
      } else {
         toast.success("Profile updated successfully!");
         setIsEditOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.session?.token) return;
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: { 'Authorization': `Bearer ${session.session.token}` }
        });
        const data = await res.json();
        if (data.success) {
          setOrderHistory(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [session]);

  useEffect(() => {
    const fetchFavs = async () => {
      if (!session?.session?.token) return;
      try {
        const res = await fetch(`${API_URL}/api/favorites`, {
          headers: { 'Authorization': `Bearer ${session.session.token}` }
        });
        const data = await res.json();
        if (data.success) {
          setFavoriteVendors(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setFavsLoading(false);
      }
    };
    fetchFavs();
  }, [session]);

  const updatePreferences = async (updates: { pushNotificationsEnabled?: boolean, marketingEmailsEnabled?: boolean }) => {
    try {
      const { error } = await authClient.updateUser(updates as any);
      if (error) toast.error("Failed to save settings");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-10 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-gold/20 bg-dark-surface overflow-hidden shadow-2xl flex items-center justify-center">
                {user?.image ? (
                  <img src={user.image} alt={`${user.name || "User"}'s Profile`} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gold/50" />
                )}
              </div>
              <div>
                <h1 className="text-4xl font-heading font-black text-white capitalize">
                  {isPending ? "Loading..." : user?.name || "Customer"}
                </h1>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  {user?.email || "No email"} • {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Customer"}
                </p>
                {user?.phone && (
                  <p className="text-muted-foreground font-body text-xs mt-2 border border-white/10 rounded-full px-3 py-1 inline-block bg-white/5">
                    {user.phone}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-white/5 text-white border-white/10 font-bold text-[10px] py-1 px-3">
                    {orderHistory.length} {orderHistory.length === 1 ? 'ORDER' : 'ORDERS'}
                  </Badge>
                </div>
              </div>
           </div>
           <div className="flex gap-4">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-12 border-gold/20 text-gold hover:bg-gold/5 font-black uppercase tracking-widest px-8">
                    EDIT PROFILE
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-heading text-gold">Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex flex-col items-center gap-4 py-2">
                       <div className="relative group cursor-pointer">
                          <div className="w-24 h-24 rounded-full border-4 border-gold/20 bg-dark-deep overflow-hidden flex items-center justify-center">
                             {editForm.image ? (
                                <img src={editForm.image} className="w-full h-full object-cover" alt="Avatar Preview" />
                             ) : (
                                <User size={40} className="text-gold/20" />
                             )}
                          </div>
                          <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                             {isUploading ? <Loader2 size={18} className="text-gold animate-spin" /> : <Camera size={20} className="text-white" />}
                             <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                          </label>
                       </div>
                       <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Change Profile Photo</p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Full Name</Label>
                      <Input 
                        id="name" 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                        className="bg-dark-deep border-gold/10 focus-visible:ring-gold text-white" 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={editForm.phone} 
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})} 
                        className="bg-dark-deep border-gold/10 focus-visible:ring-gold text-white" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isSaving} 
                      className="w-full bg-gold text-background hover:bg-gold/90 font-black tracking-widest uppercase"
                    >
                      {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-12 w-12 text-muted-foreground border border-white/5 hover:text-white">
                    <Settings size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-heading text-gold">Settings</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="space-y-0.5">
                        <Label className="text-base font-bold">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive order updates and alerts.</p>
                      </div>
                      <Switch 
                        checked={notifications} 
                        onCheckedChange={(val) => {
                          setNotifications(val);
                          updatePreferences({ pushNotificationsEnabled: val });
                        }} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-bold">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Get exclusive deals and offers.</p>
                      </div>
                      <Switch 
                        checked={marketing} 
                        onCheckedChange={(val) => {
                          setMarketing(val);
                          updatePreferences({ marketingEmailsEnabled: val });
                        }} 
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                {ordersLoading ? (
                  [1, 2].map(i => <div key={i} className="h-24 rounded-2xl bg-dark-surface/50 border border-white/5 animate-pulse" />)
                ) : orderHistory.length > 0 ? (
                  orderHistory.map((order) => (
                    <Card key={order.id} className="bg-dark-surface border-white/5 hover:border-gold/20 transition-all group overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-dark-deep border border-white/5 flex items-center justify-center text-gold">
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                                  {order.vendor?.businessName || "Chef's Kitchen"}
                                </h4>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                                  {new Date(order.createdAt).toLocaleDateString()} • {order.id.slice(0, 8).toUpperCase()}
                                </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-lg font-black text-white">₦{Number(order.totalPrice).toLocaleString()}</p>
                                <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 text-[9px] uppercase font-black">{order.status}</Badge>
                            </div>
                            <Button size="icon" variant="ghost" className="h-10 w-10 text-muted-foreground hover:text-white" onClick={() => navigate(`/customer/track/${order.id}`)}>
                                <ChevronRight size={20} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-dark-surface/30">
                    <ShoppingBag size={40} className="mx-auto text-gold/20 mb-4" />
                    <p className="text-muted-foreground font-body">Your culinary journey is just beginning. Explore our kitchens to place your first order!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-heading font-black text-white uppercase tracking-wider flex items-center gap-3">
                  <Heart size={20} className="text-gold" />
                  Kitchen Selection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favsLoading ? (
                    [1, 2].map(i => <div key={i} className="h-24 rounded-2xl bg-dark-surface/50 animate-pulse border border-white/5" />)
                  ) : favoriteVendors.length > 0 ? (
                    favoriteVendors.map((vendor) => (
                      <Card 
                        key={vendor.id} 
                        className="bg-dark-surface border-white/5 hover:border-gold/20 transition-all cursor-pointer overflow-hidden group"
                        onClick={() => navigate(`/customer/kitchens/${vendor.id}`)}
                      >
                        <div className="flex items-center p-4 gap-4">
                          <div className="w-12 h-12 rounded-xl bg-dark-deep border border-white/5 overflow-hidden shrink-0">
                            <img src={vendor.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={vendor.businessName} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate group-hover:text-gold transition-colors">{vendor.businessName}</h4>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{vendor.cuisineType}</p>
                          </div>
                          <ChevronRight size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-dark-surface/30 col-span-full">
                      <p className="text-muted-foreground font-body text-sm">Your favorite kitchens will appear here as you explore the bazaar.</p>
                      <Button onClick={() => navigate("/customer/kitchens")} variant="link" className="text-gold mt-2 font-bold uppercase tracking-widest text-[10px]">Explore Now</Button>
                    </div>
                  )}
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-dark-surface border-white/5 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black text-white uppercase tracking-[0.2em]">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-1">
                   <Dialog open={isAddressOpen} onOpenChange={setIsAddressOpen}>
                     <DialogTrigger asChild>
                       <Button 
                         variant="ghost" 
                         className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]"
                       >
                         <MapPin size={18} />
                         Delivery Addresses
                       </Button>
                     </DialogTrigger>
                      <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-black font-heading text-gold">Delivery Addresses</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Street Address</Label>
                              <Input 
                                placeholder="42 Artisan Way" 
                                value={newAddress.street}
                                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                className="bg-dark-deep border-gold/10 focus:border-gold" 
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">City</Label>
                                <Input value={newAddress.city} readOnly className="bg-dark-deep border-gold/10" />
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">State</Label>
                                <Input value={newAddress.state} readOnly className="bg-dark-deep border-gold/10" />
                              </div>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-white/5 space-y-4">
                             <Button 
                              variant="outline" 
                              onClick={() => {
                                toast.info("Syncing Location", { description: "Capturing your current coordinates..." });
                                setNewAddress({...newAddress, lat: "10.2897", lng: "11.1673"});
                              }}
                              className="w-full h-12 border-gold/20 text-gold text-[10px] font-black tracking-widest flex gap-2"
                             >
                                <MapPin size={14} />
                                 USE CURRENT LOCATION
                             </Button>
                             <Button 
                               onClick={handleSaveAddress}
                               disabled={isSaving}
                               className="w-full bg-gold text-background font-black tracking-widest uppercase"
                             >
                               {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                               SAVE ADDRESS
                             </Button>
                          </div>
                        </div>
                      </DialogContent>
                   </Dialog>

                   <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
                      <CreditCard size={18} />
                      Payment Methods
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
                      <Bell size={18} />
                      Notification Settings
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
                      <User size={18} />
                      Support & Help
                   </Button>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-red-500 hover:bg-red-500/5 font-black uppercase tracking-widest text-[10px]">
                        <LogOut size={18} />
                        Sign Out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-dark-surface border-gold/20 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-heading font-black text-gold">Ready to leave?</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                          Are you sure you want to sign out of your account? You will need to log back in to access your dashboard.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10 hover:bg-white/5 text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSignOut} className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase tracking-widest">Sign Out</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
