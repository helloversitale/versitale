import { Layout, Server, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const ServicesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Layout,
      title: "Get Found",
      description: "Show up on Google when people search for your type of business in Aruba. We handle the SEO so you don't have to learn it.",
      includes: [
        "Local SEO optimization",
        "Google Business Profile management",
        "Keyword-rich content",
        "Monthly performance tracking"
      ],
    },
    {
      icon: Server,
      title: "Look Professional",
      description: "First impressions happen online now. Your website will look modern, load fast, and work perfectly on every phone and laptop.",
      includes: [
        "Custom, mobile-first design",
        "High-speed performance tuning",
        "Premium animations & UX",
        "Modern typography & branding"
      ],
    },
    {
      icon: Search,
      title: "Win More Customers",
      description: "Clear calls to action and booking options that make it easy for visitors to become paying customers.",
      includes: [
        "Strategic call-to-action placement",
        "Booking & appointment scheduling",
        "Conversion-optimized layouts",
        "Lead capture forms"
      ],
    }
  ];

  return (
    <section id="services" className="pt-0 pb-0 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-slide-up py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Website That <span className="gradient-text">Works as Hard as You Do</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Versitale gives you a complete website, designed, built, hosted, and optimized every month, so you can focus on running your business while your website runs your marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-2xl group hover:scale-[1.02] transition-all duration-300 work-step-card flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-ice group-hover:glow-ice-strong transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>

              <div className="">
                <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pb-20">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToContact}
            className="glow-ice"
          >
            Get Started with Your New Website
          </Button>
        </div>
      </div>
    </section>
  );
};
