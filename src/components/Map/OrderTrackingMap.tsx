import { Bike, ChefHat, MapPin } from "lucide-react";

interface OrderTrackingMapProps {
  className?: string;
  showLabels?: boolean;
}

const OrderTrackingMap = ({ className = "", showLabels = true }: OrderTrackingMapProps) => {
  return (
    <div className={`relative w-full h-full min-h-[500px] ${className}`}>
      {/* Real OpenStreetMap iframe */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=10.2740%2C11.1500%2C10.2940%2C11.1700&layer=mapnik&marker=11.1600%2C10.2840"
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: 'brightness(0.5) contrast(1.2) saturate(0.8) hue-rotate(180deg)' }}
        title="Order Tracking Map"
      />
      
      {/* Gradient Overlays for Dark Mode Aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-dark-deep/20 pointer-events-none" />

      {/* Overlay markers positioned on the map */}
      {/* Kitchen Marker */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/90 rounded-full flex items-center justify-center border-2 border-gold shadow-lg shadow-gold/50 animate-pulse">
            <ChefHat className="text-white" size={20} />
          </div>
          {showLabels && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] bg-gold text-black px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Kitchen</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Rider Marker */}
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/90 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-lg shadow-blue-500/50">
            <Bike className="text-white animate-bounce" size={28} />
          </div>
          {showLabels && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Rider</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Delivery Point Marker */}
      <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/90 rounded-full flex items-center justify-center border-2 border-red-500 shadow-lg shadow-red-500/50">
            <MapPin className="text-white" size={20} />
          </div>
          {showLabels && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Destination</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Decoration Fix */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-dark-deep/40 backdrop-blur-sm pointer-events-none" />
    </div>
  );
};

export default OrderTrackingMap;
