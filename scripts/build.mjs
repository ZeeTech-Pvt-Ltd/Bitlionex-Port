// Full production build:
//
//   1. `vite build`          -> client bundle in dist/ (hashed assets, empty
//                               #root, homepage default head)
//   2. `vite build --ssr`    -> compiles scripts/prerender-entry.jsx (JSX +
//                               React) into .ssr-dist/, so Node can render it
//   3. prerender             -> renderToString(renderRoute(route)) for every
//                               route; each route's full HTML document is
//                               written with a baked head (per route
//                               title/description/keywords/robots/canonical/
//                               Open Graph/Twitter + JSON-LD from
//                               src/data/seo.js) and an inlined <style>, so
//                               there is no render blocking CSS request.
//   4. outputs               -> dist/index.html (home),
//                               dist/<route>/index.html per content route,
//                               dist/404.html (noindex; no canonical),
//                               plus robots.txt and sitemap.xml generated from
//                               the same seo table, so the sitemap can never
//                               list a route the site does not have, and can
//                               never list /thank-you.
//
// Every head tag mirrors what <Seo/> sets at runtime, so a hydrated page's
// head is identical to what the server shipped. That is what lets Vercel serve
// the prerendered files directly instead of an SPA fallback.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { BRAND, SITE } from '../src/data/site.js'
import {
  INDEXABLE,
  ogImageAltFor,
  ogImageFor,
  schemasFor,
  seo,
} from '../src/data/seo.js'
import { FAQ_ITEMS } from '../src/data/content.js'
import { STEPS } from '../src/data/market.js'
import { LEGAL_DOCS, countPlaceholders, PLACEHOLDER_TOKEN } from '../src/data/legal.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(ROOT, 'dist')
const assetsDir = path.join(dist, 'assets')
const ssrDir = path.join(ROOT, '.ssr-dist')

const escA = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escT = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Per route output file, keyed the same way seo.js and prerender-entry.jsx are
// keyed. The route key and the URL slug are the same string, so
// 'risk-disclosure' lands at dist/risk-disclosure/index.html with the
// canonical https://bitlionexport-au.com/risk-disclosure.
const OUTPUT = {
  home: 'index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  faq: 'faq/index.html',
  terms: 'terms/index.html',
  privacy: 'privacy/index.html',
  'risk-disclosure': 'risk-disclosure/index.html',
  'thank-you': 'thank-you/index.html',
  404: '404.html',
}

// The per route <title>/meta/canonical/OG/Twitter block. Mirrors Seo.jsx
// field for field.
function headMeta(conf, route) {
  const L = []
  L.push(`    <title>${escT(conf.title)}</title>`)
  L.push(`    <meta name="description" content="${escA(conf.description)}" />`)
  if (conf.keywords) L.push(`    <meta name="keywords" content="${escA(conf.keywords)}" />`)
  L.push(`    <meta name="robots" content="${escA(conf.robots)}" />`)
  // Noindex routes carry no canonical. The two are contradictory signals, so
  // the tag is omitted rather than pointed at the homepage.
  if (conf.canonical) L.push(`    <link rel="canonical" href="${escA(conf.canonical)}" />`)

  const og = {
    'og:site_name': BRAND,
    'og:title': conf.title,
    'og:description': conf.description,
    'og:url': conf.canonical || `${SITE}/`,
    'og:image': ogImageFor(route),
    'og:image:alt': ogImageAltFor(route),
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:type': 'website',
    'og:locale': 'en_AU',
  }
  for (const [k, v] of Object.entries(og)) {
    L.push(`    <meta property="${k}" content="${escA(v)}" />`)
  }

  const tw = {
    'twitter:card': 'summary_large_image',
    'twitter:title': conf.title,
    'twitter:description': conf.description,
    'twitter:image': ogImageFor(route),
  }
  for (const [k, v] of Object.entries(tw)) {
    L.push(`    <meta name="${k}" content="${escA(v)}" />`)
  }
  return L.join('\n')
}

/**
 * The JSON-LD block, from the same schemasFor() the client calls - so the
 * baked markup and the hydrated markup carry identical structured data.
 *
 * `<` is escaped so a script element's content survives HTML parsing intact.
 */
