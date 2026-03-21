import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface ContactFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const ContactFormDialog = ({ open, onClose }: ContactFormDialogProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !purpose.trim()) return;

    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact: ${purpose.slice(0, 60)}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${purpose}`);
    window.open(`mailto:chandan17.ramesh@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => {
      setSending(false);
      toast({ title: t("contactForm.toastTitle"), description: t("contactForm.toastDesc") });
      setName("");
      setEmail("");
      setPurpose("");
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 z-[60] m-auto w-[90vw] max-w-md h-fit max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-foreground">{t("contactForm.title")}</h3>
              <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-muted-foreground mb-1.5">
                  {t("contactForm.name")}
                </label>
                <input type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={t("contactForm.namePlaceholder")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-muted-foreground mb-1.5">
                  {t("contactForm.email")}
                </label>
                <input type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contactForm.emailPlaceholder")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-muted-foreground mb-1.5">
                  {t("contactForm.purpose")}
                </label>
                <textarea required maxLength={1000} rows={2} value={purpose} onChange={(e) => setPurpose(e.target.value)}
                  placeholder={t("contactForm.purposePlaceholder")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none" />
              </div>
              <button type="submit" disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:shadow-glow hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? t("contactForm.sending") : t("contactForm.send")}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormDialog;
