import img1 from "@/assets/images/DSC_1460.jpg";
import img2 from "@/assets/images/DSC_1462.jpg";
import img3 from "@/assets/images/DSC_1466.jpg";
import img4 from "@/assets/images/DSC_1469.jpg";
import img5 from "@/assets/images/DSC_1470.jpg";
import img6 from "@/assets/images/DSC_1478.jpg";
import img7 from "@/assets/images/DSC_1482.jpg";

const FoodGallerySection = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <section className="py-24 overflow-hidden border-t border-border/30">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">
          Fresh from <span className="italic text-gold">Our Chefs</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-xl mx-auto">
          A glimpse into the stunning meals prepared daily by Gombe's finest home kitchens.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-0 whitespace-nowrap py-4">
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="relative w-64 md:w-80 h-64 md:h-80 mx-0 overflow-hidden shrink-0 group-hover:pause"
            >
              <img
                src={img}
                alt={`Delicious food ${i}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-body font-medium tracking-wide">Plokitch Local</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless infinite scrolling */}
        <div className="animate-marquee flex gap-0 whitespace-nowrap py-4 absolute top-0">
          {[...images, ...images].map((img, i) => (
            <div
              key={`dup-${i}`}
              className="relative w-64 md:w-80 h-64 md:h-80 mx-0 overflow-hidden shrink-0 group-hover:pause"
            >
              <img
                src={img}
                alt={`Delicious food ${i}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-body font-medium tracking-wide">Plokitch Local</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodGallerySection;
