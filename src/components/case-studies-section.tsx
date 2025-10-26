import { Button } from "./ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const caseStudies = [
  {
    industry: "Healthcare",
    company: "Caribbean Medical Center",
    challenge: "Overwhelmed staff handling 200+ daily patient calls, leading to long wait times and missed appointments",
    solution: "Implemented AI-powered patient scheduling and inquiry management system with HIPAA compliance",
    results: [
      "75% reduction in phone wait times",
      "95% appointment booking accuracy",
      "20 hours/week staff time saved",
      "Significant monthly operational savings"
    ],
    image: "https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    industry: "Real Estate",
    company: "Island Properties Group",
    challenge: "Missing 60% of after-hours property inquiries, losing potential buyers to competitors",
    solution: "Deployed 24/7 AI assistant for property inquiries, viewing scheduling, and lead qualification",
    results: [
      "3x increase in qualified leads",
      "100% inquiry response rate",
      "45% faster sales cycle",
      "Substantial increase in annual revenue"
    ],
    image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    industry: "Dental Clinics",
    company: "Palm Beach Dental Center",
    challenge: "Staff overwhelmed with appointment scheduling calls and patient inquiries, resulting in missed bookings and frustrated patients",
    solution: "Implemented AI-powered appointment scheduling and patient inquiry system with 24/7 availability",
    results: [
      "500+ patient inquiries handled monthly",
      "95% patient satisfaction rate",
      "40% reduction in missed appointments",
      "4.9-star average review rating"
    ],
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const CaseStudiesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="case-studies" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Results from <span className="gradient-text">Real Businesses</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how businesses like yours transformed their operations with custom AI solutions
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-2xl grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-primary/20 rounded-full mb-4">
                  <span className="text-primary font-semibold text-sm">{study.industry}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{study.company}</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-red-400">Challenge:</span>
                  </h4>
                  <p className="text-muted-foreground">{study.challenge}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-blue-400">Solution:</span>
                  </h4>
                  <p className="text-muted-foreground">{study.solution}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Results:</span>
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="hero-outline" onClick={scrollToContact}>
                  Get Similar Results for Your Company
                </Button>
              </div>

              <div className="order-1 md:order-2">
                <img
                  src={study.image}
                  alt={study.industry}
                  className="w-full h-64 md:h-80 object-cover rounded-xl border-2 border-primary/20"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl">
              Join dozens of businesses achieving remarkable results with custom AI automation
            </p>
            <Button variant="hero" size="lg" onClick={scrollToContact} className="glow-ice-strong">
              Start Your AI Transformation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
