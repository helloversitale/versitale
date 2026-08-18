import { Button } from "@/components/ui/button";

const heroBackground = '/hero-ai-background.jpg';

export const HeroSection = () => {
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      <div className="relative z-10 container px-8 md:px-12 text-left">
        <div className="max-w-5xl">
          <h1 className="mb-10 leading-[1.2] tracking-tight">
            <span className="block text-[clamp(2.2rem,6vw,4.5rem)] lg:whitespace-nowrap font-[900] tracking-[-0.04em] gradient-text animate-fade-in pb-1 [animation-delay:0.3s]">
              Web Design & SEO
            </span>
            <span className="block text-[clamp(2.2rem,6vw,4.5rem)] lg:whitespace-nowrap font-[900] tracking-[-0.04em] gradient-text animate-fade-in pb-1 [animation-delay:0.6s]">
              Agency in Aruba
            </span>
          </h1>

          <p className="text-[1.35rem] md:text-[1.75rem] text-neutral-200 mb-12 max-w-4xl leading-[1.5] animate-fade-in [animation-delay:0.9s]">
            Your customers are searching. <span className="font-semibold text-white">Can they find you?</span>
          </p>

          <div className="flex flex-row gap-4 sm:gap-6 justify-start items-center sm:items-start mb-6 animate-fade-in [animation-delay:1.2s]">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none w-full sm:w-auto text-sm sm:text-xl px-4 sm:px-10 py-6 h-auto font-semibold rounded-full border-2 border-primary/50 text-white bg-transparent hover:bg-primary/10 hover:border-primary transition-all glow-ice whitespace-nowrap"
              onClick={scrollToServices}
            >
              Our Services
            </Button>
            <Button
              variant="default"
              size="lg"
              className="flex-1 sm:flex-none w-full sm:w-auto text-sm sm:text-xl px-4 sm:px-10 py-6 h-auto font-bold rounded-full bg-gradient-to-r from-primary to-accent border-0 text-black shadow-lg shadow-primary/40 transition-all hover:scale-105 glow-ice-strong whitespace-nowrap"
              onClick={scrollToContact}
            >
              Let's Talk →
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};
