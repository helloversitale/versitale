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

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-100 animate-slide-up">
            Your Customers Search Google. <span className="gradient-text">Can They Find You?</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Most Aruba businesses lose customers every day to competitors with better websites. If you're not showing up, you're missing out.
          </p>
        </div>
      </div>
    </section>
  );
};
