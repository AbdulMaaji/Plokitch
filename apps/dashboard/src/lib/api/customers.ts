import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Customers API Module
 * Manages user accounts and support visibility.
 */
export const customersApi = {
  /**
   * Fetches a paginated list of customers
   */
  list: async (params?: { query?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('user')
      .select('*')
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (params?.query) {
      query = query.or(`name.ilike.%${params.query}%,email.ilike.%${params.query}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:customers:list]', error);
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }

    return data || [];
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
  }
};
