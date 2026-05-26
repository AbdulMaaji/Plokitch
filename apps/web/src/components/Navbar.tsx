import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import logoSvg from "@/assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const links = [
    { label: "Restaurants", href: "/restaurants" },
    { label: "Bazaar", href: "/explore" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  const getDashboardLink = () => {
    if (!session?.user) return "/auth/login";
    const role = session.user.role || "customer";
    if (role === "admin") return "/admin";
    if (role === "chef") return "/dashboard/chef";
    if (role === "rider") return "/dashboard/rider";
    return "/customer/discover";
  };

  const getProfileLink = () => {
    if (!session?.user) return "/auth/login";
    const role = session.user.role || "customer";
    if (role === "admin") return "/admin/settings";
    if (role === "chef") return "/dashboard/chef/settings";
    if (role === "rider") return "/dashboard/rider/settings";
    return "/customer/discover/profile";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoSvg} className="w-10 h-10 object-contain" alt="Plokitch Logo" />
          <span className="text-xl font-heading font-semibold text-gold tracking-wide">Plokitch</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            link.href.startsWith("/#") ? (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <div className="flex items-center gap-6">
               <Link to="/customer/discover" className="text-foreground/80 hover:text-gold transition-colors">
                  <ShoppingBag size={20} />
               </Link>
               <Link to={getProfileLink()} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center overflow-hidden">
                     {session.user.image ? (
                        <img src={session.user.image} className="w-full h-full object-cover" alt="Profile" />
                     ) : (
                        <User size={14} className="text-gold" />
                     )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-gold transition-colors">
                     {session.user.name?.split(' ')[0]}
                  </span>
               </Link>
               <Link
                to={getDashboardLink()}
                className="px-6 py-2.5 bg-gold text-background text-[10px] font-black tracking-widest uppercase hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-[10px] font-black uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors flex items-center gap-2"
              >
                <User size={15} />
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="px-6 py-2.5 bg-gold text-background text-[10px] font-black tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

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
            className="md:hidden bg-dark-deep border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              {session ? (
                 <>
                    <Link
                      to={getProfileLink()}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-black uppercase tracking-widest text-gold flex items-center gap-3"
                    >
                      <User size={18} />
                      Profile Settings
                    </Link>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 bg-gold text-background text-sm font-black tracking-widest uppercase text-center hover:bg-gold-light transition-all duration-300"
                    >
                      Go to Dashboard
                    </Link>
                 </>
              ) : (
                 <>
                    <Link
                      to="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-black uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors flex items-center gap-3"
                    >
                      <User size={18} />
                      Sign In
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 bg-gold text-background text-sm font-black tracking-widest uppercase text-center hover:bg-gold-light transition-all duration-300"
                    >
                      Join the Collective
                    </Link>
                 </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
