const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and aspirations for the space.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Our team develops comprehensive design concepts, mood boards, and 3D visualizations for your approval.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'We refine every detail—from materials and finishes to furniture selections and custom millwork.',
  },
  {
    number: '04',
    title: 'Execution',
    description: 'Our project managers oversee every aspect of implementation, ensuring flawless delivery on time.',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="section-padding bg-charcoal">
      <div className="container-wide">
        <div className="text-center mb-16 md:mb-20">
          <p className="label-uppercase text-gold-light mb-4">Our Process</p>
          <h2 className="heading-section text-cream max-w-3xl mx-auto">
            A Seamless Journey from Vision to Reality
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-cream/10" />
              )}
              
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 border border-gold/30 group-hover:border-gold transition-colors duration-500">
                  <span className="font-serif text-3xl text-gold">{step.number}</span>
                </div>
                <h3 className="font-serif text-2xl text-cream mb-4">{step.title}</h3>
                <p className="text-cream-dark/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
