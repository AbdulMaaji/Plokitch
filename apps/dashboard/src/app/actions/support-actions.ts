"use server"

import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function getSupportTicketsAction(params?: { status?: string; priority?: string }) {
  try {
    const tickets = await api.support.list(params);
    return { success: true, data: tickets };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function getSupportStatsAction() {
  try {
    const stats = await api.support.getStats();
    return { success: true, data: stats };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
}

export async function updateTicketStatusAction(id: string, status: string) {
  try {
    const updated = await api.support.updateStatus(id, status);
    revalidatePath("/admin/dashboard/support");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function resolveTicketAction(id: string) {
  try {
    const updated = await api.support.resolve(id);
    revalidatePath("/admin/dashboard/support");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function escalateTicketAction(id: string) {
  try {
    const updated = await api.support.updateStatus(id, "escalated");
    revalidatePath("/admin/dashboard/support");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
