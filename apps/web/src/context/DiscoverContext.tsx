import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import L from "leaflet";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface FilterState {
  category: string;
  topRated: boolean;
}

interface DiscoverContextType {
  kitchens: any[];
  dishes: any[];
  visibleChefs: any[];
  visibleDishes: any[];
  loading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;
  locationLabel: string;
  setLocationLabel: (label: string) => void;
  locationLoading: boolean;
  handleGetCurrentLocation: () => void;
  selectedChefId: string | null;
  setSelectedChefId: (id: string | null) => void;
  isListFullScreen: boolean;
  setIsListFullScreen: (val: boolean) => void;
  isMapFullScreen: boolean;
  setIsMapFullScreen: (val: boolean) => void;
  mapBounds: L.LatLngBounds | null;
  setMapBounds: (bounds: L.LatLngBounds | null) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
}

const DiscoverContext = createContext<DiscoverContextType | undefined>(undefined);

export const DiscoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = authClient.useSession();

  // Unified Session Memory & States
  const [kitchens, setKitchens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    topRated: false,
  });
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLabel, setLocationLabel] = useState("Gombe, Nigeria");
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
  
  const [isListFullScreen, setIsListFullScreen] = useState(false);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);

  // Map state persistence
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.2897, 11.1673]);
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);

  // Fetch Marketplace data from local server
  const fetchMarketplace = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vendors`);
      const data = await res.json();
      if (data.success) {
        setKitchens(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch discover marketplace:", error);
      toast.error("Failed to connect to local kitchens server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplace();
  }, [session]);

  // Request browser GPS geolocation coordinates
  const handleGetCurrentLocation = () => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setMapCenter([latitude, longitude]);
        setMapZoom(14);
        setLocationLabel("Current Location");
        setLocationLoading(false);
        toast.success("GPS Location updated!");
      },
      (error) => {
        console.warn("Geolocation request failed:", error);
        toast.error("Unable to retrieve location coordinates");
        setLocationLoading(false);
      }
    );
  };

  // Extract all dishes belonging to active kitchens
  const dishes = useMemo(() => {
    return kitchens.flatMap((vendor: any) =>
      (vendor.menuItems || []).map((item: any) => ({
        ...item,
        vendorId: vendor.id,
        vendorName: vendor.businessName,
        vendorSlug: vendor.slug,
        vendorDistance: vendor.deliveryTime || "25-35 min",
        rating: item.rating || "4.9",
        numericPrice: Number(item.price),
      }))
    );
  }, [kitchens]);

  // Viewport bounds & categories filter (No dishes = no chef visible on map)
  const visibleChefs = useMemo(() => {
    return kitchens.filter((chef) => {
      // 1. Mandatory Location pin and must have active dishes
      const lat = chef.location?.lat;
      const lng = chef.location?.lng;
      if (!lat || !lng) return false;
      
      const chefDishes = chef.menuItems || [];
      if (chefDishes.length === 0) return false;

      // 2. Active role check
      if (!chef.isActive) return false;

      // 3. Leaflet viewport boundaries filter
      if (mapBounds && !mapBounds.contains([lat, lng])) return false;

      // 4. Selected chef marker drill-down filter
      if (selectedChefId && chef.id !== selectedChefId) return false;

      // 5. Category matches
      if (filters.category !== "All") {
        const hasMatchingCategory = chefDishes.some(
          (dish: any) => dish.category?.toLowerCase() === filters.category.toLowerCase()
        );
        if (!hasMatchingCategory) return false;
      }

      // 6. Rating constraint
      if (filters.topRated && Number(chef.rating || "0") < 4.8) return false;

      return true;
    });
  }, [kitchens, mapBounds, selectedChefId, filters]);

  // Derived visible dishes matching active viewport chefs
  const visibleDishes = useMemo(() => {
    const activeChefIds = new Set(visibleChefs.map((c) => c.id));
    return dishes.filter((dish) => {
      if (!activeChefIds.has(dish.vendorId)) return false;
      if (filters.category !== "All" && dish.category?.toLowerCase() !== filters.category.toLowerCase()) return false;
      if (filters.topRated && Number(dish.rating || "0") < 4.8) return false;
      return true;
    });
  }, [dishes, visibleChefs, filters]);

  return (
    <DiscoverContext.Provider
      value={{
        kitchens,
        dishes,
        visibleChefs,
        visibleDishes,
        loading,
        filters,
        setFilters,
        userLocation,
        setUserLocation,
        locationLabel,
        setLocationLabel,
        locationLoading,
        handleGetCurrentLocation,
        selectedChefId,
        setSelectedChefId,
        isListFullScreen,
        setIsListFullScreen,
        isMapFullScreen,
        setIsMapFullScreen,
        mapBounds,
        setMapBounds,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
      }}
    >
      {children}
    </DiscoverContext.Provider>
  );
};

export const useDiscover = () => {
  const context = useContext(DiscoverContext);
  if (!context) {
    throw new Error("useDiscover must be used within a DiscoverProvider");
  }
  return context;
};
