import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "ALP Intelligence Surveillance",
    description:
      "Advanced AI Surveillance System with real-time phone usage detection, plastic/waste litter monitoring, and continuous attendance tracking achieving 89% accuracy. Reduced manual oversight by 40%.",
    tags: ["Deep Learning", "Computer Vision", "Python", "Real-time Detection"],
    link: "#",
  },
  {
    title: "ACCIRESCUE",
    description:
      "AI-powered accident detection and emergency routing system leveraging live CCTV feeds and real-time traffic data, improving emergency response efficiency by 40%.",
    tags: ["Computer Vision", "AI", "Real-time Analytics", "Emergency Systems"],
    link: "#",
  },
  {
    title: "KrushiAI — Fusion Techathon Winner",
    description:
      "Autonomous ML-driven agricultural rover for real-time field data and crop recommendations. Won 1st Place at Fusion Techathon 3.0, outperforming 104 teams.",
    tags: ["Machine Learning", "IoT", "Agriculture", "Autonomous Systems"],
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">Projects</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Academic & hackathon projects.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-body font-medium rounded-md bg-secondary text-secondary-foreground"
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
