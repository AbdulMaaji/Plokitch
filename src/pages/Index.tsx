import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramGallery from "@/components/InstagramGallery";
import ReservationSection from "@/components/ReservationSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <MenuSection />
      <AboutSection />
      <TestimonialsSection />
      <InstagramGallery />
      <ReservationSection />
      <BlogSection />
      <NewsletterSection />
      <FooterSection />
    </div>
  );
};

export default Index;
