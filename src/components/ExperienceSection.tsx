import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    company: "WordWise Language Labs",
    role: "Generative AI Engineer",
    period: "Sep 2024 — Present",
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
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience</h2>
          <p className="mt-3 text-muted-foreground">Where I've created measurable impact.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border card-hover"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                  </div>
                  <p className="text-sm font-medium text-primary">{exp.role}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
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
