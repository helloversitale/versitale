import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { articles } from "@/data/articles";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const Articles = () => {
  return (
    <>
      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
        <div className="absolute inset-0 work-grid-pattern pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="min-h-screen pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16 animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Latest <span className="gradient-text">Articles</span>
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-muted-foreground">
                Insights on web design, local SEO, and growing your business in Aruba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link to={`/articles/${article.slug}`} key={article.id} className="group">
                  <div className="service-card h-full p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/5">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium mt-auto group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Articles;
