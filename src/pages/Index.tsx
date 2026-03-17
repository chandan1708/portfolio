import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="divider" />
      <AboutSection />
      <div className="divider" />
      <ExperienceSection />
      <div className="divider" />
      <ProjectsSection />
      <div className="divider" />
      <SkillsSection />
      <div className="divider" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
