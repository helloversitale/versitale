import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (!name || !email) {
      navigate("/");
      return;
    }

    setUserName(name);
    setUserEmail(email);

    const script = document.createElement('script');
    script.src = 'https://links.versitale.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [searchParams, navigate]);

  if (!userName || !userEmail) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Form Submitted Successfully</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Great to Meet You, <span className="gradient-text">{userName}</span>!
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
              Thank you for your interest in transforming your business with AI.
              We've received your information and sent a confirmation to <strong className="text-primary">{userEmail}</strong>.
            </p>

            <div className="flex items-center justify-center gap-2 text-lg mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="font-semibold text-gray-200">Next Step: Schedule Your Free Consultation</span>
            </div>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Choose a time that works best for you. Our AI experts are ready to discuss your specific
              challenges and show you how we can accelerate your business growth.
            </p>
          </div>

          <div className="service-card p-6 rounded-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white/95 rounded-lg border-2 border-primary/20 overflow-hidden">
              <iframe
                src="https://links.versitale.com/widget/booking/k5tW4IVPbNHvga6Vnw1b"
                style={{ border: 0, minHeight: '700px', width: '100%' }}
                width="100%"
                height="700"
                scrolling="no"
                id="k5tW4IVPbNHvga6Vnw1b_calendar"
                title="Book Your Consultation"
                className="w-full"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="group"
            >
              <span>Return to Home</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="service-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">Free Consultation</h3>
              <p className="text-sm text-gray-400">No commitment, just expert insights for your business</p>
            </div>

            <div className="service-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">30-Minute Session</h3>
              <p className="text-sm text-gray-400">Focused discussion on your specific challenges</p>
            </div>

            <div className="service-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">Actionable Plan</h3>
              <p className="text-sm text-gray-400">Walk away with clear next steps for AI implementation</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;