function jsonLd(route) {
  const faqItems = route === 'home' || route === 'faq' ? FAQ_ITEMS : []
  return schemasFor(route, faqItems, STEPS)
    .map(
      (data) =>
        `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n')
}

function docFor(prefix, staticHead, style, moduleTag, body, conf, route) {
  const meta = headMeta(conf, route)
  const ld = jsonLd(route)
  return `${prefix}
${staticHead.trimEnd()}
${meta}
${ld ? `${ld}\n` : ''}    <style>
${style}
    </style>
    ${moduleTag}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`
}

function log(step, msg) {
  console.log(`[build] ${step} - ${msg}`)
}

/* ------------------------------------------------------------------
   robots.txt and sitemap.xml, generated from the same seo table the pages
   are generated from.

   Two things here are deliberate and easy to get wrong:

     /thank-you is NOT disallowed. A Disallow stops a crawler fetching the
     page, which means it never sees the noindex tag on it either, and a URL
     blocked in robots.txt can still be indexed from inbound links. Leaving it
     fetchable and noindexed is what actually keeps it out.

     The sitemap lists INDEXABLE routes only. /thank-you and the 404 are noindex
     and have no business in it.
   ------------------------------------------------------------------ */

function robotsTxt() {
  return `# ${BRAND}
# ${SITE}

User-agent: *
Allow: /

# /thank-you is intentionally NOT disallowed. It carries a noindex tag, and a
# crawler that is blocked here never gets to read it.

Sitemap: ${SITE}/sitemap.xml
`
}

function sitemapXml() {
  const urls = INDEXABLE.map((route) => {
    const conf = seo[route]
    const loc = conf.canonical
    // The homepage is the most important URL on the site; everything else is
    // a supporting page.
    const priority = route === 'home' ? '1.0' : route === 'contact' || route === 'faq' ? '0.8' : '0.6'
    const changefreq = route === 'home' ? 'weekly' : 'monthly'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${conf.updated}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

function manifest() {
  return `${JSON.stringify(
    {
      name: BRAND,
      short_name: 'Bitlionex',
      description:
        'AI assisted crypto research and portfolio tracking for Australian investors.',
      start_url: '/',
      display: 'standalone',
      background_color: '#f7f7fc',
      theme_color: '#322e80',
      lang: 'en-AU',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        // A padded copy so Android's circular mask cannot clip an arrow tip.
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  )}\n`
}

// ---------------- 1) client build ----------------
rmSync(dist, { recursive: true, force: true })
log('vite', 'client build...')
execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' })

// ---------------- 2) SSR bundle of the prerender entry ----------------
rmSync(ssrDir, { recursive: true, force: true })
log('vite', 'SSR build of prerender entry...')
execSync('npx vite build --ssr scripts/prerender-entry.jsx --outDir .ssr-dist', {
  cwd: ROOT,
  stdio: 'inherit',
})

// Everything from here on is wrapped so a failed prerender cannot leave
// .ssr-dist behind. A stale directory makes the next failure harder to read.
try {
  // ---------------- 3) render every route to markup ----------------
  //
  // filter(), not find(): find() silently takes the first match, so a build
  // that emitted two bundles would pick one arbitrarily and the failure would
  // surface much later as wrong content on a page.
  const ssrFiles = readdirSync(ssrDir).filter(
    (f) => f.startsWith('prerender-entry') && f.endsWith('.js'),
  )
  if (ssrFiles.length !== 1) {
    throw new Error(`Expected 1 SSR bundle, found ${ssrFiles.length}: ${ssrFiles.join(', ')}`)
  }
  const { default: prerender } = await import(pathToFileURL(path.join(ssrDir, ssrFiles[0])).href)
  const pages = await prerender()

  // ---------------- 4) assemble full HTML documents ----------------
  const tpl = readFileSync(path.join(dist, 'index.html'), 'utf8')
  const headOpen = tpl.indexOf('<head>')
  const marker = '<!-- Primary metadata'
  const headStart = headOpen + '<head>'.length
  const staticEnd = tpl.indexOf(marker, headStart)
  if (headOpen < 0 || staticEnd < 0) {
    throw new Error('Could not locate <head> / title marker in built index.html')
  }

  const prefix = tpl.slice(0, headOpen + '<head>'.length)
  const staticHead = tpl.slice(headStart, staticEnd)

  const entryMatch = tpl.match(/<script type="module"[^>]*src="([^"]+\.js)"/)
  if (!entryMatch) throw new Error('Entry module script not found in built index.html')
  const entrySrc = entryMatch[1]

  // Preload every chunk the entry imports STATICALLY, not just the entry.
  //
  // Route components are lazy, and Rollup hoists anything shared between the
  // entry and a lazy chunk into its own file - react and jsx-runtime, here.
  // Those are needed on first paint, but the browser only discovers them after
  // parsing the entry, so they arrive in a waterfall: two extra round trips on
  // the critical path. On slow 4G that cost more than the splitting saved, and
  // it showed up as LCP moving from about 1s to about 1.7s while the total
  // bytes went down.
  //
  // The lazy route chunks are deliberately NOT preloaded - they are the whole
  // point of the split.
  const manifestPath = path.join(dist, '.vite', 'manifest.json')
  let modulePreloads = [entrySrc]
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    const entry = Object.values(manifest).find((c) => c.isEntry)
    for (const key of entry?.imports ?? []) {
      const file = manifest[key]?.file
      if (file) modulePreloads.push(`/${file}`)
    }
  } else {
    console.warn('[build] no vite manifest - shared chunks will not be preloaded')
  }
  const moduleTag =
    modulePreloads
      .map((href) => `    <link rel="modulepreload" crossorigin href="${href}">`)
      .join('\n') +
    `\n    <script type="module" crossorigin src="${entrySrc}"></script>`

  const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
  if (cssFiles.length !== 1) {
    throw new Error(
      `Expected exactly 1 CSS file, found ${cssFiles.length}: ${cssFiles.join(', ')}\n` +
        'All styling must live in src/index.css - the build inlines it into every page.',
    )
  }
  const css = readFileSync(path.join(assetsDir, cssFiles[0]), 'utf8')

  let wrote = 0
  for (const [route, rel] of Object.entries(OUTPUT)) {
    const conf = seo[route]
    if (!conf) throw new Error(`No seo config for route "${route}"`)
    const body = pages[route]
    if (typeof body !== 'string') throw new Error(`No prerendered markup for route "${route}"`)

    const html = docFor(prefix, staticHead, css, moduleTag, body, conf, route)
    const out = path.join(dist, rel)
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, html)

    // Per route post write assertions. This is the check that catches the
    // whole class of bug where a route silently renders the wrong tree: the
    // head says one thing and the body is the homepage, and nothing else in
    // the build would notice.
    if (!html.includes(`<title>${escT(conf.title)}</title>`)) {
      throw new Error(`${route}: title was not baked into ${rel}`)
    }
    if (conf.canonical && !html.includes(`rel="canonical" href="${escA(conf.canonical)}"`)) {
      throw new Error(`${route}: canonical was not baked into ${rel}`)
    }
    if (!conf.canonical && html.includes('rel="canonical"')) {
      throw new Error(`${route}: ${rel} is noindex but carries a canonical`)
    }
    if (body.length < 500) {
      throw new Error(`${route}: rendered body is suspiciously small (${body.length} chars)`)
    }
    wrote += 1
  }

  // ---------------- 5) the crawl files ----------------
  writeFileSync(path.join(dist, 'robots.txt'), robotsTxt())
  writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml())
  writeFileSync(path.join(dist, 'site.webmanifest'), manifest())
  log('crawl', 'wrote robots.txt, sitemap.xml, site.webmanifest')

  rmSync(path.join(assetsDir, cssFiles[0]))
  // The manifest is a build input, not a deployable.
  rmSync(path.join(dist, ".vite"), { recursive: true, force: true })

  log('done', `wrote ${wrote} prerendered HTML files (CSS inlined, ${cssFiles[0]} deleted)`)

  // ---------------- 6) what is still unresolved ----------------
  //
  // Printed rather than thrown, because a placeholder is a thing the operator
  // has to go and find out. Printed loudly, because a placeholder that ships
  // quietly is a legal document with a hole in it.
  const unresolved = []
  for (const doc of Object.values(LEGAL_DOCS)) unresolved.push([doc.title, countPlaceholders(doc)])
  const htmlTokens = Object.entries(OUTPUT).reduce((sum, [, rel]) => {
    const html = readFileSync(path.join(dist, rel), 'utf8')
    return sum + (html.split(PLACEHOLDER_TOKEN).length - 1)
  }, 0)

  const legalTotal = unresolved.reduce((s, [, n]) => s + n, 0)
  if (htmlTokens > 0) {
    console.log('')
    console.log(`[build] ${htmlTokens} unresolved [PLACEHOLDER] tokens across the rendered pages:`)
    for (const [title, n] of unresolved) {
      if (n) console.log(`         ${title}: ${n}`)
    }
    console.log('         Replace them before this build goes live.')
    console.log('')
  } else if (legalTotal === 0) {
    log('placeholders', 'none outstanding')
  }
} finally {
  rmSync(ssrDir, { recursive: true, force: true })
}
