import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  CreditCard, 
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Camera,
  Loader2,
  X,
  Compass,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { ChangePasswordDialog } from "@/components/auth/ChangePasswordDialog";

const CustomerProfile = () => {
  const { data: session, isPending: isSessionPending } = useSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Fetch full user profile from our own API
  const { data: fullUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["full-user"],
    queryFn: async () => {
      if (!session?.session?.token) return null;
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { "Authorization": `Bearer ${session.session.token}` }
      });
      const json = await res.json();
      return json.data;
    },
    enabled: !!session?.session?.token,
  });

  const user = fullUser || session?.user;
  const isPending = isSessionPending || isUserLoading;

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
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({ address: newAddress })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save address");

      toast.success("Address saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["full-user"] });
      setIsAddressOpen(false);
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
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          image: editForm.image,
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update profile");
      
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["full-user"] });
      setIsEditOpen(false);
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
    <div className="fixed inset-0 z-50 bg-dark-deep overflow-y-auto scrollbar-none flex flex-col text-white font-body">
      {/* Sticky Premium Header */}
      <header className="px-5 pt-8 sm:pt-12 pb-5 bg-dark-surface/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 flex items-center gap-4">
        <button 
          onClick={() => navigate("/customer/discover")} 
          className="p-2 rounded-full hover:bg-white/5 transition-colors border border-gold/10 text-white hover:text-gold"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-heading font-black text-white uppercase tracking-widest">Profile</h1>
      </header>

      <div className="max-w-xl mx-auto w-full px-5 pt-8 pb-32 space-y-8">
        {/* Profile Card & Photo */}
        <div className="flex flex-col items-center gap-4 py-6 text-center border-b border-white/5 pb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full border-4 border-gold/20 bg-dark-deep overflow-hidden shadow-2xl flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt={`${user.name || "User"}'s Profile`} className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-gold/50" />
              )}
            </div>
            <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              {isUploading ? <Loader2 size={16} className="text-gold animate-spin" /> : <Camera size={16} className="text-white" />}
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-heading font-black text-white capitalize">
              {isPending ? "Loading..." : user?.name || "Customer"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.email || "No email"} • {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Customer"}
            </p>
            {user?.phone && (
              <p className="text-[10px] text-gold font-black uppercase tracking-wider mt-2 border border-gold/20 rounded-full px-3 py-1 bg-gold/5 inline-block">
                {user.phone}
              </p>
            )}
          </div>

          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-8 border-gold/20 text-gold hover:bg-gold/5 font-black uppercase tracking-widest text-[9px] px-4 rounded-full">
                EDIT PROFILE
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-black font-heading text-gold">Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center gap-3 py-2">
                   <div className="relative group cursor-pointer">
                      <div className="w-20 h-20 rounded-full border-4 border-gold/20 bg-dark-deep overflow-hidden flex items-center justify-center">
                         {editForm.image ? (
                            <img src={editForm.image} className="w-full h-full object-cover" alt="Avatar Preview" />
                         ) : (
                            <User size={32} className="text-gold/20" />
                         )}
                      </div>
                      <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                         {isUploading ? <Loader2 size={16} className="text-gold animate-spin" /> : <Camera size={16} className="text-white" />}
                         <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                      </label>
                   </div>
                   <p className="text-[9px] font-black text-gold uppercase tracking-[0.2em]">Change Profile Photo</p>
                </div>
                <div className="space-y-4">
                   <div className="grid gap-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Full Name</Label>
                      <Input 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="bg-dark-deep border-gold/10 focus:border-gold h-10 text-xs" 
                      />
                   </div>
                   <div className="grid gap-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone Number</Label>
                      <Input 
                        value={editForm.phone} 
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="bg-dark-deep border-gold/10 focus:border-gold h-10 text-xs" 
                      />
                   </div>
                </div>
              </div>
              <DialogFooter>
                 <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full bg-gold text-background font-black tracking-widest uppercase h-11 text-xs">
                    {isSaving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    SAVE CHANGES
                 </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Culinary History */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gold uppercase tracking-[0.2em] pl-1">CULINARY HISTORY</h3>
          <div className="space-y-3">
            {ordersLoading ? (
              [1, 2].map(i => <div key={i} className="h-20 rounded-2xl bg-dark-surface/50 border border-white/5 animate-pulse" />)
            ) : orderHistory.length > 0 ? (
              orderHistory.slice(0, 3).map((order) => (
                <Card key={order.id} className="bg-dark-deep/40 border border-white/5 hover:border-gold/20 transition-all group overflow-hidden rounded-2xl">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-deep border border-white/5 flex items-center justify-center text-gold shrink-0">
                          <ShoppingBag size={16} />
                      </div>
                      <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                            {order.vendor?.businessName || "Chef's Kitchen"}
                          </h4>
                          <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.id.slice(0, 8).toUpperCase()}
                          </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                          <p className="text-sm font-black text-white">₦{Number(order.totalPrice).toLocaleString()}</p>
                          <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 text-[8px] uppercase font-black">{order.status}</Badge>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white" onClick={() => navigate(`/customer/discover/orders/${order.id}`)}>
                          <ChevronRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-10 text-center border border-dashed border-white/10 rounded-[2rem] bg-dark-deep/20">
                <ShoppingBag size={32} className="mx-auto text-gold/20 mb-3" />
                <p className="text-muted-foreground font-body text-xs max-w-xs mx-auto">Your culinary journey is just beginning. Explore our kitchens to place your first order!</p>
              </div>
            )}
          </div>
        </section>

        {/* Favorite Ateliers */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gold uppercase tracking-[0.2em] pl-1">FAVOURITE ATELIERS</h3>
          <div className="grid grid-cols-1 gap-3">
            {favsLoading ? (
              [1, 2].map(i => <div key={i} className="h-16 rounded-2xl bg-dark-surface/50 animate-pulse border border-white/5" />)
            ) : favoriteVendors.length > 0 ? (
              favoriteVendors.slice(0, 3).map((vendor) => (
                <Card 
                  key={vendor.id} 
                  className="bg-dark-deep/40 border border-white/5 hover:border-gold/20 transition-all cursor-pointer overflow-hidden group rounded-2xl"
                  onClick={() => navigate(`/customer/discover/chef/${vendor.slug || vendor.id}`)}
                >
                  <div className="flex items-center p-3 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-deep border border-white/5 overflow-hidden shrink-0">
                        <img src={vendor.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={vendor.businessName} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-gold transition-colors">{vendor.businessName}</h4>
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{vendor.cuisineType}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-[2rem] bg-dark-deep/20 col-span-full">
                <p className="text-muted-foreground font-body text-xs">Your favorite kitchens will appear here as you explore the bazaar.</p>
                <Button onClick={() => navigate("/customer/discover")} variant="link" className="text-gold mt-1 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5 mx-auto">
                  <Compass size={12} />
                  Explore Map
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Preferences & Account settings */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gold uppercase tracking-[0.2em] pl-1">PREFERENCES & SETTINGS</h3>
          <div className="bg-dark-surface/50 border border-white/5 rounded-3xl overflow-hidden p-2 space-y-1">
             <Dialog open={isAddressOpen} onOpenChange={setIsAddressOpen}>
               <DialogTrigger asChild>
                 <button 
                   className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors text-left text-sm font-bold text-white group"
                 >
                   <span className="flex items-center gap-3"><MapPin size={18} className="text-gold" /> Delivery Address</span>
                   <ChevronRight size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
                 </button>
               </DialogTrigger>
                <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-black font-heading text-gold">Delivery Addresses</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 text-xs">
                    <div className="grid gap-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Street Address</Label>
                      <Input 
                        placeholder="42 Artisan Way" 
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        className="bg-dark-deep border-gold/10 focus:border-gold h-10 text-xs" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-1">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">City</Label>
                        <Input value={newAddress.city} readOnly className="bg-dark-deep border-gold/10 h-10 text-xs" />
                      </div>
                      <div className="grid gap-1">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">State</Label>
                        <Input value={newAddress.state} readOnly className="bg-dark-deep border-gold/10 h-10 text-xs" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                       <Button 
                        variant="outline" 
                        onClick={() => {
                          toast.info("Syncing Location", { description: "Capturing your current coordinates..." });
                          setNewAddress({...newAddress, lat: "10.2897", lng: "11.1673"});
                        }}
                        className="w-full h-11 border-gold/20 text-gold text-[9px] font-black tracking-widest flex gap-2 rounded-xl"
                       >
                          <MapPin size={12} />
                           USE CURRENT LOCATION
                       </Button>
                       <Button 
                         onClick={handleSaveAddress}
                         disabled={isSaving}
                         className="w-full bg-gold text-background font-black tracking-widest uppercase h-11 text-xs rounded-xl"
                       >
                         {isSaving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                         SAVE ADDRESS
                       </Button>
                    </div>
                  </div>
                </DialogContent>
             </Dialog>

             <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors text-left text-sm font-bold text-white group">
                <span className="flex items-center gap-3"><CreditCard size={18} className="text-gold" /> Payment Methods</span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
             </button>
             
             <div className="p-1">
               <ChangePasswordDialog />
             </div>
             
             <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors text-left text-sm font-bold text-white group">
                <span className="flex items-center gap-3"><Bell size={18} className="text-gold" /> Notification Preferences</span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
             </button>
          </div>
        </section>

        {/* Log Out Button & Actions */}
        <section className="space-y-3 pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-all border border-red-500/20 shadow-soft">
                <LogOut size={18} />
                LOG OUT
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-dark-surface border-gold/20 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading font-black text-gold text-lg">Ready to leave?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground text-xs">
                  Are you sure you want to sign out of your account? You will need to log back in to access your dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-white/10 hover:bg-white/5 text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut} className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase tracking-widest text-xs h-10 px-5">Sign Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfile;
