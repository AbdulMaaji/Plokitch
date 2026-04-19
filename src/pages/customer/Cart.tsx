import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
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
    <DashboardLayout role="customer">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold font-black uppercase tracking-[0.3em] text-[10px]">
              <ShoppingBasket size={14} />
              Review Order
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">Your Basket</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/customer/marketplace")}
            className="text-muted-foreground hover:text-gold gap-2"
          >
            <ArrowLeft size={18} />
            CONTINUE BROWSING
          </Button>
        </header>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-white">Your basket is empty</p>
              <p className="text-muted-foreground">Looks like you haven't added any delicacies yet.</p>
            </div>
            <Button 
              onClick={() => navigate("/customer/marketplace")}
              className="bg-gold text-background font-black uppercase h-12 px-8"
            >
              EXPLORE MARKETPLACE
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="bg-dark-surface border-white/5 hover:border-gold/20 transition-all group">
                      <CardContent className="p-4 md:p-6 flex items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-[10px] text-gold font-black uppercase tracking-widest">{item.chef}</p>
                          <h3 className="text-lg font-bold text-white truncate group-hover:text-gold transition-colors">{item.name}</h3>
                          <p className="text-lg font-black text-white/90">{item.price}</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="flex items-center bg-dark-deep rounded-full border border-white/5 p-1">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-white"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center font-black text-sm text-white">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-white"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/5 h-10 w-10"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1 border-white/5">
              <Card className="bg-dark-surface border-gold/20 sticky top-24 overflow-hidden rounded-[2rem]">
                <div className="p-8 space-y-6">
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-widest">Order Summary</h2>
                  
                  <div className="space-y-4 border-y border-white/5 py-6">
                    <div className="flex justify-between text-muted-foreground font-bold text-sm">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="text-white">{formattedTotal}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold text-sm">
                      <span>Delivery Fee</span>
                      <span className="text-emerald-500">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-muted-foreground font-black text-xs uppercase tracking-widest">Total cost</span>
                    <span className="text-3xl font-black text-gold font-heading leading-none">{formattedTotal}</span>
                  </div>

                  <Button 
                    onClick={() => navigate("/customer/checkout")}
                    className="w-full h-14 bg-gold hover:bg-gold-light text-background font-black rounded-2xl shadow-xl shadow-gold/20 text-md gap-3"
                  >
                    PROCEED TO CHECKOUT
                    <ChevronRight size={20} />
                  </Button>
                </div>
                
                <div className="bg-gold/5 p-6 border-t border-gold/10">
                  <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] text-center">
                    Secure checkout powered by Plokitch
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Cart;
