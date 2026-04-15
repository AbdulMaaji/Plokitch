import { useState } from "react";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${newsletterBg})` }}
    >
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-heading">Weekly Newsletter</h2>
        <p className="mt-4 text-muted-foreground font-body max-w-md mx-auto">
          Subscribe to receive the latest news, announcements, and special offers.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); setEmail(""); }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
