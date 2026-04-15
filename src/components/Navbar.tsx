import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Contact", href: "#reservation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex flex-col items-center gap-0">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-gold">
            <path d="M32 4c-4 8-12 16-12 28a12 12 0 0024 0C44 20 36 12 32 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M28 24c-2 4-4 8-4 14a8 8 0 0016 0c0-6-2-10-4-14" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M32 20c-1 3-3 6-3 11a3 3 0 006 0c0-5-2-8-3-11z" fill="currentColor"/>
          </svg>
          <span className="text-xs font-body font-semibold tracking-[0.25em] text-gold uppercase">Monks Crave</span>
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
          href="#menu"
          className="hidden md:inline-block px-6 py-2.5 border border-gold text-gold text-sm font-body font-medium tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-300"
        >
          View Menu
        </a>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                href="#menu"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-2.5 border border-gold text-gold text-sm font-body font-medium tracking-wider uppercase text-center hover:bg-gold hover:text-background transition-all duration-300"
              >
                View Menu
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
