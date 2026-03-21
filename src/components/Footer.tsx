import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-8 px-6 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} Chandan R
        </p>
        <p className="font-mono text-xs text-muted-foreground tracking-wide">
          {t("footer.location")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
