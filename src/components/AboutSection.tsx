import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 35, suffix: "%", label: "Retrieval Accuracy Boost" },
  { value: 95, suffix: "%", label: "Manual Work Eliminated" },
  { value: 40, suffix: "%", label: "Response Time Improved" },
  { value: 30, suffix: "%", label: "Processing Efficiency Gain" },
];

const AnimatedCounter = ({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? current.toFixed(2) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="accent-dot" />
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                About
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Building AI systems that create{" "}
              <span className="text-accent-gradient">tangible impact</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 text-muted-foreground font-body text-base md:text-[17px] leading-[1.8]"
          >
            <p>
              I'm a Generative AI Engineer based in Bengaluru, currently at WordWise Language Labs
              where I develop agentic AI tools and multi-source data pipelines — improving knowledge 
              retrieval accuracy by 35% and eliminating 95% of manual intervention.
            </p>
            <p>
              With a B.E. in AI & Data Science from VTU, I specialize in LLM fine-tuning
              (LoRA, QLoRA), RAG architectures (GraphRAG, RAFT, CAG), and building scalable solutions
              using LangChain, LangGraph, and AWS.
            </p>
            <p>
              Passionate about computer vision, deep learning, and creating AI systems
              that solve problems — from surveillance intelligence to emergency response.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="rounded-xl border border-border bg-card p-5 text-center card-hover"
            >
              <p className="font-display text-3xl md:text-4xl text-accent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
