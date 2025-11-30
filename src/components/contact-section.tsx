import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    challenge: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (showCalendar) {
      const script = document.createElement('script');
      script.src = 'https://links.versitale.com/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showCalendar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company || !formData.industry || !formData.challenge) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          'Email Address': formData.email,
          'Company Name': formData.company,
          Industry: formData.industry,
          'Biggest Challenge': formData.challenge,
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }

      toast.success(`Thank you, ${formData.name}! Now schedule your free session below.`);

      setSubmittedName(formData.name);
      setShowCalendar(true);

    } catch (error) {
      console.error('Submission error:', error);
      if (error instanceof Error) {
        toast.error(`Failed to submit: ${error.message}`);
      } else {
        toast.error("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditForm = () => {
    setShowCalendar(false);
    setSubmittedName("");
  };

  return (
    <section id="contact" className="pt-0 pb-20 px-4 relative overflow-hidden">
      <section className="py-20">

      <div className="container mx-auto max-w-6xl relative z-10 py-0">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Business with <span className="gradient-text">AI?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Get a free consultation and discover how AI can transform your operations,
            generate more leads, and drive unprecedented growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="service-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-ice">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Email Us</h4>
                  <a href="mailto:hello@versitale.com" className="text-primary hover:underline text-sm">
                    hello@versitale.com
                  </a>
                </div>
              </div>
            </div>

            <div className="service-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-ice">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Quick Response</h4>
                  <p className="text-gray-400 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {!showCalendar ? (
            <div className="service-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border focus:border-primary transition-colors text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border focus:border-primary transition-colors text-foreground"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-200">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border focus:border-primary transition-colors text-foreground"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-2 text-gray-200">
                    Industry *
                  </label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                    required
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Dental Clinics">Dental Clinics</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-medium mb-2 text-gray-200">
                  Biggest Challenge *
                </label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-input border-border focus:border-primary transition-colors resize-none text-foreground"
                  placeholder="Describe your current challenges and how you think AI could help your business..."
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full text-lg py-6 h-auto glow-ice-strong"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Your Information...
                  </>
                ) : (
                  "Claim My Free Session"
                )}
              </Button>

              <p className="text-xs text-center text-gray-400">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          </div>
          ) : (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Information Submitted Successfully</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Great to Meet You, <span className="gradient-text">{submittedName}</span>!
                </h3>

                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
                  Thank you for your interest in transforming your business with AI.
                  We've received your information and will be in touch soon.
                </p>

                <div className="flex items-center justify-center gap-2 text-lg mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-gray-200">Next Step: Schedule Your Free Consultation</span>
                </div>

                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Choose a time that works best for you. Our AI experts are ready to discuss your specific
                  challenges and show you how we can accelerate your business growth.
                </p>
              </div>

              <div className="service-card p-6 rounded-2xl">
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

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleEditForm}
                  className="group"
                >
                  <span>Edit My Information</span>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="service-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Free Consultation</h4>
                  <p className="text-sm text-gray-400">No commitment, just expert insights for your business</p>
                </div>

                <div className="service-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">30-Minute Session</h4>
                  <p className="text-sm text-gray-400">Focused discussion on your specific challenges</p>
                </div>

                <div className="service-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-ice">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Actionable Plan</h4>
                  <p className="text-sm text-gray-400">Walk away with clear next steps for AI implementation</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </section>
    </section>
  );
};
