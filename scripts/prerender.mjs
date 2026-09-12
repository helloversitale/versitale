/**
 * Build-time prerenderer.
 *
 * Renders every route in the app's route table to a real HTML file so that
 * crawlers (and anything else that doesn't execute JavaScript) receive a
 * complete document with the correct title, description and canonical URL,
 * instead of an empty <div id="root"> and the homepage's metadata.
 *
 * Run automatically as part of `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const {
  render,
  routeMeta,
  notFoundMeta,
  absoluteUrl,
  DEFAULT_OG_IMAGE,
} = await import(url.pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the <!--app-html--> placeholder.");
}
if (!/<!--seo-->[\s\S]*<!--\/seo-->/.test(template)) {
  throw new Error("index.html is missing the <!--seo--> ... <!--/seo--> block.");
}

/** Escape a string for use inside an HTML attribute value. */
const attr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escape a string for use as HTML text content. */
const text = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildSeoBlock = (meta) => {
  const canonical = absoluteUrl(meta.path);
  const image = meta.image
    ? meta.image.startsWith("http")
      ? meta.image
      : absoluteUrl(meta.image)
    : DEFAULT_OG_IMAGE;

  const tags = [
    `<title>${text(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
  ];

  // A noindex page gets no canonical: it should not consolidate anywhere.
  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  } else {
    tags.push(`<link rel="canonical" href="${attr(canonical)}" />`);
  }

  tags.push(
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:type" content="${attr(meta.type ?? "website")}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    `<meta property="og:image" content="${attr(image)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    `<meta name="twitter:image" content="${attr(image)}" />`
  );

  return tags.map((tag) => `    ${tag}`).join("\n");
};

/** Where a route's HTML file lands inside dist/. */
const outputFileFor = (routePath) =>
  routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

const renderRoute = (meta, outFile) => {
  const appHtml = render(meta.path === "/404" ? "/__not-found__" : meta.path);

  const html = template
    .replace(/<!--seo-->[\s\S]*<!--\/seo-->/, `<!--seo-->\n${buildSeoBlock(meta)}\n    <!--/seo-->`)
    .replace("<!--app-html-->", appHtml);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  return html.length;
};

console.log("\nPrerendering routes:");
let failures = 0;

for (const meta of routeMeta) {
  try {
    const bytes = renderRoute(meta, outputFileFor(meta.path));
    console.log(`  ok  ${meta.path.padEnd(52)} ${(bytes / 1024).toFixed(1)} KB`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL ${meta.path}: ${error.message}`);
  }
}

// A real 404 document, served with a 404 status by vercel.json.
try {
  const bytes = renderRoute(notFoundMeta, path.join(distDir, "404.html"));
  console.log(`  ok  ${"/404 (404.html)".padEnd(52)} ${(bytes / 1024).toFixed(1)} KB`);
} catch (error) {
  failures += 1;
  console.error(`  FAIL 404.html: ${error.message}`);
}

// sitemap.xml, generated from the same route table so it can never list a
// route that doesn't exist or miss one that does.
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routeMeta
    .filter((meta) => !meta.noindex)
    .map((meta) =>
      [
        "  <url>",
        `    <loc>${absoluteUrl(meta.path)}</loc>`,
        `    <lastmod>${meta.lastmod ?? today}</lastmod>`,
        `    <changefreq>${meta.changefreq ?? "monthly"}</changefreq>`,
        `    <priority>${meta.priority ?? "0.5"}</priority>`,
        "  </url>",
      ].join("\n")
    ),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log(`\n  sitemap.xml written (${routeMeta.filter((m) => !m.noindex).length} URLs)`);

if (failures > 0) {
  console.error(`\nPrerender failed for ${failures} route(s).`);
  process.exit(1);
}

console.log("Prerender complete.\n");
