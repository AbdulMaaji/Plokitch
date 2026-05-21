"use server"

import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function getNotificationsAction(params?: { category?: string; page?: number }) {
  try {
    // Notifications are aggregated from audit_log + orders + complaints
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Recent complaints (user-facing alerts)
    const { data: complaints } = await supabase
      .from('complaint')
      .select('*, customer:customer_id(name)')
      .order('created_at', { ascending: false })
      .limit(10);

    // 2. Recent audit logs (system/admin events)
    const { data: auditLogs } = await supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // 3. Recent cancelled orders (operational alerts)
    const { data: cancelledOrders } = await supabase
      .from('order')
      .select('*, customer:customer_id(name), vendor:vendor_id(business_name)')
      .eq('status', 'cancelled')
      .order('updated_at', { ascending: false })
      .limit(5);

    // 4. New vendors pending verification
    const { data: pendingVendors } = await supabase
      .from('vendor')
      .select('*, user:user_id(name, email)')
      .eq('is_verified', false)
      .eq('is_active', false)
      .order('created_at', { ascending: false })
      .limit(5);

    const notifications: any[] = [];
    const now = new Date();

    // Map complaints
    (complaints || []).forEach(c => {
      const isUrgent = c.priority === 'urgent' || c.priority === 'high' || c.status === 'escalated';
      notifications.push({
        id: c.id,
        type: isUrgent ? 'ALERT' : 'INFO',
        category: 'complaint',
        title: c.status === 'escalated' ? `Escalated: ${c.subject}` : c.subject,
        description: `${(c.customer as any)?.name || 'Customer'}: ${c.description.slice(0, 120)}`,
        timestamp: c.created_at,
        isRead: c.status === 'resolved' || c.status === 'closed',
        priority: c.priority,
      });
    });

    // Map audit logs
    (auditLogs || []).forEach(log => {
      const isHighRisk = log.action?.includes('delete') || log.action?.includes('suspend');
      notifications.push({
        id: log.id,
        type: isHighRisk ? 'CRITICAL' : 'INFO',
        category: 'system',
        title: (log.action || 'Admin Action').split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: `${log.entity_type || 'Entity'} ${log.action || 'updated'}: ${log.entity_id || ''}`,
        timestamp: log.created_at,
        isRead: true,
        priority: isHighRisk ? 'high' : 'low',
      });
    });

    // Map cancelled orders
    (cancelledOrders || []).forEach(o => {
      notifications.push({
        id: `cancelled-${o.id}`,
        type: 'ALERT',
        category: 'order',
        title: `Order Cancelled`,
        description: `${(o.customer as any)?.name || 'Customer'} cancelled their order at ${(o.vendor as any)?.business_name || 'vendor'}.`,
        timestamp: o.updated_at,
        isRead: false,
        priority: 'medium',
      });
    });

    // Map pending vendor applications
    (pendingVendors || []).forEach(v => {
      notifications.push({
        id: `vendor-${v.id}`,
        type: 'ALERT',
        category: 'vendor',
        title: `New Vendor Application`,
        description: `${v.business_name} (${(v.user as any)?.email || ''}) is awaiting verification and approval.`,
        timestamp: v.created_at,
        isRead: false,
        priority: 'medium',
      });
    });

    // Sort by timestamp
    const sorted = notifications.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Filter by category
    const filtered = params?.category && params.category !== 'all'
      ? sorted.filter(n => n.category === params.category)
      : sorted;

    return { success: true, data: filtered };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function getNotificationStatsAction() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: openComplaints } = await supabase
      .from('complaint')
      .select('status, priority');

    const { data: recentAudit } = await supabase
      .from('audit_log')
      .select('action')
      .order('created_at', { ascending: false })
      .limit(50);

    const unread = (openComplaints || []).filter(c => c.status === 'open' || c.status === 'escalated').length;
    const critical = (openComplaints || []).filter(c => c.status === 'escalated' || c.priority === 'urgent').length;
    const criticalAudit = (recentAudit || []).filter(l => l.action?.includes('delete') || l.action?.includes('suspend')).length;

    // Category counts
    const categoryCounts = {
      all: (openComplaints || []).length + (recentAudit || []).length,
      complaint: (openComplaints || []).length,
      system: (recentAudit || []).length,
      order: 0,
      vendor: 0,
      rider: 0,
    };

    return {
      success: true,
      data: {
        unread,
        critical: critical + criticalAudit,
        categoryCounts,
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
}

export async function markAllNotificationsReadAction() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    // Mark all open complaints as "in-progress" to indicate they've been reviewed
    await supabase
      .from('complaint')
      .update({ status: 'in-progress', updated_at: new Date().toISOString() })
      .eq('status', 'open');
    revalidatePath("/admin/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function dismissNotificationAction(id: string) {
  // Complaints: set to in-progress. For others (synthetic IDs), just revalidate.
  try {
    if (id.includes('-') && !id.startsWith('cancelled-') && !id.startsWith('vendor-')) {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      await supabase
        .from('complaint')
        .update({ status: 'in-progress', updated_at: new Date().toISOString() })
        .eq('id', id);
    }
    revalidatePath("/admin/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
