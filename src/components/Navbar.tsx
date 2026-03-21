import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const navKeys = ["about", "experience", "projects", "skills", "education", "contact"];

const Navbar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between h-14 px-6 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl text-foreground tracking-tight"
        >
          Chandan R
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navKeys.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-[13px] font-body font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide uppercase"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-left text-sm font-body text-muted-foreground hover:text-accent py-3 transition-colors uppercase tracking-wide"
                >
                  {t(`nav.${key}`)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
