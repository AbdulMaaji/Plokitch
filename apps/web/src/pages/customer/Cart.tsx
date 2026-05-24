import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight, 
  ArrowLeft,
  ShoppingBasket
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalAmount, itemCount } = useCart();

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(totalAmount).replace('NGN', '₦');

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 180 }}
      className="fixed right-0 top-0 h-screen w-full md:w-[480px] bg-dark-surface/90 backdrop-blur-md border-l border-gold/15 z-50 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
    >
      {/* Drawer Header */}
      <header className="p-8 border-b border-gold/5 flex items-center justify-between shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gold font-black uppercase tracking-[0.3em] text-[10px]">
            <ShoppingBasket size={14} />
            Review Order
          </div>
          <h1 className="text-2xl font-heading font-black text-white">Your Basket</h1>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/customer/discover")}
          className="text-muted-foreground hover:text-gold gap-2 px-3 hover:bg-white/5 rounded-xl border border-white/5"
        >
          <ArrowLeft size={16} />
          CLOSE
        </Button>
      </header>

      {/* Cart Content / Items Scrollable Feed */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
        {items.length === 0 ? (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-white">Your basket is empty</p>
              <p className="text-xs text-muted-foreground">Looks like you haven't added any delicacies yet.</p>
            </div>
            <Button 
              onClick={() => navigate("/customer/discover")}
              className="bg-gold text-background font-black uppercase h-11 px-6 text-xs tracking-widest rounded-xl"
            >
              EXPLORE BAZAAR
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="bg-dark-deep/40 border border-white/5 hover:border-gold/20 transition-all group overflow-hidden rounded-2xl">
                    <CardContent className="p-4 flex items-center gap-4">
                      {item.image && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-[9px] text-gold font-black uppercase tracking-widest leading-none mb-1">{item.chef}</p>
                        <h3 className="text-sm font-bold text-white truncate group-hover:text-gold transition-colors">{item.name}</h3>
                        <p className="text-sm font-black text-white/90 leading-none">{item.price}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center bg-dark-deep rounded-full border border-white/10 p-0.5">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-6 w-6 rounded-full text-muted-foreground hover:text-white"
                          >
                            <Minus size={10} />
                          </Button>
                          <span className="w-6 text-center font-black text-xs text-white">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-6 w-6 rounded-full text-muted-foreground hover:text-white"
                          >
                            <Plus size={10} />
                          </Button>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500 hover:bg-red-500/5 h-8 w-8 rounded-full"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Drawer Summary Footer */}
      {items.length > 0 && (
        <div className="p-8 border-t border-gold/5 shrink-0 bg-dark-deep/40 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <span>Subtotal ({itemCount} items)</span>
              <span className="text-white">{formattedTotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <span>Delivery Fee</span>
              <span className="text-emerald-500">FREE</span>
            </div>
            <div className="pt-3 border-t border-white/5 flex justify-between items-end">
              <span className="text-muted-foreground font-black text-xs uppercase tracking-widest">Grand Total</span>
              <span className="text-2xl font-black text-gold font-heading leading-none">{formattedTotal}</span>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/customer/discover/checkout")}
            className="w-full h-13 bg-gold hover:bg-gold-light text-background font-black rounded-xl shadow-xl shadow-gold/15 text-xs tracking-widest uppercase gap-2"
          >
            PROCEED TO CHECKOUT
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
