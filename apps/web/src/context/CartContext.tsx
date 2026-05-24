import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string | number;
  name: string;
  price: string; // "₦45,000"
  numericPrice: number; // 45000
  image: string;
  chef: string;
  vendorId: string; // Added to support DB relations
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
  isPriority: boolean;
  setIsPriority: (priority: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isPriority, setIsPriority] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("plotkitch_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("plotkitch_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (dish: any) => {
    const numericPrice = parseInt(dish.price.replace(/[^\d]/g, ""));
    
    setItems((prev) => {
      // Single-chef validation: reset the basket if the cart contains items from a different chef
      if (prev.length > 0 && prev[0].vendorId !== dish.vendorId) {
        toast.info("Basket Cleared", {
          description: `Starting a new signature collection from ${dish.chef || 'Artisan'}.`,
        });
        return [
          {
            id: dish.id,
            name: dish.name,
            price: dish.price,
            numericPrice,
            image: dish.image,
            chef: dish.chef,
            vendorId: dish.vendorId,
            quantity: 1,
          }
        ];
      }

      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        toast.success(`Increased ${dish.name} quantity`, {
          description: "Your basket has been updated.",
        });
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      toast.success("Added to Basket!", {
        description: `${dish.name} from ${dish.chef} has been added.`,
      });
      
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          numericPrice,
          image: dish.image,
          chef: dish.chef,
          vendorId: dish.vendorId,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from basket");
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("plotkitch_cart");
  };

  const totalAmount = items.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        itemCount,
        isPriority,
        setIsPriority,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
