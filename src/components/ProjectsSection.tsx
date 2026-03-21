import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGithubData } from "@/hooks/use-github-data";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { data } = useGithubData();
  const projects = data?.projects ?? [];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t("projects.label")}
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {t("projects.heading")}
          </h2>
        </motion.div>

        <div className="space-y-0">
          {projects.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group grid md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start py-10 border-t border-border hover:bg-accent/5 -mx-6 px-6 md:-mx-8 md:px-8 transition-all duration-300"
            >
              <span className="font-mono text-xs text-muted-foreground tracking-wide">{p.number}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-300">
                    {/* Use i18n key if it exists for curated projects, else use title directly */}
                    {t(`projects.items.${p.key}.title`, { defaultValue: p.title })}
                  </h3>
                  {p.highlight && (
                    <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                      {t("projects.featured")}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-4 max-w-xl">
                  {t(`projects.items.${p.key}.description`, { defaultValue: p.description })}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono tracking-wide rounded-full border border-border text-muted-foreground group-hover:border-accent/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono tracking-wide rounded-full border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300">
                      <ExternalLink className="w-3.5 h-3.5" /> {t("projects.liveDemo")}
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono tracking-wide rounded-full border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300">
                      <Github className="w-3.5 h-3.5" /> {t("projects.sourceCode")}
                    </a>
                  )}
                  {!p.demo && !p.github && (
                    <span className="text-xs font-mono tracking-wide text-muted-foreground/50">
                      {t("projects.linksSoon")}
                    </span>
                  )}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 mt-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
