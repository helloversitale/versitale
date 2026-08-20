import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');

    return () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.setAttribute('content', 'index, follow');
    };
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | Versitale AI Solutions"
        description="The page you're looking for doesn't exist. Return to Versitale's homepage."
        url="https://versitale.com"
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
          <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
          <a href="/" className="text-blue-500 underline hover:text-blue-700">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
