import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Settings & Audit API Module
 * Handles platform configuration and administrative audit logs.
 */
export const settingsApi = {
  /**
   * Fetches administrative audit logs
   */
  getAuditLogs: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('[API:settings:getAuditLogs]', error);
      return [];
    }

    return data || [];
  },

  /**
   * Logs an administrative action
   */
  logAction: async (action: { 
    adminId: string, 
    action: string, 
    entityType: string, 
    entityId?: string,
    oldData?: any,
    newData?: any
  }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('audit_log')
      .insert([action])
      .select()
      .single();

    if (error) {
      console.error('[API:settings:logAction]', error);
      return null;
    }

    return data;
  },

  /**
   * Fetches platform operational settings
   */
  getPlatformSettings: async () => {
    // In a real app, these might come from a 'platform_settings' table or env vars.
    // For now, we return the operational defaults.
    return {
      commissionRate: 10, // %
      deliveryBaseFee: 500, // Naira/Base
      serviceFee: 150, // Naira
      isActive: true,
      maintenanceMode: false
    };
  }
};
