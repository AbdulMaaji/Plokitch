import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  ChefHat, 
  Heart,
  ChevronRight,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Kitchens = () => {
  const navigate = useNavigate();
  const [chefs, setChefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors`);
        const data = await res.json();
        if (data.success) {
          setChefs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch kitchens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <DashboardLayout role="customer">
      <div className="space-y-10">
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
                  <img 
                    src={chef.imageUrl || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"} 
                    alt={chef.businessName} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-80" />
                  <Badge className="absolute top-6 left-6 bg-dark-deep/60 backdrop-blur-md border border-white/10 text-gold font-bold">{chef.tag || "Verified Kitchen"}</Badge>
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
                    onClick={() => navigate(`/customer/kitchens/${chef.id}`)}
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
