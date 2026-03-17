import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-dot" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Education
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Academic foundation.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-6 md:p-8 card-hover"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">
                  B.E. in AI & Data Science
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Visvesvaraya Technological University (VTU)
                </p>
                <p className="font-mono text-xs text-muted-foreground tracking-wide mt-1">
                  2020 — 2024
                </p>
              </div>
            </div>
            <div className="pl-14">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display text-3xl text-foreground">8.05</span>
                <span className="font-mono text-xs text-muted-foreground tracking-wide uppercase">GPA</span>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-2">Key Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Structures", "Cloud Computing"].map((c) => (
                    <span key={c} className="px-3 py-1 text-xs font-mono tracking-wide rounded-full border border-border text-muted-foreground">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground">
                    1st Place — Fusion Techathon 3.0
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    Outperformed 104 teams with KrushiAI autonomous agricultural rover
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground">
                    Certifications
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    {["AWS Cloud Practitioner", "Deep Learning Specialization", "LangChain for LLM Applications"].map((cert) => (
                      <p key={cert} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent/50" />
                        {cert}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
