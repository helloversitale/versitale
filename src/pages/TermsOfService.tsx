import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="min-h-screen flex flex-col relative z-10">
        <Header />

        <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="service-card p-8 rounded-2xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Versitale. These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using the service, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Services Provided</h2>
              <p className="text-muted-foreground leading-relaxed">
                Versitale provides AI strategy, Autonomous Agent Development, Enterprise Consulting, Chatbot Development and these services are subject to the terms and conditions outlined in this document.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this site. Your continued use of the service after such changes constitutes your agreement to the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Account Registration and Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                To access certain features of our service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Privacy Policy, which describes how we handle personal data, is available on our website and forms part of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to use the service only for lawful purposes and not to use the service for any illegal or unauthorized purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All intellectual property rights in the service and its content are the exclusive property of Versitale or its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service may contain links to third-party websites or services that are not owned or controlled by Versitale. We have no control over, and assume no responsibility for, the content or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Aruba, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to withdraw or amend our service, and any service or material we provide via the service, in our sole discretion without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Disclaimer and Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                The service and its content are provided "as is" without warranty of any kind. In no event will Versitale, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any questions about these Terms, please contact us using the following information:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-semibold text-foreground">Email address:</span> hello@versitale.com</p>
                <p><span className="font-semibold text-foreground">Location:</span> Aruba</p>
              </div>
            </section>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
}
