import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  Heart, 
  Share2, 
  ShoppingBag,
  UtensilsCrossed,
  Award,
  Zap,
  User,
  ChefHat,
  X
} from "lucide-react";
import DishDetailOverlay from "@/components/customer/DishDetailOverlay";
import { DISH_CATEGORIES } from "@/constants/categories";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChefProfile = () => {
  const params = useParams();
  const idOrSlug = params.idOrSlug || params.slug;
  const navigate = useNavigate();
  
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [kitchenData, setKitchenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isPriority, setIsPriority, items: cartItems, removeItem, updateQuantity, totalAmount } = useCart() as any;

  const chefCartItems = useMemo(() => {
    if (!kitchenData) return [];
    return cartItems.filter((item: any) => item.vendorId === kitchenData.id);
  }, [cartItems, kitchenData]);

  useEffect(() => {
    const fetchKitchenDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors/${idOrSlug}`);
        const data = await res.json();
        if (data.success) {
          const k = data.data;
          
          setKitchenData({
            ...k,
            name: k.businessName,
            cuisine: k.cuisineType,
            bio: k.description,
            time: k.deliveryTime || "25-35 min",
            image: k.imageUrl,
            chefImage: k.user?.image,
            chefName: k.user?.name,
            tag: k.tag || "Verified Artisan",
            totalOrders: k.totalOrders || 0,
            totalReviews: k.totalReviews || 0,
            specialty: k.cuisineType || "Signature Dishes",
            dishes: k.menuItems.map((item: any) => ({
              ...item,
              chef: k.businessName,
              vendorId: k.id,
              image: item.imageUrl
            }))
          });
        }
      } catch (error) {
        console.error("Failed to fetch kitchen details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (idOrSlug) fetchKitchenDetail();
  }, [idOrSlug]);

  const filteredDishes = useMemo(() => {
    if (!kitchenData) return [];
    if (selectedCategory === "All") return kitchenData.dishes;
    return kitchenData.dishes.filter((dish: any) => 
      dish.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [kitchenData, selectedCategory]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-dark-deep/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gold/60">Opening Chef Profile...</p>
      </div>
    );
  }

  if (!kitchenData) {
    return (
      <div className="h-screen w-full bg-dark-deep/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest">Atelier Not Found</h2>
        <Button onClick={() => navigate('/customer/discover')} variant="link" className="text-gold mt-4 font-black">Return to Discovery</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="h-[100dvh] w-full overflow-y-auto bg-dark-deep/90 backdrop-blur-[3px] pb-32 text-white scrollbar-thin"
    >
      <Helmet>
        <title>{kitchenData.name} - PlotKitch</title>
        <meta name="description" content={kitchenData.bio || `Order delicious ${kitchenData.cuisine} from ${kitchenData.name} on PlotKitch.`} />
      </Helmet>
      
      <div className="w-full space-y-8 pt-20 px-6 md:px-10 lg:px-14">
        {/* Cinematic Cover Banner (Landscape facebook cover style) */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-gold/10 shadow-2xl">
          {/* Action Overlay Buttons inside the banner image box */}
          <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-auto">
            <Button 
              variant="ghost" 
              className="text-white hover:text-gold hover:bg-black/40 gap-2 font-black uppercase tracking-widest bg-black/30 backdrop-blur-sm px-5 rounded-full border border-gold/10"
              onClick={() => navigate("/customer/discover")}
            >
              <ChevronLeft size={20} />
              BACK TO BAZAAR
            </Button>
            <div className="flex gap-3">
               <Button variant="outline" size="icon" className="rounded-full border-gold/20 text-white bg-black/30 backdrop-blur-sm hover:bg-gold hover:text-background transition-colors">
                  <Share2 size={18} />
               </Button>
               <Button variant="outline" size="icon" className="rounded-full border-gold/20 text-white bg-black/30 backdrop-blur-sm hover:bg-white/5">
                  <Heart size={18} />
               </Button>
            </div>
          </div>

          <div className="h-64 md:h-[20rem] relative">
            {kitchenData.image ? (
              <img 
                src={kitchenData.image} 
                alt={kitchenData.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-deep flex items-center justify-center opacity-30">
                <ChefHat size={120} className="text-gold" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/40 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <Badge className="bg-gold text-background font-black border-none uppercase tracking-widest px-4 py-1.5">{kitchenData.tag}</Badge>
                <h1 className="text-4xl md:text-6xl font-heading font-black text-white">{kitchenData.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/80 font-bold">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-gold fill-gold" />
                    <span>{kitchenData.rating || "4.8"} ({kitchenData.totalReviews || kitchenData.reviews || "0"} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-gold" />
                    <span>{kitchenData.cuisine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gold" />
                    <span>Artisan Pin Location</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 rounded-2xl p-4 flex flex-col items-center min-w-[100px]">
                    <Clock size={20} className="text-gold mb-1" />
                    <span className="text-[10px] uppercase font-black tracking-tighter text-muted-foreground">Delivery</span>
                    <span className="text-sm font-black text-white">{kitchenData.time}</span>
                 </div>
                 <div className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 rounded-2xl p-4 flex flex-col items-center min-w-[100px]">
                    <ShoppingBag size={20} className="text-gold mb-1" />
                    <span className="text-[10px] uppercase font-black tracking-tighter text-muted-foreground">Orders</span>
                    <span className="text-sm font-black text-white">{kitchenData.totalOrders}+</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Detailed Info Column */}
          <div className="lg:col-span-1">
            <Card className="bg-dark-surface/85 backdrop-blur-md border-gold/10 rounded-[2rem] p-8 space-y-6 lg:sticky lg:top-28">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-gold/20 overflow-hidden bg-dark-deep">
                      {kitchenData.chefImage ? (
                        <img src={kitchenData.chefImage} alt={kitchenData.chefName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-full h-full p-2 text-gold/30" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em]">The Artisan</h3>
                      <p className="text-white text-xs font-bold">{kitchenData.chefName}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed font-body italic border-l-2 border-gold/20 pl-4 py-1">
                    "{kitchenData.bio}"
                  </p>
               </div>
               
               <div className="pt-6 border-t border-gold/5 space-y-4">
                  <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
                    <Award size={16} />
                    Awards & Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-gold/30 text-gold bg-gold/5 px-3 py-1">{kitchenData.specialty}</Badge>
                    <Badge variant="outline" className="border-gold/30 text-gold bg-gold/5 px-3 py-1">Zero Waste</Badge>
                  </div>
               </div>

               <div className="pt-6 border-t border-gold/5">
                  <Button 
                    onClick={() => {
                      setIsPriority(!isPriority);
                      toast.success(isPriority ? "Priority Booking Disabled" : "Priority Booking Activated", {
                        description: isPriority ? "Standard preparation speed resumed." : "Your order will be prioritized by the chef."
                      });
                    }}
                    className={`w-full h-14 font-black rounded-xl transition-all ${
                      isPriority 
                        ? "bg-white text-background shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                        : "bg-gradient-to-r from-gold to-gold-light text-background"
                    }`}
                  >
                    <Zap size={18} className={`mr-2 ${isPriority ? "fill-background text-background" : "fill-background"}`} />
                    {isPriority ? "PRIORITY ACTIVE" : "PRIORITY BOOKING"}
                  </Button>
               </div>
            </Card>
          </div>

          {/* Menu Section Column */}
          <div className="lg:col-span-2 space-y-10">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h2 className="text-3xl font-heading font-black text-white">Atelier Menu</h2>
                  <p className="text-muted-foreground mt-1">Explore current season's exclusive creations</p>
               </div>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    onClick={() => setSelectedCategory("All")}
                    className={`${selectedCategory === "All" ? "bg-gold text-background font-black" : "bg-gold/10 text-gold border-gold/20"} px-3 py-1 cursor-pointer transition-all uppercase text-[10px]`}
                  >
                    ALL
                  </Badge>
                  {DISH_CATEGORIES.map(cat => (
                    <Badge 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className={`px-3 py-1 cursor-pointer transition-all uppercase text-[10px] font-black ${
                        selectedCategory === cat ? "bg-gold text-background" : "border-gold/10 text-white/40 hover:border-gold/40"
                      }`}
                    >
                      {cat}
                    </Badge>
                  ))}
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDishes.map((dish: any) => (
                <Card 
                  key={dish.id} 
                  className="bg-dark-surface/90 border border-gold/10 hover:border-gold/30 overflow-hidden group hover:border-gold/40 transition-all cursor-pointer rounded-2xl"
                  onClick={() => setSelectedDish(dish)}
                >
                  <div className="h-48 overflow-hidden relative bg-dark-deep border-b border-gold/5">
                  {dish.image ? (
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UtensilsCrossed size={40} className="text-gold/20 group-hover:text-gold/40 transition-colors" />
                    </div>
                  )}
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 text-gold text-[8px] font-black uppercase tracking-widest">{dish.tag}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                       <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{dish.name}</h3>
                       <span className="text-gold font-black font-heading shrink-0 text-lg">
                         {new Intl.NumberFormat('en-NG', {
                           style: 'currency',
                           currency: 'NGN',
                           minimumFractionDigits: 0
                         }).format(Number(dish.price)).replace('NGN', '₦')}
                       </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-body leading-relaxed">
                       {dish.description}
                     </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gold/5">
                       <div className="flex items-center gap-1.5 text-xs text-white/60">
                          <Star size={14} className="text-gold fill-gold" />
                          <span className="font-bold">{dish.rating}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-xs text-white/40">
                          <Clock size={14} />
                          <span>{dish.prepTime}</span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Order Summary Sidebar Column */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="bg-dark-surface/85 backdrop-blur-md border-gold/10 rounded-[2rem] p-6 lg:sticky lg:top-28 flex flex-col max-h-[80vh] overflow-hidden">
              <div className="pb-4 border-b border-gold/5 mb-4">
                <h3 className="text-lg font-heading font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <ShoppingBag size={18} className="text-gold" />
                  Your Order
                </h3>
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                  Atelier Collection
                </span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[45vh] pb-4">
                {chefCartItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground border border-dashed border-gold/10 rounded-2xl p-6 bg-dark-deep/20">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-20 text-gold" />
                    <p className="text-xs font-black uppercase tracking-wider text-gold/60">Your basket is empty</p>
                    <p className="text-[9px] mt-1 text-white/40 leading-relaxed">Add signature creations from the menu to start!</p>
                  </div>
                ) : (
                  chefCartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-gold/5 last:border-0">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs truncate text-white">{item.name}</h4>
                        <span className="text-gold font-black text-[10px]">
                          ₦{item.numericPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-dark-deep/60 rounded-xl p-1 border border-gold/10 shrink-0">
                        <button
                          onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white font-black text-xs"
                        >
                          -
                        </button>
                        <span className="font-black text-xs w-4 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white font-black text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total & Checkout button */}
              {chefCartItems.length > 0 && (
                <div className="pt-4 border-t border-gold/10 mt-auto space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Subtotal</span>
                    <span className="text-lg font-heading font-black text-gold">₦{totalAmount.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => navigate('/customer/discover/checkout')}
                    className="w-full h-12 bg-gradient-to-r from-gold to-gold-light text-background font-black rounded-xl shadow-lg shadow-gold/20 tracking-wider text-[10px] uppercase hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <DishDetailOverlay 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />

      {/* Mobile Floating Order Bottom Bar */}
      {chefCartItems.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-40 lg:hidden">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-background font-black shadow-elevated flex items-center justify-between px-6 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-background/25 flex items-center justify-center text-xs font-black">
                {chefCartItems.reduce((acc: number, i: any) => acc + i.quantity, 0)}
              </span>
              <span className="font-black uppercase tracking-wider text-xs">View Order</span>
            </div>
            <span className="font-black text-sm">₦{totalAmount.toLocaleString()}</span>
          </Button>
        </div>
      )}

      {/* Mobile Cart/Checkout Drawer Sheet */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-dark-surface border-t border-gold/15 rounded-t-[2.5rem] shadow-2xl flex flex-col p-6 overflow-hidden text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gold/10 mb-4">
                <h3 className="text-lg font-heading font-black text-gold uppercase tracking-widest">Your Order</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full h-8 w-8 text-white/60 hover:text-white"
                >
                  <X size={18} />
                </Button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {chefCartItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-gold/5 last:border-0">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs truncate text-white">{item.name}</h4>
                      <span className="text-gold font-black text-[10px]">
                        ₦{item.numericPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-dark-deep/60 rounded-xl p-1 border border-gold/10 shrink-0">
                      <button
                        onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white font-black text-xs"
                      >
                        -
                      </button>
                      <span className="font-black text-xs w-4 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white font-black text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Checkout */}
              <div className="pt-4 border-t border-gold/10 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-xs font-bold uppercase">Total Amount</span>
                  <span className="text-xl font-heading font-black text-gold">₦{totalAmount.toLocaleString()}</span>
                </div>
                <Button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/customer/discover/checkout");
                  }}
                  className="w-full h-14 bg-gradient-to-r from-gold to-gold-light text-background font-black rounded-xl shadow-lg shadow-gold/20 tracking-wider text-xs uppercase"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChefProfile;
