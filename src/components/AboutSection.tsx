import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const stats = [
  { value: 10, suffix: "+", labelKey: "about.stats.systemsBuilt" },
  { value: 8, suffix: "+", labelKey: "about.stats.modelsDeployed" },
  { value: 4, suffix: "K+", labelKey: "about.stats.dataProcessed" },
  { value: 30, suffix: "%+", labelKey: "about.stats.efficiencyGain" },
];

const AnimatedCounter = ({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? current.toFixed(2) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value, isDecimal]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const AboutSection = () => {
  const { t } = useTranslation();

  const renderHeading = (text: string) => {
    const parts = text.split(/<accent>(.*?)<\/accent>/);
    return parts.map((part, i) =>
      i % 2 === 1 ? <span key={i} className="text-accent-gradient">{part}</span> : part
    );
  };

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="accent-dot" />
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {t("about.label")}
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              {renderHeading(t("about.heading"))}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 text-muted-foreground font-body text-base md:text-[17px] leading-[1.8]"
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <p className="font-display text-4xl md:text-5xl text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mt-2">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
