import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "How quickly can AI be implemented in our business?",
    answer: "Most of our AI solutions can be implemented within 3-4 weeks. The timeline depends on the complexity of your requirements and existing systems. We start with a discovery phase to understand your needs, then design, develop, and deploy your custom AI solution. Many clients see initial results within the first week of implementation."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes! We provide comprehensive ongoing support and maintenance for all our AI solutions. This includes 24/7 monitoring, regular updates, performance optimization, and dedicated support channels. We also offer training sessions to ensure your team can make the most of your AI systems. Our goal is to be your long-term AI partner, not just a one-time vendor."
  },
  {
    question: "How does AI integration work with existing systems?",
    answer: "Our AI solutions are designed to integrate seamlessly with your existing tools and workflows. We support integration with popular CRMs, communication platforms, scheduling systems, and custom applications. During the discovery phase, we'll map out all your systems and create a integration plan that ensures smooth data flow and minimal disruption to your operations."
  },
  {
    question: "Can I start with a small project before committing fully?",
    answer: "Yes! We recommend starting with a pilot project to prove the value of AI for your business. Many clients begin with one specific use case (like customer inquiry automation or appointment scheduling) and expand from there. This approach allows you to see tangible results quickly while minimizing risk and investment."
  },
  {
    question: "What ongoing costs should I expect?",
    answer: "Our pricing structure is straightforward and predictable. We have a one-time fee for creating your custom AI Agent, which covers the complete design, development, and deployment of your solution. After that, you'll need to pay for ongoing maintenance, which covers hosting, dedicated support, and continuous improvements to keep your AI solution running optimally. During your free consultation, we'll provide a detailed breakdown based on your specific needs and usage requirements."
  }
];

export const FAQSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="pt-0 pb-20 px-4 relative overflow-hidden">

      <section className="py-20">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our AI solutions
          </p>
        </div>

        <div className="service-card p-8 rounded-2xl mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Schedule a free consultation and we'll answer all your questions
          </p>
          <Button variant="hero" size="lg" onClick={scrollToContact} className="glow-ice-strong">
            Let's Talk About Your Business
          </Button>
        </div>
      </div>
      </section>
    </section>
  );
};
