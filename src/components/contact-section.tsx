import { Mail, Calendar } from "lucide-react";
import { useEffect } from "react";

export const ContactSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://links.versitale.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

          <div style={{ minHeight: '492px' }}>
            <iframe
              src="https://links.versitale.com/widget/form/DwUt6J4Oah4FgMD0HqQ8"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
              id="inline-DwUt6J4Oah4FgMD0HqQ8"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Submission "
              data-height="492"
              data-layout-iframe-id="inline-DwUt6J4Oah4FgMD0HqQ8"
              data-form-id="DwUt6J4Oah4FgMD0HqQ8"
              title="Website Submission "
            />
          </div>
        </div>
      </div>
      </section>
    </section>
  );
};
