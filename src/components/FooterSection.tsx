import { Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-dark-deep border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" className="text-gold">
              <path d="M32 8C24 8 16 16 16 28c0 10 8 20 16 24 8-4 16-14 16-24C48 16 40 8 32 8z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
              <path d="M22 36c4-4 6-10 10-12 4 2 6 8 10 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <circle cx="32" cy="28" r="4" fill="currentColor"/>
            </svg>
            <span className="mt-2 text-base font-heading font-semibold tracking-wider text-gold">Plokitch</span>
            <p className="mt-1 text-xs text-muted-foreground font-body">Gombe, Nigeria</p>
          </div>
        </div>

        <div className="border-t border-border/30" />

        <div className="grid md:grid-cols-3 gap-10 py-10">
          {/* About */}
          <div className="text-center">
            <h4 className="font-heading text-lg italic mb-3">About Plokitch</h4>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm mx-auto">
              Connecting Gombe's finest home chefs with food lovers. Real home cooking, delivered fast and securely.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-heading text-lg italic mb-3">Explore</h4>
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground font-body">
              {[
                { label: "Home", href: "#hero" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Why Plokitch", href: "#why-us" },
                { label: "For Chefs", href: "#for-chefs" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="hover:text-gold transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="font-heading text-lg italic mb-3">Contact</h4>
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground font-body">
              <a
                href="mailto:hello@plokitch.com"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail size={14} /> hello@plokitch.com
              </a>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-xs uppercase tracking-widest">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-xs uppercase tracking-widest">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} Plokitch. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground font-body">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
