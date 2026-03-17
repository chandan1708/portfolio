import { motion } from "framer-motion";
import { GraduationCap, Target, Zap } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "What I Do",
    text: "Build agentic AI tools and multi-source data pipelines that improve knowledge retrieval accuracy by 35% and eliminate 95% of manual intervention.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    text: "B.E. in AI & Data Science from VTU (GPA: 8.05). Strong foundation in machine learning, deep learning, and software engineering.",
  },
  {
    icon: Zap,
    title: "Specializations",
    text: "LLM fine-tuning (LoRA, QLoRA), RAG architectures (GraphRAG, RAFT, CAG), and scalable AI solutions using LangChain, LangGraph & AWS.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            A Generative AI Engineer passionate about building intelligent systems that create real-world impact — from surveillance intelligence to emergency response.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border card-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
