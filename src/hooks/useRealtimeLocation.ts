import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface RiderPosition {
  lat: number;
  lng: number;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

// ─────────────────────────────────────────────────────────
// Subscriber — Customer listens for rider position updates
// ─────────────────────────────────────────────────────────

export function useTrackRider(orderId: string | null) {
  const [riderPosition, setRiderPosition] = useState<RiderPosition | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const channelName = `delivery:${orderId}`;
    const channel = supabase.channel(channelName);

    channel
      .on("broadcast", { event: "rider_location" }, (payload) => {
        const pos = payload.payload as RiderPosition;
        setRiderPosition(pos);
      })
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
      setIsConnected(false);
    };
  }, [orderId]);

  return { riderPosition, isConnected };
}

// ─────────────────────────────────────────────────────────
// Broadcaster — Rider sends their position to the channel
// ─────────────────────────────────────────────────────────

interface UseBroadcastLocationOptions {
  orderId: string | null;
  /** Interval in ms for DB sync (default 30000) */
  dbSyncInterval?: number;
  /** API base URL */
  apiBaseUrl?: string;
}

export function useBroadcastLocation({
  orderId,
  dbSyncInterval = 30000,
  apiBaseUrl,
}: UseBroadcastLocationOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastDbSyncRef = useRef<number>(0);
  const baseUrl = apiBaseUrl || import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Set up the broadcast channel
  useEffect(() => {
    if (!orderId) return;

    const channelName = `delivery:${orderId}`;
    const channel = supabase.channel(channelName);

    channel.subscribe();
    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [orderId]);

  // Broadcast a position update (call this on every geolocation tick)
  const broadcastPosition = useCallback(
    async (position: {
      lat: number;
      lng: number;
      heading: number | null;
      speed: number | null;
    }) => {
      const now = Date.now();
      const payload: RiderPosition = {
        ...position,
        timestamp: now,
      };

      // Ephemeral broadcast via Supabase Realtime
      if (channelRef.current) {
        channelRef.current.send({
          type: "broadcast",
          event: "rider_location",
          payload,
        });
      }

      // Periodic DB sync (every ~30s)
      if (now - lastDbSyncRef.current > dbSyncInterval) {
        lastDbSyncRef.current = now;
        try {
          await fetch(`${baseUrl}/api/riders/me`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              currentLocation: { lat: position.lat, lng: position.lng },
            }),
          });
        } catch (err) {
          console.warn("Failed to sync rider location to DB:", err);
        }
      }
    },
    [dbSyncInterval, baseUrl]
  );

  return { broadcastPosition };
}
