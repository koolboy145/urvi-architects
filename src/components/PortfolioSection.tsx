import { useState } from 'react';
import { ArrowUpRight, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  title: string;
  category: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  description?: string;
  details?: string[];
  images?: string[];
  location?: string;
  year?: string;
}

const projects: Project[] = [
  {
    title: 'The Marble Residence',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    size: 'large',
    description: 'A luxurious residential project featuring elegant marble finishes and contemporary design elements. This stunning residence combines sophistication with modern functionality.',
    details: [
      'Premium marble flooring throughout',
      'Custom-designed kitchen with high-end appliances',
      'Spacious master suite with walk-in closet',
      'Landscaped outdoor living spaces',
      'Smart home integration',
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Manhattan, New York',
    year: '2024',
  },
  {
    title: 'Velvet Lounge',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    size: 'small',
    description: 'An upscale hospitality space designed to create an atmosphere of refined elegance. The Velvet Lounge features plush textures and warm lighting.',
    details: [
      'Custom velvet upholstery',
      'Artisanal lighting design',
      'Premium bar area with specialty finishes',
      'Intimate seating arrangements',
    ],
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Downtown District',
    year: '2023',
  },
  {
    title: 'Minimal Workspace',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    size: 'small',
    description: 'A modern commercial workspace emphasizing clean lines and functional design. This project maximizes productivity through thoughtful spatial planning.',
    details: [
      'Open-plan collaborative areas',
      'Private meeting rooms',
      'Ergonomic furniture solutions',
      'Natural light optimization',
      'Sustainable materials',
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Business District',
    year: '2024',
  },
  {
    title: 'Coastal Villa',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
    description: 'A serene coastal retreat designed to embrace ocean views and natural light. This villa seamlessly blends indoor and outdoor living.',
    details: [
      'Floor-to-ceiling windows',
      'Ocean-view terraces',
      'Natural stone finishes',
      'Sustainable design elements',
      'Private beach access',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Malibu, California',
    year: '2023',
  },
  {
    title: 'Urban Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
    description: 'A sophisticated urban penthouse featuring panoramic city views and contemporary luxury finishes. This space represents modern city living at its finest.',
    details: [
      '360-degree city views',
      'Rooftop terrace',
      'Premium finishes throughout',
      'High-end kitchen and bathrooms',
      'Smart home technology',
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Manhattan, New York',
    year: '2024',
  },
  {
    title: 'Artisan Kitchen',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    size: 'large',
    description: 'A custom-designed artisan kitchen that combines functionality with aesthetic beauty. This space celebrates the art of cooking and gathering.',
    details: [
      'Custom cabinetry',
      'Professional-grade appliances',
      'Marble countertops',
      'Island with seating',
      'Pantry organization systems',
    ],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'San Francisco, California',
    year: '2024',
  },
];

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'detail'>('cards');
  
  const displayedProjects = projects.slice(0, 4);
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setViewMode('detail');
  };
  
  const handleBackToCards = () => {
    setViewMode('cards');
    setSelectedProject(null);
  };

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
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
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
              setShowAllProjects(true);
              setViewMode('cards');
              setSelectedProject(null);
            }}
          >
            View All Projects
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </div>

      {/* Project Detail Modal (from main grid) */}
      <Dialog open={!!selectedProject && !showAllProjects} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] p-0 bg-background border-border overflow-hidden flex flex-col">
          {selectedProject && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <DialogHeader className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold mb-2">
                      {selectedProject.category}
                    </p>
                    <DialogTitle className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                      {selectedProject.title}
                    </DialogTitle>
                    {(selectedProject.location || selectedProject.year) && (
                      <DialogDescription className="text-muted-foreground">
                        {selectedProject.location && <span>{selectedProject.location}</span>}
                        {selectedProject.location && selectedProject.year && <span> • </span>}
                        {selectedProject.year && <span>{selectedProject.year}</span>}
                      </DialogDescription>
                    )}
                  </div>
                  <DialogDescription asChild>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </DialogDescription>
                </div>
              </DialogHeader>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 md:px-8 py-6 md:py-8 space-y-8">
                  {/* Main Image */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  {selectedProject.description && (
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-4">About This Project</h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>
                  )}

                  {/* Details */}
                  {selectedProject.details && selectedProject.details.length > 0 && (
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {selectedProject.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-gold mt-1">•</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional Images */}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-4">Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.images.map((img, idx) => (
                          <div key={idx} className="relative w-full aspect-video overflow-hidden rounded-lg">
                            <img
                              src={img}
                              alt={`${selectedProject.title} - Image ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View All Projects Modal */}
      <Dialog open={showAllProjects} onOpenChange={(open) => {
        if (!open) {
          setShowAllProjects(false);
          setViewMode('cards');
          setSelectedProject(null);
        }
      }}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] p-0 bg-background border-border overflow-hidden flex flex-col">
          {viewMode === 'cards' ? (
            // Cards View
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <DialogHeader className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                      Our Projects
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Explore our complete portfolio of architectural excellence
                    </DialogDescription>
                  </div>
                  <button
                    onClick={() => {
                      setShowAllProjects(false);
                      setViewMode('cards');
                      setSelectedProject(null);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </DialogHeader>

              {/* Scrollable Cards Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 md:px-8 py-6 md:py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        onClick={() => handleProjectClick(project)}
                        className="group relative image-reveal cursor-pointer aspect-[4/3]"
                      >
                        <div className="relative overflow-hidden aspect-[4/3] rounded-lg">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500 rounded-lg" />
                          
                          {/* Content */}
                          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
                            <p className="text-xs uppercase tracking-wider text-gold-light mb-2">
                              {project.category}
                            </p>
                            <h3 className="font-serif text-2xl md:text-3xl text-cream">
                              {project.title}
                            </h3>
                          </div>

                          {/* Arrow */}
                          <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-cream text-charcoal opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 rounded-lg">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Detail View
            selectedProject && (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Header with Back Button */}
                <DialogHeader className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={handleBackToCards}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground mt-1"
                        aria-label="Back to projects"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gold mb-2">
                          {selectedProject.category}
                        </p>
                        <DialogTitle className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                          {selectedProject.title}
                        </DialogTitle>
                        {(selectedProject.location || selectedProject.year) && (
                          <DialogDescription className="text-muted-foreground">
                            {selectedProject.location && <span>{selectedProject.location}</span>}
                            {selectedProject.location && selectedProject.year && <span> • </span>}
                            {selectedProject.year && <span>{selectedProject.year}</span>}
                          </DialogDescription>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowAllProjects(false);
                        setViewMode('cards');
                        setSelectedProject(null);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </DialogHeader>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 md:px-8 py-6 md:py-8 space-y-8">
                    {/* Main Image */}
                    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Description */}
                    {selectedProject.description && (
                      <div>
                        <h3 className="font-serif text-2xl text-foreground mb-4">About This Project</h3>
                        <p className="text-body text-muted-foreground leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>
                    )}

                    {/* Details */}
                    {selectedProject.details && selectedProject.details.length > 0 && (
                      <div>
                        <h3 className="font-serif text-2xl text-foreground mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {selectedProject.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-gold mt-1">•</span>
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Additional Images */}
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div>
                        <h3 className="font-serif text-2xl text-foreground mb-4">Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProject.images.map((img, idx) => (
                            <div key={idx} className="relative w-full aspect-video overflow-hidden rounded-lg">
                              <img
                                src={img}
                                alt={`${selectedProject.title} - Image ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
