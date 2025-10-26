import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    company: "Caribbean Healthcare Group",
    role: "Operations Director",
    result: "Reduced patient inquiry response time by 75% and freed up 20 hours per week for our staff",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 5
  },
  {
    name: "James Richardson",
    company: "Island Properties Aruba",
    role: "Managing Director",
    result: "Increased qualified leads by 3x while automating 80% of initial client interactions",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 5
  },
  {
    name: "Sophie van der Berg",
    company: "Aruba Dental Care Center",
    role: "CEO",
    result: "24/7 patient support with 95% satisfaction rate, handling 500+ appointment requests monthly",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 5
  }
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Growing Businesses</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join 50+ businesses already transforming their operations with our AI solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-2xl relative"
            >

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">
                "{testimonial.result}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
