import { Atom, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: Atom,
      title: "Automate Repetitive Tasks",
      description: "Eliminate manual work and free up your team to focus on what matters most.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      accentColor: "text-blue-400"
    },
    {
      icon: Clock,
      title: "Works 24/7",
      description: "AI agents that never sleep, providing consistent service around the clock so you never miss an opportunity.",
      gradient: "from-emerald-500/10 to-green-500/10",
      accentColor: "text-emerald-400"
    },
    {
      icon: TrendingUp,
      title: "Make Smarter Decisions",
      description: "Use AI to make better decisions, connect with customers, and scale with confidence.",
      gradient: "from-amber-500/10 to-orange-500/10",
      accentColor: "text-amber-400"
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary animate-fade-in">
            AI Solutions That Drive Real Results
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your business with intelligent automation and data-driven insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-full bg-background/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 group-hover:bg-background/60">
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <benefit.icon className={`w-12 h-12 ${benefit.accentColor} relative z-10 stroke-[1.5] group-hover:rotate-12 transition-transform duration-500`} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-base text-foreground/80 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>

                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-500"></div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
