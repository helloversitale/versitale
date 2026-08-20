import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";
import { StructuredData } from "@/components/structured-data";
import { services } from "@/data/services";

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Versitale Services",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.title,
      "url": `https://versitale.com/services/${service.slug}`
    }))
  };

  return (
    <>
      <SEO
        title="Web Design & SEO in Aruba | Versitale AI Solutions"
        description="Everything Versitale builds for businesses in Aruba: custom website design, local SEO, hosting and ongoing support. One monthly service, no upfront surprises."
        url="https://versitale.com/services"
      />
      <StructuredData data={servicesSchema} />

      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="min-h-screen pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">

            {/* Page heading */}
            <div className="text-center mb-20 animate-slide-up">
              <div className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full">
                What We Do
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Designed, built, hosted and optimized every month, so you can focus on running your business while your website runs your marketing.
              </p>
            </div>

            {/* Service cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              {services.map((service) => (
                <Link to={`/services/${service.slug}`} key={service.id} className="group">
                  <div className="service-card work-step-card h-full p-8 rounded-2xl flex flex-col border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-ice group-hover:glow-ice-strong transition-all duration-300 flex-shrink-0">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">{service.tagline}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {service.excerpt}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {service.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center text-primary font-medium mt-auto">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Closing CTA */}
            <div className="max-w-4xl mx-auto px-6 py-14 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Not sure which one you need?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Tell us about your business and we will tell you honestly what would move the needle. No pressure, no jargon.
              </p>
              <Button variant="hero" size="lg" onClick={goToContact} className="glow-ice-strong">
                Let's Talk
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
