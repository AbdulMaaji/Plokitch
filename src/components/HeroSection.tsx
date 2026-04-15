import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left — Copy */}
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

          <h1 className="text-5xl md:text-7xl font-heading leading-[1.05] tracking-tight">
            Home-Cooked Food,{" "}
            <span className="italic text-gold">Delivered</span>
            <br />
            to Your Door.
          </h1>

          <p className="mt-6 text-muted-foreground font-body text-lg max-w-md leading-relaxed">
            Plokitch connects you with the best home chefs in Gombe. Real kitchens, real recipes,
            real flavour — delivered fast and reliably every time.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
            >
              Order Now <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/40 text-gold font-body text-sm tracking-wider uppercase hover:border-gold transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["A", "M", "F", "K"].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-card border-2 border-background flex items-center justify-center text-xs font-heading font-bold text-gold"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-body">Loved by Gombe food lovers</p>
            </div>
          </div>
        </motion.div>

        {/* Right — Visual stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-md">
            {/* Main card */}
            <div className="relative z-10 bg-card border border-border/60 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body">Your order is on its way</p>
                  <p className="text-sm font-heading font-semibold text-foreground">Arriving in 20 min</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-body bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">
                    On route
                  </span>
                </div>
              </div>

              {/* Dish cards */}
              <div className="space-y-3">
                {[
                  { name: "Jollof Rice & Chicken", chef: "Chef Aisha", price: "₦2,500" },
                  { name: "Masa & Miyan Kuka", chef: "Chef Fatima", price: "₦1,800" },
                  { name: "Tuwo Shinkafa", chef: "Chef Hauwa", price: "₦2,000" },
                ].map((dish, i) => (
                  <motion.div
                    key={dish.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30"
                  >
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{dish.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{dish.chef}</p>
                    </div>
                    <span className="text-gold font-heading font-bold text-sm">{dish.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badge — trust */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-5 -left-6 bg-card border border-gold/20 rounded-xl px-4 py-3 shadow-xl"
            >
              <p className="text-xs text-muted-foreground font-body">Payment secured</p>
              <p className="text-sm font-heading font-semibold text-gold">Until delivery confirmed ✓</p>
            </motion.div>

            {/* Floating badge — rating */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute -top-5 -right-4 bg-card border border-border/40 rounded-xl px-4 py-3 shadow-xl"
            >
              <div className="flex gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-gold text-gold"/>)}
              </div>
              <p className="text-xs font-body text-muted-foreground">Top-rated chefs only</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
