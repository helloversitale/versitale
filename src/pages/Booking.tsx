import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [contactSubmissionId, setContactSubmissionId] = useState("");
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const session = searchParams.get("session");

    if (!name || !email) {
      navigate("/");
      return;
    }

    setUserName(name);
    setUserEmail(email);
    if (session) {
      setSessionId(session);
    }

    logBookingPageView(name, email, session);
  }, [searchParams, navigate]);

  const logBookingPageView = async (name: string, email: string, session: string | null) => {
    try {
      const { data: contactData } = await supabase
        .from('contact_submissions')
        .select('id, calendar_session_id')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (contactData) {
        setContactSubmissionId(contactData.id);
        const actualSessionId = session || contactData.calendar_session_id;
        setSessionId(actualSessionId);

        await supabase
          .from('contact_submissions')
          .update({
            booking_link_clicked_at: new Date().toISOString(),
            last_booking_page_view: new Date().toISOString()
          })
          .eq('id', contactData.id);

        await supabase
          .from('booking_page_views')
          .insert({
            contact_submission_id: contactData.id,
            calendar_session_id: actualSessionId,
            viewed_at: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer
          });

        const { data: existingSession } = await supabase
          .from('booking_sessions')
          .select('id')
          .eq('session_id', actualSessionId)
          .maybeSingle();

        if (!existingSession) {
          await supabase
            .from('booking_sessions')
            .insert({
              contact_submission_id: contactData.id,
              session_id: actualSessionId,
              form_submitted_at: contactData.created_at,
              booking_page_viewed_at: new Date().toISOString(),
              status: 'viewing'
            });
        } else {
          await supabase
            .from('booking_sessions')
            .update({
              booking_page_viewed_at: new Date().toISOString(),
              status: 'viewing'
            })
            .eq('session_id', actualSessionId);
        }
      }
    } catch (error) {
      console.error('Error logging booking page view:', error);
    }
  };

  const handleManualBookingConfirmation = async () => {
    if (!contactSubmissionId || bookingConfirmed) return;

    setIsConfirmingBooking(true);

    try {
      const { error: bookingError } = await supabase
        .from('calendar_bookings')
        .insert({
          contact_submission_id: contactSubmissionId,
          booking_type: 'manual',
          calendar_session_id: sessionId,
          status: 'confirmed',
          notes: 'User manually confirmed booking completion'
        });

      if (bookingError) {
        toast.error("Failed to confirm booking. Please try again.");
        setIsConfirmingBooking(false);
        return;
      }

      await supabase
        .from('booking_sessions')
        .update({
          booking_completed_at: new Date().toISOString(),
          status: 'completed'
        })
        .eq('session_id', sessionId);

      setBookingConfirmed(true);
      toast.success("Booking confirmed! We'll send you a confirmation email shortly.");
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsConfirmingBooking(false);
    }
  };

  const calendarUrl = `https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Tgk2JVG0acCDBdQGC6s_7Njb8q7rsFEgmo32RXr1USgKIiOHVNvH2w_uUgdGCF337d1couIjk?gv=true&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;

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
                src={calendarUrl}
                style={{ border: 0, minHeight: '700px' }}
                width="100%"
                height="700"
                frameBorder="0"
                title="Book Your Consultation"
                className="w-full"
              />
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Having trouble with the calendar? <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open in new window</a></p>
            </div>
          </div>

          {!bookingConfirmed && (
            <div className="text-center mt-8">
              <div className="service-card p-6 rounded-xl max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-200 mb-3">Already Booked Your Appointment?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you've completed your booking on Google Calendar, click below to confirm.
                </p>
                <Button
                  onClick={handleManualBookingConfirmation}
                  disabled={isConfirmingBooking}
                  className="glow-ice"
                >
                  {isConfirmingBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirm My Booking
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {bookingConfirmed && (
            <div className="text-center mt-8">
              <div className="service-card p-6 rounded-xl max-w-2xl mx-auto bg-primary/10 border-2 border-primary/30">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-200 mb-2 text-xl">Booking Confirmed!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for confirming your booking. We'll send you a confirmation email with all the details.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="group"
                >
                  <span>Return to Home</span>
                </Button>
              </div>
            </div>
          )}

          {!bookingConfirmed && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="group"
              >
                <span>Return to Home</span>
              </Button>
            </div>
          )}

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
