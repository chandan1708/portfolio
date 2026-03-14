import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-primary font-body text-sm font-medium tracking-wide mb-3">About</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Crafting reliable software for the world's most demanding environments.
          </h2>
          <div className="space-y-5 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              With 8+ years of experience across Google, Meta, and Amazon, I specialize in building 
              distributed systems that handle petabyte-scale data and serve billions of daily requests 
              with sub-millisecond latency.
            </p>
            <p>
              I'm passionate about developer experience, system design, and mentoring engineers. 
              I've led cross-functional teams of 10+ engineers, driven technical strategy for 
              critical infrastructure, and contributed to open-source projects used by millions.
            </p>
            <p>
              Outside of work, I write about systems engineering, contribute to the Go and Rust 
              ecosystems, and speak at conferences like KubeCon and Strange Loop.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
