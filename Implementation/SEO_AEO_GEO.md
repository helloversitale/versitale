# SEO, AEO, and GEO Implementation Plan

This document outlines the systematic approach to optimizing the Versitale website for Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).

## Phase 1: On-Page Content & Freshness
**Goal:** Enhance semantic depth and provide the conversational, question-and-answer format that Generative and Answer Engines favor.
*   **Expand FAQs:** Update `src/components/faq-section.tsx` with richer, more directly formulated questions and declarative answers.
*   **Create Articles Infrastructure:** 
    *   Build a new `/articles` route.
    *   Create 3 static article pages providing valuable content related to Versitale's services and the Aruba market.
*   **Semantic HTML Audit (Bonus):** Review all core components (`hero`, `about`, `services`, etc.) to ensure the usage of proper `<main>`, `<article>`, `<section>`, and sequential Heading (H1, H2, H3) structures instead of generic `<div>` tags.

## Phase 2: In-Code JSON-LD Structured Data
**Goal:** Explicitly label content for crawlers to remove the guesswork of parsing website context.
*   Create a reusable component/method to inject JSON-LD into the document `<head>`.
*   **Homepage:** Implement `LocalBusiness` / `ProfessionalService` Schema.
*   **FAQ Section:** Implement `FAQPage` Schema.
*   **Articles:** Implement `Article` Schema for the 3 new static articles.

## Phase 3: Metadata Checks
**Goal:** Ensure every page has a unique, descriptive identity in search results and social shares.
*   Implement `react-helmet-async` (or a global custom React hook) to manage routing metadata.
*   Apply unique `<title>`, `<meta name="description">`, Open Graph (`og:title`, `og:description`), and Twitter Card details to:
    *   `/` (Homepage)
    *   `/booking`
    *   `/privacy-policy`
    *   `/terms-of-service`
    *   `/articles`
    *   All individual article routes.

## Phase 4: Mapping (Sitemap)
**Goal:** Provide search engines a direct map to all active pages.
*   Integrate a solution like `vite-plugin-sitemap` or a post-build generator script.
*   Map all operational endpoints, guaranteeing the inclusion of the newly created `/articles` pathways.

## Phase 5: Gatekeeping (Robots.txt)
**Goal:** Direct crawlers accurately and efficiently to the sitemap.
*   Update `public/robots.txt` to append the official sitemap directive:
    *   `Sitemap: https://yourdomain.com/sitemap.xml` (Ensure domain accuracy).
