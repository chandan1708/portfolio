import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "AI/ML Projects" },
  { value: "35%", label: "Accuracy Improvement" },
  { value: "1st", label: "Hackathon Finish" },
  { value: "8.05", label: "GPA" },
];

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
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              About
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Building AI systems that create tangible impact.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl md:text-5xl text-foreground">{stat.value}</p>
              <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
