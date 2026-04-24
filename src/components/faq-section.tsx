import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "How long does it take to build a website for a business in Aruba?",
    answer: "Most of our standard websites for Aruba businesses are live within 2-4 weeks. This timeframe includes the complete design, development, and initial search engine optimization (SEO) phases. We work closely with you to gather your content and feedback to ensure a smooth, extremely fast launch."
  },
  {
    question: "Do I need technical skills to manage my new website?",
    answer: "Not at all. We handle exactly everything from high-speed hosting and security to technical updates and SEO. If you need to change a price, add a new photo, or update your business hours, simply send us a message. Your monthly plan covers continuous updates so you never have to touch a single line of code."
  },
  {
    question: "Are website hosting, security, and maintenance included?",
    answer: "Yes, absolutely. Every professional site we build includes premium, high-speed hosting and SSL security. We ensure your website stays fast, reliable, and perfectly safe for your customers. We actively take care of server maintenance and security patches behind the scenes."
  },
  {
    question: "Why do you use a monthly subscription model (Website as a Service)?",
    answer: "Unlike traditional agencies that charge thousands upfront and leave you with an outdated site a year later, our subscription model aligns our success with yours. The flat monthly fee covers creation, unlimited updates, premium hosting, and ongoing local SEO, allowing you to focus purely on your business without unexpected costs."
  },
  {
    question: "How do you optimize my website for Google searches in Aruba (SEO)?",
    answer: "Every site we build is intricately optimized for SEO from day one. We identify and target the specific search terms local and tourist customers in Aruba are actively using. This includes optimizing on-page content, meta descriptions, image alt tags, and implementing proper JSON-LD structured data."
  },
  {
    question: "Am I locked into a long-term contract?",
    answer: "No. We believe in providing immense value month after month to earn your business. There are zero long-term contracts; if you're not entirely satisfied with our service, you can cancel at any time. We strive to be your long-term digital growth partner, not just a service provider."
  }
];

import { StructuredData } from "./structured-data";

export const FAQSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-12 md:py-20 px-4 relative overflow-hidden">
      <StructuredData data={faqSchema} />
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
