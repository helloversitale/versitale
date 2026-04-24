import { useParams, Navigate, Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { articles } from "@/data/articles";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <>
      <div className="fixed inset-0 z-0 fixed-page-background">
        <div className="absolute inset-0 work-gradient-overlay pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="min-h-screen pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <Link to="/articles" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            
            <article className="animate-slide-up">
              <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-white/10 py-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </header>

              <div 
                className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ArticleDetail;
