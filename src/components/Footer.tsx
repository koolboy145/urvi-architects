const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-serif text-2xl tracking-tight text-cream">
            Aura<span className="text-gold">.</span>
          </a>
          
          <p className="text-sm text-cream-dark/60">
            © {new Date().getFullYear()} Aura Interiors. All rights reserved.
          </p>

          <div className="flex gap-8">
            <a href="#" className="text-sm text-cream-dark/60 hover:text-cream transition-colors link-underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-cream-dark/60 hover:text-cream transition-colors link-underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
