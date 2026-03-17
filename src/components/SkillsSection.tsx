import { motion } from "framer-motion";
import { Code2, Brain, Workflow, Server } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Python", "Java", "C/C++", "EDA"],
  },
  {
    icon: Brain,
    title: "Deep Learning",
    skills: ["CNN / ANN / RNN", "TensorFlow", "Transformers", "Fine-Tuning (LoRA, QLoRA)", "Prompt Engineering"],
  },
  {
    icon: Workflow,
    title: "Agentic AI & RAG",
    skills: ["LangChain", "LangGraph", "GraphRAG", "RAFT", "CAG", "BLEU Evaluation"],
  },
  {
    icon: Server,
    title: "Infrastructure",
    skills: ["MySQL", "MongoDB", "Chroma DB", "Astra DB", "AWS", "FastAPI", "Django REST"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Technical Skills</h2>
          <p className="mt-3 text-muted-foreground">Core technologies and frameworks I work with.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 rounded-xl bg-card border border-border card-hover"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <cat.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                  >
                    {skill}
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

export default SkillsSection;
