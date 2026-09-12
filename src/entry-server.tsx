import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

/**
 * Renders a route to static HTML at build time.
 *
 * Toaster/Sonner/SpeedInsights are intentionally left out: they render no
 * indexable content and are browser-only concerns.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </StaticRouter>
  );
}

// Re-exported so scripts/prerender.mjs can consume the same route table the
// app uses, without needing to compile TypeScript separately.
export {
  routeMeta,
  notFoundMeta,
  absoluteUrl,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "./data/route-meta";
