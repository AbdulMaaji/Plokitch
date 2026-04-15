import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import menuSkewers from "@/assets/menu-skewers.jpg";
import menuSushi from "@/assets/menu-sushi.jpg";
import menuFish from "@/assets/menu-fish.jpg";

const menuItems = [
  {
    name: "Beef Skewers",
    price: "$30",
    description: "Delicious beef skewers drizzled with a sweet chili glaze. Perfect for grilling and sharing!",
    image: menuSkewers,
  },
  {
    name: "Sushi California Rolls",
    price: "$12.99",
    description: "Fresh California rolls with crab, avocado, and cucumber wrapped in seasoned rice.",
    image: menuSushi,
  },
  {
    name: "Sea Fish Steak",
    price: "$44",
    description: "Pan-seared fish steak drizzled with sweet chili sauce and fresh vegetables.",
    image: menuFish,
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="Our Special Menu" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Savor Every Meal, Every Moment
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-12">
          Discover our tailored dining services designed to match your day's rhythm. From energizing breakfasts to satisfying lunches and elegant dinners.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-gold/30 transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-heading font-semibold">{item.name}</h3>
                  <span className="text-gold font-heading text-xl font-bold">{item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>
                <a
                  href="#reservation"
                  className="inline-block mt-4 text-sm text-gold font-body font-medium tracking-wide hover:underline"
                >
                  Book A Table →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#menu"
            className="inline-block px-8 py-3 border border-gold text-gold text-sm font-body font-medium tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-300"
          >
            View All Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
