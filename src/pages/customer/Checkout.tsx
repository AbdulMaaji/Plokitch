import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  MapPin, 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  Wallet,
  Building,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
  const navigate = useNavigate();
  const { totalAmount, clearCart, items, isPriority } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const { data: session, isPending: isSessionLoading } = useSession();
  
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
  const loading = isSessionLoading || isUserLoading;

  const surcharge = isPriority ? totalAmount * 0.15 : 0;
  const finalAmount = totalAmount + surcharge;

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(finalAmount).replace('NGN', '₦');
  
  const savedAddress = user?.address ? 
    (typeof user.address === 'string' ? JSON.parse(user.address) : user.address) 
    : null;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your basket is empty");
      return;
    }

    if (!session?.session?.token) {
      toast.error("Please sign in to place an order");
      navigate("/auth/login");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Group items by vendorId (schema supports one vendor per order)
      const vendorId = items[0]?.vendorId;
      if (!vendorId) throw new Error("Vendor information missing in cart.");

      const orderData = {
        vendorId,
        items: items.map(item => ({
          menuItemId: item.id,
          name: item.name,
          price: item.numericPrice,
          quantity: item.quantity
        })),
        deliveryAddress: savedAddress || {
          street: "Address not set", 
          city: "Please update profile",
          state: "Gombe",
          instructions: "No instructions"
        },
        notes: "Artisanal preparation requested.",
        isPriority
      };

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.session.token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order Placed Successfully!", {
          description: `Your order #${data.data.id.slice(0, 8)} is being forwarded to the chef.`,
        });
        clearCart();
        navigate(`/customer/track/${data.data.id}`);
      } else {
        throw new Error(data.error || "Failed to place order");
      }
    } catch (error: any) {
      toast.error("Checkout Failed", {
        description: error.message || "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <header className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/customer/cart")}
            className="rounded-full border border-white/10 hover:border-gold/50 text-white"
          >
            <ChevronLeft size={24} />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">Checkout</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Finalize your artisanal culinary experience.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <section className="space-y-4">
              <h2 className="text-sm font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin size={16} />
                1. Delivery Location
              </h2>
              <Card className="bg-dark-surface border-gold/10 p-6 relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-gold/10 text-gold border-gold/20 mb-2 font-bold uppercase tracking-widest text-[8px]">
                      {savedAddress ? "Saved Address" : "No Address Found"}
                    </Badge>
                    <h3 className="text-lg font-bold text-white">
                      {savedAddress ? `${savedAddress.street}, ${savedAddress.city}` : "Your delivery address is not set."}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {savedAddress ? `${savedAddress.state}, Nigeria` : "Please update your profile to continue."}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/customer/profile")}
                    className="text-gold border-gold/20 text-xs font-black uppercase tracking-widest px-4"
                  >
                    {savedAddress ? "CHANGE" : "SET ADDRESS"}
                  </Button>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Truck size={80} className="text-gold" />
                </div>
              </Card>
            </section>

            {/* Payment Methods */}
            <section className="space-y-4">
              <h2 className="text-sm font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={16} />
                2. Secure Payment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard, subtitle: "Instant confirmation" },
                  { id: "transfer", label: "Bank Transfer", icon: Building, subtitle: "Manual verification" },
                  { id: "wallet", label: "Digital Wallet", icon: Wallet, subtitle: "Plokitch Credits" },
                ].map((method) => (
                  <Card 
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-6 cursor-pointer transition-all border-2 relative ${
                      selectedPayment === method.id 
                        ? "bg-gold/5 border-gold shadow-lg shadow-gold/10" 
                        : "bg-dark-surface border-white/5 hover:border-gold/30"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedPayment === method.id ? "bg-gold text-background" : "bg-white/5 text-gold"
                      }`}>
                        <method.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{method.label}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium">{method.subtitle}</p>
                      </div>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="absolute top-4 right-4 text-gold">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {selectedPayment === "card" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-surface border border-white/10 rounded-2xl p-6 md:p-10"
                >
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Card Holder Name</label>
                        <input className="w-full h-12 bg-dark-deep border border-white/10 rounded-xl px-4 text-white focus:border-gold outline-none" placeholder="JOHN DOE" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Card Number</label>
                        <div className="relative">
                          <input className="w-full h-12 bg-dark-deep border border-white/10 rounded-xl px-4 text-white focus:border-gold outline-none tracking-[0.2em]" placeholder="•••• •••• •••• 4242" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <div className="w-8 h-5 bg-blue-500 rounded text-[6px] text-white font-black flex items-center justify-center italic">VISA</div>
                            <div className="w-8 h-5 bg-orange-500 rounded text-[6px] text-white font-black flex items-center justify-center italic font-serif">MC</div>
                          </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expiry Date</label>
                          <input className="w-full h-12 bg-dark-deep border border-white/10 rounded-xl px-4 text-white focus:border-gold outline-none" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">CVV</label>
                          <input className="w-full h-12 bg-dark-deep border border-white/10 rounded-xl px-4 text-white focus:border-gold outline-none" placeholder="•••" />
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1 border-white/5">
            <Card className="bg-dark-surface border-gold/20 overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-8 border-b border-white/5 bg-gold/5">
                <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-widest">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-black">x{item.quantity}</span>
                        <span className="text-white font-medium truncate max-w-[120px]">{item.name}</span>
                      </div>
                      <span className="text-white/80 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    <span>Deliver To</span>
                    <span className="text-white truncate max-w-[120px]">
                      {savedAddress ? savedAddress.street : "Not Set"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    <span>Estimated Arrival</span>
                    <span className="text-gold">{isPriority ? "15 - 25 MINS" : "30 - 45 MINS"}</span>
                  </div>
                  {isPriority && (
                    <div className="flex justify-between text-xs text-gold font-bold uppercase tracking-widest">
                      <span>Priority Surcharge (15%)</span>
                      <span>₦{surcharge.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end pt-4">
                  <span className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">Grand total</span>
                  <span className="text-3xl font-black text-gold font-heading leading-none">{formattedTotal}</span>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || items.length === 0 || !savedAddress || loading}
                  className="w-full h-16 bg-gold hover:bg-gold-light text-background font-black rounded-2xl shadow-xl shadow-gold/20 text-lg gap-3 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      SECURELY PAYING...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      LOADING PROFILE...
                    </>
                  ) : !savedAddress ? (
                    "PLEASE SET ADDRESS"
                  ) : (
                    <>
                      CONFIRM & PAY {formattedTotal}
                    </>
                  )}
                </Button>
                
                <p className="text-[9px] text-muted-foreground text-center flex items-center justify-center gap-2">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Your payment information is encrypted and secure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
