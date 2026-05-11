import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="About Plokitch" />
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-8">
          {/* Left — Mission / Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading leading-tight">
              Championing Gombe's{" "}
              <span className="italic text-gold">Home Culinary Culture</span>
            </h2>
            <p className="mt-6 text-muted-foreground font-body leading-relaxed">
              Plokitch was born from a simple observation: some of the best food in Gombe doesn't come from a restaurant. It comes from the kitchens of passionate home chefs who cook with generational recipes and unparalleled care. 
            </p>
            <p className="mt-4 text-muted-foreground font-body leading-relaxed">
              But finding these chefs, placing an order, and getting it delivered has always been complicated. We aim to fix that.
            </p>
            <p className="mt-4 text-muted-foreground font-body leading-relaxed">
              We are building a platform that empowers home vendors to turn their passion into a thriving business, while giving you effortless access to authentic, home-cooked meals. No more asking around for a chef's number — the best of Gombe is now just a tap away.
            </p>

            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="text-lg font-heading italic text-foreground/90">
                "Real kitchens. Real recipes. Real flavour."
              </p>
              <p className="mt-2 text-sm text-muted-foreground font-body">The Plokitch Promise</p>
            </blockquote>
          </motion.div>

           {/* Right — Visual (Instead of internal strategy list, use a lifestyle/food image or abstract UI) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Visual representation of connection */}
            <div className="bg-card border border-border/60 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
               <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-background/50" />
               <div className="relative z-10 flex flex-col items-center gap-6">
                 {/* Connecting nodes */}
                 <div className="flex gap-16 items-center">
                    <div className="w-20 h-20 rounded-full border-2 border-gold/30 bg-card flex flex-col items-center justify-center shadow-lg relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400 mb-1">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span className="text-[10px] font-body uppercase text-muted-foreground tracking-wider">Chef</span>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-border/50 bg-background/50 flex flex-col items-center justify-center relative">
                        <span className="absolute w-28 h-px bg-border/50 -left-14 top-1/2 -z-10" />
                        <span className="absolute w-28 h-px bg-border/50 -right-14 top-1/2 -z-10" />
                        <span className="text-gold font-heading font-semibold text-xl">P</span>
                    </div>
                    <div className="w-20 h-20 rounded-full border-2 border-gold/30 bg-card flex flex-col items-center justify-center shadow-lg relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pink-400 mb-1">
                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="text-[10px] font-body uppercase text-muted-foreground tracking-wider">You</span>
                    </div>
                 </div>
                 
                 <p className="mt-8 text-sm text-center font-body text-muted-foreground max-w-xs">Connecting the community through the love of great food.</p>
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
