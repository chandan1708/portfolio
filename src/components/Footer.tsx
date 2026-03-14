const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-muted-foreground">
          © 2026 Alex Kumar. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["GitHub", "LinkedIn", "Twitter"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
