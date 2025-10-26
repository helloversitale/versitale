import { CircleCheck as CheckCircle } from "lucide-react";
import { AISupportVisualization } from "./ai-support-visualization";

export const AboutSection = () => {
  const keyPoints = [
    "Expert AI implementation specialists",
    "Proven track record in lead generation automation", 
    "Custom solutions tailored to your industry",
    "Ongoing support and optimization"
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="gradient-text">AI Transformation</span> Partners
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="space-y-4 mb-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We specialize in AI customer support solutions that transform how businesses serve their customers through intelligent automation.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Working directly with forward-thinking companies, we implement smart chatbots, customer service automation, and intelligent workflows that deliver measurable results.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our AI-powered solutions help businesses provide 24/7 support, drastically reduce response times, and enable their teams to focus on high-value customer interactions that drive real business growth.
              </p>
            </div>
            
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <AISupportVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};