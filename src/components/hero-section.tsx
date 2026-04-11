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
          <h1 className="mb-10 leading-[1.05] tracking-tight">
            <span className="block text-[clamp(2.6rem,8vw,6rem)] font-[900] tracking-[-0.04em] gradient-text animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              Your Customers Are Searching.
            </span>
            <span className="block text-[clamp(2.6rem,8vw,6rem)] font-[900] tracking-[-0.04em] gradient-text animate-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              Can They Find You?
            </span>
          </h1>

          <p className="text-[1.35rem] md:text-[1.75rem] text-neutral-200 mb-12 max-w-4xl mx-auto leading-[1.5] animate-fade-in opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
            Websites that get <span className="font-semibold text-white">Aruba businesses</span> found on <span className="font-semibold text-white">Google</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-10 py-6 h-auto glow-ice-strong font-bold"
              onClick={scrollToContact}
            >
              Let's Talk →
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-10 py-6 h-auto font-semibold"
              onClick={scrollToServices}
            >
              Our Services
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
