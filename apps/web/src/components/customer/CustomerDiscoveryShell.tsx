import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { DiscoverProvider, useDiscover } from "@/context/DiscoverContext";
import DiscoverMap from "./DiscoverMap";
import DiscoverBottomSheet from "./DiscoverBottomSheet";
import { Loader2 } from "lucide-react";

// Spatial shell container linking all elements together
const SpatialShellContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  // Destructure persistent shared context
  const { 
    visibleChefs, 
    visibleDishes, 
    filters, 
    setFilters, 
    userLocation,
    isListFullScreen,
    isMapFullScreen,
    setIsMapFullScreen,
    loading
  } = useDiscover();

  const isRoot = location.pathname === "/customer/discover" || location.pathname === "/customer/discover/";

  // Redirect chef or rider to their appropriate workspaces, but let customers in
  useEffect(() => {
    if (!sessionLoading && session) {
      const role = (session.user as any)?.role;
      if (role === "chef") {
        navigate("/dashboard/chef", { replace: true });
      } else if (role === "rider") {
        navigate("/dashboard/rider", { replace: true });
      }
    }
  }, [session, sessionLoading, navigate]);

  if (sessionLoading || loading) {
    return (
      <div className="h-screen w-full bg-dark-deep flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gold/60">
          Gathering private ateliers...
        </p>
      </div>
    );
  }

  const isCheckout = location.pathname.includes("/checkout");

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-dark-deep font-body">
      {/* Background Spatial Layer - Map is mounted at all times! */}
      <div className="absolute inset-0 w-full h-full z-0">
        <DiscoverMap
          restaurants={visibleChefs}
          isFullScreen={isMapFullScreen}
          onExitFullScreen={() => setIsMapFullScreen(false)}
          userLocation={userLocation}
        />
      </div>

      {/* Dim/Blur overlay to prevent visual clashes during drawer navigation */}
      <div 
        className={`absolute inset-0 z-10 transition-all duration-500 pointer-events-none ${
          isRoot 
            ? "bg-transparent backdrop-blur-0" 
            : isCheckout
              ? "bg-dark-deep/85 backdrop-blur-md" // More focused mode shift during payment
              : "bg-dark-deep/50 backdrop-blur-sm" // Subtle translucent layout preservation
        }`}
      />

      {/* Persistent Bottom Sheet - Rendered on Root exploration flow */}
      <div 
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-500 ${
          isRoot ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 select-none pointer-events-none"
        }`}
      >
        <DiscoverBottomSheet
          items={visibleDishes}
          filters={filters}
          onFilterChange={setFilters}
          isFullScreen={isListFullScreen}
        />
      </div>

      {/* Child Overlays Mount Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {isRoot ? (
            <motion.div
              key="discover-root"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full pointer-events-none"
            >
              <Outlet />
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full pointer-events-auto"
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function CustomerDiscoveryShell() {
  const navigate = useNavigate();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  // Unified Route Guard Check
  useEffect(() => {
    if (!sessionLoading && !session) {
      toast.error("Please sign in to access Discover");
      navigate("/auth/login", { replace: true });
    }
  }, [session, sessionLoading, navigate]);

  if (sessionLoading) {
    return (
      <div className="h-screen w-full bg-dark-deep flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gold/60">
          Verifying credentials...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <DiscoverProvider>
      <SpatialShellContainer />
    </DiscoverProvider>
  );
}
