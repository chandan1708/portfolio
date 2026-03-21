import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const links = [
  { labelKey: "contact.email", href: "mailto:chandan17.ramesh@gmail.com" },
  { labelKey: "contact.github", href: "https://github.com/chandan1708/" },
  { labelKey: "contact.linkedin", href: "https://www.linkedin.com/in/chandan-ramesh-7a8bb8237/" },
  { labelKey: "contact.resumeLink", href: "https://drive.google.com/file/d/1HIYJdLuQCS-7Gzy0s9IUwbQUJUX_4FG3/view?usp=sharing" },
];

const ContactSection = () => {
  const { t } = useTranslation();

  const renderHeading = (text: string) => {
    const parts = text.split(/<accent>(.*?)<\/accent>/);
    return parts.map((part, i) =>
      i % 2 === 1 ? <span key={i} className="text-accent-gradient">{part}</span> : part
    );
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t("contact.label")}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight max-w-3xl">
            {renderHeading(t("contact.heading"))}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap gap-4"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.labelKey}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-glow transition-all duration-300"
            >
              {t(link.labelKey)}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
