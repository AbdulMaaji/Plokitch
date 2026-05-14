"use server"

import { api } from "@/lib/api"

export async function getActivityFeedAction(params?: any) {
  return await api.activity.getActivityFeed(params);
}

export async function getActivityMetricsAction() {
  return await api.activity.getActivityMetrics();
}
