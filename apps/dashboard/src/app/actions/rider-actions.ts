"use server"

import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function createRiderAction(data: {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  plateNumber: string;
}) {
  try {
    const rider = await api.riders.create(data);
    revalidatePath("/admin/dashboard/riders");
    return { success: true, data: rider };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
