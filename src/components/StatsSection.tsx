const stats = [
  { value: '18+', label: 'Years of Excellence' },
  { value: '340+', label: 'Projects Completed' },
  { value: '52', label: 'Design Awards' },
  { value: '2.5M', label: 'Sq Ft Designed' },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-cream-dark/70 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
