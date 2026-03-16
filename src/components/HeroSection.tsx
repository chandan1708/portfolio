import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import profileLight from "@/assets/profile-light.jpeg";
import profileDark from "@/assets/profile-dark.jpeg";

const HeroSection = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen flex items-center section-padding pt-32">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="max-w-2xl flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-primary font-medium tracking-wide text-sm mb-4">
                Generative AI Engineer
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95]"
            >
              Hi, I'm{" "}
              <span className="text-gradient">Chandan R</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl"
            >
              I build intelligent systems with LLMs, Agentic AI, and RAG pipelines
              that transform how businesses process and understand data. Currently at{" "}
              <span className="text-foreground font-medium">WordWise Language Labs</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:chandan17.ramesh@gmail.com", label: "Email" },
                { icon: FileText, href: "#", label: "Resume" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200 text-sm font-body"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16"
            >
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                Scroll to explore
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </motion.div>
          </div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl group-hover:bg-primary/15 transition-colors duration-500" />
              
              {/* Main photo container */}
              <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
                <img
                  src={profilePhoto}
                  alt="Chandan R - Generative AI Engineer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-3xl border border-primary/15 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
