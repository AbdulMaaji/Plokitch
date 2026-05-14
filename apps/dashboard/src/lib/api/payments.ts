import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Payments API Module
 * Manages financial reconciliation and vendor payouts.
 */
export const paymentsApi = {
  /**
   * Fetches a list of platform transactions
   */
  getTransactions: async (params?: { status?: string }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('order')
      .select('id, created_at, total_amount, status, vendor:vendor_id(business_name)')
      .order('created_at', { ascending: false });

    if (params?.status) {
      query = query.eq('status', params.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[API:payments:getTransactions]', error);
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Fetches pending payouts for vendors
   */
  getPendingPayouts: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // In a real scenario, this would query a dedicated 'payout' table.
    // For now, we'll aggregate completed orders that haven't been paid out.
    const { data, error } = await supabase
      .from('order')
      .select('vendor_id, vendor:vendor_id(business_name, commission_rate), total_amount')
      .eq('status', 'completed');

    if (error) {
      console.error('[API:payments:getPendingPayouts]', error);
      throw new Error(`Failed to fetch pending payouts: ${error.message}`);
    }

    // Aggregate by vendor
    const aggregated = data.reduce((acc: any, curr: any) => {
      const vendorId = curr.vendor_id;
      if (!acc[vendorId]) {
        acc[vendorId] = {
          vendorId,
          businessName: curr.vendor?.business_name,
          pendingAmount: 0,
          orderCount: 0
        };
      }
      
      // Calculate vendor earning: Total Amount - Commission
      const commissionRate = Number(curr.vendor?.commission_rate || 10);
      const totalAmount = Number(curr.total_amount || 0);
      const vendorEarning = totalAmount * (1 - (commissionRate / 100));

      acc[vendorId].pendingAmount += vendorEarning;
      acc[vendorId].orderCount += 1;
      return acc;
    }, {});

    return Object.values(aggregated);
  },

  /**
   * Approves a vendor payout
   */
  approvePayout: async (vendorId: string, amount: number) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Placeholder for actual payout processing logic
    console.log(`[API:payments:approvePayout] Approving payout of ${amount} for vendor ${vendorId}`);
    
    // In reality, this would create a record in a 'payout_history' table
    return { success: true, vendorId, amount, timestamp: new Date().toISOString() };
  }
};
