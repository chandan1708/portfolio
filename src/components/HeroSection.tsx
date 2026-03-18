import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, useCallback } from "react";
import profileNoBg from "@/assets/profile-nobg.png";

const HeroSection = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig);
  const ringRotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);
  return (
    <section className="min-h-[100svh] flex flex-col justify-center section-padding pt-24 relative overflow-hidden">
      {/* Ambient gradient orbs — soft pastel blobs like the reference */}
      <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-56 h-56 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[60%] right-[30%] w-40 h-40 bg-destructive/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">
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

          {/* Right: Profile photo cutout with 3D tilt on hover */}
          <motion.div
            ref={photoRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center cursor-default"
            style={{
              width: 400,
              height: 480,
              perspective: 800,
            }}
          >
            {/* 3D tilting container */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Back decorative ring — reacts slightly to mouse */}
              <motion.svg
                className="absolute pointer-events-none"
                style={{ width: 380, height: 460, top: 10, left: 10, rotateZ: ringRotate }}
                viewBox="0 0 380 460"
                fill="none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <ellipse cx="190" cy="230" rx="170" ry="210" stroke="hsl(var(--accent))" strokeWidth="1.2" opacity="0.25" />
                <ellipse cx="190" cy="230" rx="185" ry="225" stroke="hsl(var(--border))" strokeWidth="0.8" opacity="0.3" />
              </motion.svg>

              {/* Profile cutout — shifts slightly opposite to tilt for parallax depth */}
              <motion.img
                src={profileNoBg}
                alt="Chandan Ramesh — Generative AI Engineer"
                className="relative z-10 h-[420px] xl:h-[460px] w-auto object-contain"
                style={{
                  x: imgX,
                  y: imgY,
                  filter: "drop-shadow(0 8px 24px hsl(0 0% 0% / 0.15))",
                }}
              />

            {/* Front decorative ring — in front of the person */}
            <motion.svg
              className="absolute pointer-events-none z-20"
              style={{ width: 380, height: 460, top: 10, left: 10 }}
              viewBox="0 0 380 460"
              fill="none"
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, delay: 0.7 }}
            >
              {/* Only draw the top arc portion so it appears to wrap in front */}
              <path
                d="M 45 120 A 170 210 0 0 1 335 120"
                stroke="hsl(var(--accent))"
                strokeWidth="1.2"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M 30 100 A 185 225 0 0 1 350 100"
                stroke="hsl(var(--border))"
                strokeWidth="0.8"
                fill="none"
                opacity="0.25"
              />
            </motion.svg>

            {/* Floating small decorative elements */}
            <motion.div
              className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-accent/25 z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-12 left-6 w-2 h-2 rounded-full bg-accent/15 z-20"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute top-1/3 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/15 z-20"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Small cross/plus marks like the reference */}
            <svg className="absolute top-12 left-12 w-4 h-4 pointer-events-none z-20" viewBox="0 0 16 16" fill="none">
              <line x1="8" y1="2" x2="8" y2="14" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.3" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.3" />
            </svg>
            <svg className="absolute bottom-20 right-10 w-3 h-3 pointer-events-none z-20" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke="hsl(var(--accent))" strokeWidth="0.6" opacity="0.25" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="hsl(var(--accent))" strokeWidth="0.6" opacity="0.25" />
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
