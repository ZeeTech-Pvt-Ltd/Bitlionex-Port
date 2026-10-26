// Writes public/robots.txt and public/sitemap.xml from the same seo table the
// pages are generated from.
//
//   npm run crawl
//
// Two things here are deliberate and easy to get wrong:
//
//   /thank-you is NOT disallowed. A Disallow stops a crawler fetching the page,
//   which means it never sees the noindex tag on it either, and a URL blocked
//   in robots.txt can still be indexed from inbound links. Leaving it
//   fetchable and noindexed is what actually keeps it out.
//
//   The sitemap lists INDEXABLE routes only. /thank-you and the 404 are noindex
//   and have no business in it.
//
// The <lastmod> comes from each route's `updated` field, not from the build
// clock. A lastmod that changes on every deploy is one Google learns to ignore.
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BRAND, SITE } from '../src/data/site.js'
import { INDEXABLE, seo } from '../src/data/seo.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public')

const robots = `# ${BRAND}
# ${SITE}

User-agent: *
Allow: /

# /thank-you is intentionally NOT disallowed. It carries a noindex tag, and a
# crawler that is blocked here never gets to read it.

Sitemap: ${SITE}/sitemap.xml
`

const urls = INDEXABLE.map((route) => {
  const conf = seo[route]
  // The homepage is the most important URL on the site; everything else is a
  // supporting page.
  const priority = route === 'home' ? '1.0' : route === 'contact' || route === 'faq' ? '0.8' : '0.6'
  const changefreq = route === 'home' ? 'weekly' : 'monthly'
  return `  <url>
    <loc>${conf.canonical}</loc>
    <lastmod>${conf.updated}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

// The build refuses to ship a lastmod that is not a W3C datetime, so check it
// here rather than discovering it in a crawler report.
for (const route of INDEXABLE) {
  const d = seo[route].updated
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    throw new Error(`${route}: updated is "${d}", which is not a W3C datetime`)
  }
}

writeFileSync(path.join(OUT, 'robots.txt'), robots)
writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap)

// The web app manifest. The Vite build generated this in its build script;
// nothing did under Next, so the <link rel="manifest"> in the layout pointed at
// a 404 until this was added.
const manifest = {
  name: BRAND,
  short_name: 'Bitlionex',
  description: 'AI assisted crypto research and portfolio tracking for Australian investors.',
  start_url: '/',
  display: 'standalone',
  background_color: '#f7f7fc',
  theme_color: '#322e80',
  lang: 'en-AU',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    // Padded, so Android's circular mask cannot clip an arrow tip.
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
writeFileSync(path.join(OUT, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`[crawl] wrote public/robots.txt, public/sitemap.xml (${INDEXABLE.length} URLs) and public/site.webmanifest`)
