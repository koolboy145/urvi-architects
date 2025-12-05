import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'The Marble Residence',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
  {
    title: 'Velvet Lounge',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    title: 'Minimal Workspace',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    title: 'Coastal Villa',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    title: 'Urban Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    title: 'Artisan Kitchen',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container-wide">
        <div className="mb-16 md:mb-20">
          <p className="label-uppercase text-gold mb-4">Featured Projects</p>
          <h2 className="heading-section text-foreground">
            Our Latest Works
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative image-reveal cursor-pointer ${
                project.size === 'large' ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              } ${project.size === 'medium' ? 'aspect-[4/3]' : ''}`}
            >
              <div className={`relative overflow-hidden ${
                project.size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-xs uppercase tracking-wider text-gold-light mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream">
                    {project.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-cream text-charcoal opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Button
            variant="outline"
            size="lg"
            className="inline-flex items-center gap-2"
            onClick={() => {
              // Add navigation logic here if needed
            }}
          >
            View All Projects
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
