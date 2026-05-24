import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Minimize2 } from "lucide-react";
import { useDiscover } from "@/context/DiscoverContext";

interface DiscoverMapProps {
  restaurants: any[];
  isFullScreen: boolean;
  onExitFullScreen: () => void;
  userLocation?: { lat: number; lng: number } | null;
}

declare global {
  interface Window {
    handleNavigateRestaurant: (id: string) => void;
  }
}

const DiscoverMap = ({ restaurants, isFullScreen, onExitFullScreen, userLocation }: DiscoverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const navigate = useNavigate();

  // Access the unified spatial context
  const { setMapBounds, setMapCenter, setMapZoom, mapCenter, mapZoom, breakpoint } = useDiscover();

  // Expose navigation to window context for popup button triggers
  useEffect(() => {
    window.handleNavigateRestaurant = (id: string) => {
      // Lock navigation under the unified Discover tree
      navigate(`/customer/discover/chef/${id}`);
    };

    return () => {
      delete (window as any).handleNavigateRestaurant;
    };
  }, [navigate]);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Load center and zoom parameters directly from persisted session memory
    const map = L.map(mapRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Elegant CartoDB Dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Zoom control at the bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Set initial bounds
    setTimeout(() => {
      if (mapInstanceRef.current) {
        setMapBounds(mapInstanceRef.current.getBounds());
      }
    }, 500);

    // Sync bounds, center and zoom dynamically to Context when panning or zooming stops
    map.on("moveend", () => {
      if (mapInstanceRef.current) {
        setMapBounds(mapInstanceRef.current.getBounds());
        const center = mapInstanceRef.current.getCenter();
        setMapCenter([center.lat, center.lng]);
        setMapZoom(mapInstanceRef.current.getZoom());
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off("moveend");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Map Viewport on Full Screen and Breakpoint Toggles
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          setMapBounds(mapInstanceRef.current.getBounds());
        }
      }, 300);
    }
  }, [isFullScreen, breakpoint]);

  // Update Live User GPS Marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    // Clear old marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    // Radar blue circle representational user marker
    const userIcon = L.divIcon({
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.25), 0 2px 10px rgba(0, 0, 0, 0.5);
          position: relative;
        ">
          <div style="
            position: absolute;
            inset: -8px;
            border-radius: 50%;
            border: 2px solid #3b82f6;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            opacity: 0.7;
          "></div>
        </div>
        <style>
          @keyframes ping {
            75%, 100% { transform: scale(1.8); opacity: 0; }
          }
        </style>
      `,
      className: "user-location-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
      .bindPopup('<div class="text-center font-sans"><p class="font-black text-xs text-foreground uppercase tracking-widest">Your Location</p></div>')
      .addTo(mapInstanceRef.current);

    userMarkerRef.current = marker;
    mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14, { animate: true });
  }, [userLocation]);

  // Update Kitchen Pin Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (restaurants.length === 0) return;

    // Custom Marker Creator helper
    const createCustomIcon = (isTopRated: boolean) => {
      const pinColor = isTopRated ? "#E5C38C" : "rgba(229, 195, 140, 0.6)";
      const glowStyle = isTopRated ? "box-shadow: 0 0 15px #E5C38C, 0 4px 15px rgba(0,0,0,0.5);" : "box-shadow: 0 2px 10px rgba(0,0,0,0.4);";
      
      const starSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
      
      const innerDot = `<div style="width: 8px; height: 8px; background: black; border-radius: 50%;"></div>`;

      const isMobile = breakpoint === "xs" || breakpoint === "sm";
      const baseWidth = isTopRated ? (isMobile ? 30 : 38) : (isMobile ? 24 : 32);
      const halfSize = baseWidth / 2;

      return L.divIcon({
        html: `
          <div style="
            width: ${baseWidth}px;
            height: ${baseWidth}px;
            background: ${pinColor};
            border-radius: 50%;
            border: 3px solid #0E171E;
            ${glowStyle}
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          " class="map-marker-pin hover:scale-110 active:scale-95 duration-200">
            ${isTopRated ? starSvg : innerDot}
          </div>
        `,
        className: "custom-div-icon",
        iconSize: [baseWidth, baseWidth],
        iconAnchor: [halfSize, halfSize],
      });
    };

    // Inject active kitchen markers onto the Leaflet map instance
    restaurants.forEach((chef) => {
      const lat = chef.location?.lat;
      const lng = chef.location?.lng;
      if (!lat || !lng) return;
      
      const rating = Number(chef.rating || "4.8");
      const isTopRated = rating >= 4.8 || chef.tag === "Premium";
      
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(isTopRated),
      })
        .bindPopup(`
          <div style="
            padding: 8px;
            text-align: center;
            min-w-[160px];
            font-family: 'DM Sans', sans-serif;
            background: #0E171E;
            color: #fff;
            border-radius: 12px;
          " class="dark-popup">
            <h3 style="
              font-weight: 800;
              font-size: 14px;
              margin: 0 0 2px 0;
              color: #fff;
              line-height: 1.2;
            ">${chef.businessName}</h3>
            <span style="
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #E5C38C;
              font-weight: 700;
              display: block;
              margin-bottom: 8px;
            ">${chef.cuisineType || "Artisan Kitchen"}</span>
            <button 
              onclick="window.handleNavigateRestaurant('${chef.slug || chef.id}')"
              style="
                width: 100%;
                height: 32px;
                border: none;
                background: #E5C38C;
                color: #0E171E;
                font-size: 11px;
                font-weight: 900;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              onmouseover="this.style.background='#d4af37'"
              onmouseout="this.style.background='#E5C38C'"
            >
              View Atelier
            </button>
          </div>
        `);

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });

  }, [restaurants]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ minHeight: "100vh", zIndex: 0 }}
      />

      {/* Styled Popup Overrides in CSS */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: #0E171E !important;
          border: 1px solid rgba(229, 195, 140, 0.2);
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
        }
        .leaflet-popup-tip {
          background: #0E171E !important;
          border: 1px solid rgba(229, 195, 140, 0.2);
        }
        .leaflet-popup-content {
          margin: 4px !important;
        }
        .leaflet-popup-close-button {
          color: #E5C38C !important;
          padding: 8px !important;
        }
      `}</style>

      {/* Exit Full Screen Floating Button */}
      {isFullScreen && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[1000]">
          <Button
            onClick={onExitFullScreen}
            className="rounded-full shadow-lg bg-dark-surface/90 border border-gold/20 text-gold hover:bg-gold hover:text-background text-xs px-6 py-2.5 h-auto uppercase tracking-widest font-black"
          >
            <Minimize2 className="w-3.5 h-3.5 mr-2" />
            Exit Full Screen
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscoverMap;
