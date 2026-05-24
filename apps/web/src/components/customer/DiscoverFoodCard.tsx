import { motion } from "framer-motion";
import { Star, MapPin, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export interface FoodItem {
  id: string | number;
  name: string;
  price: string | number; // e.g. "45000" or "₦45,000"
  description?: string;
  image?: string;
  rating?: string | number;
  prepTime?: string;
  category?: string;
  vendorId: string;
  vendorName: string;
  vendorDistance: string;
  vendorSlug?: string;
}

interface DiscoverFoodCardProps {
  item: FoodItem;
  index: number;
}

const DiscoverFoodCard = ({ item, index }: DiscoverFoodCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleCardClick = () => {
    navigate(`/customer/discover/chef/${item.vendorSlug || item.vendorId}`);
  };

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Normalize price format (cart requires ₦ prefix for parsing)
    const formattedPrice = typeof item.price === "number"
      ? `₦${item.price.toLocaleString()}`
      : item.price.startsWith("₦") ? item.price : `₦${Number(item.price).toLocaleString()}`;

    addItem({
      id: item.id,
      name: item.name,
      price: formattedPrice,
      image: item.image || "",
      chef: item.vendorName,
      vendorId: item.vendorId,
    });
  };

  const displayPrice = typeof item.price === "number"
    ? `₦${item.price.toLocaleString()}`
    : item.price.startsWith("₦") ? item.price : `₦${Number(item.price).toLocaleString()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={handleCardClick}
      className="flex gap-3 sm:gap-4 p-3.5 sm:p-4 bg-dark-surface/90 border border-gold/10 hover:border-gold/30 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Dynamic Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Dish Image */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-dark-deep border border-gold/5">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gold/5 to-transparent text-[8px] uppercase tracking-wider text-gold/30 font-black text-center p-1">
            Plokitch Spec
          </div>
        )}
      </div>

      {/* Dish Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5 relative z-10">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-sm sm:text-base text-white truncate group-hover:text-gold transition-colors">
              {item.name}
            </h3>
            <span className="text-sm font-black text-gold flex-shrink-0">
              {displayPrice}
            </span>
          </div>
          <p className="text-[10px] font-bold text-gold/60 uppercase tracking-widest leading-none mb-1">
            by {item.vendorName}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2 pr-6 leading-relaxed">
            {item.description || "Indulge in a premium recipe crafted to absolute culinary perfection by our master atelier."}
          </p>
        </div>

        {/* Footer Details */}
        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 bg-gold/5 border border-gold/10 px-1.5 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="font-black text-gold">
              {item.rating || "4.9"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3 text-gold" />
            <span className="font-bold">{item.vendorDistance || "Nearby"}</span>
          </div>
          {item.category && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest font-black text-white/50">
              {item.category}
            </span>
          )}
        </div>
      </div>

      {/* Floating Add to Basket / Plus Button */}
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-20">
        <Button
          size="icon"
          onClick={handleAddToBasket}
          className="w-8 h-8 rounded-full bg-gold hover:bg-gold-light text-background hover:scale-105 active:scale-95 shadow-md shadow-black/30 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DiscoverFoodCard;
