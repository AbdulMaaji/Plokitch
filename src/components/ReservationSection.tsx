import { useState } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    time: "11:00 PM",
    date: "2024-04-05",
    persons: "4",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reservation submitted! We'll confirm your booking shortly.");
  };

  return (
    <section id="reservation" className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="Book a Table" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Make a Reservation
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-xl mx-auto mb-12">
          Reserve your spot where exceptional food and an unforgettable experience await.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">First Name*</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Last Name*</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Email Address*</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Phone*</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Time*</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="11:00 PM">11:00 PM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Date*</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-body text-muted-foreground mb-1.5">Number of Persons*</label>
            <select
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold transition-colors"
            >
              {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>{n} Persons</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-10 py-3.5 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Book Your Table
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ReservationSection;
