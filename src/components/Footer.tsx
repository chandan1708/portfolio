const Footer = () => {
  return (
    <footer className="border-t border-border py-6 px-6 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Chandan R. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
