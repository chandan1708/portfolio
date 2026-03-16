import { motion } from "framer-motion";

const experiences = [
  {
    company: "WordWise Language Labs",
    role: "Generative AI Engineer",
    period: "Sep 2024 — Present",
    description:
      "Developed the core algorithm for the Wordsworth product by integrating multi-source data pipelines with agentic AI tools, achieving 35% improvement in knowledge retrieval accuracy and 95% elimination of manual intervention. Enhanced multilingual content intelligence through scalable agent-driven frameworks.",
    tech: ["LangChain", "LangGraph", "RAG", "Python", "Agentic AI"],
  },
  {
    company: "Exicom Energy-Systems Limited",
    role: "Research & Development Intern",
    period: "Nov 2023 — Apr 2024",
    description:
      "Developed automated Python scripts boosting data processing efficiency by 30% and reducing processing time by 25%. Designed an embedded dashboard using PySide6 and PyQt6, improving analysis efficiency over LabView and reducing manual effort by 50%.",
    tech: ["Python", "PySide6", "PyQt6", "Data Analysis", "Automation"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">Experience</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Where I've made impact.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 border-b border-border last:border-0"
            >
              <div>
                <p className="font-display text-sm text-muted-foreground">{exp.period}</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {exp.company}
                </h3>
                <p className="text-primary font-body text-sm font-medium mb-4">{exp.role}</p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-body font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
