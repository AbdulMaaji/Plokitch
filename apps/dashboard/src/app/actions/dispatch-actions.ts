"use server"

import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function getDispatchOrdersAction(params?: { status?: string; query?: string }) {
  try {
    // Fetch active (non-completed) orders for dispatch view
    const allOrders = await api.orders.list(params);
    // Filter to relevant dispatch statuses by default
    const dispatchStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'picking', 'delivering'];
    const orders = params?.status && params.status !== 'all'
      ? allOrders
      : allOrders.filter((o: any) => dispatchStatuses.includes(o.status));
    return { success: true, data: orders };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function getDispatchStatsAction() {
  try {
    const stats = await api.orders.getStats();
    const riderStats = await api.riders.getStats();
    return {
      success: true,
      data: {
        liveDeliveries: stats.active,
        activeRiders: riderStats.online,
        totalRiders: riderStats.online + (riderStats.verified - riderStats.online > 0 ? riderStats.verified - riderStats.online : 0),
        avgPickupTime: stats.avgPrepTime,
        delayedOrders: stats.delayed,
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
}

export async function getActiveRidersAction() {
  try {
    const riders = await api.riders.list({ status: 'AVAILABLE' });
    return { success: true, data: riders };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function cancelOrderAction(id: string) {
  try {
    const result = await api.orders.updateStatus(id, 'cancelled');
    revalidatePath("/admin/dashboard/dispatch");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function assignRiderToOrderAction(orderId: string, riderId: string) {
  try {
    const result = await api.orders.assignRider(orderId, riderId);
    revalidatePath("/admin/dashboard/dispatch");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getDispatchTimelineAction() {
  try {
    const events = await api.activity.getLiveOperationalUpdates(5);
    return { success: true, data: events };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}
