import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Customers API Module
 * Manages user accounts and support visibility.
 */
export const customersApi = {
  /**
   * Fetches a paginated list of customers with engagement metrics
   */
  list: async (params?: { query?: string; segment?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('user')
      .select('*, orders:order!customer_id(total_amount, status)')
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (params?.query) {
      query = query.or(`name.ilike.%${params.query}%,email.ilike.%${params.query}%`);
    }

    let customers = (data || []).map(u => {
      const orders = u.orders || [];
      const totalOrders = orders.length;
      const ltv = orders.reduce((sum: number, o: any) => sum + Number(o.total_amount || 0), 0);
      const lastOrderDate = orders.length > 0 ? new Date(Math.max(...orders.map((o: any) => new Date(o.created_at).getTime()))) : null;
      
      const now = new Date();
      const joinedDaysAgo = Math.floor((now.getTime() - new Date(u.created_at).getTime()) / (1000 * 60 * 60 * 24));
      const daysSinceLastOrder = lastOrderDate ? Math.floor((now.getTime() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24)) : joinedDaysAgo;

      let segment = "REGULAR";
      if (ltv > 50000 || totalOrders > 20) segment = "VIP";
      else if (joinedDaysAgo <= 7) segment = "NEW";
      else if (totalOrders > 5) segment = "LOYAL";
      else if (totalOrders === 0 && joinedDaysAgo > 30) segment = "DORMANT";
      else if (daysSinceLastOrder > 30) segment = "AT_RISK";

      return {
        ...u,
        totalOrders,
        ltv,
        segment,
        lastOrderDate
      };
    });

    if (params?.segment && params.segment !== 'all') {
      customers = customers.filter(c => c.segment === params.segment);
    }

    return customers;
  },

  /**
   * Updates a customer's account status
   */
  updateStatus: async (id: string, isActive: boolean) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('user')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API:customers:updateStatus]', error);
      throw new Error(`Failed to update customer: ${error.message}`);
    }

    return data;
  },

  /**
   * Fetches a customer's order history
   */
  getOrderHistory: async (customerId: string) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('order')
      .select('*, vendor:vendor_id(business_name)')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API:customers:getOrderHistory]', error);
      throw new Error(`Failed to fetch order history: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Fetches customer statistics (Engagement based)
   */
  getStats: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    // 1. Total Customers
    const { count: total } = await supabase.from('user').select('*', { count: 'exact', head: true }).eq('role', 'customer');

    // 2. Active Customers (Last 24h engagement)
    const { data: activeOrders } = await supabase.from('order').select('customer_id').gte('created_at', twentyFourHoursAgo);
    const activeCount = new Set(activeOrders?.map(o => o.customer_id)).size || 0;

    return {
      total: total || 0,
      active24h: activeCount,
    };
  }
};
