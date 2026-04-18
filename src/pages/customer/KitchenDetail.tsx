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

const KitchenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDish, setSelectedDish] = useState<any>(null);

  // Mock data based on the ID or defaults
  const kitchenData: any = useMemo(() => {
    const kitchens: any = {
      "chef-andre-l'aube": {
        name: "Chef Andre L'Aube",
        cuisine: "French Contemporary",
        rating: 4.9,
        reviews: 128,
        dist: "0.8 miles",
        time: "30-45 min",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
        bio: "Michelin-trained chef Andre brings the sophistication of Parisian ateliers to your doorstep. Every dish is a masterpiece of precision and flavor.",
        specialty: "Sous-vide Techniques",
        tag: "Michelin Trained",
        dishes: [
          {
            id: 1,
            name: "Smoked Wagyu Short Rib",
            chef: "Chef Andre L'Aube",
            chefBio: "Classical French techniques meet wood-fired passion. Andre has been at the forefront of artisan grilling for a decade.",
            price: "₦45,000",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
            tag: "Hero Dish",
            description: "Low-and-slow smoked wagyu beef, glazed with a reduction of local berries and aged balsamic. Served with truffle-infused root vegetables.",
            ingredients: ["Wagyu Beef", "Local Wild Berries", "25yr Balsamic", "Black Truffle"],
            prepTime: "45 mins"
          },
          {
            id: 5,
            name: "Duck Confit Parmentier",
            chef: "Chef Andre L'Aube",
            chefBio: "Classical French techniques meet wood-fired passion.",
            price: "₦32,000",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1514516369414-78177d7e1c90?q=80&w=800&auto=format&fit=crop",
            tag: "Classic",
            description: "Shredded duck leg confit topped with creamy potato purée and a crust of aged Comté.",
            ingredients: ["Duck Leg", "Yukon Gold Potatoes", "Comté Cheese", "Red Wine Jus"],
            prepTime: "35 mins"
          }
        ]
      },
      "sienna's-organic-kitchen": {
        name: "Sienna's Organic Kitchen",
        cuisine: "Farm-to-Table",
        rating: 4.8,
        reviews: 94,
        dist: "1.5 miles",
        time: "20-35 min",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
        bio: "Dedicated to local farmers and sustainable practices. Sienna's kitchen is a celebration of the earth's bounty, served fresh and vibrant.",
        specialty: "Seasonal Foraging",
        tag: "Local Hero",
        dishes: [
          {
            id: 2,
            name: "Bluefin Tuna Tartare",
            chef: "Sienna's Organic Kitchen",
            chefBio: "Sustainability first. Sienna works directly with coastal fishermen to bring the freshest catch to the Gombe high-end market.",
            price: "₦28,500",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
            tag: "Fresh Catch",
            description: "Freshly caught bluefin tuna, diced with citrus zest, capers, and served over a bed of avocado mousse with gold-leaf garnishes.",
            ingredients: ["Bluefin Tuna", "Avocado", "Meyer Lemon", "Capers"],
            prepTime: "20 mins"
          }
        ]
      },
      "the-truffle-house": {
        name: "The Truffle House",
        cuisine: "Fine Dining",
        rating: 5.0,
        reviews: 56,
        dist: "2.1 miles",
        time: "45-60 min",
        image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=800&auto=format&fit=crop",
        bio: "An exclusive culinary destination focusing on the world's rarest truffles. Each dish is an exploration of aroma and luxury.",
        specialty: "Truffle Infusions",
        tag: "Exclusive",
        dishes: [
          {
            id: 3,
            name: "Wild Truffle Pasta",
            chef: "The Truffle House",
            chefBio: "Forging through secret forests. The Truffle House is dedicated to the world's most aromatic and rare fungi selections.",
            price: "₦34,000",
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop",
            tag: "Signature",
            description: "Hand-rolled pappardelle tossed in a creamy parmesan emulsion, topped with generous shavings of seasonal black truffles.",
            ingredients: ["Fresh Pasta", "Pecorino Romano", "Black Truffle", "Grass-fed Butter"],
            prepTime: "30 mins"
          }
        ]
      }
    };

    // Robust matching
    const normalizedId = id?.toLowerCase() || "";
    if (normalizedId.includes("andre")) return kitchens["chef-andre-l'aube"];
    if (normalizedId.includes("sienna")) return kitchens["sienna's-organic-kitchen"];
    if (normalizedId.includes("truffle")) return kitchens["the-truffle-house"];
    
    return kitchens["chef-andre-l'aube"];
  }, [id]);

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
