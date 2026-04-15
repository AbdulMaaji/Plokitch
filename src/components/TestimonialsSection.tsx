import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionDivider from "./SectionDivider";

const testimonials = [
  {
    text: "I absolutely loved the avocado toast with a poached egg! The quality of the ingredients and the attention to detail in the preparation made it a standout dish. I'm looking forward to my next visit!",
    name: "Jessier Robak",
    role: "Food Enthusiast",
  },
  {
    text: "The food was absolutely delicious, and the service was excellent! The ambiance was perfect, and everything was fresh. Highly recommend this restaurant for a great dining experience!",
    name: "Alonso D. Dowson",
    role: "Food Enthusiast",
  },
  {
    text: "Amazing food, friendly staff, and a cozy atmosphere! Everything was fresh, flavorful, and beautifully presented. Definitely one of the best dining experiences I've had—highly recommend!",
    name: "Kristin Watson",
    role: "Food Enthusiast",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="Testimonials" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-16">
          Our Diners Are Saying
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <Quote size={40} className="text-gold/40 mx-auto mb-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg md:text-xl font-body leading-relaxed text-foreground/90 italic">
                "{testimonials[current].text}"
              </p>
              <div className="mt-8">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold font-heading font-bold text-lg">
                  {testimonials[current].name[0]}
                </div>
                <p className="mt-3 font-heading font-semibold text-lg">{testimonials[current].name}</p>
                <p className="text-sm text-muted-foreground font-body">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-gold" : "bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
