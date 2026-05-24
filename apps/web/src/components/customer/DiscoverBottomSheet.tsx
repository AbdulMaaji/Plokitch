import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { GripHorizontal, Star } from "lucide-react";
import DiscoverFoodCard, { FoodItem } from "./DiscoverFoodCard";
import { useDiscover } from "@/context/DiscoverContext";

export interface FilterState {
  category: string; // 'All', 'mains', 'sides', etc.
  topRated: boolean;
}

interface DiscoverBottomSheetProps {
  items: FoodItem[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isFullScreen?: boolean;
}

const CATEGORIES = ["All", "mains", "sides", "starters", "desserts", "specials"];

const DiscoverBottomSheet = ({ items, filters, onFilterChange, isFullScreen = false }: DiscoverBottomSheetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  const { breakpoint, isMobile, isTablet, isDesktop } = useDiscover();

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    const offsetLimit = 50;
    const velocityLimit = 500;

    const shouldExpand = info.offset.y < -offsetLimit || info.velocity.y < -velocityLimit;
    const shouldCollapse = info.offset.y > offsetLimit || info.velocity.y > velocityLimit;

    if (shouldExpand) {
      setIsExpanded(true);
    } else if (shouldCollapse) {
      setIsExpanded(false);
    }
  };

  // Reset offset on state toggle
  useEffect(() => {
    y.set(0);
  }, [isExpanded, isFullScreen, y]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{
        // Full screen goes to top. Standard is expanded to 12% or collapsed peak to 60%
        y: isFullScreen ? 0 : isExpanded ? "12%" : "60%",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag={isFullScreen ? false : "y"}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      style={{ y }}
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0E171E] border-t border-gold/20 shadow-elevated touch-none flex flex-col pointer-events-auto w-full ${
        isFullScreen ? "h-[100vh] rounded-none border-t-0" : "h-[90vh] rounded-t-[2.5rem]"
      }`}
    >
      {/* Pull Drag Indicator Bar - Hidden in Fullscreen */}
      {!isFullScreen && (
        <div
          className="flex justify-center pt-3.5 pb-2.5 cursor-grab active:cursor-grabbing flex-shrink-0"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="w-14 h-1.5 rounded-full bg-gold/20 hover:bg-gold/40 transition-colors" />
        </div>
      )}

      {/* Spacer header offset in Fullscreen */}
      {isFullScreen && <div className="h-20 flex-shrink-0" />}

      {/* Header controls */}
      <div className="px-6 pb-4 flex-shrink-0 space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-black text-white lowercase">
              discover <span className="italic text-gold italic-custom">artisan</span> dishes
            </h2>
            <p className="text-xs uppercase tracking-widest font-black text-gold/60 mt-0.5">
              {items.length} recipe{items.length !== 1 ? "s" : ""} active nearby
            </p>
          </div>
          {!isFullScreen && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2.5 rounded-full bg-dark-surface border border-gold/10 hover:border-gold/30 transition-all text-gold active:scale-95 shadow-soft"
            >
              <GripHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Scroller & Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-0.5 scrollbar-none flex-nowrap">
          {/* Top Rated Badge Trigger */}
          <motion.button
            onClick={() => onFilterChange({ ...filters, topRated: !filters.topRated })}
            className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border transition-all ${
              filters.topRated
                ? "bg-gold border-gold text-background shadow-md shadow-gold/20"
                : "bg-dark-surface/50 border-gold/10 text-gold/60 hover:text-gold"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <Star className={`w-3.5 h-3.5 ${filters.topRated ? "fill-background" : ""}`} />
            Top Rated {">= 4.8"}
          </motion.button>

          {/* Dynamic Category Badges */}
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => onFilterChange({ ...filters, category: cat })}
                className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                  isSelected
                    ? "text-background border-transparent"
                    : "bg-dark-surface/50 border-gold/10 text-gold/60 hover:text-gold"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterCategory"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 ${isSelected ? "text-background" : ""}`}>
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Dishes Feed Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-4 touch-pan-y scroll-smooth">
        {items.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              No matching artisan recipes found
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
              Try adjusting your category selection or clearing filters to locate active local home ateliers.
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <DiscoverFoodCard
              key={item.id}
              item={item}
              index={index}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default DiscoverBottomSheet;
