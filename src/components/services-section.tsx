import { Calendar, Cog, MessageSquare, Phone, ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react";
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
      icon: MessageSquare,
      title: "Customer Support Agent",
      description: "Reduce response times and resolve inquiries 24/7 without hiring extra staff.",
      includes: [
        "AI Agent (Website + WhatsApp)",
        "Links directly to Facebook and Instagram",
        "Multilingual",
        "Live agent handoff when needed",
        "Quality monitoring & analytics"
      ],
      perfectFor: "Service-based businesses, dental clinics, healthcare, education",
      timeline: "Ready in 3-4 weeks"
    },
    {
      icon: Phone,
      title: "AI Sales Agent",
      description: "Engage, qualify, and follow up with leads automatically.",
      includes: [
        "AI Voice Agent for Handling Calls",
        "Email Follow-Up Automation",
        "Lead Qualification Scripts",
        "CRM Integration & Data Sync",
        "Automated Appointment Scheduling"
      ],
      perfectFor: "Real estate, financial services, recruitment, agency work",
      timeline: "Ready in 3-4 weeks"
    },
    {
      icon: Calendar,
      title: "Appointment & Booking Automation",
      description: "Let clients book appointments without back-and-forth messages or phone calls.",
      includes: [
        "Appointment Setup Agent (Website/WhatsApp)",
        "Google Calendar/CRM Sync",
        "Confirmation & Reminder Automations",
        "Voice + Chat Integration",
        "No-show Reduction System"
      ],
      perfectFor: "Clinics, salons, consultants, trainers",
      timeline: "Ready in 2 weeks"
    },
    {
      icon: Cog,
      title: "Custom AI Workflows",
      description: "Need something specific? We'll tailor a system just for your business.",
      includes: [
        "Bespoke Integrations (CRM, ERP, etc.)",
        "Hybrid Voice + Chat Flows",
        "Advanced Logic & Routing",
        "Human-in-the-Loop Escalations",
        "Custom Analytics Dashboard"
      ],
      perfectFor: "Enterprises, fast-scaling startups, and niche use cases",
      timeline: "Ready in 3-4 weeks"
    }
  ];


  return (
    <section id="services" className="pt-0 pb-0 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-slide-up py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Solutions That Drive <span className="gradient-text">Real Results</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our specialized AI solutions designed to transform different aspects of your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-2xl group hover:scale-[1.02] transition-all duration-300 work-step-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-ice group-hover:glow-ice-strong transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="mb-6">
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

              <div className="mb-6 pt-4 border-t border-border">
                <span className="text-sm font-medium text-primary">Perfect for: </span>
                <span className="text-sm text-muted-foreground">{service.perfectFor}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
