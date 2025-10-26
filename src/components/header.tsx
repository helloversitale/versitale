import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToSection('hero');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <img
                src="/LogoVersitaletransparent.png"
                alt="Versitale"
                className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'text-2xl font-bold text-primary';
                  fallback.textContent = 'Versitale';
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          <div className="hidden lg:block">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="glow-ice-strong"
            >
              Book your free consultation
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 animate-slide-up">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </button>
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="w-full mt-2"
              >
                Book your free consultation
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
