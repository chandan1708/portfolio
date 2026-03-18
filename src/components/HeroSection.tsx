import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

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

          {/* Right: Profile photo with decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-[420px] h-[480px] xl:w-[460px] xl:h-[520px]"
          >
            {/* Decorative organic ring */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 460 520"
              fill="none"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <ellipse
                cx="230"
                cy="260"
                rx="200"
                ry="230"
                stroke="hsl(var(--accent))"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                opacity="0.3"
              />
              <ellipse
                cx="230"
                cy="260"
                rx="215"
                ry="245"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.4"
              />
            </motion.svg>

            {/* Floating accent dots */}
            <motion.div
              className="absolute top-8 right-12 w-3 h-3 rounded-full bg-accent/30"
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 left-8 w-2 h-2 rounded-full bg-accent/20"
              animate={{ y: [0, 6, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute top-24 left-4 w-1.5 h-1.5 rounded-full bg-muted-foreground/20"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Soft glow behind */}
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl scale-75 pointer-events-none" />

            {/* Profile photo — large, rounded-2xl, not circular */}
            <div className="relative w-72 h-[380px] xl:w-80 xl:h-[420px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/30">
              <img
                src={profilePhoto}
                alt="Chandan Ramesh — Generative AI Engineer"
                className="w-full h-full object-cover object-top"
              />
              {/* Bottom gradient fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
              {/* Subtle inset ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
            </div>

            {/* Decorative corner lines */}
            <svg className="absolute -top-2 -right-2 w-16 h-16 pointer-events-none" viewBox="0 0 64 64" fill="none">
              <path d="M64 0 L64 24" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
              <path d="M64 0 L40 0" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
            </svg>
            <svg className="absolute -bottom-2 -left-2 w-16 h-16 pointer-events-none" viewBox="0 0 64 64" fill="none">
              <path d="M0 64 L0 40" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
              <path d="M0 64 L24 64" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
            </svg>
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
