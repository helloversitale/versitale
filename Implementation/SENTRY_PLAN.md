# IMPLEMENTATION PLAN: Sentry.io Integration

This plan outlines how to add Sentry error monitoring and performance tracking to the Versitale website.

---

## Overview

**What Sentry gives us:**
- Real-time error tracking (caught and uncaught exceptions)
- Performance monitoring (page load times, Web Vitals)
- Session replays (optional — see what users did before an error)
- Source map support (readable stack traces from minified production code)

**Key integration points in this project:**
- `main.tsx` — Sentry initializes here, before React renders
- `ErrorBoundary.tsx` — currently logs to `console.error`; should report to Sentry
- Vite build — needs the Sentry Vite plugin to upload source maps automatically
- React Router v6 — needs Sentry's router integration for route-aware tracing

---

## Phase 1: Account & Project Setup

1. **Create a Sentry account** at sentry.io (or log in to existing).
2. **Create a new Project:**
   - Platform: `React`
   - Project name: `versitale-website`
3. **Copy the DSN** from the project settings — you'll need it in Phase 3.
4. **Create an Auth Token** (Settings → Auth Tokens) with `project:releases` and `org:read` scopes — needed for source map uploads.

---

## Phase 2: Packages to Install

```
@sentry/react
@sentry/vite-plugin
```

- `@sentry/react` — core SDK with React-specific helpers (ErrorBoundary wrapper, router integration)
- `@sentry/vite-plugin` — uploads source maps to Sentry at build time so stack traces are readable

---

## Phase 3: Environment Variables

Add the following to `.env` (and sync to Vercel's Environment Variables dashboard):

```
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=versitale-website
```

- `VITE_SENTRY_DSN` — public, browser-facing. Must have `VITE_` prefix.
- `SENTRY_AUTH_TOKEN` — used only at build time by the Vite plugin. Do NOT prefix with `VITE_`.
- `SENTRY_ORG` / `SENTRY_PROJECT` — used by the Vite plugin for source map uploads.

**Note:** Add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` to Vercel's Environment Variables as well so production builds can upload source maps.

---

## Phase 4: Vite Config — Source Map Upload

**File:** `vite.config.ts`

Add the Sentry Vite plugin to the `plugins` array. Configure it with:
- `org` → `SENTRY_ORG`
- `project` → `SENTRY_PROJECT`
- `authToken` → `SENTRY_AUTH_TOKEN`
- Enable source map generation (`sourcemap: true` in build options)

The plugin automatically uploads source maps after each production build and then deletes them from the `dist` folder so they aren't publicly accessible.

---

## Phase 5: SDK Initialization

**File:** `main.tsx`

Initialize Sentry **before** `createRoot(...)` is called. Key config options:

| Option | Value | Notes |
|---|---|---|
| `dsn` | `import.meta.env.VITE_SENTRY_DSN` | From env |
| `environment` | `import.meta.env.MODE` | `"production"` or `"development"` |
| `tracesSampleRate` | `0.2` (production) / `1.0` (dev) | 20% of transactions sampled in prod |
| `replaysSessionSampleRate` | `0.1` | 10% of sessions get a replay |
| `replaysOnErrorSampleRate` | `1.0` | 100% of errored sessions get a replay |
| `integrations` | `Sentry.browserTracingIntegration()`, `Sentry.replayIntegration()` | Performance + Replay |

**React Router integration:** Pass the router's `useLocation` hook to `Sentry.reactRouterV6BrowserTracingIntegration` so Sentry groups transactions by route name (e.g. `/articles/:slug`) rather than raw URLs.

---

## Phase 6: ErrorBoundary Update

**File:** `src/components/ErrorBoundary.tsx`

Replace the `console.error` call in `componentDidCatch` with `Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })`.

This means every React render error caught by the boundary is automatically reported to Sentry with the full component stack trace.

---

## Phase 7: Verify the Integration

1. **Local test:** Temporarily throw an error in any component and confirm it appears in the Sentry dashboard.
2. **Source maps test:** Run `npm run build` and check that source maps were uploaded (Sentry project → Releases → Artifacts).
3. **Performance test:** Navigate around the site and confirm transactions appear in Sentry → Performance with correct route names.
4. **Replay test:** If replays are enabled, confirm a session replay appears after triggering an error.

---

## Phase 8: Alerts & Notifications (Optional but Recommended)

In the Sentry dashboard, configure:
- **Error alert:** Notify when a new error is first seen (email or Slack).
- **Performance alert:** Notify if p95 page load exceeds a threshold (e.g. 3s).

---

## Notes & Decisions

- **Do not initialize Sentry in development** unless you're testing it — use `enabled: import.meta.env.PROD` to keep local logs clean.
- **Source maps should never be public.** The Vite plugin handles deletion from `dist` automatically.
- **Session Replay** adds ~30KB to the bundle. Acceptable for this project's size; re-evaluate if bundle size becomes a concern.
- **The existing ErrorBoundary** is already wired into `main.tsx` as the root wrapper — this is the right place and requires minimal change to hook Sentry in.
