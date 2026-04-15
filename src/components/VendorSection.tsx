import { motion } from "framer-motion";
import { TrendingUp, Store, Wallet, Users } from "lucide-react";
import SectionDivider from "./SectionDivider";

const perks = [
  {
    icon: <Store size={22} className="text-gold" />,
    title: "Your Own Storefront",
    description: "Get a dedicated profile page on Plokitch where customers discover, browse, and order from you directly.",
  },
  {
    icon: <Users size={22} className="text-gold" />,
    title: "More Customers, Consistently",
    description: "We actively promote your food to hungry customers in Gombe — so you get steady orders, not just word-of-mouth.",
  },
  {
    icon: <Wallet size={22} className="text-gold" />,
    title: "Get Paid Instantly",
    description: "Earnings land in your Plokitch wallet the moment an order is confirmed. Withdraw whenever you want.",
  },
  {
    icon: <TrendingUp size={22} className="text-gold" />,
    title: "Grow on Your Terms",
    description: "No upfront costs. You only share revenue after you earn — we grow when you grow. Simple as that.",
  },
];

const VendorSection = () => {
  return (
    <section id="for-chefs" className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="For Home Chefs" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Turn Your Kitchen Into{" "}
          <span className="italic text-gold">A Business</span>
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-16">
          Plokitch gives home chefs in Gombe everything they need to reach more customers,
          manage orders, and earn reliably — without the stress.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left perks */}
          <div className="space-y-6">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Chef card visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card border border-border/60 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-gold font-heading font-bold text-2xl">
                  A
                </div>
                <div>
                  <p className="font-heading font-semibold text-lg">Chef Aisha</p>
                  <p className="text-sm text-muted-foreground font-body">Gombe, Nigeria</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs font-body bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">Today's earnings</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-heading font-bold text-gold">₦18,400</span>
                  <span className="text-emerald-400 text-sm font-body mb-1">+23% vs yesterday</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { dish: "Jollof Rice × 4", status: "Delivered", color: "text-emerald-400" },
                  { dish: "Masa × 2", status: "In progress", color: "text-amber-400" },
                  { dish: "Tuwo Shinkafa × 3", status: "New order", color: "text-gold" },
                ].map((order) => (
                  <div
                    key={order.dish}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/20"
                  >
                    <span className="text-sm font-body text-foreground/80">{order.dish}</span>
                    <span className={`text-xs font-body font-medium ${order.color}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gold/3 blur-2xl -z-10 scale-110" />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#join"
            className="inline-block px-10 py-4 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
          >
            Join as a Chef →
          </a>
          <p className="mt-3 text-xs text-muted-foreground font-body">No setup fees. Start accepting orders right away.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default VendorSection;
