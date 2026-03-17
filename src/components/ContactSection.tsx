import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", href: "mailto:chandan17.ramesh@gmail.com" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Resume", href: "#" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight max-w-3xl">
            Let's build something intelligent together.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              {link.label}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
