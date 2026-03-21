import { useState } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const indicLanguages = [
  "Kannada", "Hindi", "Gujarati", "Marathi", "Konkani", "Bengali",
  "Oriya", "Merry", "Kashmiri", "Assamese", "Nissi/Daffla", "Ao",
  "Manipuri", "Khasi & Garo", "Tamil", "Malayalam", "Punjabi", "Telugu", "Mizo",
];

const globalLanguages = [
  { name: "Arabic", code: "AR" },
  { name: "Bulgarian", code: "BG" },
  { name: "Catalan", code: "CA" },
  { name: "Czech", code: "CS" },
  { name: "Danish", code: "DA" },
  { name: "German", code: "DE" },
  { name: "English", code: "EN" },
  { name: "Spanish", code: "ES" },
  { name: "Estonian", code: "ET" },
  { name: "Finnish", code: "FI" },
  { name: "French", code: "FR" },
  { name: "Croatian", code: "HR" },
  { name: "Hungarian", code: "HU" },
  { name: "Italian", code: "IT" },
  { name: "Japanese", code: "JA" },
  { name: "Korean", code: "KO" },
  { name: "Lithuanian", code: "LT" },
  { name: "Dutch", code: "NL" },
  { name: "Norwegian", code: "NO" },
  { name: "Portuguese", code: "PT" },
  { name: "Romanian", code: "RO" },
  { name: "Russian", code: "RU" },
  { name: "Swedish", code: "SV" },
  { name: "Ukrainian", code: "UK" },
  { name: "Vietnamese", code: "VI" },
  { name: "Chinese", code: "ZH" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("EN");

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-foreground text-xs font-body font-medium"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{selected}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-72 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-lg"
            >
              {/* Indic Languages */}
              <div className="p-3 pb-1">
                <h4 className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Indic Languages
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {indicLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelected(lang.substring(0, 3).toUpperCase()); setOpen(false); }}
                      className="px-2.5 py-1 rounded-md text-xs font-body text-foreground bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mx-3 my-2 h-px bg-border" />

              {/* Global Languages */}
              <div className="p-3 pt-1">
                <h4 className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Global Languages
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {globalLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelected(lang.code); setOpen(false); }}
                      className={`px-2.5 py-1 rounded-md text-xs font-body transition-colors ${
                        selected === lang.code
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground bg-secondary hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
