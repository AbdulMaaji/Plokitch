import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, Star, Users, Award } from "lucide-react";
import SectionDivider from "./SectionDivider";

const features = [
  {
    icon: <ShieldCheck size={24} className="text-gold" />,
    title: "Payment Protected",
    description:
      "Your money stays secure until you confirm delivery. No surprises, no lost payments — ever.",
  },
  {
    icon: <Zap size={24} className="text-gold" />,
    title: "Fast Delivery",
    description:
      "Dedicated riders pick up your food the moment it's ready. Hot meals delivered quickly, every time.",
  },
  {
    icon: <Heart size={24} className="text-gold" />,
    title: "Real Home Cooking",
    description:
      "Every chef on Plokitch cooks with care. Not a restaurant chain — genuine, handcrafted home meals.",
  },
  {
    icon: <Star size={24} className="text-gold" />,
    title: "Quality-Verified Chefs",
    description:
      "Only the best home chefs make it onto Plokitch. Each one is reviewed, rated, and held to our standard.",
  },
  {
    icon: <Users size={24} className="text-gold" />,
    title: "Your Community",
    description:
      "Support local home chefs in Gombe. Every order directly helps a family-run kitchen grow.",
  },
  {
    icon: <Award size={24} className="text-gold" />,
    title: "Loyalty Rewards",
    description:
      "Every order earns you points. Redeem for discounts, free deliveries, and exclusive chef access.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-dark-surface/30">
      <div className="container mx-auto px-6">
        <SectionDivider label="Why Plokitch" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Food Delivery That Actually{" "}
          <span className="italic text-gold">Cares</span>
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-16">
          We built Plokitch for Gombe — not imported from somewhere else and dropped here.
          Every feature is designed for how you eat and how our chefs cook.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-card border border-border/50 rounded-xl p-6 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
