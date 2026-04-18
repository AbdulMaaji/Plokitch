import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Star, 
  Clock, 
  ChevronLeft, 
  Share2, 
  TrendingUp, 
  ShoppingCart, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface DishDetailOverlayProps {
  dish: any;
  onClose: () => void;
}

const DishDetailOverlay = ({ dish, onClose }: DishDetailOverlayProps) => {
  const navigate = useNavigate();

  if (!dish) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-dark-deep/80 backdrop-blur-sm z-[100]"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-2xl bg-dark-surface border-l border-gold/20 z-[101] overflow-y-auto shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative h-[25rem] lg:h-[35rem]">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6 flex gap-3">
            <Button 
              onClick={onClose}
              size="icon" 
              className="h-10 w-10 rounded-full bg-dark-surface/50 border border-white/20 backdrop-blur-md text-white hover:bg-gold hover:text-background transition-all"
            >
              <ChevronLeft size={20} />
            </Button>
          </div>

          <div className="absolute top-6 right-6 flex gap-3">
             <Button 
              size="icon" 
              className="h-10 w-10 rounded-full bg-dark-surface/50 border border-white/20 backdrop-blur-md text-white hover:bg-gold hover:text-background transition-all"
            >
              <Share2 size={18} />
            </Button>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-left">
            <Badge className="mb-4 bg-gold text-background border-none px-3 py-1 font-black text-[10px] tracking-widest uppercase">{dish.tag}</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight">{dish.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-gold/10">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-gold/5 border border-gold/10 text-gold">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-gold uppercase tracking-widest font-heading">{dish.price}</p>
                <div className="flex items-center gap-1 text-white/60 text-sm mt-1">
                  <Star size={14} className="fill-gold text-gold" />
                  <span className="font-bold text-white">{dish.rating}</span>
                  <span className="mx-1 opacity-40">•</span>
                  <Clock size={14} className="text-gold/60" />
                  <span className="font-medium">{dish.prepTime}</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="h-14 px-10 bg-gold hover:bg-gold-light text-background font-black rounded-xl shadow-lg shadow-gold/20 flex gap-3">
              <ShoppingCart size={20} />
              ADD TO BASKET
            </Button>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em]">The Experience</h3>
             <p className="text-white/80 leading-relaxed font-body text-lg">{dish.description}</p>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em]">Core Ingredients</h3>
             <div className="flex flex-wrap gap-2 text-white">
                {dish.ingredients.map((ing: string) => (
                  <div key={ing} className="bg-dark-deep border border-gold/10 rounded-full px-5 py-2 text-xs font-bold hover:border-gold transition-colors">
                    {ing}
                  </div>
                ))}
             </div>
          </div>

          <div className="pt-10 border-t border-gold/10">
             <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em] mb-6">Meet the Artisan</h3>
             <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-[2rem] bg-dark-deep border border-gold/20 flex items-center justify-center shrink-0">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dish.chef}`} alt={dish.chef} />
                </div>
                <div className="space-y-3">
                   <h4 className="text-2xl font-black text-white">{dish.chef}</h4>
                   <p className="text-white/60 leading-relaxed font-body">{dish.chefBio}</p>
                   <Button 
                    variant="link" 
                    className="p-0 h-auto text-gold text-xs font-black uppercase tracking-widest flex gap-2 items-center"
                    onClick={() => {
                      onClose();
                      navigate(`/customer/kitchens/${dish.chef.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                   >
                      View Full Profile <ChevronRight size={14} />
                   </Button>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Spacer */}
        <div className="h-20" />
      </motion.div>
    </AnimatePresence>
  );
};

export default DishDetailOverlay;
