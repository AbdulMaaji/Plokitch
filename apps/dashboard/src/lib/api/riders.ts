import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Riders API Module
 * Handles fleet management and dispatch assignments.
 */
export const ridersApi = {
  /**
   * Fetches a list of riders with user details
   */
  list: async (params?: { status?: string; query?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('rider_profile')
      .select('*, user:user_id(name, email, phone)')
      .order('created_at', { ascending: false });

    if (params?.status === 'AVAILABLE') {
      query = query.eq('is_available', true);
    } else if (params?.status === 'UNAVAILABLE') {
      query = query.eq('is_available', false);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:riders:list]', error);
      throw new Error(`Failed to fetch riders: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Updates a rider's profile/status
   */
  updateStatus: async (id: string, updates: { isAvailable?: boolean; isVerified?: boolean }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('rider_profile')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API:riders:updateStatus]', error);
      throw new Error(`Failed to update rider: ${error.message}`);
    }

    return data;
  },

  /**
   * Verifies a rider
   */
  verify: async (id: string) => {
    return ridersApi.updateStatus(id, { isVerified: true });
  },

  /**
   * Toggles rider availability
   */
  toggleAvailability: async (id: string, isAvailable: boolean) => {
    return ridersApi.updateStatus(id, { isAvailable });
  }
};
