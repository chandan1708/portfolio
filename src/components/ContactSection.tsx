import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", href: "mailto:chandan17.ramesh@gmail.com" },
  { label: "GitHub", href: "https://github.com/chandan1708/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-ramesh-7a8bb8237/" },
  { label: "Resume", href: "https://drive.google.com/file/d/1HIYJdLuQCS-7Gzy0s9IUwbQUJUX_4FG3/view?usp=sharing" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Contact
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight max-w-3xl">
            Let's build something{" "}
            <span className="text-accent-gradient">intelligent</span> together.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap gap-4"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-glow transition-all duration-300"
            >
              {link.label}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
