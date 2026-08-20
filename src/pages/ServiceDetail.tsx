import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";
import { StructuredData } from "@/components/structured-data";
import { getServiceBySlug } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceUrl = `https://versitale.com/services/${service.slug}`;

  const goToContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "url": serviceUrl,
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "Versitale AI Solutions",
      "url": "https://versitale.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://versitale.com/versitale-logo.png"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Aruba"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://versitale.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://versitale.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": serviceUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        url={serviceUrl}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="min-h-screen pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All Services
            </Link>

            {/* Hero */}
            <div className="mb-20 animate-slide-up">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-ice flex-shrink-0">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  {service.tagline}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1]">
                {service.heroHeadline} <span className="gradient-text">{service.heroHighlight}</span>
              </h1>
              <div className="w-24 h-1 bg-primary mb-8 rounded-full"></div>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
                {service.heroIntro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" onClick={goToContact} className="glow-ice-strong">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/articles">Read Our Articles</Link>
                </Button>
              </div>
            </div>

            {/* What you get */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You <span className="gradient-text">Get</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                {service.deliverablesIntro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {service.deliverables.map((item, index) => (
                  <div
                    key={index}
                    className="service-card work-step-card p-8 rounded-2xl group hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center glow-ice group-hover:glow-ice-strong transition-all duration-300 mb-5">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                {service.processIntro}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((step, index) => (
                  <div key={index} className="service-card work-step-card p-6 rounded-2xl h-full">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mb-4 glow-ice">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Included + ideal for */}
            <section className="grid lg:grid-cols-2 gap-8 mb-24">
              <div className="service-card work-step-card p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
                  {service.includes.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card work-step-card p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">This Is For You If</h2>
                <ul className="space-y-3">
                  {service.idealFor.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="service-card work-step-card p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Closing CTA */}
            <div className="px-6 py-16 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {service.ctaHeadline} <span className="gradient-text">{service.ctaHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                {service.ctaIntro}
              </p>
              <Button variant="hero" size="lg" onClick={goToContact} className="glow-ice-strong">
                Let&apos;s Talk
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

export default ServiceDetail;
