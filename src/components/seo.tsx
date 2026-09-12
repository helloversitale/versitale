import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getRouteMeta,
} from '@/data/route-meta';

/**
 * Keeps the document head in sync during client-side navigation.
 *
 * The head is already correct on first paint: every route is prerendered at
 * build time by scripts/prerender.mjs from the same route-meta source this
 * component reads, so the two can't drift apart.
 */
export const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const url = absoluteUrl(meta.path);
    const image = meta.image
      ? meta.image.startsWith('http')
        ? meta.image
        : `${absoluteUrl('/')}${meta.image.replace(/^\//, '')}`
      : DEFAULT_OG_IMAGE;

    document.title = meta.title;

    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Standard meta
    setMetaTag('name', 'description', meta.description);

    // Canonical — per route, never a blanket pointer at the homepage.
    setCanonical(url);

    // Open Graph
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:type', meta.type ?? 'website');
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:locale', 'en_US');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', image);

    // Only the 404 view is noindex. Clear the tag again on any indexable route
    // so a client-side navigation away from /404 doesn't leave it behind.
    const robots = document.querySelector('meta[name="robots"]');
    if (meta.noindex) {
      setMetaTag('name', 'robots', 'noindex, follow');
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);

  return null;
};
