import { useQuery } from "@tanstack/react-query";
import type { LatLng } from "@/components/Map/OrderTrackingMap";
import { authClient } from "@/lib/auth-client";

// Gombe Default Coordinates
export const GOMBE_CENTER: LatLng = { lat: 10.2897, lng: 11.1673 };

export interface OrderLocationData {
  orderId: string;
  status: string;
  kitchen: LatLng | null;
  rider: LatLng | null;
  delivery: LatLng | null;
  riderId: string | null;
  riderInfo?: {
    name: string | null;
    image: string | null;
  } | null;
  items?: any[];
  totalAmount?: string;
}

export function useOrderLocation(orderId?: string | null) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["order-location", orderId],
    queryFn: async (): Promise<OrderLocationData> => {
      if (!orderId) throw new Error("No order ID provided");
      
      const res = await fetch(`${baseUrl}/api/location/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${session?.session?.token}`
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch location data");
      const json = await res.json();
      return json.data;
    },
    enabled: !!orderId && !!session?.session?.token,
    refetchInterval: 5000, // Sync more frequently for real-time tracking
  });
}
