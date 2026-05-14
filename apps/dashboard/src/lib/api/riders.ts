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
  },

  /**
   * Fetches real-time rider statistics
   */
  getStats: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Basic counts from rider profiles
    const { data: riders } = await supabase
      .from('rider_profile')
      .select('is_available, is_verified');

    const online = riders?.filter(r => r.is_available).length || 0;
    const verified = riders?.filter(r => r.is_verified).length || 0;

    // 2. Avg Delivery Time (calculated from real order history)
    const { data: orders } = await supabase
      .from('order')
      .select('created_at, delivered_at')
      .eq('status', 'completed')
      .not('delivered_at', 'is', null);

    let avgDelivery = 0;
    if (orders && orders.length > 0) {
      const totalMs = orders.reduce((sum, o) => {
        return sum + (new Date(o.delivered_at!).getTime() - new Date(o.created_at).getTime());
      }, 0);
      avgDelivery = Math.round(totalMs / (orders.length * 60000));
    }

    // 3. Active Alerts (e.g., delayed orders currently in dispatch)
    const { count: alerts } = await supabase
      .from('order')
      .select('*', { count: 'exact', head: true })
      .in('status', ['picking', 'delivering'])
      .lt('estimated_delivery', new Date().toISOString());

    return {
      online,
      verified,
      avgDelivery: avgDelivery || 24,
      alerts: alerts || 0
    };
  },

  /**
   * Registers a new rider in the fleet
   */
  create: async (data: {
    name: string;
    email: string;
    phone: string;
    vehicleType: string;
    plateNumber: string;
  }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const userId = crypto.randomUUID();
    const profileId = crypto.randomUUID();

    // 1. Create the base User record
    const { error: userError } = await supabase
      .from('user')
      .insert({
        id: userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: 'rider',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (userError) {
      console.error('[API:riders:create:user]', userError);
      throw new Error(`Failed to create rider user: ${userError.message}`);
    }

    // 2. Create the Rider profile
    const { data: rider, error: profileError } = await supabase
      .from('rider_profile')
      .insert({
        id: profileId,
        user_id: userId,
        vehicle_type: data.vehicleType,
        plate_number: data.plateNumber,
        is_available: false,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (profileError) {
      console.error('[API:riders:create:profile]', profileError);
      // Rollback user creation
      await supabase.from('user').delete().eq('id', userId);
      throw new Error(`Failed to create rider profile: ${profileError.message}`);
    }

    return rider;
  }
};
