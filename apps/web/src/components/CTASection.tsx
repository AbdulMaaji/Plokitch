import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="order" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-deep pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, hsl(var(--gold)) 0%, transparent 60%)`
        }}
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border/40 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading mb-6"
          >
            Hungry? <span className="italic text-gold">Let's Fix That.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-10"
          >
            Discover Gombe's best home food vendors today. Quality ingredients, authentic recipes, and fast delivery to your door.
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/explore"
              className="w-full sm:w-auto px-10 py-4 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-all duration-300 shadow-xl shadow-gold/10"
            >
              Start Your Journey
            </Link>
            
            <span className="text-muted-foreground font-body text-sm mx-2">OR</span>
            
            <Link
              to="/auth/register"
              className="w-full sm:w-auto px-10 py-4 border border-gold/40 text-gold font-body text-sm tracking-wider uppercase hover:border-gold transition-all duration-300"
            >
              Join as a Chef
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
