import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { HowWeWorkSection } from "@/components/how-we-work-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { SEO } from "@/components/seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Versitale",
  "image": "https://versitale.com/versitale-logo.png",
  "description": "Versitale builds, hosts, and optimizes websites for businesses in Aruba. Get a website that brings you customers — not headaches.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Oranjestad",
    "addressRegion": "Aruba",
    "addressCountry": "AW"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.5211,
    "longitude": -70.0367
  },
  "url": "https://versitale.com",
  "email": "hello@versitale.com",
  "priceRange": "$$"
};

const Index = () => {
  return (
    <>
      <SEO 
        title="Websites for Businesses in Aruba | Versitale" 
        description="Versitale builds, hosts, and optimizes websites for businesses in Aruba. Get a website that brings you customers — not headaches." 
        url="https://versitale.com"
      />
      <StructuredData data={localBusinessSchema} />
      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="min-h-screen">
          <HeroSection />
          <ServicesSection />
          <HowWeWorkSection />
          <ExpertiseSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
