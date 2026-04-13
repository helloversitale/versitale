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

      <div className="relative z-10 container px-8 md:px-12 text-left">
        <div className="max-w-5xl">
          <h1 className="mb-10 leading-[1.2] tracking-tight">
            <span className="block text-[clamp(2.6rem,8vw,6rem)] font-[900] tracking-[-0.04em] gradient-text animate-fade-in opacity-0 pb-1 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              Your Customers Are Searching.
            </span>
            <span className="block text-[clamp(2.6rem,8vw,6rem)] font-[900] tracking-[-0.04em] gradient-text animate-fade-in opacity-0 pb-1 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              Can They Find You?
            </span>
          </h1>

          <p className="text-[1.35rem] md:text-[1.75rem] text-neutral-200 mb-12 max-w-4xl leading-[1.5] animate-fade-in opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
            Websites that get <span className="font-semibold text-white">Aruba businesses</span> found on <span className="font-semibold text-white">Google</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-start items-center sm:items-start mb-6 animate-fade-in opacity-0 [animation-delay:1.2s] [animation-fill-mode:forwards]">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-10 py-6 h-auto font-semibold rounded-full border-2 border-primary/50 text-white bg-transparent hover:bg-primary/10 hover:border-primary transition-all glow-ice"
              onClick={scrollToServices}
            >
              Our Services
            </Button>
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-10 py-6 h-auto font-bold rounded-full bg-gradient-to-r from-[#60CDFF] to-[#00A3FF] border-0 text-black shadow-lg shadow-[#60CDFF]/40 transition-all hover:scale-105 glow-ice-strong"
              onClick={scrollToContact}
            >
              Let's Talk →
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
