import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Support API Module
 * Handles platform complaints, tickets, and moderation.
 */
export const supportApi = {
  /**
   * Fetches a list of support complaints
   */
  list: async (params?: { status?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('complaint')
      .select('*, customer:customer_id(name, email), order:order_id(status)')
      .order('created_at', { ascending: false });

    if (params?.status && params.status !== 'all') {
      query = query.eq('status', params.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:support:list]', error);
      // Fallback to empty array if table doesn't exist yet in the actual DB
      // although we added it to schema.ts, it might not be migrated yet.
      return [];
    }

    return data || [];
  },

  /**
   * Updates a complaint's status
   */
  updateStatus: async (id: string, status: string) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('complaint')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API:support:updateStatus]', error);
      throw new Error(`Failed to update complaint: ${error.message}`);
    }

    return data;
  },

  /**
   * Resolves a ticket
   */
  resolve: async (id: string) => {
    return supportApi.updateStatus(id, 'resolved');
  }
};
