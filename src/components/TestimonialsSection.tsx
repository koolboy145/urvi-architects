import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Urvi Architectural Services transformed our vision into a clean, efficient medical store layout. Urvija and her team achieved a perfect balance of functionality and aesthetics, ensuring optimal product display and a welcoming atmosphere. Highly recommend!",
    author: 'Catherine & Michael Stone',
    location: 'Manhattan Penthouse',
  },
  {
    quote: "Working with the Aura team was an absolute pleasure. Their attention to detail and ability to understand our vision made the entire process seamless and enjoyable.",
    author: 'Robert Hayes',
    location: 'Coastal Villa, Malibu',
  },
  {
    quote: "They didn't just design our office—they created an environment that inspires our team and impresses every client who walks through the door.",
    author: 'Sarah Chen',
    location: 'Tech Startup HQ, San Francisco',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-gold/30 mx-auto mb-8" />
          
          <div className="relative min-h-[280px] md:min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === current 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-gold w-8' : 'bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
