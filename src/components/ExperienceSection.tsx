import { motion } from "framer-motion";

const experiences = [
  {
    company: "WordWise Language Labs",
    role: "Generative AI Engineer",
    period: "Sep 2024 — Present",
    current: true,
    points: [
      "Developed core algorithm for Wordsworth product integrating multi-source data pipelines with agentic AI tools",
      "Achieved 35% improvement in knowledge retrieval accuracy and 95% elimination of manual intervention",
      "Enhanced multilingual content intelligence through scalable agent-driven frameworks",
    ],
    tech: ["LangChain", "LangGraph", "RAG", "Python", "Agentic AI"],
  },
  {
    company: "Exicom Energy-Systems",
    role: "R&D Intern",
    period: "Nov 2023 — Apr 2024",
    current: false,
    points: [
      "Developed automated Python scripts boosting data processing efficiency by 30%",
      "Reduced processing time by 25% through optimized data pipelines",
      "Designed embedded dashboard using PySide6, reducing manual effort by 50%",
    ],
    tech: ["Python", "PySide6", "PyQt6", "Data Analysis"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Experience
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Where I've made impact.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group rounded-xl border border-border bg-card p-6 md:p-8 card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl text-foreground">
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1">{exp.role}</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground tracking-wide shrink-0">
                  {exp.period}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-muted-foreground font-body text-[15px] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono tracking-wide rounded-full border border-border text-muted-foreground group-hover:border-accent/20 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
