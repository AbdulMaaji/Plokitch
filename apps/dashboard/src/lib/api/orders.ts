import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Orders API Module
 * Manages live order operations and dispatch overrides.
 */
export const ordersApi = {
  /**
   * Fetches a list of orders with relational data
   */
  list: async (params?: { status?: string; query?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('order')
      .select('*, customer:customer_id(name, email), vendor:vendor_id(business_name), rider:rider_id(name)')
      .order('created_at', { ascending: false });

    if (params?.status && params.status !== 'all') {
      query = query.eq('status', params.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:orders:list]', error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Updates an order's operational status
   */
  updateStatus: async (id: string, status: string) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('order')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API:orders:updateStatus]', error);
      throw new Error(`Failed to update order: ${error.message}`);
    }

    return data;
  },

  /**
   * Assigns a rider to an order manually
   */
  assignRider: async (orderId: string, riderId: string) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('order')
      .update({
        rider_id: riderId,
        status: 'picking', // Transition to picking once assigned
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('[API:orders:assignRider]', error);
      throw new Error(`Failed to assign rider: ${error.message}`);
    }

    return data;
  },

  /**
   * Fetches real-time operational stats for orders
   */
  getStats: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: orders } = await supabase
      .from('order')
      .select('status, estimated_delivery, created_at, delivered_at');

    const active = orders?.filter(o => !['completed', 'cancelled'].includes(o.status)).length || 0;
    
    const today = new Date().toDateString();
    const completedToday = orders?.filter(o => {
      const isCompleted = o.status === 'completed';
      const isToday = new Date(o.created_at).toDateString() === today;
      return isCompleted && isToday;
    }).length || 0;

    const delayed = orders?.filter(o => {
      const isActive = !['completed', 'cancelled'].includes(o.status);
      const isOverdue = o.estimated_delivery && new Date(o.estimated_delivery) < new Date();
      return isActive && isOverdue;
    }).length || 0;

    // Calculate Avg Prep Time (Proxy: 30% of total lifecycle for completed orders)
    const completedOrders = orders?.filter(o => o.status === 'completed' && o.delivered_at) || [];
    let avgPrepTime = 18; // Default fallback
    
    if (completedOrders.length > 0) {
      const totalDuration = completedOrders.reduce((sum, o) => {
        return sum + (new Date(o.delivered_at!).getTime() - new Date(o.created_at).getTime());
      }, 0);
      avgPrepTime = Math.round((totalDuration / completedOrders.length) / 60000 * 0.3);
    }

    return {
      active,
      completedToday,
      delayed,
      avgPrepTime
    };
  }
};
