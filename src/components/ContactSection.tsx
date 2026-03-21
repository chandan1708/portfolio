import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const links = [
  { label: "Email", href: "mailto:chandan17.ramesh@gmail.com" },
  { label: "GitHub", href: "https://github.com/chandan1708/", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-ramesh-7a8bb8237/", external: true },
  { label: "Resume", href: "https://drive.google.com/file/d/1HIYJdLuQCS-7Gzy0s9IUwbQUJUX_4FG3/view?usp=sharing", external: true },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", purpose: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.purpose.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    // Open mailto with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact: ${form.purpose.slice(0, 80)}`);
    const body = encodeURIComponent(`Hi Chandan,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.purpose}`);
    window.open(`mailto:chandan17.ramesh@gmail.com?subject=${subject}&body=${body}`, "_blank");
    toast({ title: "Opening your email client..." });
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
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

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Name</label>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-card border-border focus:border-accent"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-card border-border focus:border-accent"
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Purpose</label>
              <Textarea
                placeholder="What would you like to discuss?"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="bg-card border-border focus:border-accent min-h-[120px]"
                maxLength={1000}
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="rounded-full px-8 gap-2"
            >
              Send Message
              <Send className="w-4 h-4" />
            </Button>
          </motion.form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 justify-center"
          >
            <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">Or reach out directly</p>
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-body text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-glow transition-all duration-300 w-fit"
              >
                {link.label}
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
