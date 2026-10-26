/**
 * Static export: every route is rendered to HTML at build time, so the copy is
 * in the first response instead of behind a JS bundle. This replaces the
 * hand-rolled scripts/build.mjs pipeline the Vite version used.
 *
 * Routes are emitted as `about.html` rather than `about/index.html`, so the
 * canonical URLs match the entries in sitemap.xml without a trailing slash.
 * Vercel serves `/about` from `about.html` directly, and `404.html` is emitted
 * too, so an unknown path gets a real 404 status rather than the homepage at
 * 200.
 *
 * Redirects are not configured here: `redirects()` is unsupported with
 * `output: 'export'`. They live in vercel.json, which Vercel applies before
 * serving the static files.
 */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
