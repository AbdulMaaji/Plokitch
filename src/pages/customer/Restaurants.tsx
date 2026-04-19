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
  ArrowRight,
  Sparkles,
  X,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Restaurants = () => {
  const navigate = useNavigate();
  const [kitchens, setKitchens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendors`);
        const data = await res.json();
        if (data.success) {
          setKitchens(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKitchens();
  }, []);

  const filteredKitchens = useMemo(() => {
    if (!searchQuery) return kitchens;
    const q = searchQuery.toLowerCase();
    return kitchens.filter(k => 
      k.businessName?.toLowerCase().includes(q) || 
      k.cuisineType?.toLowerCase().includes(q) ||
      k.description?.toLowerCase().includes(q)
    );
  }, [searchQuery, kitchens]);

  return (
    <div className="min-h-screen bg-dark-deep font-body selection:bg-gold/30">
      <Navbar />
      
      <main className="pt-20">
        {/* Restaurants Hero */}
        <section className="relative py-24 overflow-hidden border-b border-gold/10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full -ml-40 -mt-40 animate-pulse" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.3em]"
              >
                <ChefHat size={14} />
                The Kitchen Collective
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight lowercase tracking-tighter">
                explore internal <br />
                <span className="italic text-gold italic-custom">culinary</span> ateliers
              </h1>
              
              <div className="max-w-2xl mx-auto pt-4">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={20} />
                  <Input 
                    placeholder="Search for a specific kitchen or cuisine..." 
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
              </div>
            </div>
          </div>
        </section>

        {/* Global Kitchen Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
               <div className="space-y-2">
                 <SectionDivider label="Verified Kitchens" />
                 <h2 className="text-3xl md:text-4xl font-heading font-black text-white">active <span className="text-gold italic italic-custom">ateliers</span></h2>
               </div>
               <div className="flex items-center gap-4">
                  <Button variant="outline" className="h-12 border-gold/20 text-gold hover:bg-gold/5 px-6 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Filter size={16} className="mr-2" />
                    Refine Search
                  </Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-[480px] rounded-[3rem] bg-white/5 animate-pulse border border-gold/5" />
                ))
              ) : (
                filteredKitchens.map((k, i) => (
                  <motion.div
                    key={k.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card 
                      className="bg-dark-surface border-gold/10 hover:border-gold/40 transition-all duration-500 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl"
                      onClick={() => navigate(`/customer/kitchens/${k.id}`)}
                    >
                      <div className="h-72 relative overflow-hidden bg-dark-deep">
                        {k.imageUrl ? (
                          <img 
                            src={k.imageUrl} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            alt={k.businessName} 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-deep flex flex-col items-center justify-center border-b border-gold/5">
                            <ChefHat size={64} className="text-gold/20 mb-4 group-hover:text-gold/40 transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/40">Artisan Kitchen</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-60" />
                        <div className="absolute top-6 left-6">
                           <Badge className="bg-gold text-background border-none font-black text-[9px] tracking-widest uppercase px-4 py-2">
                             {k.cuisineType || "Premium"}
                           </Badge>
                        </div>
                      </div>
                      <CardContent className="p-10 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold text-white group-hover:text-gold transition-colors">{k.businessName}</h3>
                          <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-white/40">
                            <div className="flex items-center gap-1.5">
                              <Star size={14} className="text-gold fill-gold" />
                              <span className="text-white">{k.rating || "4.9"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{k.deliveryTime || "25-45 min"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              <span>Gombe</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground font-body leading-relaxed line-clamp-3">
                          {k.description || "Discover the essence of artisan home cooking with this verified master chef."}
                        </p>
                        <div className="pt-6 border-t border-white/5">
                           <Button 
                            className="w-full h-14 bg-transparent border border-gold/20 hover:bg-gold hover:text-background font-black tracking-[0.1em] rounded-2xl transition-all"
                           >
                             ENTER ATELIER
                             <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                           </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {!loading && filteredKitchens.length === 0 && (
              <div className="py-24 text-center space-y-6">
                <ChefHat size={64} className="mx-auto text-gold/20" />
                <h3 className="text-2xl font-bold text-white">No Kitchens Found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms to find our artisan chefs.</p>
                <Button onClick={() => setSearchQuery("")} className="bg-gold text-background font-bold tracking-widest">CLEAR SEARCH</Button>
              </div>
            )}
          </div>
        </section>

        {/* Global Call to Action */}
        <section className="py-24 bg-gold/5">
           <div className="container mx-auto px-6 text-center space-y-8">
              <Sparkles size={48} className="mx-auto text-gold animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white lowercase">ready to <span className="italic text-gold italic-custom">indulge?</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto font-body text-lg">
                Join our exclusive community of food lovers and gain first access to new kitchens and seasonal menus.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                 <Link to="/auth/register" className="h-14 px-10 bg-gold text-background flex items-center justify-center font-black rounded-full shadow-gold/20 shadow-xl hover:scale-105 transition-transform uppercase tracking-widest">BECOME AN ARTISAN</Link>
                 <Link to="/explore" className="h-14 px-10 border border-gold text-gold flex items-center justify-center font-black rounded-full hover:bg-gold/5 transition-all uppercase tracking-widest">EXPLORE BAZAAR</Link>
              </div>
           </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Restaurants;
