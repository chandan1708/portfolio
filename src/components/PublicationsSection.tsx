import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Mic } from "lucide-react";

const publications = [
  {
    type: "paper",
    title: "Real-time Surveillance Intelligence Using Deep Learning",
    venue: "IEEE Conference / Preprint",
    year: "2024",
    description: "Proposed a multi-modal deep learning framework for automated phone usage detection and waste monitoring in institutional settings.",
    link: "#",
  },
  {
    type: "blog",
    title: "Building Production-Grade RAG Pipelines",
    venue: "Technical Blog",
    year: "2024",
    description: "A comprehensive guide to designing scalable RAG architectures using GraphRAG, RAFT, and CAG methodologies with real-world benchmarks.",
    link: "#",
  },
  {
    type: "talk",
    title: "From LoRA to Production: Fine-Tuning LLMs at Scale",
    venue: "AI Community Talk",
    year: "2024",
    description: "Shared practical insights on efficient LLM fine-tuning techniques and deployment strategies for resource-constrained environments.",
    link: "#",
  },
];

const iconMap = {
  paper: FileText,
  blog: FileText,
  talk: Mic,
};

const PublicationsSection = () => {
  return (
    <section id="publications" className="section-padding">
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
              Publications & Writing
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Sharing knowledge.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {publications.map((pub, i) => {
            const Icon = iconMap[pub.type as keyof typeof iconMap];
            return (
              <motion.a
                key={pub.title}
                href={pub.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 card-hover flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                    {pub.type}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{pub.year}</span>
                </div>

                <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                  {pub.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {pub.description}
                </p>
                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                  {pub.venue}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
