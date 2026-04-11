import { Mail, Calendar, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Consultation Request Sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-0 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Your Business the <span className="gradient-text">Website It Deserves?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Fill out the form below or chat with us on WhatsApp to start your journey 
            toward a professional, customer-winning online presence in Aruba.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold mb-8 text-gray-100">Contact Information</h3>
            
            <div className="service-card p-6 rounded-xl group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Email Us</h4>
                  <a href="mailto:hello@versitale.com" className="text-primary hover:underline text-sm font-medium">
                    hello@versitale.com
                  </a>
                </div>
              </div>
            </div>

            <div className="service-card p-6 rounded-xl group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Quick Response</h4>
                  <p className="text-gray-400 text-sm">Within 24 business hours</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-2xl mt-8">
              <h4 className="text-lg font-medium text-primary mb-4">What You Get:</h4>
              <ul className="space-y-3">
                {[
                  "100% Custom Design",
                  "Managed Hosting Included",
                  "Local SEO Strategy",
                  "WhatsApp Integration Ready"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="service-card p-8 rounded-2xl relative overflow-hidden">
              {isSuccess ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-ice">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for reaching out. Our team of AI experts will review your request and contact you shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                className="bg-black/50 border-white/10 focus:border-primary/50 h-12 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Work Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@company.com" 
                                {...field} 
                                className="bg-black/50 border-white/10 focus:border-primary/50 h-12 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Company Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Universal Corp" 
                                {...field} 
                                className="bg-black/50 border-white/10 focus:border-primary/50 h-12 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary/50 h-12">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-zinc-900 border-white/10 text-gray-200">
                                <SelectItem value="web-design">Website Design & Development</SelectItem>
                                <SelectItem value="hosting">Hosting & Maintenance Plan</SelectItem>
                                <SelectItem value="seo">Local SEO Optimization</SelectItem>
                                <SelectItem value="general">General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">How can we help?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or business challenges..." 
                              className="bg-black/50 border-white/10 focus:border-primary/50 min-h-[120px] transition-all resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold text-lg rounded-xl transition-all glow-ice active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          <span>Request Consultation</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
