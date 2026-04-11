import { PenTool, Rocket, LineChart, ArrowRight } from "lucide-react";

export const HowWeWorkSection = () => {
  const steps = [
    {
      icon: PenTool,
      number: "01",
      title: "Drafting",
      description: "We design and build your website from scratch, tailored to your brand and your goals."
    },
    {
      icon: Rocket,
      number: "02",
      title: "Deployment",
      description: "We handle the hosting, domain, and security. You just sit back and watch your site go live."
    },
    {
      icon: LineChart,
      number: "03",
      title: "Optimization",
      description: "Every month, we update your content and optimize for SEO to ensure you keep winning customers."
    }
  ];

  return (
    <section className="pt-0 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-slide-up py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your New Website in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We make getting a professional website for your Aruba business easier than ever.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="service-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300 h-full flex flex-col work-step-card">
                  <div className="relative mb-6 flex flex-col items-center">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all duration-300"></div>
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl flex items-center justify-center glow-ice group-hover:glow-ice-strong transition-all duration-300 relative z-10">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 px-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[40%] -right-4 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};