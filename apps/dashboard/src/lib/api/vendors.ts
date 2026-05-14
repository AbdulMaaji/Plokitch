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

  /**
   * Fetches real-time vendor statistics
   */
  getStats: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: vendors } = await supabase
      .from('vendor')
      .select('is_active, is_verified, rating');

    const total = vendors?.length || 0;
    const pending = vendors?.filter(v => !v.is_verified).length || 0;
    const active = vendors?.filter(v => v.is_active).length || 0;

    // Platform Health Calculation: Based on active ratio and quality (rating)
    const activeRatio = total > 0 ? active / total : 0;
    const avgRating = total > 0 ? (vendors?.reduce((sum, v) => sum + Number(v.rating || 0), 0) || 0) / total : 0;
    
    // Quality score is based on 5-star scale
    const healthPercentage = total > 0 
      ? Math.round((activeRatio * 0.7 + (avgRating / 5) * 0.3) * 100) 
      : 0;

    return {
      total,
      pending,
      healthPercentage
    };
  },

  /**
   * Registers a new vendor on the platform
   */
  create: async (data: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    cuisineType: string;
  }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const userId = crypto.randomUUID();
    const vendorId = crypto.randomUUID();

    // 1. Create the base User record
    const { error: userError } = await supabase
      .from('user')
      .insert({
        id: userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: 'chef',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (userError) {
      console.error('[API:vendors:create:user]', userError);
      throw new Error(`Failed to create vendor user: ${userError.message}`);
    }

    // 2. Create the Vendor profile
    const { data: vendor, error: vendorError } = await supabase
      .from('vendor')
      .insert({
        id: vendorId,
        user_id: userId,
        business_name: data.businessName,
        cuisine_type: data.cuisineType,
        is_active: false,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (vendorError) {
      console.error('[API:vendors:create:vendor]', vendorError);
      // Rollback user creation if possible (manual here)
      await supabase.from('user').delete().eq('id', userId);
      throw new Error(`Failed to create vendor profile: ${vendorError.message}`);
    }

    return vendor;
  }
};
