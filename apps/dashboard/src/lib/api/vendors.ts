import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Vendors API Module
 * Manages operational lifecycle of platform vendors.
 */
export const vendorsApi = {
  /**
   * Fetches a paginated list of vendors with filtering
   */
  list: async (params?: { status?: string; query?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('vendor')
      .select('*, user:user_id(name, email)')
      .order('created_at', { ascending: false });

    if (params?.status && params.status !== 'all') {
      query = query.eq('is_active', params.status === 'ACTIVE');
    }

    if (params?.query) {
      query = query.ilike('business_name', `%${params.query}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:vendors:list]', error);
      throw new Error(`Failed to fetch vendors: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Updates a vendor's operational status
   */
  updateStatus: async (id: string, updates: { isActive?: boolean; isVerified?: boolean }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('vendor')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API:vendors:updateStatus]', error);
      throw new Error(`Failed to update vendor: ${error.message}`);
    }

    return data;
  },

  /**
   * Approves a vendor (Verifies and Activates)
   */
  approve: async (id: string) => {
    return vendorsApi.updateStatus(id, { isVerified: true, isActive: true });
  },

  /**
   * Suspends a vendor
   */
  suspend: async (id: string) => {
    return vendorsApi.updateStatus(id, { isActive: false });
  },
};
