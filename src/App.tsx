import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Booking from "./pages/Booking";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";

const queryClient = new QueryClient();

/**
 * The route table. Shared by the browser entry below and by the build-time
 * prerenderer (src/entry-server.tsx), so both render the same tree.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:slug" element={<ServiceDetail />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/articles/:slug" element={<ArticleDetail />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

/** Context providers the pages depend on. Also used during prerender. */
export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AppProviders>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <SpeedInsights />
  </AppProviders>
);

export default App;
