import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Chefs", href: "#for-chefs" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5">
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none" className="text-gold">
            <path d="M32 8C24 8 16 16 16 28c0 10 8 20 16 24 8-4 16-14 16-24C48 16 40 8 32 8z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M22 36c4-4 6-10 10-12 4 2 6 8 10 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="32" cy="28" r="4" fill="currentColor"/>
          </svg>
          <span className="text-xl font-heading font-semibold text-gold tracking-wide">Plokitch</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-body text-foreground/80 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#order"
          className="hidden md:inline-block px-6 py-2.5 bg-gold text-background text-sm font-body font-semibold tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
        >
          Order Now
        </a>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-gold transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-2.5 bg-gold text-background text-sm font-body font-semibold tracking-wider uppercase text-center hover:bg-gold-light transition-all duration-300"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
