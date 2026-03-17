import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="divider" />
      <AboutSection />
      <ExperienceSection />
      <div className="divider" />
      <ProjectsSection />
      <SkillsSection />
      <div className="divider" />
      <EducationSection />
      <div className="divider" />
      <PublicationsSection />
      <div className="divider" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
