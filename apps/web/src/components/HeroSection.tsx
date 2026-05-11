import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import heroImg1 from "@/assets/images/DSC_1516.jpg";
import heroImg2 from "@/assets/images/DSC_1455.jpg";
import heroImg3 from "@/assets/images/DSC_1512.jpg";

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
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-body font-medium tracking-widest uppercase"
          >
            Now in Gombe, Nigeria
          </motion.span>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading leading-[1.05] tracking-tight">
            Home-Cooked Food,{" "}
            <br className="hidden lg:block"/>
            <span className="italic text-gold">Delivered</span> to Your Door.
          </h1>
          <p className="mt-6 text-muted-foreground font-body text-lg max-w-md leading-relaxed">
            Plokitch connects you with the best home chefs in Gombe. Real kitchens, real recipes, real flavour — delivered fast and reliably every time.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/explore"
              className="px-8 py-3.5 bg-gold text-background text-sm font-body font-black tracking-widest uppercase hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
            >
              Explore Bazaar
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 border border-gold text-gold text-sm font-body font-black tracking-widest uppercase hover:bg-gold/5 transition-all duration-300"
            >
              Browse Dishes
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/auth/register" className="text-muted-foreground hover:text-gold text-xs font-bold uppercase tracking-[0.2em] transition-colors">
              ARE YOU A CHEF? <span className="text-gold underline ml-2">JOIN THE COLLECTIVE</span>
            </Link>
          </div>

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
              src={heroImg1}
              alt="Delicious main dish"
              width={800}
              height={800}
              className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover shadow-2xl absolute top-0 left-1/2 -translate-x-1/2 z-10"
            />
            {/* Bottom left bowl */}
            <img
              src={heroImg3}
              alt="Side dish"
              width={800}
              height={800}
              loading="lazy"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl absolute top-52 md:top-56 -left-4 md:left-0 z-20"
            />
            {/* Right bowl */}
            <img
              src={heroImg2}
              alt="Soup dish"
              width={800}
              height={800}
              loading="lazy"
              className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover shadow-2xl absolute top-36 md:top-40 right-0 md:-right-4 z-0"
            />
            {/* Spacer to maintain layout height so absolute images don't collapse */}
            <div className="h-[420px] md:h-[480px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
