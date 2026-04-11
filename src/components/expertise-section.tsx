import { Award, Users, Target, Shield, Zap, Globe } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const expertise = [
  {
    icon: Award,
    title: "Proven Expertise",
    description: "5+ years implementing AI solutions for businesses across industries"
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Expert AI engineers, business consultants, and support specialists"
  },
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by your business outcomes, not just technology metrics"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "HIPAA, GDPR compliant with bank-level encryption and data protection"
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Most solutions deployed in 3-4 weeks with immediate impact"
  },
  {
    icon: Globe,
    title: "Local & Global",
    description: "Based in Aruba, serving businesses locally and internationally"
  }
];

export const ExpertiseSection = () => {
  const reasons = [
    {
      icon: Award,
      title: "Aruba Market Insight",
      description: "We understand local business needs. We build for the Aruba audience, ensuring your site resonates with local customers."
    },
    {
      icon: Zap,
      title: "Speed & Performance",
      description: "No slow-loading sites. We optimize every image and script so your site feels snappy on any connection."
    },
    {
      icon: Shield,
      title: "All-In-One Solution",
      description: "Hosting, security, domain management, and search optimization are all included. One price, zero headaches."
    },
    {
      icon: Users,
      title: "Results-Focused",
      description: "We don't just build sites; we build marketing tools. Our sites are designed to capture leads and drive calls."
    },
    {
      icon: Target,
      title: "Mobile-First Design",
      description: "Most people in Aruba browse on their phones. Your site will look and work perfectly on every mobile device."
    }
  ];

  return (
    <section id="about" className="pt-0 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-slide-up py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Businesses in Aruba <span className="gradient-text">Choose Versitale</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-2xl group hover:scale-[1.02] transition-all duration-300 work-step-card"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 glow-ice group-hover:glow-ice-strong transition-all duration-300">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {reasons.map((reason, index) => (
              <AccordionItem 
                key={index} 
                value={index.toString()}
                className="service-card rounded-2xl border border-primary/20 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center glow-ice">
                      <reason.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-bold">{reason.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 animate-fade-in">
                  <div className="pt-2 border-t border-primary/10">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {reason.description}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
