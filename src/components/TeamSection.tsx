const team = [
  {
    name: 'Elena Voss',
    role: 'Principal Designer',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sofia Laurent',
    role: 'Senior Architect',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'James Wright',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-16 md:mb-20">
          <p className="label-uppercase text-gold mb-4">Meet The Team</p>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            The Visionaries Behind Every Project
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} at URVI Architectural Services`}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-500" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
