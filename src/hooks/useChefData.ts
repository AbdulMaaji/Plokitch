import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const useChefData = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [myVendor, setMyVendor] = useState<any>(null);
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const fetchChefData = useCallback(async () => {
    if (!session?.user) return;

    try {
      setLoading(true);
      
      // 1. Fetch Vendor Profile (My Kitchen)
      const vendorRes = await fetch(`${API_URL}/api/vendors/me`, {
        headers: {
          "Authorization": `Bearer ${session.session.token}`
        }
      });
      const vendorData = await vendorRes.json();
      
      if (vendorData.success) {
        setMyVendor(vendorData.data);
        
        // 2. Fetch Menu Items for this vendor
        const menuRes = await fetch(`${API_URL}/api/vendors/${vendorData.data.id}/menu`);
        const menuData = await menuRes.json();
        if (menuData.success) {
          setMenuItems(menuData.data);
        }
      }

      // 3. Fetch Orders (Role-based filtering handled by backend)
      const ordersRes = await fetch(`${API_URL}/api/orders`, {
        headers: {
          "Authorization": `Bearer ${session.session.token}`
        }
      });
      const ordersData = await ordersRes.json();
      if (ordersData.success) {
        setActiveOrders(ordersData.data);
      }

    } catch (error) {
      console.error("Error fetching chef data:", error);
      toast.error("Failed to sync kitchen data");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchChefData();
  }, [fetchChefData]);

  return {
    loading,
    myVendor,
    activeOrders,
    menuItems,
    refreshData: fetchChefData,
    session
  };
};
