import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const skillCategories = [
  { titleKey: "skills.categories.languages", skills: ["Python", "Java", "C/C++", "EDA"] },
  { titleKey: "skills.categories.deepLearning", skills: ["CNN / ANN / RNN", "TensorFlow", "Transformers", "Fine-Tuning (LoRA, QLoRA)", "Prompt Engineering"] },
  { titleKey: "skills.categories.agenticAI", skills: ["LangChain", "LangGraph", "GraphRAG", "RAFT", "CAG", "BLEU Evaluation"] },
  { titleKey: "skills.categories.infrastructure", skills: ["MySQL", "MongoDB", "Chroma DB", "Astra DB", "AWS", "FastAPI", "Django REST"] },
];

const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t("skills.label")}
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {t("skills.heading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-6 pb-3 border-b border-border">
                {t(cat.titleKey)}
              </h3>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <p key={skill} className="font-body text-[15px] text-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                    {skill}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
