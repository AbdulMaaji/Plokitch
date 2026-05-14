import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Todo API module for Dashboard
 * Enforces architectural boundary between UI and Database
 */
export const todosApi = {
  /**
   * Fetches all todos for the current user/context
   */
  list: async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API:todos:list]', error);
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Add more todo methods here as needed (create, update, delete)
   */
};
