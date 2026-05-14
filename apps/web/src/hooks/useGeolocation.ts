import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

export interface GeolocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  error: string | null;
  isTracking: boolean;
  timestamp: number | null;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
  /** If true, start watching immediately on mount (default: true) */
  autoStart?: boolean;
}

const defaultOptions: UseGeolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 30000, // Increased to 30s
  autoStart: true,
};

export function useGeolocation(options: UseGeolocationOptions = {}) {
  const opts = { ...defaultOptions, ...options };

  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    heading: null,
    speed: null,
    error: null,
    isTracking: false,
    timestamp: null,
  });

  const watchIdRef = useRef<number | null>(null);

  const onSuccess = useCallback((position: GeolocationPosition) => {
    setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      error: null,
      isTracking: true,
      timestamp: position.timestamp,
    });
  }, []);

  const onError = useCallback((error: GeolocationPositionError) => {
    let message: string;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = "Location permission denied. Please enable location access.";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location unavailable. Please check your GPS.";
        break;
      case error.TIMEOUT:
        message = "Location request timed out. Trying low-accuracy mode...";
        // Fallback: try one more time without high accuracy if it was enabled
        if (opts.enableHighAccuracy && watchIdRef.current !== null) {
           navigator.geolocation.clearWatch(watchIdRef.current);
           watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, (e) => {
             setState((prev) => ({ ...prev, error: "Location failed after timeout.", isTracking: false }));
           }, { ...opts, enableHighAccuracy: false, timeout: 15000 });
        }
        break;
      default:
        message = "An unknown error occurred while getting your location.";
    }
    setState((prev) => ({ ...prev, error: message, isTracking: false }));
  }, [onSuccess, opts]);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
        isTracking: false,
      }));
      return;
    }

    // Clear any existing watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: opts.enableHighAccuracy,
      maximumAge: opts.maximumAge,
      timeout: opts.timeout,
    });

    setState((prev) => ({ ...prev, isTracking: true, error: null }));
  }, [onSuccess, onError, opts.enableHighAccuracy, opts.maximumAge, opts.timeout]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((prev) => ({ ...prev, isTracking: false }));
  }, []);

  const getLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported.");
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => {
          if (err.code === err.TIMEOUT) {
            // Fallback to low accuracy on single request timeout
            navigator.geolocation.getCurrentPosition(
              (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
              () => resolve(null),
              { enableHighAccuracy: false, timeout: 10000 }
            );
          } else {
            resolve(null);
          }
        },
        { enableHighAccuracy: true, timeout: 15000 }
      );
    });
  }, []);

  useEffect(() => {
    if (opts.autoStart) {
      startTracking();
    }
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, startTracking, stopTracking, getLocation };
}
