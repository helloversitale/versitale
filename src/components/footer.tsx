import { Link, useNavigate, useLocation } from "react-router-dom";
import { services } from "@/data/services";

export const Footer = () => {
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
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToSection('hero');
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="bg-secondary/50 border-t border-border py-16 px-8 lg:px-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">

          {/* Column 1 — Branding */}
          <div>
            <div className="mb-6">
              <button onClick={handleLogoClick} className="cursor-pointer">
                <img
                  src="/LogoVersitaletransparent.png"
                  alt="Versitale AI Solutions"
                  className="h-14 w-auto object-contain hover:opacity-80 transition-opacity"
                />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              More Customers.<br />Less Hassle.
            </h2>
            <p className="text-sm text-muted-foreground">
              Built for businesses in Aruba.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Company info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Versitale AI Solutions</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Madiki 40</p>
              <p>Oranjestad, Aruba</p>
            </div>
            <a
              href="https://wa.me/2975641740"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-muted-foreground hover:text-primary transition-colors"
            >
              +297 564 1740
            </a>
            <a
              href="mailto:hello@versitale.com"
              className="block mt-2 text-muted-foreground hover:text-primary transition-colors"
            >
              hello@versitale.com
            </a>
          </div>

        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Versitale AI Solutions. Built in Aruba. For Aruba.
          </p>
        </div>
      </div>
    </footer>
  );
};
