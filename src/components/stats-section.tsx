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
        <div className="text-center mb-16 space-y-4 px-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-100 animate-slide-up">
            Right Now, Customers Are Searching for What You Sell — and <span className="gradient-text">Finding Your Competitor Instead</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Every day, people in Aruba search Google for restaurants, plumbers, car rentals, salons, lawyers, and every other local service you can think of.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative bg-background/40 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 glow-ice group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  If your business doesn't have a professional website — or has one that hasn't been updated since 2019 — those customers go somewhere else.
                </p>
                <p className="text-xl md:text-2xl font-semibold text-primary">
                  It's not that your service is worse. It's that you're invisible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
