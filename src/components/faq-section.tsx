import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "How long does it take until my new site is live?",
    answer: "Most of our standard websites for Aruba businesses are live within 2-4 weeks. This includes the complete design, development, and search optimization phases. We'll work closely with you to gather your content and feedback to ensure a smooth, fast launch."
  },
  {
    question: "Do I need to be a tech expert to manage the site?",
    answer: "Not at all. We handle everything from hosting and security to technical updates and SEO. If you need to change a price, add a photo, or update your hours, just send us a message; your monthly plan covers updates so you never have to touch a line of code."
  },
  {
    question: "Is hosting and security included in the monthly price?",
    answer: "Yes, every site we build includes high-speed hosting and SSL security. We ensure your site stays fast and safe for your customers, so you don't have to worry about server maintenance or security patches."
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes. We believe in providing value month after month. There are no long-term contracts; if you're not happy with our service, you can cancel whenever you want. We're here to be your long-term partner, not lock you into a contract."
  },
  {
    question: "Will my website show up on Google Aruba search?",
    answer: "Yes. Every site we build is optimized for SEO from day one. We focus on getting you found by local customers in Aruba by optimizing for the search terms they're actually using every day."
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
    <section id="faq" className="py-12 md:py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our Website as a Service
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
      </div>
    </section>
  );
};
