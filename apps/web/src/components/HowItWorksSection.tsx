import { motion } from "framer-motion";
import { Search, ShoppingBag, Bike } from "lucide-react";
import SectionDivider from "./SectionDivider";

const steps = [
  {
    icon: <Search size={28} className="text-gold" />,
    step: "01",
    title: "Browse Local Chefs",
    description:
      "Explore verified home chefs near you in Gombe. Filter by cuisine, dish type, or rating — every chef on Plokitch is quality-checked.",
  },
  {
    icon: <ShoppingBag size={28} className="text-gold" />,
    step: "02",
    title: "Place Your Order",
    description:
      "Pick your favourites, place your order securely. Your payment stays protected until delivery is confirmed — no risk, ever.",
  },
  {
    icon: <Bike size={28} className="text-gold" />,
    step: "03",
    title: "Fresh to Your Door",
    description:
      "A dedicated Plokitch rider picks up your food and delivers it fast. Track your order in real time and rate your experience.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="How It Works" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Ordering Is{" "}
          <span className="italic text-gold">Effortless</span>
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-xl mx-auto mb-16">
          Three simple steps between you and the best home-cooked food in Gombe.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group bg-card border border-border/50 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-5xl font-heading font-bold text-gold/8 select-none">
                {step.step}
              </span>

              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Connector arrows — desktop only */}
        <div className="hidden md:flex justify-center items-center gap-0 mt-6 max-w-5xl mx-auto">
          <div className="flex-1" />
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-0 flex-1 justify-center">
              <svg width="48" height="16" viewBox="0 0 48 16" fill="none" className="text-gold/20">
                <path d="M0 8h40M34 2l8 6-8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
          <div className="flex-1" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
