import { useParams, Navigate, Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { articles } from "@/data/articles";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { StructuredData } from "@/components/structured-data";
import { SEO } from "@/components/seo";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "url": `https://versitale.com/articles/${article.slug}`,
    "image": {
      "@type": "ImageObject",
      "url": article.image || "https://versitale.com/versitale-logo.png"
    },
    "author": {
      "@type": "Organization",
      "name": article.author
    },
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": new Date(article.date).toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Versitale",
      "logo": {
        "@type": "ImageObject",
        "url": "https://versitale.com/versitale-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://versitale.com/articles/${article.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://versitale.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articles",
        "item": "https://versitale.com/articles"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://versitale.com/articles/${article.slug}`
      }
    ]
  };

  return (
    <>
      <SEO 
        title={`${article.title} | Versitale`}
        description={article.excerpt}
        url={`https://versitale.com/articles/${article.slug}`}
        type="article"
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
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
                className="
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:leading-snug
                  [&_p]:text-muted-foreground [&_p]:leading-loose [&_p]:text-base [&_p]:mb-10
                  [&_a]:text-primary [&_a:hover]:opacity-80
                  [&_strong]:text-foreground
                "
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
