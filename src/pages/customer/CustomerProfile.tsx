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

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [newAddress, setNewAddress] = useState({ street: "", city: "Gombe", state: "Gombe", lat: "", lng: "" });
  
  // Settings mock state
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name || "", phone: user.phone || "" });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      // @ts-ignore - phone is an additional field inferred, but sometimes ts complains if plugins aren't deep merged
      const { data, error } = await authClient.updateUser({
        name: editForm.name,
        phone: editForm.phone,
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
                  <Badge className="bg-gold text-background border-none font-bold text-[10px]">GOLD MEMBER</Badge>
                  <Badge className="bg-white/5 text-white border-white/10 font-bold text-[10px]">12 ORDERS</Badge>
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
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-bold">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive order updates and alerts.</p>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-bold">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Get exclusive deals and offers.</p>
                      </div>
                      <Switch checked={marketing} onCheckedChange={setMarketing} />
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
                  <Dialog open={isAddressOpen} onOpenChange={setIsAddressOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        key={item.label} 
                        variant="ghost" 
                        onClick={() => {
                          if (item.label === "Delivery Addresses") setIsAddressOpen(true);
                        }}
                        className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]"
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Button>
                    </DialogTrigger>
                    {item.label === "Delivery Addresses" && (
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
                             {newAddress.lat && (
                               <div className="flex justify-between text-[10px] font-mono text-muted-foreground bg-white/5 p-2 rounded-lg">
                                  <span>LAT: {newAddress.lat}</span>
                                  <span>LNG: {newAddress.lng}</span>
                               </div>
                             )}
                             <Button className="w-full bg-gold text-background font-black tracking-widest uppercase">SAVE ADDRESS</Button>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                ))}
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
