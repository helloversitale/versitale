import { Bot, MessageCircle, Clock, TrendingUp, Zap, Users } from "lucide-react";
import { useState, useEffect } from "react";

export const AISupportVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: MessageCircle,
      label: "Customer Query",
      description: "24/7 instant response"
    },
    {
      icon: Bot,
      label: "AI Processing",
      description: "Intelligent routing"
    },
    {
      icon: Zap,
      label: "Instant Solution",
      description: "Automated resolution"
    },
    {
      icon: TrendingUp,
      label: "Happy Customer",
      description: "Improved satisfaction"
    }
  ];

  const benefits = [
    { icon: Clock, value: "80%", label: "Faster Response" },
    { icon: Users, value: "3x", label: "More Capacity" },
    { icon: TrendingUp, value: "95%", label: "Satisfaction Rate" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="service-card p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">AI Customer Support Flow</h3>
        <p className="text-muted-foreground">See how AI transforms your support</p>
      </div>

      <div className="relative mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-primary/20 z-0">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div key={index} className="flex flex-col items-center relative z-10 flex-1">
                <div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-3
                    transition-all duration-500 transform
                    ${isActive
                      ? 'bg-primary scale-110 shadow-lg shadow-primary/50'
                      : isPast
                        ? 'bg-primary/60'
                        : 'bg-primary/20'
                    }
                    ${isActive ? 'animate-pulse' : ''}
                  `}
                >
                  <Icon
                    className={`
                      w-8 h-8 transition-all duration-500
                      ${isActive || isPast ? 'text-primary-foreground' : 'text-muted-foreground'}
                    `}
                  />
                </div>
                <p className={`
                  text-sm font-semibold text-center mb-1 transition-all duration-300
                  ${isActive ? 'text-foreground scale-105' : 'text-muted-foreground'}
                `}>
                  {step.label}
                </p>
                <p className={`
                  text-xs text-center transition-all duration-300
                  ${isActive ? 'text-muted-foreground opacity-100' : 'text-muted-foreground opacity-60'}
                `}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">{benefit.value}</div>
              <div className="text-xs text-muted-foreground">{benefit.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
