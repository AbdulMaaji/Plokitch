import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import VendorSection from "@/components/VendorSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <WhyUsSection />
      <VendorSection />
      <AboutSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
