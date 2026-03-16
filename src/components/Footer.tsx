const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-foreground">AK<span className="text-primary">.</span></span>
          <span className="text-border">|</span>
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alex Kumar. All rights reserved.
          </p>
        </div>
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
