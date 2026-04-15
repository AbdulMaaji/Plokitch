import { motion } from "framer-motion";
import { Star } from "lucide-react";
import heroBowl1 from "@/assets/hero-bowl-1.jpg";
import heroBowl2 from "@/assets/hero-bowl-2.jpg";
import heroBowl3 from "@/assets/hero-bowl-3.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading leading-[1.05] tracking-tight">
            Where{" "}
            <span className="italic text-gold">Cravings</span>
            <br />
            Meet Their{" "}
            <span className="italic text-gold">Perfect</span>
            <br />
            Match
          </h1>
          <p className="mt-6 text-muted-foreground font-body text-lg max-w-md leading-relaxed">
            Discover bold flavors and unforgettable dishes in a place where every craving is satisfied with the perfect bite, crafted just for you.
          </p>
          <a
            href="#reservation"
            className="inline-block mt-8 px-8 py-3.5 border border-gold text-gold text-sm font-body font-medium tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-300"
          >
            Book Your Table
          </a>

          {/* Rating */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-3xl font-heading font-bold text-foreground">4.8/5</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
              <Star size={18} className="text-gold" />
            </div>
            <span className="text-sm text-muted-foreground font-body">Average Rating</span>
          </div>
        </motion.div>

        {/* Right - Food Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-lg">
            {/* Main large bowl */}
            <img
              src={heroBowl1}
              alt="Ramen bowl"
              width={800}
              height={800}
              className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover shadow-2xl absolute top-0 left-1/2 -translate-x-1/2 z-10"
            />
            {/* Bottom left bowl */}
            <img
              src={heroBowl3}
              alt="Seafood bowl"
              width={800}
              height={800}
              loading="lazy"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl absolute top-52 md:top-56 -left-4 md:left-0 z-20"
            />
            {/* Right bowl */}
            <img
              src={heroBowl2}
              alt="Miso soup"
              width={800}
              height={800}
              loading="lazy"
              className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover shadow-2xl absolute top-36 md:top-40 right-0 md:-right-4 z-0"
            />
            {/* Spacer for layout */}
            <div className="h-[420px] md:h-[480px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
