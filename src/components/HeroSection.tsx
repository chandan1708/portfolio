import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[100svh] flex flex-col justify-center section-padding pt-24 relative overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="max-w-3xl lg:flex-1">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
            >
              <span className="accent-dot animate-pulse" />
              <span className="font-mono text-xs tracking-wide text-accent">
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
            >
              Generative AI Engineer — Bengaluru, India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-normal text-foreground leading-[1.05] tracking-tight"
            >
              I build intelligent systems that{" "}
              <span className="text-accent-gradient">transform</span> how businesses
              understand data.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl"
            >
              Specializing in LLMs, Agentic AI, and RAG pipelines. Currently engineering
              AI tools at <span className="text-foreground font-medium">WordWise Language Labs</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="mailto:chandan17.ramesh@gmail.com"
                className="group inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background font-body text-sm font-medium hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
              >
                Get in touch
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            {/* Glow ring behind photo */}
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl scale-110 pointer-events-none" />
            <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden ring-2 ring-border/50 shadow-lg">
              <img
                src={profilePhoto}
                alt="Chandan Ramesh — Generative AI Engineer"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for polish */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/5" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24"
        >
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
          >
            Scroll
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
