import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[100svh] flex flex-col justify-center section-padding pt-24">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
          >
            Generative AI Engineer — Bengaluru, India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-normal text-foreground leading-[1.05] tracking-tight"
          >
            I build intelligent systems that transform how businesses understand data.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl"
          >
            Specializing in LLMs, Agentic AI, and RAG pipelines. Currently engineering
            AI tools at <span className="text-foreground">WordWise Language Labs</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="mailto:chandan17.ramesh@gmail.com"
              className="inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background font-body text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-secondary transition-colors"
            >
              Download Resume
            </a>
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
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
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
