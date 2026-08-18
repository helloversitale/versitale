import {
  Layout,
  Smartphone,
  Gauge,
  Search,
  PenTool,
  ShieldCheck,
  MapPin,
  FileText,
  Link2,
  BarChart3,
  Target,
  Building2,
  Star,
  Camera,
  MessageSquare,
  ClipboardList,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDeliverable {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  excerpt: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroHighlight: string;
  heroIntro: string;
  highlights: string[];
  deliverablesIntro: string;
  deliverables: ServiceDeliverable[];
  includes: string[];
  processIntro: string;
  process: ServiceStep[];
  idealFor: string[];
  faqs: ServiceFaq[];
  ctaHeadline: string;
  ctaHighlight: string;
  ctaIntro: string;
}

export const services: Service[] = [
  {
    id: 1,
    slug: "website-designer",
    title: "Website Designer",
    tagline: "Custom websites designed and built for Aruba businesses",
    excerpt:
      "A website that looks the way your business deserves to look, loads fast on every phone, and turns visitors into paying customers.",
    icon: Layout,
    metaTitle: "Website Designer in Aruba | Versitale",
    metaDescription:
      "Custom website design for businesses in Aruba. Mobile-first, fast, SEO-ready websites that turn visitors into customers. Designed, built, hosted and maintained by Versitale.",
    heroHeadline: "Website",
    heroHighlight: "Designer",
    heroIntro:
      "Your website is the first thing a customer sees before they ever walk through your door. We design and build it from scratch, tailored to your business in Aruba, so that first impression works in your favor.",
    highlights: [
      "Custom design, no templates",
      "Built mobile-first",
      "Live in 2 to 4 weeks",
    ],
    deliverablesIntro:
      "Every website we design is built on the same foundation, whether you run a restaurant, a tour company or a repair shop.",
    deliverables: [
      {
        icon: PenTool,
        title: "Custom Design",
        description:
          "No recycled templates. Every layout, color and typeface is chosen around your business, your customers and the way people actually buy in Aruba.",
      },
      {
        icon: Smartphone,
        title: "Mobile-First Build",
        description:
          "Most of your visitors arrive on a phone. We design for that screen first, then scale up, so nothing is cramped, cut off or hard to tap.",
      },
      {
        icon: Gauge,
        title: "Fast By Default",
        description:
          "Optimized images, clean code and modern hosting. Pages load in a blink, which keeps visitors on the site and keeps Google happy.",
      },
      {
        icon: Search,
        title: "SEO-Ready Structure",
        description:
          "Proper headings, metadata, sitemaps and local business markup are built in from day one, so you start showing up in search instead of hoping to.",
      },
      {
        icon: ShieldCheck,
        title: "Hosted & Maintained",
        description:
          "We keep it online, secure and up to date. No plugin updates to chase, no hosting bills to juggle, no surprise downtime.",
      },
      {
        icon: Layout,
        title: "Built to Convert",
        description:
          "Clear calls to action, booking links and contact forms placed where visitors are ready to act, so traffic turns into real enquiries.",
      },
    ],
    includes: [
      "Discovery call and site strategy",
      "Custom, mobile-first page design",
      "Copywriting support for every page",
      "Contact and enquiry forms",
      "WhatsApp and booking integration",
      "Google Business Profile alignment",
      "On-page SEO and local search setup",
      "Speed and performance tuning",
      "Hosting, SSL and daily backups",
      "Ongoing updates and support",
    ],
    processIntro:
      "Four steps from first conversation to a website that is live and earning its keep.",
    process: [
      {
        title: "Discovery",
        description:
          "A short call to understand your business, your customers and what a win actually looks like for you.",
      },
      {
        title: "Design",
        description:
          "We design your pages and share them with you early. You give feedback before a single line of code is written.",
      },
      {
        title: "Build",
        description:
          "Your approved design is built into a fast, mobile-first website with everything wired up: forms, bookings, tracking, SEO.",
      },
      {
        title: "Launch",
        description:
          "We handle the domain, hosting and go-live. Then we keep the site updated, monitored and improving month after month.",
      },
    ],
    idealFor: [
      "Businesses with no website at all",
      "Outdated sites that look wrong on a phone",
      "Restaurants, tours and hospitality",
      "Trades, services and local shops",
      "Anyone losing customers to better-looking competitors",
    ],
    faqs: [
      {
        question: "How long does it take to get my website live?",
        answer:
          "Most projects go live within two to four weeks. The biggest factor is how quickly we get your content, photos and feedback.",
      },
      {
        question: "Do I own my website?",
        answer:
          "Yes. The design and content are yours. We handle the hosting and maintenance so you never have to think about the technical side.",
      },
      {
        question: "Can you write the content for me?",
        answer:
          "We can. Most clients give us a rough idea of what they do and we shape it into clear copy that reads well and ranks well.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We keep the site hosted, secure, backed up and updated, and we make changes as your business changes. It is a service, not a one-off build.",
      },
    ],
    ctaHeadline: "Ready for a website that",
    ctaHighlight: "actually works?",
    ctaIntro:
      "Tell us about your business and we will show you exactly what your new site could look like.",
  },
  {
    id: 2,
    slug: "seo",
    title: "SEO",
    tagline: "Get found on Google when customers search in Aruba",
    excerpt:
      "The best website in the world is worthless if nobody sees it. We get your business ranking for the searches your customers are already making.",
    icon: Search,
    metaTitle: "SEO Services in Aruba | Local Search Optimization | Versitale",
    metaDescription:
      "Local SEO for businesses in Aruba. Rank higher on Google, win the map pack, and turn searches into customers. Keyword research, on-page SEO, Google Business Profile and monthly reporting by Versitale.",
    heroHeadline: "SEO That Gets You",
    heroHighlight: "Found",
    heroIntro:
      "Every day, people in Aruba search Google for exactly what you sell. If your competitors show up and you do not, those customers are gone before they ever hear your name. We fix that, month after month.",
    highlights: [
      "Local and map pack focused",
      "Monthly reporting, plain English",
      "First results in 60 to 90 days",
    ],
    deliverablesIntro:
      "SEO is not one job, it is several working together. Here is what we handle so you never have to think about it.",
    deliverables: [
      {
        icon: Target,
        title: "Keyword Research",
        description:
          "We find the exact phrases your customers type, in English, Papiamento, Dutch or Spanish, and prioritize the ones that actually bring in business.",
      },
      {
        icon: MapPin,
        title: "Local & Map Pack SEO",
        description:
          "Your Google Business Profile, categories, service areas, photos and reviews, all tuned so you appear in the map results where local searches convert best.",
      },
      {
        icon: FileText,
        title: "On-Page Optimization",
        description:
          "Titles, headings, metadata, internal links and page copy rewritten around your target searches without making it read like it was written for a robot.",
      },
      {
        icon: Gauge,
        title: "Technical SEO",
        description:
          "Site speed, mobile usability, indexing, sitemaps, schema markup and broken links. The unglamorous work that decides whether Google trusts your site.",
      },
      {
        icon: Link2,
        title: "Local Authority Building",
        description:
          "Consistent listings across the directories that matter in Aruba, plus genuine local citations, so search engines are confident you are who you say you are.",
      },
      {
        icon: BarChart3,
        title: "Monthly Reporting",
        description:
          "A short, clear report each month: what you rank for, how many people found you, and what we are doing next. No 40-page dashboards nobody reads.",
      },
    ],
    includes: [
      "Full SEO audit of your current site",
      "Keyword and competitor research",
      "Google Business Profile optimization",
      "On-page SEO for every key page",
      "Technical fixes and schema markup",
      "Local citations and directory listings",
      "Review generation strategy",
      "Google Search Console and Analytics setup",
      "Ongoing content recommendations",
      "Monthly ranking and traffic report",
    ],
    processIntro:
      "SEO is a long game, but the path is straightforward and you will see exactly where you stand at every stage.",
    process: [
      {
        title: "Audit",
        description:
          "We review your site, your rankings and your competitors to see precisely why you are not showing up yet.",
      },
      {
        title: "Strategy",
        description:
          "We agree on the searches worth winning and the pages that will win them, then map it into a monthly plan.",
      },
      {
        title: "Optimize",
        description:
          "On-page, technical and local work goes live. Your profile, listings and content all start pulling in the same direction.",
      },
      {
        title: "Track & Improve",
        description:
          "Every month we measure, report and adjust. Rankings compound, so the work you do now keeps paying later.",
      },
    ],
    idealFor: [
      "Businesses invisible on page one of Google",
      "Anyone relying only on word of mouth",
      "Restaurants, tours and hotels competing for tourist searches",
      "Trades and services chasing local customers",
      "Sites that look good but bring in no enquiries",
    ],
    faqs: [
      {
        question: "How long before I see results?",
        answer:
          "Local map pack improvements often show within 30 to 60 days. Competitive search rankings usually take three to six months of consistent work.",
      },
      {
        question: "Can you guarantee I rank number one?",
        answer:
          "Nobody can, and anyone who promises it is selling you something. What we guarantee is the work: the audit, the fixes, the monthly effort and honest reporting on where you stand.",
      },
      {
        question: "Do I need a new website first?",
        answer:
          "Not always. If your current site is fast and structured well, we optimize what you have. If it is holding you back, we will tell you straight.",
      },
      {
        question: "What if I stop after a few months?",
        answer:
          "The on-page and technical work stays with your site. Rankings do fade over time without upkeep, since competitors keep working, which is why SEO runs monthly.",
      },
    ],
    ctaHeadline: "Ready to show up when",
    ctaHighlight: "customers search?",
    ctaIntro:
      "Tell us about your business and we will show you what you are currently ranking for and what you are missing.",
  },
  {
    id: 3,
    slug: "google-business-profile-optimization",
    title: "Google Business Profile Optimization",
    tagline: "Own the map results where local customers decide",
    excerpt:
      "Your Google Business Profile is the first thing most people in Aruba see about you, often before your website. We turn it into a listing that ranks, convinces and gets the call.",
    icon: Building2,
    metaTitle: "Google Business Profile Optimization in Aruba | Versitale",
    metaDescription:
      "Google Business Profile optimization for Aruba businesses. Rank in the map pack, get more calls and directions, manage reviews and keep your listing accurate. Set up and managed by Versitale.",
    heroHeadline: "Google Business Profile",
    heroHighlight: "Optimization",
    heroIntro:
      "When someone searches \"near me\" in Aruba, Google shows three businesses on a map before it shows a single website. Your profile decides whether you are one of them, and whether the person tapping it calls you or your competitor.",
    highlights: [
      "Map pack visibility",
      "More calls, directions and clicks",
      "Reviews handled for you",
    ],
    deliverablesIntro:
      "A profile is not something you fill in once and forget. Here is what we set up, and then keep working, every month.",
    deliverables: [
      {
        icon: ClipboardList,
        title: "Full Profile Setup",
        description:
          "Claiming, verification, categories, services, attributes, hours and holiday hours. Every field Google offers, filled in correctly, because empty fields cost you rankings.",
      },
      {
        icon: MapPin,
        title: "Map Pack Ranking",
        description:
          "Service areas, location signals and category strategy tuned so you appear in the three-result map pack for the searches that matter near you.",
      },
      {
        icon: Star,
        title: "Review Management",
        description:
          "A simple system to ask happy customers for reviews, plus professional replies to every review, good or bad. Reviews are a ranking factor and a deciding factor.",
      },
      {
        icon: Camera,
        title: "Photos & Visuals",
        description:
          "Properly sized, geo-relevant photos of your place, your team and your work, refreshed regularly. Profiles with current photos get noticeably more clicks.",
      },
      {
        icon: MessageSquare,
        title: "Posts & Updates",
        description:
          "Offers, events and announcements posted to your profile so it looks active and gives searchers a reason to choose you today.",
      },
      {
        icon: BarChart3,
        title: "Insights & Reporting",
        description:
          "How many people found you, what they searched, and how many called, messaged or asked for directions. Reported monthly in plain language.",
      },
    ],
    includes: [
      "Profile claiming and verification",
      "Category and service optimization",
      "Complete business information audit",
      "Service area and location setup",
      "Photo optimization and uploads",
      "Review request system",
      "Ongoing review responses",
      "Monthly Google posts",
      "Q&A section seeding and monitoring",
      "Monthly performance insights report",
    ],
    processIntro:
      "From an unclaimed or half-finished listing to a profile that works for you, in four steps.",
    process: [
      {
        title: "Claim & Audit",
        description:
          "We claim or gain access to your profile, verify it, and audit every field against what Google rewards.",
      },
      {
        title: "Optimize",
        description:
          "Categories, services, description, attributes and photos are rebuilt around the searches your customers actually use.",
      },
      {
        title: "Activate",
        description:
          "Reviews start coming in, posts go live, and the Q&A section gets seeded with the questions people really ask you.",
      },
      {
        title: "Maintain",
        description:
          "We keep hours accurate, reviews answered and posts fresh, then report what it brought in each month.",
      },
    ],
    idealFor: [
      "Businesses with an unclaimed or outdated listing",
      "Anyone missing from the Google map results",
      "Restaurants, salons and shops customers walk into",
      "Trades and services covering areas across Aruba",
      "Businesses with few reviews, or bad ones going unanswered",
    ],
    faqs: [
      {
        question: "Is this not already part of your SEO service?",
        answer:
          "Local SEO includes profile optimization as one piece of a bigger plan. This service goes deeper: ongoing reviews, posts, photos and Q&A management, month after month. Many businesses start here because it is the fastest visibility win.",
      },
      {
        question: "I do not have a storefront. Can I still be listed?",
        answer:
          "Yes. Google allows service-area businesses to hide their address and show the areas they cover instead. We set that up properly so you rank without publishing your home address.",
      },
      {
        question: "How fast does this work?",
        answer:
          "A neglected profile often improves within two to four weeks. Map rankings in competitive categories keep climbing over a few months as reviews and activity build up.",
      },
      {
        question: "Can you remove a bad review?",
        answer:
          "Only Google can, and only if it breaks their policies. We flag those that do, and reply professionally to the rest, which often matters more to the next customer reading it.",
      },
    ],
    ctaHeadline: "Ready to show up on",
    ctaHighlight: "the map?",
    ctaIntro:
      "Send us your business name and we will tell you exactly what your profile is missing right now.",
  },
  {
    id: 4,
    slug: "e-commerce",
    title: "E-Commerce",
    tagline: "Sell online to Aruba and beyond, around the clock",
    excerpt:
      "An online store that takes payment while you sleep, handles local delivery and pickup, and is genuinely easy for you to run day to day.",
    icon: ShoppingCart,
    metaTitle: "E-Commerce Website Development in Aruba | Versitale",
    metaDescription:
      "Online stores built for Aruba businesses. Secure checkout, local delivery and pickup, inventory management and a store you can actually run yourself. Designed, built and maintained by Versitale.",
    heroHeadline: "Sell Online,",
    heroHighlight: "Every Day",
    heroIntro:
      "Your shop closes at six. Your store does not have to. We build online stores that take orders from locals and tourists alike, handle payment and delivery cleanly, and stay simple enough that you can add a product without calling anyone.",
    highlights: [
      "Secure checkout on any device",
      "Local delivery and pickup built in",
      "You manage products yourself",
    ],
    deliverablesIntro:
      "Selling online is a system, not just a website. Every piece below is set up, tested and handed over working.",
    deliverables: [
      {
        icon: ShoppingCart,
        title: "Store Design & Build",
        description:
          "Product pages, categories, search and filters designed so customers find what they want fast, on a phone, without pinching and zooming.",
      },
      {
        icon: CreditCard,
        title: "Payments & Checkout",
        description:
          "A short, secure checkout wired to the payment methods that work for your customers, with pricing shown in the currency they expect.",
      },
      {
        icon: Package,
        title: "Inventory Management",
        description:
          "Stock levels, variants, sizes and options that update as orders come in, so you are never selling something you ran out of last week.",
      },
      {
        icon: Truck,
        title: "Delivery & Pickup",
        description:
          "Local delivery zones across the island, in-store pickup and shipping options, each with rates and timings that reflect how you actually operate.",
      },
      {
        icon: RefreshCw,
        title: "Order Management",
        description:
          "Automatic confirmation emails, order status, and a dashboard you can read at a glance. Training included so your team can run it without us.",
      },
      {
        icon: Search,
        title: "Product SEO",
        description:
          "Product and category pages structured for search, with rich results markup so listings show price and availability directly in Google.",
      },
    ],
    includes: [
      "Custom store design and build",
      "Product catalog setup and import",
      "Secure checkout configuration",
      "Payment gateway integration",
      "Local delivery, pickup and shipping rules",
      "Tax and currency configuration",
      "Automated order and shipping emails",
      "Abandoned cart recovery",
      "Product page SEO and rich results",
      "Hosting, SSL, backups and training",
    ],
    processIntro:
      "From a list of products to a store taking real orders, without you having to learn a new job.",
    process: [
      {
        title: "Plan",
        description:
          "We map your products, options, delivery zones and payment methods before anything is built, so there are no surprises later.",
      },
      {
        title: "Build",
        description:
          "The store is designed, your catalog is loaded, and payments, shipping and taxes are configured to match how you sell.",
      },
      {
        title: "Test",
        description:
          "We place real test orders end to end: checkout, payment, confirmation emails, delivery rules. Nothing goes live untested.",
      },
      {
        title: "Launch & Support",
        description:
          "We train you on the dashboard, launch the store, then keep it fast, secure and updated as your catalog grows.",
      },
    ],
    idealFor: [
      "Shops that only sell in person right now",
      "Businesses taking orders through WhatsApp DMs",
      "Restaurants and bakeries wanting online ordering",
      "Local brands selling to visitors after they fly home",
      "Existing stores that are slow, clunky or hard to update",
    ],
    faqs: [
      {
        question: "Can I add and edit products myself?",
        answer:
          "Yes, and we train you on it before launch. Adding a product, changing a price or marking something sold out takes a couple of minutes, no developer needed.",
      },
      {
        question: "Which payment methods can I accept?",
        answer:
          "That depends on your bank and the providers you can open an account with. We go through the options with you during planning and build the checkout around whichever you choose.",
      },
      {
        question: "Can I sell to customers outside Aruba?",
        answer:
          "Yes. We set up international shipping zones and rates alongside your local delivery, which works well for visitors who want to order again once they are home.",
      },
      {
        question: "What if I only have a handful of products?",
        answer:
          "That is often the best place to start. A small, well-built store that converts beats a huge catalog nobody can navigate, and it grows with you.",
      },
    ],
    ctaHeadline: "Ready to start",
    ctaHighlight: "selling online?",
    ctaIntro:
      "Tell us what you sell and we will map out what your store needs, from checkout to delivery.",
  },
];

export const getServiceBySlug = (slug?: string) =>
  services.find((service) => service.slug === slug);
