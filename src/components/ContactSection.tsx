import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

const links = [
  { label: "Email", href: "mailto:chandan17.ramesh@gmail.com", icon: Mail },
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Resume", href: "#", icon: FileText },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Let's Work Together
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            I'm open to new opportunities in Generative AI and Machine Learning. 
            Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 card-hover"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
