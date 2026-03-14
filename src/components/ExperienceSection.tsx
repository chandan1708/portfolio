import { motion } from "framer-motion";

const experiences = [
  {
    company: "Google",
    role: "Senior Software Engineer, Infrastructure",
    period: "2021 — Present",
    description:
      "Leading the design of next-gen storage orchestration for Google Cloud. Architected a multi-region failover system reducing downtime by 99.7%. Mentoring 6 engineers across L3–L5.",
    tech: ["Go", "C++", "Spanner", "Borg", "gRPC"],
  },
  {
    company: "Meta",
    role: "Software Engineer, Core Data",
    period: "2019 — 2021",
    description:
      "Built real-time data pipeline processing 2TB/hour for content ranking. Reduced p99 latency by 40% through query optimization and caching strategies.",
    tech: ["Python", "C++", "Thrift", "MySQL", "Presto"],
  },
  {
    company: "Amazon",
    role: "Software Development Engineer II, AWS",
    period: "2017 — 2019",
    description:
      "Developed core APIs for AWS Lambda's cold-start optimization. Shipped features serving 100K+ enterprise customers. Owned end-to-end delivery of 3 major launches.",
    tech: ["Java", "TypeScript", "DynamoDB", "CloudFormation"],
  },
  {
    company: "Microsoft",
    role: "Software Engineer, Azure",
    period: "2015 — 2017",
    description:
      "Contributed to Azure Kubernetes Service (AKS) networking layer. Designed internal tooling adopted by 500+ engineers across the org.",
    tech: ["C#", ".NET", "Kubernetes", "Azure DevOps"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">Experience</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Where I've made impact.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 border-b border-border last:border-0"
            >
              <div>
                <p className="font-display text-sm text-muted-foreground">{exp.period}</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {exp.company}
                </h3>
                <p className="text-primary font-body text-sm font-medium mb-4">{exp.role}</p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-body font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
