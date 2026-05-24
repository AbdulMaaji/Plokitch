import { motion } from "framer-motion";
import { User, Maximize2, Minimize2, Navigation2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDiscover } from "@/context/DiscoverContext";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const Discover = () => {
  const navigate = useNavigate();
  
  // Connect cleanly to our spatial operating environment context
  const {
    locationLabel,
    locationLoading,
    handleGetCurrentLocation,
    isMapFullScreen,
    setIsMapFullScreen,
    isListFullScreen
  } = useDiscover();


  return (
    <div className="relative h-full w-full pointer-events-none">
      {/* Floating Translucent Luxury Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-40 px-5 pt-12 pb-4 pointer-events-none"
      >
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Geolocation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGetCurrentLocation}
              className="flex items-center gap-2.5 px-3 py-2 rounded-2xl glass border border-gold/10 hover:border-gold/30 shadow-soft transition-all active:scale-95 group text-left text-white bg-dark-deep/60 backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center group-hover:bg-gold-light text-background transition-colors">
                {locationLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-background" />
                ) : (
                  <Navigation2 className="w-4 h-4 text-background stroke-[2.5]" />
                )}
              </div>
              <div>
                <p className="text-[9px] font-black text-gold uppercase leading-none mb-0.5 tracking-wider">Your Location</p>
                <h1 className="text-xs font-black truncate max-w-[120px]">
                  {locationLabel}
                </h1>
              </div>
            </button>
          </div>

          {/* Quick Dashboard Action Bubbles */}
          <div className="flex items-center gap-2">
            {/* View Fullscreen Toggle */}
            <button
              onClick={() => {
                setIsMapFullScreen(!isMapFullScreen);
              }}
              className="p-3.5 rounded-full glass border border-gold/10 hover:border-gold/30 text-gold shadow-soft active:scale-95 transition-all bg-dark-deep/60 backdrop-blur-md"
            >
              {isMapFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => navigate("/customer/discover/profile")}
              className="p-3.5 rounded-full glass border border-gold/10 hover:border-gold/30 text-gold shadow-soft active:scale-95 transition-all bg-dark-deep/60 backdrop-blur-md"
            >
              <User className="w-4 h-4" />
            </button>


          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Discover;
