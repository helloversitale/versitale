import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Calendar, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const ContactSection = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company || !formData.industry || !formData.challenge) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          companyName: formData.company,
          industry: formData.industry,
          biggestChallenge: formData.challenge,
          submittedAt: new Date().toISOString()
        })
      });

      if (!webhookResponse.ok) {
        throw new Error('Webhook submission failed');
      }

      toast.success("Thank you! Redirecting to booking page...");

      setFormData({
        name: "",
        email: "",
        company: "",
        industry: "",
        challenge: ""
      });

      setTimeout(() => {
        navigate(`/booking?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`);
      }, 1500);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
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
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Location</h4>
                  <p className="text-gray-400 text-sm">Aruba & Globally</p>
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
                  <Select onValueChange={(value) => handleSelectChange("industry", value)} required>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="dental-clinics">Dental Clinics</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
        </div>
      </div>
      </section>
    </section>
  );
};
