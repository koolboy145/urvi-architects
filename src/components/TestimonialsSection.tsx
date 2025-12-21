import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Urvi Architectural Services transformed our vision into a clean, efficient, and customer-friendly medical store layout. Architect Urvija Kriti and her team designed the space with a perfect balance of functionality and aesthetics—ensuring optimal product display, smooth movement, and a welcoming atmosphere. Their attention to detail, timely execution, and understanding of retail healthcare needs made the entire experience smooth and satisfying. We’re extremely happy with the outcome and highly recommend their services.",
    author: 'Rakesh',
    location: 'Medical Store, Patna',
  },
  {
    quote: "Designing Blue Bottle Café with Urvi Architectural Services was a truly inspiring journey. Architect Urvija Kriti and her team brought our concept to life with creativity, warmth, and precision. They understood the importance of ambiance in a café setting and delivered a space that feels both inviting and unique—blending contemporary aesthetics with functional design. From layout planning to material selection and lighting, every element was carefully considered. Our customers love the vibe, and so do we. A heartfelt thank you to the team for creating a space that perfectly reflects the spirit of Blue Bottle.",
    author: 'Shreya and Umang',
    location: 'Blue Bottle Café, Patna',
  },
  {
    quote: "Urvi Architectural Services gave Quantum Quisine Café a stunning identity. The design is modern, functional, and full of character—exactly what we envisioned. Architect Urvija Kriti and her team were creative, responsive, and truly professional throughout. We couldn’t be happier!",
    author: 'Anish',
    location: 'Quantum Quisine Café, Patna',
  },
  {
    quote: "Choosing Urvi Architectural Services for our home was the best decision we made. Architect Urvija Kriti and her team created a luxurious yet comfortable living space, with every piece of furniture thoughtfully designed and tailored to our taste. The craftsmanship, attention to detail, and seamless integration of style and function truly elevated our home. Their professionalism and vision turned our dream into reality.",
    author: 'Ritesh and Archana',
    location: 'Residential, Patna',
  },
  {
    quote: "Designing our home with Urvi Architectural Services was a wonderful experience. They understood our lifestyle, preferences, and budget perfectly. The result is a beautiful, practical home that we truly love living in.",
    author: 'Dr. Ruby',
    location: 'Residential, Patna',
  },
  {
    quote: "We were amazed by the transformation Urvi Architectural Services achieved through renovation. From space re-planning to material selection, everything was thoughtfully executed. Our home now feels completely new.",
    author: 'Vishal and Nivedita',
    location: 'Residential, Patna',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const contentRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Update height when testimonial changes or window resizes
  // Using requestAnimationFrame to avoid forced reflows
  useEffect(() => {
    let rafId: number;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const updateHeight = () => {
      if (contentRef.current) {
        const activeContent = contentRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeContent) {
          // Use requestAnimationFrame to defer measurement until after paint
          // This prevents forced reflows by reading layout properties after the browser has painted
          rafId = requestAnimationFrame(() => {
            const currentHeight = activeContent.offsetHeight;
            if (currentHeight > 0) {
              setHeight(currentHeight);
            }
          });
        }
      }
    };

    // Defer initial measurement to avoid forced reflow on mount
    rafId = requestAnimationFrame(() => {
      updateHeight();
    });

    // Throttled resize handler to avoid excessive reflows
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateHeight();
      }, 150); // Throttle resize events
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [current]);

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-gold/30 mx-auto mb-8" />
          
          <div 
            ref={contentRef}
            className="relative transition-[min-height] duration-700 ease-in-out"
            style={{ minHeight: height === 'auto' ? undefined : `${height}px` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-active={index === current}
                className={`transition-all duration-700 ${
                  index === current 
                    ? 'opacity-100 translate-y-0 relative' 
                    : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                }`}
              >
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-12 md:mb-16">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-8 md:mt-12">
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
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
