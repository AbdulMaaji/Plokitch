import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import chefImage from "@/assets/chef-plating.jpg";

const stats = [
  { value: "10K", label: "Dishes Served Monthly" },
  { value: "52+", label: "Unique Recipes Curated" },
  { value: "72%", label: "Repeat Customers" },
  { value: "592+", label: "Special Occasions Celebrated" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-2 border-gold/20">
              <img
                src={chefImage}
                alt="Chef plating a dish"
                width={800}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading leading-tight">
              Refined Taste, Exceptional Feel Where Elegance Meets Flavor
            </h2>
            <p className="mt-6 text-muted-foreground font-body leading-relaxed">
              Experience the harmony of refined taste and timeless elegance in every moment. From artfully crafted dishes to a warm, inviting ambiance, we blend flavor and feeling to create a dining experience that lingers after the last bite.
            </p>

            <div className="mt-6">
              <h4 className="font-heading font-semibold text-lg">Opening Hours</h4>
              <p className="text-muted-foreground font-body text-sm mt-1">Mon – Thu (10:00 AM – 01:00 AM)</p>
              <p className="text-muted-foreground font-body text-sm">Fri – Sun (11:00 AM – 10:00 PM)</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <a
                href="#reservation"
                className="px-7 py-3 border border-gold text-gold text-sm font-body font-medium tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-300"
              >
                Book Your Table
              </a>
              <a href="tel:+12960849493" className="flex items-center gap-2 text-gold font-body text-sm hover:underline">
                <Phone size={16} />
                +12 960 849493
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-gold">{stat.value}</div>
              <p className="mt-2 text-sm text-muted-foreground font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
