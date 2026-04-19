import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  Heart, 
  Share2, 
  Info,
  ShoppingBag,
  UtensilsCrossed,
  Award,
  Zap
} from "lucide-react";
import DishDetailOverlay from "@/components/customer/DishDetailOverlay";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const KitchenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [kitchenData, setKitchenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKitchenDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors/${id}`);
        const data = await res.json();
        if (data.success) {
          const k = data.data;
          setKitchenData({
            ...k,
            name: k.businessName,
            cuisine: k.cuisineType,
            bio: k.description,
            time: k.deliveryTime || "25-35 min",
            image: k.imageUrl || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
            tag: k.tag || "Verified Artisan",
            dishes: k.menuItems.map((item: any) => ({
              ...item,
              chef: k.businessName,
              image: item.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
            }))
          });
        }
      } catch (error) {
        console.error("Failed to fetch kitchen details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchKitchenDetail();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout role="customer">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!kitchenData) {
    return (
      <DashboardLayout role="customer">
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">Atelier Not Found</h2>
          <Button onClick={() => navigate('/customer/kitchens')} variant="link" className="text-gold mt-4">Return to Discovery</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8 pb-20">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:text-gold hover:bg-white/5 gap-2 -ml-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
            BACK TO DISCOVERY
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" size="icon" className="rounded-full border-gold/20 text-white hover:bg-gold hover:text-background">
                <Share2 size={18} />
             </Button>
             <Button variant="outline" size="icon" className="rounded-full border-gold/20 text-white hover:bg-white/5">
                <Heart size={18} />
             </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-gold/10 shadow-2xl">
          <div className="h-80 md:h-[28rem] relative">
            <img 
              src={kitchenData.image} 
              alt={kitchenData.name} 
              className="w-full h-full object-cover"
            />
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
                    <span>{kitchenData.rating} ({kitchenData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-gold" />
                    <span>{kitchenData.cuisine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gold" />
                    <span>{kitchenData.dist} away</span>
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
                    <span className="text-sm font-black text-white">450+</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Detailed Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-dark-surface border-gold/10 rounded-[2rem] p-8 space-y-6">
               <div className="space-y-3">
                  <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info size={16} />
                    Chef's Philosophy
                  </h3>
                  <p className="text-white/70 leading-relaxed font-body italic">
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
                  <Button className="w-full h-14 bg-gradient-to-r from-gold to-gold-light text-background font-black rounded-xl">
                    <Zap size={18} className="mr-2 fill-background" />
                    PRIORITY BOOKING
                  </Button>
               </div>
            </Card>
          </div>

          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-10">
            <header className="flex items-center justify-between">
               <div>
                  <h2 className="text-3xl font-heading font-black text-white">Atelier Menu</h2>
                  <p className="text-muted-foreground mt-1">Explore current season's exclusive creations</p>
               </div>
               <div className="flex gap-2">
                  <Badge className="bg-gold/10 text-gold border-gold/20 px-3 py-1 cursor-pointer hover:bg-gold hover:text-background transition-all">ALL</Badge>
                  <Badge variant="outline" className="border-gold/10 text-white/40 px-3 py-1 cursor-pointer hover:border-gold/40 transition-all">MAINS</Badge>
                  <Badge variant="outline" className="border-gold/10 text-white/40 px-3 py-1 cursor-pointer hover:border-gold/40 transition-all">SIDES</Badge>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kitchenData.dishes.map((dish: any) => (
                <Card 
                  key={dish.id} 
                  className="bg-dark-surface border-gold/10 overflow-hidden group hover:border-gold/40 transition-all cursor-pointer rounded-2xl"
                  onClick={() => setSelectedDish(dish)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 text-gold text-[8px] font-black uppercase tracking-widest">{dish.tag}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                       <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{dish.name}</h3>
                       <span className="text-gold font-black font-heading">{dish.price}</span>
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
        </div>
      </div>

      <DishDetailOverlay 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />
    </DashboardLayout>
  );
};

export default KitchenDetail;
