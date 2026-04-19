import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { createMarkerIcon } from "./MapMarker";
import "./leaflet-setup.css";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface LatLng {
  lat: number;
  lng: number;
}

interface OrderTrackingMapProps {
  className?: string;
  /** Kitchen / vendor location */
  kitchenLocation?: LatLng | null;
  /** Rider's live position */
  riderLocation?: LatLng | null;
  /** Customer delivery destination */
  deliveryLocation?: LatLng | null;
  /** Whether to show labels on markers */
  showLabels?: boolean;
  /** Whether to show the route polyline */
  showRoute?: boolean;
  /** Center the map on this point (e.g. rider's own position) */
  center?: LatLng | null;
  /** Fixed zoom level (otherwise auto-fit) */
  zoom?: number;
}

// ─────────────────────────────────────────────
// Dark tile layer URL
// ─────────────────────────────────────────────

const SATELLITE_TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// ─────────────────────────────────────────────
// Default center — Gombe, Nigeria
// ─────────────────────────────────────────────

const DEFAULT_CENTER: LatLng = { lat: 10.2897, lng: 11.1673 };
const DEFAULT_ZOOM = 14;

// ─────────────────────────────────────────────
// Helper: auto-fit bounds to show all markers
// ─────────────────────────────────────────────

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0 || !map) return;

    // Defensive check: ensure the map is ready and has a pane
    const container = map.getContainer();
    if (!container || !container.offsetParent) return;

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    
    try {
      if (points.length === 1) {
        map.setView([points[0].lat, points[0].lng], 15, { animate: true });
      } else {
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16, animate: true });
      }
    } catch (err) {
      console.warn("Leaflet fitBounds failed gracefully:", err);
    }
  }, [map, points]);

  return null;
}

// ─────────────────────────────────────────────
// Helper: smoothly update map center
// ─────────────────────────────────────────────

function RecenterMap({ center, zoom }: { center: LatLng; zoom?: number }) {
  const map = useMap();
  const prevCenter = useRef<LatLng | null>(null);

  useEffect(() => {
    if (
      prevCenter.current &&
      prevCenter.current.lat === center.lat &&
      prevCenter.current.lng === center.lng
    ) {
      return;
    }
    prevCenter.current = center;
    map.setView([center.lat, center.lng], zoom ?? map.getZoom(), { animate: true });
  }, [map, center, zoom]);

  return null;
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const OrderTrackingMap = ({
  className = "",
  kitchenLocation,
  riderLocation,
  deliveryLocation,
  showLabels = true,
  showRoute = true,
  center,
  zoom,
}: OrderTrackingMapProps) => {
  // Memoize marker icons
  const kitchenIcon = useMemo(() => createMarkerIcon("kitchen", 44), []);
  const riderIcon = useMemo(() => createMarkerIcon("rider", 52), []);
  const destinationIcon = useMemo(() => createMarkerIcon("destination", 44), []);

  // Collect all valid points for auto-fitting
  const allPoints = useMemo(() => {
    const pts: LatLng[] = [];
    if (kitchenLocation?.lat && kitchenLocation?.lng) pts.push(kitchenLocation);
    if (riderLocation?.lat && riderLocation?.lng) pts.push(riderLocation);
    if (deliveryLocation?.lat && deliveryLocation?.lng) pts.push(deliveryLocation);
    return pts;
  }, [kitchenLocation, riderLocation, deliveryLocation]);

  // Route polyline coordinates (kitchen → rider → destination)
  const routeCoords = useMemo(() => {
    const coords: [number, number][] = [];
    if (kitchenLocation?.lat && kitchenLocation?.lng) coords.push([kitchenLocation.lat, kitchenLocation.lng]);
    if (riderLocation?.lat && riderLocation?.lng) coords.push([riderLocation.lat, riderLocation.lng]);
    if (deliveryLocation?.lat && deliveryLocation?.lng) coords.push([deliveryLocation.lat, deliveryLocation.lng]);
    return coords;
  }, [kitchenLocation, riderLocation, deliveryLocation]);

  const mapCenter = center ?? (allPoints.length > 0 ? allPoints[0] : DEFAULT_CENTER);

  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom ?? DEFAULT_ZOOM}
        zoomControl={true}
        attributionControl={true}
        className="w-full h-full"
        style={{ background: "#0a0a0a" }}
      >
        {/* Satellite tile layer */}
        <TileLayer url={SATELLITE_TILE_URL} attribution={TILE_ATTRIBUTION} />

        {/* Auto-fit or recenter */}
        {center ? (
          <RecenterMap center={center} zoom={zoom} />
        ) : allPoints.length > 0 ? (
          <FitBounds points={allPoints} />
        ) : null}

        {/* Route polyline */}
        {showRoute && routeCoords.length >= 2 && (
          <>
            {/* Glow effect line */}
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: "rgba(212, 175, 55, 0.15)",
                weight: 10,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Main dashed line */}
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: "#d4af37",
                weight: 3,
                opacity: 0.8,
                dashArray: "12, 8",
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}

        {/* Kitchen Marker */}
        {kitchenLocation && (
          <Marker
            position={[kitchenLocation.lat, kitchenLocation.lng]}
            icon={kitchenIcon}
          >
            {showLabels && (
              <Tooltip direction="top" permanent={false}>
                <span className="font-bold text-xs uppercase tracking-wider">Kitchen</span>
              </Tooltip>
            )}
          </Marker>
        )}

        {/* Rider Marker */}
        {riderLocation && (
          <Marker
            position={[riderLocation.lat, riderLocation.lng]}
            icon={riderIcon}
          >
            {showLabels && (
              <Tooltip direction="top" permanent={false}>
                <span className="font-bold text-xs uppercase tracking-wider">Rider</span>
              </Tooltip>
            )}
          </Marker>
        )}

        {/* Destination Marker */}
        {deliveryLocation && (
          <Marker
            position={[deliveryLocation.lat, deliveryLocation.lng]}
            icon={destinationIcon}
          >
            {showLabels && (
              <Tooltip direction="top" permanent={false}>
                <span className="font-bold text-xs uppercase tracking-wider">Destination</span>
              </Tooltip>
            )}
          </Marker>
        )}
      </MapContainer>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-deep/60 to-transparent pointer-events-none z-[500]" />
    </div>
  );
};

export default OrderTrackingMap;
