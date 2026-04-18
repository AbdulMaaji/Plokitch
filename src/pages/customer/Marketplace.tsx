import { useState, useMemo } from "react";
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
  ChevronLeft,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import DishDetailOverlay from "@/components/customer/DishDetailOverlay";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<any>(null);

  const dishes = [
    {
      id: 1,
      name: "Smoked Wagyu Short Rib",
      chef: "Chef Andre L.",
      chefBio: "Classical French techniques meet wood-fired passion. Andre has been at the forefront of artisan grilling for a decade.",
      price: "₦45,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
      tag: "Trending",
      description: "Low-and-slow smoked wagyu beef, glazed with a reduction of local berries and aged balsamic. Served with truffle-infused root vegetables.",
      ingredients: ["Wagyu Beef", "Local Wild Berries", "25yr Balsamic", "Black Truffle", "Organic Root Veg"],
      prepTime: "45 mins"
    },
    {
      id: 2,
      name: "Bluefin Tuna Tartare",
      chef: "Sienna's Organic",
      chefBio: "Sustainability first. Sienna works directly with coastal fishermen to bring the freshest catch to the Gombe high-end market.",
      price: "₦28,500",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      tag: "Limited",
      description: "Freshly caught bluefin tuna, diced with citrus zest, capers, and served over a bed of avocado mousse with gold-leaf garnishes.",
      ingredients: ["Bluefin Tuna", "Avocado", "Meyer Lemon", "Capers", "Edible 24k Gold"],
      prepTime: "20 mins"
    },
    {
      id: 3,
      name: "Wild Truffle Pasta",
      chef: "The Truffle House",
      chefBio: "Forging through secret forests. The Truffle House is dedicated to the world's most aromatic and rare fungi selections.",
      price: "₦34,000",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop",
      tag: "Seasonal",
      description: "Hand-rolled pappardelle tossed in a creamy parmesan emulsion, topped with generous shavings of seasonal black truffles.",
      ingredients: ["Fresh Pasta", "Pecorino Romano", "Black Truffle", "Grass-fed Butter", "Sea Salt"],
      prepTime: "30 mins"
    },
    {
      id: 4,
      name: "Hand-crafted Sourdough",
      chef: "Artisan Bakery",
      chefBio: "Master of fermentation. Our head baker uses a 50-year-old starter to create loaves with unmatched depth and texture.",
      price: "₦12,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
      tag: "Popular",
      description: "A 48-hour fermented sourdough loaf with a dark, crackling crust and a moist, airy crumb. Perfect with cultured butter.",
      ingredients: ["Heirloom Wheat", "Spring Water", "Ancient Starter", "Maldon Salt"],
      prepTime: "15 mins"
    }
  ];

  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.chef.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            {!searchQuery && (
              <Button variant="ghost" className="text-gold font-bold hover:bg-gold/5">View all <ChevronRight size={16} /></Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredDishes.map((dish) => (
                <motion.div
                  layout
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    onClick={() => setSelectedDish(dish)}
                    className="bg-dark-surface border-gold/10 overflow-hidden group hover:border-gold/30 transition-all duration-300 rounded-2xl flex flex-col cursor-pointer hover:translate-y-[-4px]"
                  >
                    <div className="relative h-48">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-dark-deep/80 backdrop-blur-md border border-gold/20 text-gold text-[8px] font-black uppercase tracking-widest">{dish.tag}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{dish.chef}</p>
                        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-gold transition-colors">{dish.name}</h3>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/5">
                        <span className="text-xl font-black text-gold font-heading">{dish.price}</span>
                        <div className="flex items-center gap-1 text-gold/60 text-xs font-bold">
                          <Star size={12} className="fill-gold/60" />
                          {dish.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
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
