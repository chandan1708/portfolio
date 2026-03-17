import { motion } from "framer-motion";
import { MapPin, Briefcase, Mail, Download, ChevronDown } from "lucide-react";
import profilePhoto from "@/assets/profile-dark.jpeg";

const highlights = [
  "LLMs & Agentic AI",
  "RAG Pipelines",
  "Computer Vision",
  "Deep Learning",
];

const HeroSection = () => {
  return (
    <section className="min-h-[100svh] flex items-center section-padding pt-24 pb-12">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to opportunities
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Chandan R
            </h1>
            <p className="mt-3 text-xl md:text-2xl font-semibold text-primary">
              Generative AI Engineer
            </p>

            {/* Quick info */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Bengaluru, India
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> WordWise Language Labs
              </span>
            </div>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              I build <strong className="text-foreground">agentic AI systems</strong> and{" "}
              <strong className="text-foreground">RAG pipelines</strong> that improve knowledge retrieval 
              accuracy by 35% and eliminate 95% of manual work. Passionate about turning complex 
              AI research into production-ready solutions.
            </p>

            {/* Skill tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:chandan17.ramesh@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-border shadow-xl bg-secondary">
                <img
                  src={profilePhoto}
                  alt="Chandan R - Generative AI Engineer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -z-10 -bottom-3 -right-3 w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-primary/10 border border-primary/20" />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "1+", label: "Years Experience" },
            { value: "35%", label: "Accuracy Boost" },
            { value: "10+", label: "AI/ML Projects" },
            { value: "1st", label: "Hackathon Win" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Learn More</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
