"use server"

import { api } from "@/lib/api"

export async function getExecutiveMetricsAction() {
  return await api.analytics.getExecutiveMetrics();
}

export async function getRevenueAnalyticsAction(timeframe: string) {
  return await api.analytics.getRevenueAnalytics(timeframe);
}

export async function getOperationalAnalyticsAction(timeframe: string) {
  return await api.analytics.getOperationalAnalytics(timeframe);
}

export async function getAiInsightsAction() {
  return await api.analytics.getAiInsights();
}

export async function getPredictionsAction() {
  return await api.analytics.getPredictions();
}

export async function getVendorAnalyticsAction() {
  return await api.analytics.getVendorAnalytics();
}

export async function getCustomerAnalyticsAction() {
  return await api.analytics.getCustomerAnalytics();
}
