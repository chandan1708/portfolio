import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

const projects = [
  {
    title: "Distributed Task Scheduler",
    description:
      "Open-source task scheduler supporting 50K concurrent workers with exactly-once execution guarantees. Built with Go and etcd.",
    stars: "4.2k",
    tags: ["Go", "etcd", "gRPC", "Distributed Systems"],
    link: "#",
  },
  {
    title: "Real-Time Analytics Engine",
    description:
      "Stream processing engine handling 1M events/sec with sub-second aggregation windows. Powers internal dashboards at scale.",
    stars: "2.8k",
    tags: ["Rust", "Apache Kafka", "ClickHouse"],
    link: "#",
  },
  {
    title: "API Gateway Framework",
    description:
      "Lightweight, extensible API gateway with built-in rate limiting, circuit breaking, and observability. Used in production by 200+ teams.",
    stars: "6.1k",
    tags: ["Go", "Prometheus", "OpenTelemetry"],
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
            Open source & side projects.
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
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Star className="w-4 h-4 fill-current text-primary/60" />
                  <span className="text-sm font-body">{p.stars}</span>
                </div>
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
