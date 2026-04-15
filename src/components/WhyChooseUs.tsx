import { motion } from "framer-motion";
import { UtensilsCrossed, Armchair, Heart, Leaf } from "lucide-react";
import SectionDivider from "./SectionDivider";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Delicious Food",
    description: "Our dishes are full of fresh, bold flavors that you'll love.",
  },
  {
    icon: Armchair,
    title: "Relaxing",
    description: "Enjoy your meal in a cozy and welcoming space for every occasion.",
  },
  {
    icon: Heart,
    title: "Friendly Service",
    description: "Dedicated to ensuring seamless service always available.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We use the freshest ingredients to make every dish perfect.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="Why Choose Us" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-16">
          We Provide Elegant Service for People
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 mx-auto rounded-full border border-gold/30 flex items-center justify-center mb-5">
                <feature.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
