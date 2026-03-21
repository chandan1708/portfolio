import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const experiences = [
  {
    key: "wordwise",
    current: true,
    tech: ["LangChain", "LangGraph", "RAG", "Python", "Agentic AI"],
  },
  {
    key: "exicom",
    current: false,
    tech: ["Python", "PySide6", "PyQt6", "Data Analysis"],
  },
];

const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t("experience.label")}
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {t("experience.heading")}
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => {
            const points = t(`experience.jobs.${exp.key}.points`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={exp.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group rounded-xl border border-border bg-card p-6 md:p-8 card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl text-foreground">
                        {t(`experience.jobs.${exp.key}.company`)}
                      </h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                          {t("experience.current")}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {t(`experience.jobs.${exp.key}.role`)}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground tracking-wide shrink-0">
                    {t(`experience.jobs.${exp.key}.period`)}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {Array.isArray(points) && points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground font-body text-[15px] leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t_) => (
                    <span key={t_} className="px-3 py-1 text-xs font-mono tracking-wide rounded-full border border-border text-muted-foreground group-hover:border-accent/20 transition-colors">
                      {t_}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
