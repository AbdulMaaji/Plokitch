import { Mail, Phone } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-dark-deep border-t border-border/30 pt-20 pb-8">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" className="text-gold">
              <path d="M32 4c-4 8-12 16-12 28a12 12 0 0024 0C44 20 36 12 32 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
              <path d="M28 24c-2 4-4 8-4 14a8 8 0 0016 0c0-6-2-10-4-14" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M32 20c-1 3-3 6-3 11a3 3 0 006 0c0-5-2-8-3-11z" fill="currentColor"/>
            </svg>
            <span className="mt-1 text-sm font-body font-semibold tracking-[0.25em] text-gold uppercase">Monks Crave</span>
          </div>
        </div>

        <div className="border-t border-border/30" />

        <div className="grid md:grid-cols-3 gap-12 py-12">
          {/* Contact */}
          <div className="text-center">
            <h4 className="font-heading text-xl italic mb-4">Contact Us</h4>
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground font-body">
              <a href="mailto:hello@designmonks.co" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail size={14} /> hello@designmonks.co
              </a>
              <a href="tel:+12960849493" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={14} /> +12 960 849493
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="text-center">
            <h4 className="font-heading text-xl italic mb-4">Address</h4>
            <p className="text-sm text-muted-foreground font-body">
              Armstrong, North Nanook<br />
              V4Y, V0E, Canada
            </p>
          </div>

          {/* Hours */}
          <div className="text-center">
            <h4 className="font-heading text-xl italic mb-4">Opening Hours</h4>
            <p className="text-sm text-muted-foreground font-body">
              MON – THU (10:00 AM – 01:00 AM)<br />
              FRI – SUN (11:00 AM – 10:00 PM)
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            2025 ©Design Monks. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Facebook", "LinkedIn", "Instagram", "X"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground hover:border-gold hover:text-gold transition-colors font-body"
              >
                {social[0]}
              </a>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground font-body">
            <a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy & Policies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
