import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  ChefHat, 
  Heart,
  ChevronRight,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Kitchens = () => {
  const navigate = useNavigate();
  const [chefs, setChefs] = useState<any[]>([]);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vendors
        const vendorsRes = await fetch(`${API_URL}/api/vendors`);
        const vendorsData = await vendorsRes.json();
        if (vendorsData.success) {
          setChefs(vendorsData.data);
        }

        // Fetch active orders if logged in
        if (session?.session?.token) {
          const ordersRes = await fetch(`${API_URL}/api/orders`, {
            headers: { 'Authorization': `Bearer ${session.session.token}` }
          });
          const ordersData = await ordersRes.json();
          if (ordersData.success) {
            const active = ordersData.data.find((o: any) => 
              !['completed', 'cancelled'].includes(o.status)
            );
            setActiveOrder(active);
          }
        }
        // Fetch favorites
        if (session?.session?.token) {
          const favsRes = await fetch(`${API_URL}/api/favorites`, {
            headers: { 'Authorization': `Bearer ${session.session.token}` }
          });
          const favsData = await favsRes.json();
          if (favsData.success) {
            setFavorites(favsData.data.map((v: any) => v.id));
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  const toggleFavorite = async (vendorId: string) => {
    if (!session?.session?.token) {
      toast.error("Please log in to save favorites");
      return;
    }
    try {
      setTogglingId(vendorId);
      const res = await fetch(`${API_URL}/api/favorites/${vendorId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.session.token}` }
      });
      const data = await res.json();
      if (data.success) {
        if (data.favorited) {
          setFavorites(prev => [...prev, vendorId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== vendorId));
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-10">
        {activeOrder && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative"
          >
            <Card className="bg-gold border-none shadow-2xl rounded-3xl overflow-hidden cursor-pointer" onClick={() => navigate(`/customer/track/${activeOrder.id}`)}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-background/10 backdrop-blur-md flex items-center justify-center text-background border border-background/10">
                    <Clock className="animate-pulse" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-background uppercase tracking-tight">Active Order in Progress</h3>
                    <p className="text-xs font-bold text-background/60 uppercase tracking-widest">Status: {activeOrder.status} • Tap to track live</p>
                  </div>
                </div>
                <Button className="bg-background text-gold hover:bg-background/90 font-black rounded-xl px-6 h-12 shadow-xl shadow-black/5">
                  TRACK LIVE
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <header>
          <Badge className="bg-gold text-background border-none mb-2 font-black uppercase tracking-widest text-[8px] md:text-[10px]">Chef Discovery</Badge>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white">The Kitchen Collective</h1>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg mt-2 font-body">
            Explore private culinary ateliers and order directly from elite local chefs.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-96 rounded-[2rem] bg-dark-surface/50 animate-pulse border border-gold/5" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef) => (
              <Card key={chef.id} className="bg-dark-surface border-gold/10 overflow-hidden group hover:border-gold/40 transition-all duration-500 rounded-[2rem] shadow-2xl">
                <div className="relative h-64">
                  {chef.imageUrl ? (
                    <img 
                      src={chef.imageUrl} 
                      alt={chef.businessName} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-deep flex items-center justify-center">
                      <ChefHat size={48} className="text-gold/20 group-hover:text-gold/40 transition-colors" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-80" />
                  <Badge className="absolute top-6 left-6 bg-dark-deep/60 backdrop-blur-md border border-white/10 text-gold font-bold">{chef.tag || "Verified Kitchen"}</Badge>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    disabled={togglingId === chef.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(chef.id);
                    }}
                    className={`absolute top-6 right-6 h-10 w-10 rounded-full backdrop-blur-md border transition-all z-20 ${
                      favorites.includes(chef.id) 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'bg-dark-deep/40 border-white/10 text-white hover:bg-red-500/20 hover:text-red-500'
                    }`}
                  >
                    <Heart size={20} className={favorites.includes(chef.id) ? "fill-current" : ""} />
                  </Button>

                  {/* Floating Chef Avatar */}
                  <div className="absolute -bottom-4 left-8 w-12 h-12 rounded-full border-4 border-dark-surface overflow-hidden shadow-xl z-20 bg-dark-deep">
                    {chef.user?.image ? (
                      <img src={chef.user.image} alt={chef.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-2 text-gold/20" />
                    )}
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white group-hover:text-gold transition-colors">{chef.businessName}</h3>
                      <p className="text-muted-foreground text-sm font-semibold tracking-wide mt-1">{chef.cuisineType}</p>
                    </div>
                    <div className="bg-gold/5 border border-gold/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Star size={14} className="text-gold fill-gold" />
                      <span className="text-sm font-black text-gold">{chef.rating || "4.8"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 border-y border-white/5 py-4 mb-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <MapPin size={14} className="text-gold" />
                      {chef.location?.city || "Gombe"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <Clock size={14} className="text-gold" />
                      {chef.deliveryTime}
                    </div>
                  </div>

                  <Button 
                    className="w-full h-14 bg-gold hover:bg-gold-light text-background font-black tracking-[0.1em] group rounded-2xl"
                    onClick={() => navigate(`/customer/kitchens/${chef.slug || chef.id}`)}
                  >
                    VIEW FULL ATELIER
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Kitchens;
