import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Let's build something great.
          </h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed mb-10">
            I'm always open to discussing system design challenges, open-source collaboration,
            or new opportunities. Reach out and let's connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:alex.kumar@email.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-body font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
