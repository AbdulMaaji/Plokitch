import { useQuery } from "@tanstack/react-query";
import type { LatLng } from "@/components/Map/OrderTrackingMap";

// Gombe Default Coordinates
export const GOMBE_CENTER: LatLng = { lat: 10.2897, lng: 11.1673 };

export interface OrderLocationData {
  orderId: string;
  status: string;
  kitchen: LatLng | null;
  rider: LatLng | null;
  delivery: LatLng | null;
  riderId: string | null;
}

export function useOrderLocation(orderId?: string | null) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  return useQuery({
    queryKey: ["order-location", orderId],
    queryFn: async (): Promise<OrderLocationData> => {
      if (!orderId) throw new Error("No order ID provided");
      const res = await fetch(`${baseUrl}/api/location/order/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch location data");
      const json = await res.json();
      return json.data;
    },
    enabled: !!orderId,
    refetchInterval: 30000, // Re-sync with DB every 30s as fallback
  });
}
