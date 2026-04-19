import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  ChefHat, 
  Flame, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import DishDetailOverlay from "@/components/customer/DishDetailOverlay";
import SectionDivider from "@/components/SectionDivider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Explore = () => {
  const navigate = useNavigate();
  const [kitchens, setKitchens] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<any>(null);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors`);
        const data = await res.json();
        if (data.success) {
          setKitchens(data.data.slice(0, 6)); // Top 6 kitchens
          const allDishes = data.data.flatMap((vendor: any) => 
            vendor.menuItems.map((item: any) => ({
              ...item,
              chefId: vendor.id,
              chef: vendor.businessName,
              chefBio: vendor.description,
              image: item.imageUrl, // No fallback here, handled in JSX
              rating: item.rating || "4.9",
              prepTime: item.prepTime || "30-45 mins",
              tag: item.tag || "Popular"
            }))
          );
          setDishes(allDishes.slice(0, 12)); // Top 12 dishes
        }
      } catch (error) {
        console.error("Failed to fetch explore data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return { kitchens, dishes };
    const q = searchQuery.toLowerCase();
    return {
      kitchens: kitchens.filter(k => 
        k.businessName?.toLowerCase().includes(q) || 
        k.cuisineType?.toLowerCase().includes(q)
      ),
      dishes: dishes.filter(d => 
        d.name?.toLowerCase().includes(q) || 
        d.chef?.toLowerCase().includes(q)
      )
    };
  }, [searchQuery, kitchens, dishes]);

  return (
    <div className="min-h-screen bg-dark-deep font-body selection:bg-gold/30">
      <Navbar />
      
      <main className="pt-20">
        {/* Discover Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-gold/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-gold font-black uppercase tracking-[0.4em] text-[10px]"
              >
                <Sparkles size={14} className="fill-gold" />
                Artisan Marketplace
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.1] lowercase tracking-tighter"
              >
                discover <span className="italic text-gold italic-custom">elite</span> <br />
                home <span className="text-white/40">kitchens</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
              >
                Explore the finest artisan recipes and hidden culinary gems, 
                crafted with passion by Gombe's most verified home chefs.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl mx-auto pt-6"
              >
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={20} />
                  <Input 
                    placeholder="Search by kitchen name, cuisine, or flavor..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 pl-14 pr-12 bg-white/5 border-gold/20 focus:border-gold rounded-full shadow-2xl text-lg backdrop-blur-xl transition-all" 
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                      <X size={18} />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {["#Traditional", "#Gourmet", "#Artisan", "#Healthy"].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag.substring(1))}
                      className="px-4 py-1.5 rounded-full bg-gold/5 border border-gold/10 text-[10px] font-black uppercase tracking-widest text-gold/60 hover:text-gold hover:bg-gold/10 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Ateliers */}
        <section className="py-24 bg-dark-deep">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <SectionDivider label="Master Chefs" />
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white lowercase">
                  featured <span className="italic text-gold italic-custom">ateliers</span>
                </h2>
                <p className="text-muted-foreground font-body max-w-md">
                  Discover the most celebrated kitchens in your neighbourhood.
                </p>
              </div>
              <Link 
                to="/customer/kitchens" 
                className="group flex items-center gap-3 text-gold text-xs font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all border-b border-gold/20 pb-2"
              >
                explore all ateliers <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-[450px] rounded-[2.5rem] bg-white/5 animate-pulse" />
                ))
              ) : (
                filteredItems.kitchens.map((k, i) => (
                  <motion.div
                    key={k.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card 
                      className="h-full bg-dark-surface border-gold/10 hover:border-gold/40 transition-all rounded-[2.5rem] overflow-hidden group cursor-pointer"
                      onClick={() => navigate(`/customer/kitchens/${k.id}`)}
                    >
                      <div className="h-64 relative overflow-hidden bg-dark-deep">
                        {k.imageUrl ? (
                          <img 
                            src={k.imageUrl} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            alt={k.businessName} 
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
                            <ChefHat size={48} className="text-gold/20 mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/40">Visuals coming soon</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-60" />
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-gold text-background border-none font-black text-[9px] tracking-widest uppercase px-3 py-1.5">
                            {k.cuisineType || "Premium"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{k.businessName}</h3>
                        <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-white/40">
                          <div className="flex items-center gap-1.5">
                            <Star size={14} className="text-gold fill-gold" />
                            <span className="text-white">{k.rating || "4.9"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{k.deliveryTime || "25-35 min"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>Gombe</span>
                          </div>
                        </div>
                        <p className="text-sm text-balance text-muted-foreground line-clamp-2 font-body">
                          {k.description || "Crafting authentic artisan recipes using only the freshest local ingredients."}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Global Catalog Banner */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <Link to="/dishes" className="block relative group">
              <div className="rounded-[3rem] bg-gradient-to-r from-gold/20 via-gold/5 to-transparent border border-gold/10 p-12 md:p-16 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000">
                  <TrendingUp size={240} className="text-gold" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight uppercase">
                      The Culinary <br />
                      <span className="italic text-gold italic-custom">Collection</span>
                    </h2>
                    <p className="text-white/60 text-lg font-body italic border-l-2 border-gold/20 pl-6 max-w-lg">
                      Explore our full catalog of thousands of unique dishes from Gombe's most talented home chefs.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-background group-hover:scale-110 transition-transform">
                      <ArrowRight size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Signature Recipes */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <SectionDivider label="Daily Fresh" />
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white lowercase">
                  signature <span className="italic text-gold italic-custom">recipes</span>
                </h2>
                <p className="text-muted-foreground font-body max-w-md">
                  Handpicked favorites that represent the heart of our artisan collection.
                </p>
              </div>
              <Link 
                to="/dishes" 
                className="group flex items-center gap-3 text-gold text-xs font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all border-b border-gold/20 pb-2"
              >
                browse all flavors <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="h-96 rounded-[2.5rem] bg-white/5 animate-pulse" />
                ))
              ) : (
                filteredItems.dishes.map((dish, i) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card 
                      className="bg-dark-surface border-gold/10 hover:border-gold/40 transition-all rounded-[2.5rem] overflow-hidden group cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="h-56 relative overflow-hidden bg-dark-deep">
                        {dish.image ? (
                          <img 
                            src={dish.image} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            alt={dish.name} 
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
                            <Flame size={32} className="text-gold/20 mb-2" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gold/40">Recipe Image Pending</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                           <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                             <Star size={12} className="fill-gold text-gold" />
                             <span className="text-[10px] font-black text-white">{dish.rating}</span>
                           </div>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gold">
                             <ChefHat size={12} />
                             <span className="text-[10px] font-black uppercase tracking-[0.2em]">{dish.chef}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors leading-tight">{dish.name}</h3>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-gold font-black text-xl tracking-tighter">₦{Number(dish.price).toLocaleString()}</span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="w-10 h-10 rounded-full bg-gold/5 text-gold hover:bg-gold hover:text-background transition-all"
                          >
                            <ArrowRight size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Community Proof */}
        <section className="py-24 border-t border-gold/10 bg-black/20">
          <div className="container mx-auto px-6 text-center space-y-8">
             <div className="w-12 h-1 rounded-full bg-gold mx-auto opacity-30" />
             <p className="text-white/70 font-heading text-2xl md:text-4xl italic max-w-2xl mx-auto leading-relaxed">
               "Plotkitch has transformed how I experience my local neighborhood. The quality is unmatched."
             </p>
             <div className="space-y-2">
                <span className="text-xs font-black text-gold uppercase tracking-[0.5em]">The Tasting Circle</span>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Verified Member Review</p>
             </div>
          </div>
        </section>
      </main>

      <FooterSection />

      <DishDetailOverlay 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />
    </div>
  );
};

export default Explore;
