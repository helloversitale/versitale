/**
 * Serves dist/ the way Vercel serves it in production: static file match,
 * directory -> index.html, anything unmatched -> 404.html with a real 404.
 *
 * Use this (not `vite preview`) to verify prerendering, because vite preview
 * falls back to the SPA shell and would hide whether the per-route HTML files
 * are actually being produced.
 *
 *   npm run build && npm run preview:static
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

if (!fs.existsSync(dist)) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const candidates = [
      path.join(dist, urlPath),
      path.join(dist, urlPath, "index.html"),
    ];

    for (const candidate of candidates) {
      // Keep the resolved path inside dist/.
      if (!candidate.startsWith(dist)) break;
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.writeHead(200, {
          "Content-Type": types[path.extname(candidate)] || "application/octet-stream",
        });
        return res.end(fs.readFileSync(candidate));
      }
    }

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(path.join(dist, "404.html")));
  })
  .listen(port, () => {
    console.log(`\n  Serving dist/ with Vercel's static rules:`);
    console.log(`  http://localhost:${port}\n`);
  });
