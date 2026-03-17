import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";

const projects = [
  {
    title: "ALP Intelligence Surveillance",
    description:
      "Advanced AI Surveillance System with real-time phone usage detection, waste monitoring, and attendance tracking achieving 89% accuracy. Reduced manual oversight by 40%.",
    tags: ["Deep Learning", "Computer Vision", "Real-time"],
    link: "#",
    highlight: null,
  },
  {
    title: "ACCIRESCUE",
    description:
      "AI-powered accident detection and emergency routing leveraging live CCTV feeds and real-time traffic data, improving emergency response efficiency by 40%.",
    tags: ["Computer Vision", "Real-time Analytics", "Emergency"],
    link: "#",
    highlight: null,
  },
  {
    title: "KrushiAI",
    description:
      "Autonomous ML-driven agricultural rover for real-time field data and crop recommendations. Won 1st Place at Fusion Techathon 3.0, outperforming 104 teams.",
    tags: ["Machine Learning", "IoT", "Autonomous Systems"],
    link: "#",
    highlight: "🏆 1st Place — Fusion Techathon 3.0",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projects</h2>
          <p className="mt-3 text-muted-foreground">Selected work that demonstrates impact.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col p-6 rounded-xl bg-card border border-border card-hover"
            >
              {p.highlight && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-3">
                  <Trophy className="w-3.5 h-3.5" />
                  {p.highlight}
                </div>
              )}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-primary/10 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
