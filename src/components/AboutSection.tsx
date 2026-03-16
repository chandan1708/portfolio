import { motion } from "framer-motion";

const stats = [
  { label: "AI/ML Projects", value: "10+" },
  { label: "Hackathon Wins", value: "1st" },
  { label: "Efficiency Gains", value: "40%" },
  { label: "GPA", value: "8.05" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">About</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Building intelligent systems that solve real-world problems.
          </h2>
          <div className="space-y-5 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              I'm a Generative AI Engineer based in Bengaluru, India, currently working at WordWise Language Labs
              where I develop agentic AI tools and multi-source data pipelines that have improved knowledge 
              retrieval accuracy by 35% and eliminated 95% of manual intervention.
            </p>
            <p>
              With a B.E. in Artificial Intelligence and Data Science from VTU, I specialize in LLM fine-tuning
              (LoRA, QLoRA), RAG techniques (GraphRAG, RAFT, CAG), and building scalable AI solutions using 
              LangChain, LangGraph, and cloud platforms like AWS.
            </p>
            <p>
              I'm passionate about computer vision, deep learning, and building AI systems that create 
              tangible impact — from surveillance intelligence to emergency response optimization.
            </p>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 border-t-2 border-primary/20">
              <p className="font-display text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
