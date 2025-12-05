const PhilosophySection = () => {
  return (
    <section id="philosophy" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="label-uppercase text-gold mb-4">Our Philosophy</p>
            <h2 className="heading-section text-foreground mb-8">
              Designing Spaces That <span className="italic">Feel</span> Like Home
            </h2>
            <div className="space-y-6 text-body">
              <p>
                At Aura Interiors, we believe that exceptional design begins with understanding the soul 
                of a space. Every room has a story waiting to be told, and our role is to bring that 
                narrative to life through thoughtful composition, material selection, and light.
              </p>
              <p>
                Our approach merges timeless aesthetics with contemporary sensibilities, creating 
                environments that are both visually stunning and deeply functional. We don't just 
                design rooms—we craft experiences that elevate daily living into something extraordinary.
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-border">
              <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
                "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
              </blockquote>
              <cite className="block mt-4 text-sm text-muted-foreground not-italic">
                — Le Corbusier
              </cite>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="image-reveal">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                  alt="Elegant interior design"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 gold-gradient opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
