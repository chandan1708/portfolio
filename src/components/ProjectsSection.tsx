import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "ALP Intelligence Surveillance",
    description:
      "Advanced AI Surveillance System with real-time phone usage detection, waste monitoring, and attendance tracking achieving 89% accuracy. Reduced manual oversight by 40%.",
    tags: ["Deep Learning", "Computer Vision", "Real-time"],
    link: "#",
  },
  {
    number: "02",
    title: "ACCIRESCUE",
    description:
      "AI-powered accident detection and emergency routing leveraging live CCTV feeds and real-time traffic data, improving emergency response efficiency by 40%.",
    tags: ["Computer Vision", "Real-time Analytics", "Emergency"],
    link: "#",
  },
  {
    number: "03",
    title: "KrushiAI",
    description:
      "Autonomous ML-driven agricultural rover for real-time field data and crop recommendations. Won 1st Place at Fusion Techathon 3.0, outperforming 104 teams.",
    tags: ["Machine Learning", "IoT", "Autonomous Systems"],
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Projects
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Selected work.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group grid md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start py-10 border-t border-border hover:bg-secondary/50 -mx-6 px-6 md:-mx-8 md:px-8 transition-colors duration-300"
            >
              <span className="font-mono text-xs text-muted-foreground tracking-wide">
                {p.number}
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 group-hover:text-foreground transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-4 max-w-xl">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono tracking-wide rounded-full border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors mt-1 hidden md:block" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
