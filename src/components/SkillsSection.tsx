import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages & Analysis",
    skills: ["Python", "Java", "C/C++", "Exploratory Data Analysis (EDA)"],
  },
  {
    title: "Deep Learning & LLMs",
    skills: ["CNN / ANN / RNN", "TensorFlow", "Transformers", "Fine-Tuning (LoRA, QLoRA)", "Prompt Engineering"],
  },
  {
    title: "Agentic AI & RAG",
    skills: ["LangChain", "LangGraph", "GraphRAG", "RAFT", "CAG", "BLEU Evaluation"],
  },
  {
    title: "Databases & Cloud",
    skills: ["MySQL", "MongoDB", "Chroma DB", "Datastax Astra DB", "AWS (EC2, Bedrock, SageMaker)", "FastAPI", "Django REST"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">Skills</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Technical expertise.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {cat.title}
              </h3>
              <div className="space-y-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="font-body text-muted-foreground text-sm py-2 border-b border-border/50 last:border-0"
                  >
                    {skill}
                  </div>
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
