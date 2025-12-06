import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury modern interior"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center">
        <p className="label-uppercase text-cream-dark mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Interior Architecture & Design
        </p>
        <h1 
          className="heading-display text-cream max-w-5xl mx-auto mb-8 animate-fade-up opacity-0"
          style={{ animationDelay: '0.4s' }}
        >
          Where Space Becomes <span className="italic text-gold-light">Emotion</span>
        </h1>
        <p 
          className="text-lg md:text-xl text-cream-dark/90 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0"
          style={{ animationDelay: '0.6s' }}
        >
          Crafting environments that transcend the ordinary, where every detail whispers elegance.
        </p>
        <a
          href="#portfolio"
          className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium text-sm uppercase tracking-wider hover:bg-gold hover:text-cream transition-all duration-500 animate-fade-up opacity-0"
          style={{ animationDelay: '0.8s' }}
        >
          View Our Work
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#philosophy" className="text-cream/70 hover:text-cream transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
