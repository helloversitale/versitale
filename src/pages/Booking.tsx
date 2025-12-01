import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCompany, setUserCompany] = useState("");
  const [userIndustry, setUserIndustry] = useState("");
  const [userChallenge, setUserChallenge] = useState("");
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const company = searchParams.get("company");
    const industry = searchParams.get("industry");
    const challenge = searchParams.get("challenge");

    if (!name || !email) {
      navigate("/");
      return;
    }

    setUserName(name);
    setUserEmail(email);
    setUserCompany(company || "");
    setUserIndustry(industry || "");
    setUserChallenge(challenge || "");

    const loadingTimer = setTimeout(() => {
      setIsCalendarLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimer);
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

          <div
            className="service-card p-8 rounded-2xl mb-8 animate-slide-up transition-all duration-500"
            style={{ animationDelay: '0.1s' }}
          >
            {isCalendarLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-200 mb-3">
                  Loading Calendar...
                </h3>

                <p className="text-muted-foreground text-center max-w-md mb-6">
                  We're preparing your personalized booking calendar, {userName}.
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Setting up your appointment options</span>
                </div>
              </div>
            )}

            <div
              className="w-full"
              style={{ opacity: isCalendarLoading ? 0 : 1, transition: 'opacity 0.5s' }}
            >
              <iframe
                src="https://calendar.app.google/qccDHKj6hwSqende7"
                style={{ border: 0, minHeight: '700px', width: '100%' }}
                width="100%"
                height="700"
                frameBorder="0"
                title="Book Your Consultation"
                className="w-full rounded-lg"
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
