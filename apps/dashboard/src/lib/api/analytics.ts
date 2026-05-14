import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Analytics API Module
 * Handles aggregation of operational metrics from the database.
 */
export const analyticsApi = {
  /**
   * Fetches core operational metrics for the Dashboard Overview
   */
  getOverviewStats: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Total Revenue (Completed Orders)
    const { data: revenueData } = await supabase
      .from('order')
      .select('total_amount')
      .eq('status', 'completed');

    const totalRevenue = revenueData?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

    // 2. Active Orders
    const { count: activeOrdersCount } = await supabase
      .from('order')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'confirmed', 'preparing', 'ready', 'picking', 'delivering']);

    // 3. Riders Online
    const { count: ridersOnlineCount } = await supabase
      .from('rider_profile')
      .select('*', { count: 'exact', head: true })
      .eq('is_available', true);

    // 4. Failed Deliveries (Today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count: failedDeliveriesCount } = await supabase
      .from('order')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'cancelled')
      .gte('created_at', today.toISOString());

    return {
      revenue: totalRevenue,
      activeOrders: activeOrdersCount || 0,
      ridersOnline: ridersOnlineCount || 0,
      failedDeliveries: failedDeliveriesCount || 0,
    };
  },

  /**
   * Fetches recent activity for the Activity Feed
   */
  getRecentActivity: async (limit = 10) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: orders } = await supabase
      .from('order')
      .select('id, status, created_at, vendor:vendor_id(business_name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    return orders?.map(o => ({
      id: o.id,
      title: `Order #${o.id.slice(0, 4).toUpperCase()}`,
      description: `Status updated to ${o.status} for ${o.vendor?.business_name || 'Vendor'}.`,
      timestamp: new Date(o.created_at).toLocaleTimeString(),
      type: (o.status === 'cancelled' ? 'alert' : 'order') as 'order' | 'rider' | 'vendor' | 'alert',
    })) || [];
  }
};
