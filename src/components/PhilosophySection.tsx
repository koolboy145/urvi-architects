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
                At Urvi Architectural Services, visionary architecture begins with understanding the soul of a space, a principle established by our founder, Urvija Kriti. We go beyond design to craft environments that flawlessly merge aesthetics, functionality, and sustainability, always guided by a client-first philosophy.
              </p>
              <p>
                Our dedicated team of architects, designers, and engineers works in synergy to provide seamless, end-to-end solutions. From dynamic commercial establishments to elegant residences, we bring a personalized touch to every project. Rooted in deep design principles and regional context, we transform visions into inspiring, tangible realities.
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-border">
              <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
                "Architecture should speak of its time and place, but yearn for timelessness."
              </blockquote>
              <cite className="block mt-4 text-sm text-muted-foreground not-italic">
                — Frank Gehry
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
