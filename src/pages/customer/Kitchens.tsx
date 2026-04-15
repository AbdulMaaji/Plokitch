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

const Kitchens = () => {
  const chefs = [
    {
      name: "Chef Andre L'Aube",
      cuisine: "French Contemporary",
      rating: 4.9,
      dist: "0.8 miles",
      time: "30-45 min",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
      tag: "Michelin Trained"
    },
    {
      name: "Sienna's Organic Kitchen",
      cuisine: "Farm-to-Table",
      rating: 4.8,
      dist: "1.5 miles",
      time: "20-35 min",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      tag: "Local Hero"
    },
    {
      name: "The Truffle House",
      cuisine: "Fine Dining",
      rating: 5.0,
      dist: "2.1 miles",
      time: "45-60 min",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=800&auto=format&fit=crop",
      tag: "Exclusive"
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <Card key={chef.name} className="bg-dark-surface border-gold/10 overflow-hidden group hover:border-gold/40 transition-all duration-500 rounded-[2rem] shadow-2xl">
              <div className="relative h-64">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-80" />
                <Badge className="absolute top-6 left-6 bg-dark-deep/60 backdrop-blur-md border border-white/10 text-gold font-bold">{chef.tag}</Badge>
                <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-dark-deep/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white/60 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-gold transition-colors">{chef.name}</h3>
                    <p className="text-muted-foreground text-sm font-semibold tracking-wide mt-1">{chef.cuisine}</p>
                  </div>
                  <div className="bg-gold/5 border border-gold/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Star size={14} className="text-gold fill-gold" />
                    <span className="text-sm font-black text-gold">{chef.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 border-y border-white/5 py-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                    <MapPin size={14} className="text-gold" />
                    {chef.dist}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                    <Clock size={14} className="text-gold" />
                    {chef.time}
                  </div>
                </div>

                <Button className="w-full h-14 bg-gold hover:bg-gold-light text-background font-black tracking-[0.1em] group rounded-2xl">
                  VIEW FULL ATELIER
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Kitchens;
