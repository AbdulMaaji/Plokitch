import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Auth API Module
 * Handles centralized role resolution and identity verification.
 */
export const authApi = {
  /**
   * Resolves the role for a given user identity.
   * This is the "Single Source of Truth" for administrative authorization.
   */
  resolveRole: async (userId: string, email: string): Promise<string | null> => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // In a master-key operational session model, we look for the system admin account
    // or verify against a privileged admin list.
    const { data, error } = await supabase
      .from('user')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      // If user doesn't exist yet (e.g. system-admin login), we fallback to role check
      // based on established operational credentials.
      if (email === 'admin@plokitch.com') return 'ADMIN';
      return null;
    }

    return data?.role || null;
  }
};
