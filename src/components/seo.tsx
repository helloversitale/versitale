import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

export const SEO = ({
  title,
  description,
  url = "https://versitale.com",
  image = "https://versitale.com/versitale-logo.png",
  type = "website"
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

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
    setMetaTag('name', 'description', description);

    // Canonical
    setCanonical(url);

    // Open Graph
    const absoluteImage = image.startsWith('http') ? image : `https://versitale.com${image}`;
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:locale', 'en_US');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImage);

  }, [title, description, url, image, type]);

  return null;
};
