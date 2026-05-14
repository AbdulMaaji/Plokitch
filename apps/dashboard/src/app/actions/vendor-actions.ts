"use server"

import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function createVendorAction(data: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  cuisineType: string;
}) {
  try {
    const vendor = await api.vendors.create(data);
    revalidatePath("/admin/dashboard/vendors");
    return { success: true, data: vendor };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
