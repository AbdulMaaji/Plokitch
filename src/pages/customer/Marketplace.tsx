import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Flame, 
  ChevronRight,
  TrendingUp,
  Tag,
  X,
  Star,
  Clock,
  ChefHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import DishDetailOverlay from "@/components/customer/DishDetailOverlay";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<any | null>(null);
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors`);
        const data = await res.json();
        if (data.success) {
          const allDishes = data.data.flatMap((vendor: any) => 
            vendor.menuItems.map((item: any) => ({
              ...item,
              chef: vendor.businessName,
              chefId: vendor.id,
              chefBio: vendor.description,
              rating: item.rating || "4.9",
              reviews: vendor.totalReviews || 0,
              time: vendor.deliveryTime || "25-35 min",
              image: item.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
              prepTime: item.prepTime || "30-45 mins",
              tag: item.tag || "Artisan Choice",
              ingredients: Array.isArray(item.ingredients) ? item.ingredients : []
            }))
          );
          setDishes(allDishes);
        }
      } catch (error) {
        console.error("Failed to fetch marketplace:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.chef.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dishes]);

  return (
    <DashboardLayout role="customer">
      <div className="space-y-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">
              <Flame size={14} className="fill-gold" />
              Global Bazaar
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">Culinary Marketplace</h1>
            <p className="text-muted-foreground text-xs md:text-sm font-body">Browse exceptional dishes from all local kitchens in one place.</p>
          </div>
          <div className="flex gap-2 md:gap-4">
            <div className="relative group flex-1 lg:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={16} />
              <Input 
                placeholder="Search by dish or chef..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 md:h-12 pl-10 md:pl-12 !bg-white/5 backdrop-blur-md border-gold/10 focus:border-gold rounded-full shadow-lg text-sm transition-all" 
              />
            </div>
            <Button variant="outline" className="h-11 md:h-12 border-gold/10 bg-dark-surface text-gold hover:bg-gold/5 rounded-xl px-4 md:px-6">
              <Filter size={18} />
            </Button>
          </div>
        </header>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10 border border-gold/20 mr-2">
                <TrendingUp size={20} className="text-gold" />
              </div>
              <h2 className="text-xl font-heading font-black text-white uppercase tracking-wider">
                {searchQuery ? `Search Results (${filteredDishes.length})` : "Top Rated Selections"}
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[450px] rounded-[2.5rem] bg-dark-surface/50 border border-gold/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-in fade-in duration-700">
              <AnimatePresence>
                {filteredDishes.map((dish) => (
                  <motion.div key={dish.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                    <Card 
                      className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all cursor-pointer group overflow-hidden rounded-[2.5rem] shadow-2xl"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-dark-deep/80 backdrop-blur-md text-gold border-gold/20">{dish.tag}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <ChefHat size={14} className="text-gold" />
                          <span className="text-xs font-bold text-muted-foreground">{dish.chef}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{dish.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-black text-white">₦{Number(dish.price).toLocaleString()}</p>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold bg-dark-deep/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/10">
                            <Clock size={12} className="text-gold" />
                            {dish.time}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {filteredDishes.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex p-6 rounded-full bg-gold/5 border border-gold/10 mb-6">
                <Search size={40} className="text-gold opacity-20" />
              </div>
              <p className="text-muted-foreground font-body">No dishes found matching your search. Try broadening your criteria.</p>
              <Button onClick={() => setSearchQuery("")} variant="link" className="text-gold mt-2 font-bold">Clear search</Button>
            </div>
          )}
        </section>

        {/* Global Stats Overlay Concept */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-gold/20 to-transparent border border-gold/10 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Tag size={120} className="text-gold rotate-12" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-heading font-black text-white mb-4 leading-tight">Join the Elite Tasting Circle</h2>
            <p className="text-white/70 font-body text-lg mb-8">Get priority access to limited seasonal releases from top-tier chefs across the city.</p>
            <Button className="h-14 px-10 bg-white text-dark-deep font-black rounded-full hover:bg-gold hover:text-white transition-all">SIGN UP FOR EXCLUSIVES</Button>
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

export default Marketplace;
