import { services } from "./services";
import { articles } from "./articles";

export const SITE_URL = "https://versitale.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/versitale-logo.png`;

export interface RouteMeta {
  /** Route path, exactly as it is served. */
  path: string;
  title: string;
  description: string;
  /** Open Graph type. Defaults to "website". */
  type?: string;
  /** Absolute or root-relative image URL. */
  image?: string;
  /** Keep the route out of the index (and out of the sitemap). */
  noindex?: boolean;
  /** sitemap.xml hints. */
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title:
      "Web Design & SEO Services in Aruba | Versitale AI Solutions | Rank Higher Near Me",
    description:
      "Need a website that actually brings customers? We design, host, and rank websites for Aruba businesses.",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "Web Design & SEO in Aruba | Versitale AI Solutions",
    description:
      "Everything Versitale builds for businesses in Aruba: custom website design, local SEO, hosting and ongoing support. One monthly service, no upfront surprises.",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/articles",
    title: "Web Design & SEO Articles | Versitale AI Solutions",
    description:
      "Insights on web design, local SEO, and growing your business in Aruba.",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/booking",
    title: "Book a Discovery Call | Versitale AI Solutions",
    description:
      "Schedule a 30-minute discovery call with us to see how we can build a revenue-generating website for your Aruba business.",
    // Personalised confirmation page: it requires ?name= and ?email= query
    // params and redirects home without them, so there is nothing for a
    // crawler to index. Kept out of the sitemap and marked noindex.
    noindex: true,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Versitale AI Solutions",
    description:
      "Read how Versitale handles and protects your data inside our Privacy Policy.",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Versitale AI Solutions",
    description:
      "Our terms regarding website creation, maintenance subscriptions, and client responsibilities at Versitale.",
    changefreq: "yearly",
    priority: "0.3",
  },
];

const serviceRoutes: RouteMeta[] = services.map((service) => ({
  path: `/services/${service.slug}`,
  title: service.metaTitle,
  description: service.metaDescription,
  changefreq: "monthly",
  priority: "0.8",
}));

const articleRoutes: RouteMeta[] = articles.map((article) => ({
  path: `/articles/${article.slug}`,
  title: `${article.title} | Versitale AI Solutions`,
  description: article.excerpt,
  type: "article",
  changefreq: "monthly",
  priority: "0.7",
}));

/** The 404 route. Never prerendered as a real URL, never in the sitemap. */
export const notFoundMeta: RouteMeta = {
  path: "/404",
  title: "Page Not Found | Versitale AI Solutions",
  description:
    "The page you're looking for doesn't exist. Return to Versitale's homepage.",
  noindex: true,
};

/** Every indexable route on the site. Drives prerendering and sitemap.xml. */
export const routeMeta: RouteMeta[] = [
  ...staticRoutes,
  ...serviceRoutes,
  ...articleRoutes,
];

const normalize = (pathname: string) => {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

/** Resolve metadata for a pathname. Unknown paths resolve to the 404 metadata. */
export const getRouteMeta = (pathname: string): RouteMeta => {
  const target = normalize(pathname);
  return routeMeta.find((route) => route.path === target) ?? notFoundMeta;
};

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
