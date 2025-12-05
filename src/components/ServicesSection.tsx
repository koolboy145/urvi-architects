import { Home, Building2, Compass, Palette } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Transform your home into a sanctuary that reflects your personality and lifestyle, blending comfort with sophisticated aesthetics.',
  },
  {
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Create impactful environments for businesses that inspire productivity, impress clients, and embody your brand identity.',
  },
  {
    icon: Compass,
    title: 'Spatial Planning',
    description: 'Optimize every square foot with intelligent layouts that enhance flow, functionality, and the overall spatial experience.',
  },
  {
    icon: Palette,
    title: 'Material Curation',
    description: 'Source and select premium materials, finishes, and furnishings that bring depth, texture, and character to your space.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-cream-dark">
      <div className="container-wide">
        <div className="text-center mb-16 md:mb-20">
          <p className="label-uppercase text-gold mb-4">What We Do</p>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            Comprehensive Design Services for Every Vision
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 md:p-10 bg-background hover-lift cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-6 border border-gold/30 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                <service.icon className="w-6 h-6 text-gold group-hover:text-cream transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
