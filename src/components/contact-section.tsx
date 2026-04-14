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
    <section id="contact" className="py-12 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Your Business the <span className="gradient-text">Website It Deserves?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Fill out the form below to start your journey 
            toward a professional, customer-winning online presence in Aruba.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <div className="w-full">
            <div className="service-card p-8 rounded-2xl relative overflow-hidden">
              {isSuccess ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-ice">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for reaching out. Our team will review your request and contact you shortly.
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
                      className="w-full h-14 bg-gradient-to-r from-[#00E5FF] to-[#00A3FF] hover:from-[#33EAFF] hover:to-[#22B2FF] text-black font-extrabold text-lg rounded-full transition-all duration-500 shadow-lg shadow-[#00E5FF]/20 hover:shadow-[#00E5FF]/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                      {isSubmitting ? (
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin"></div>
                          <span>Processing Request...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 relative z-10">
                          <Send className="w-5 h-5" />
                          <span>Check Availability</span>
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
