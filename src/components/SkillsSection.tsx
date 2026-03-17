import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C/C++", "EDA"],
  },
  {
    title: "Deep Learning",
    skills: ["CNN / ANN / RNN", "TensorFlow", "Transformers", "Fine-Tuning (LoRA, QLoRA)", "Prompt Engineering"],
  },
  {
    title: "Agentic AI & RAG",
    skills: ["LangChain", "LangGraph", "GraphRAG", "RAFT", "CAG", "BLEU Evaluation"],
  },
  {
    title: "Infrastructure",
    skills: ["MySQL", "MongoDB", "Chroma DB", "Astra DB", "AWS", "FastAPI", "Django REST"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
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
              Skills
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Technical expertise.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-6 pb-3 border-b border-border">
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <p
                    key={skill}
                    className="font-body text-[15px] text-foreground flex items-center gap-2"
                  >
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
