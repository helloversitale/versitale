import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [heroBackground, setHeroBackground] = useState<string | undefined>(undefined);

  useEffect(() => {
    import('@/assets/hero-ai-background.jpg')
      .then((module) => setHeroBackground(module.default))
      .catch(() => {
        console.warn('Hero background image not found, using gradient fallback');
        setHeroBackground(undefined);
      });
  }, []);
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-gradient pt-20">
      {heroBackground && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
      )}

      <div className="relative z-10 container px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-6 leading-tight">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              AI-Powered Solutions For Your Business
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
            We help businesses automate customer service, generate qualified leads, and scale operations with intelligent AI workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6 h-auto glow-ice-strong"
              onClick={scrollToContact}
            >
              Book Your Free Consultation
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={scrollToServices}
            >
              Explore Our Solutions
            </Button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
