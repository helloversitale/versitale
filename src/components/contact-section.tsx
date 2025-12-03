import { Mail, Calendar } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ContactSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    challenge: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      industry: formData.industry,
      challenge: formData.challenge
    });

    navigate(`/booking?${params.toString()}`);
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

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enter Details</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-900">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="Your company"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-900">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    required
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger id="industry" className="bg-white border-gray-300">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge" className="text-gray-900">
                  Biggest Challenge <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="challenge"
                  required
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="bg-white border-gray-300 min-h-[100px]"
                  placeholder="Tell us about your biggest business challenge..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};
